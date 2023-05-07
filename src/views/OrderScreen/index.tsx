import {Link} from '@react-navigation/native';
import {initStripe, useStripe} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, colors, Divider, Icon, ListItem, Switch, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '~/constants/colors';
import {parcelApi} from '~/services/api';
import {RootState} from '~/store';
import {addOrder, createIntentOrder, resetOrder} from '~/store/slices/orderSlice';
import {resetProducts} from '~/store/slices/productSlice';
import {resetRecipient} from '~/store/slices/recipientSlice';
import {resetSelectedLocation} from '~/store/slices/searchSlice';

const OrderScreen = ({navigation}: any) => {
  const STRIPE_PUBLISHABLE_KEY =
    'pk_test_51Mn0NXKJyU3LBZTd55O8WhojcOoXPvqj9UjUFjV4u9E9cyHv6DRvKDt80H2hSwmoaECJx2iZQ1FiWZsNrhnqIrBb00COwefzFK';

  const dispatch = useDispatch();
  const {initPaymentSheet, presentPaymentSheet, retrievePaymentIntent} = useStripe();
  const {user} = useSelector((state: RootState) => state.user);
  const {intentOrder, order} = useSelector((state: RootState) => state.order);
  const {products} = useSelector((state: RootState) => state.product);
  const {recipient} = useSelector((state: RootState) => state.recipient);
  const {selectedLocationData} = useSelector((state: RootState) => state.search);

  const [isEstmated, setIsEstimated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pressedCreatedOrder, setPressedCreateOrder] = useState(false);
  const [isExpress, setIsExpress] = useState(false);
  const [isOnlinePayment, setIsOnlinePayment] = useState(true);

  const toggleExpress = () => setIsExpress(previousState => !previousState);

  function onEstimateFee() {
    if (recipient.name && selectedLocationData.location && products.length) {
      const payload = {
        recipientName: recipient.name,
        recipientPhone: recipient.phone,
        isExpress: isExpress,
        packageType: products[0].type,
        source: user.location,
        destination: {
          type: 'Point',
          address: selectedLocationData.address,
          coordinates: [selectedLocationData.location.lat, selectedLocationData.location.lng],
        },
        subOrders: [] as any,
      };
      for (let product of products) {
        payload.subOrders.push({
          status: 1,
          name: product.name,
          weight: product.weight,
          dimension: product.dimension,
          type: product.type,
        });
      }
      console.log('createIntentOrder payload: ', payload);
      dispatch(createIntentOrder(payload));
    }
  }

  function onCreateOrder() {
    setPressedCreateOrder(true);
    if (recipient.name && intentOrder.fee != null) {
      console.log('createIntentOrder response: ', intentOrder);
      console.log('something: ', isExpress, intentOrder.warehouse?.id);
      const data = {
        userId: user.id,
        recipientName: recipient.name,
        recipientMail: recipient.email,
        recipientPhone: recipient.phone,
        packageType: intentOrder.packageType,
        isExpress: isExpress,
        source: user.location,
        description: '',
        destination: intentOrder.destination,
        totalWeight: intentOrder.totalWeight,
        fee: intentOrder.fee,
        subOrders: intentOrder.subOrders,
        warehouseId: intentOrder.warehouse ? intentOrder.warehouse?.id : null,
      };
      console.log('onCreateOrder payload: ', data);
      // add check condition
      if (!isOnlinePayment) {
        dispatch(addOrder({data, navigation}));
      } else {
        dispatch(addOrder({data}));
      }
    }
  }

  const fetchPaymentSheetParams = async () => {
    console.log('fetchPaymentSheetParams: ', order.id, intentOrder.fee);
    if (order.id && intentOrder.fee) {
      const response = await parcelApi.createIntentPayment(order.id, intentOrder.fee);
      console.log('==============', response);
      const {clientSecret, ephemeralKey, customer} = response;
      return {
        clientSecret,
        ephemeralKey,
        customer,
      };
    }
    return null;
  };

  const openPaymentSheet = async () => {
    const result = await fetchPaymentSheetParams();
    if (result) {
      const {clientSecret, ephemeralKey, customer} = result;

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'ParcelGO, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: clientSecret,
      });
      if (!error) {
        const {error} = await presentPaymentSheet();
        if (error) {
          console.log('error: ', error);
        } else {
          onResetScreen();
          navigation.navigate('Home');
        }
      }
    }
  };

  const onResetScreen = () => {
    // reset
    dispatch(resetSelectedLocation());
    dispatch(resetRecipient());
    dispatch(resetProducts());
    dispatch(resetOrder());
    setIsExpress(false);
    setIsEstimated(false);
  };

  useEffect(() => {
    if (intentOrder.fee != null) {
      setIsEstimated(true);
    }
  }, [intentOrder]);

  useEffect(() => {
    initStripe({publishableKey: STRIPE_PUBLISHABLE_KEY});
  }, []);

  useEffect(() => {
    if (order.id && isOnlinePayment && pressedCreatedOrder) {
      setPressedCreateOrder(false);
      openPaymentSheet();
    }
  }, [order]);

  return (
    <ScrollView>
      {/* Logo */}
      <View style={{backgroundColor: '#f4f4f4', paddingBottom: 6}}>
        <View style={{paddingHorizontal: 16, paddingTop: 24}}>
          <Text style={{fontSize: 14, color: COLORS.gray}}>Calculate shipping rates</Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8}}>
            <Text style={{fontSize: 22, fontWeight: '700', color: COLORS.black0}}>Parcel</Text>
            <Text style={{fontSize: 22, fontWeight: '700', color: COLORS.golden}}>Go</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        {/* Sender */}
        <View style={{paddingHorizontal: 16, paddingVertical: 16}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: COLORS.black0}}>Sender information</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 16, fontWeight: '700', color: colors.black}}>{user.address}</Text>
              <Text style={{fontSize: 14, color: colors.grey2}}>{user.address}</Text>
            </View>
            <Icon type="font-awesome" name="chevron-right" size={12} containerStyle={{paddingLeft: 12}}></Icon>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 22,
            }}>
            <View
              style={{
                width: '42%',
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderStyle: 'dotted',
                borderBottomColor: COLORS.gray,
              }}>
              <Text style={{fontSize: 16, color: COLORS.black0}}>{user.displayName}</Text>
              <Text style={{fontSize: 14, color: colors.grey2}}>{user.phone}</Text>
            </View>
            <Divider color={colors.grey5} width={1} orientation="vertical"></Divider>
            <View
              style={{
                width: '48%',
                paddingBottom: 2,
                borderBottomWidth: 1,
                borderStyle: 'dotted',
                borderBottomColor: COLORS.gray,
              }}>
              <Text style={{fontSize: 14, color: colors.grey2}}>Email</Text>
              <Text numberOfLines={1} style={{fontSize: 16, color: COLORS.black0}}>
                {user.email}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 22}}>
            <Text style={{fontSize: 16, color: COLORS.black0}}>Express delivery</Text>
            <Switch
              trackColor={{false: '#767577', true: COLORS.darkGolden}}
              thumbColor={isExpress ? COLORS.golden : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleExpress}
              value={isExpress}></Switch>
          </View>
        </View>

        <Divider color="#f4f4f4" width={14}></Divider>

        {/* Receiver */}
        <View style={{paddingHorizontal: 16, paddingVertical: 16}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: '700', color: COLORS.black0}}>Receiver information</Text>
            <Button
              title="Edit"
              containerStyle={{borderRadius: 30}}
              buttonStyle={{backgroundColor: `${COLORS.golden}40`, paddingVertical: 4, borderRadius: 30}}
              titleStyle={{fontSize: 14, fontWeight: '400', color: COLORS.darkGolden, paddingHorizontal: 8}}
              onPress={() =>
                navigation.navigate('Search', {
                  departure: 'Order',
                })
              }></Button>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 20,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: colors.grey5,
            }}>
            <Link to={{screen: 'Search', params: {departure: 'Order'}}}>
              <View style={{flex: 1}}>
                {selectedLocationData.address ? (
                  <>
                    <Text style={{fontSize: 16, fontWeight: '700', color: colors.black}}>
                      {selectedLocationData.name}
                    </Text>
                    <Text numberOfLines={1} style={{fontSize: 14, color: colors.grey2}}>
                      {selectedLocationData.address}
                    </Text>
                  </>
                ) : (
                  <Text style={{fontSize: 16, color: COLORS.blue}}>Add the address</Text>
                )}
              </View>
            </Link>
            <Link to={{screen: 'Search', params: {departure: 'Order'}}}>
              <Icon type="font-awesome" name="chevron-right" size={12} containerStyle={{paddingLeft: 12}}></Icon>
            </Link>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 20,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderBottomColor: colors.grey5,
            }}>
            <Link to={{screen: 'Recipient', params: {departure: 'Order'}}}>
              <View style={{flex: 1}}>
                {recipient.name ? (
                  <>
                    <Text style={{fontSize: 16, fontWeight: '700', color: colors.black}}>{recipient.name}</Text>
                    <Text style={{fontSize: 14, color: colors.grey2}}>{recipient.phone}</Text>
                  </>
                ) : (
                  <Text style={{fontSize: 16, color: COLORS.blue}}>Add recipient info</Text>
                )}
              </View>
            </Link>
            <Link to={{screen: 'Recipient', params: {departure: 'Order'}}}>
              <Icon type="font-awesome" name="chevron-right" size={12} containerStyle={{paddingLeft: 12}}></Icon>
            </Link>
          </View>
        </View>

        <Divider color="#f4f4f4" width={14}></Divider>

        {/* Products */}
        <View style={{paddingVertical: 16}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', color: COLORS.black0}}>Products</Text>
            <Button
              title="Add"
              containerStyle={{borderRadius: 30}}
              buttonStyle={{backgroundColor: `${COLORS.golden}40`, paddingVertical: 4, borderRadius: 30}}
              titleStyle={{fontSize: 14, fontWeight: '400', color: COLORS.darkGolden, paddingHorizontal: 8}}
              onPress={() => navigation.navigate('Product', {id: null})}></Button>
          </View>
          {!!products.length &&
            products.map(product => (
              <View key={product.id} style={{paddingTop: 16}}>
                <ListItem.Swipeable
                  containerStyle={{paddingHorizontal: 0, paddingVertical: 0}}
                  rightWidth={120}
                  rightContent={
                    <View style={{flexDirection: 'row'}}>
                      <Button
                        title="Edit"
                        icon={{type: 'antdesign', name: 'edit', color: 'white', size: 20}}
                        iconContainerStyle={{position: 'absolute', top: 6}}
                        containerStyle={{width: 60, height: 60}}
                        buttonStyle={{height: '100%', backgroundColor: '#838287', borderRadius: 0}}
                        titleStyle={{position: 'absolute', bottom: 6, fontSize: 13}}
                        onPress={() => {
                          navigation.navigate('Product', {id: product.id});
                        }}
                      />
                      <Button
                        title="Delete"
                        icon={{type: 'antdesign', name: 'delete', color: 'white', size: 20}}
                        iconContainerStyle={{position: 'absolute', top: 6}}
                        containerStyle={{width: 60, height: 60}}
                        buttonStyle={{height: '100%', backgroundColor: '#f5212d', borderRadius: 0}}
                        titleStyle={{position: 'absolute', bottom: 6, fontSize: 13}}
                      />
                    </View>
                  }>
                  <ListItem.Content
                    style={{
                      height: 60,
                      paddingLeft: 16,
                    }}>
                    <View style={{width: '100%', height: '100%', flexDirection: 'row', alignItems: 'center'}}>
                      <Icon
                        type="antdesign"
                        name="edit"
                        color={COLORS.darkGolden}
                        size={20}
                        containerStyle={{marginRight: 16}}
                      />
                      <View
                        style={{
                          height: '100%',
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingRight: 16,
                        }}>
                        <View>
                          <Text style={{fontSize: 16, fontWeight: '700', color: COLORS.black0}}>{product.name}</Text>
                          <Text style={{fontSize: 14, color: COLORS.gray}}>{product.name}</Text>
                        </View>
                        <Text>{`${product.weight} kg`}</Text>
                      </View>
                    </View>
                  </ListItem.Content>
                </ListItem.Swipeable>
              </View>
            ))}
        </View>

        <Divider color="#f4f4f4" width={14}></Divider>

        {/* Estimated Fee */}
        {isEstmated && (
          <View style={{paddingHorizontal: 16, paddingVertical: 16}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.grey5,
              }}>
              <Text style={{fontSize: 20, fontWeight: '700', color: COLORS.black0}}>Estimated Fee</Text>
              <Button
                title="Estimate Again"
                containerStyle={{borderRadius: 30}}
                buttonStyle={{backgroundColor: `${COLORS.golden}40`, paddingVertical: 4, borderRadius: 30}}
                titleStyle={{fontSize: 14, fontWeight: '400', color: COLORS.darkGolden, paddingHorizontal: 8}}
                onPress={onEstimateFee}></Button>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 20,
              }}>
              <Text style={{color: '#26a999', fontSize: 22, fontWeight: '700'}}>
                {intentOrder.fee?.toLocaleString('en-US')}
              </Text>
              <Text>VNĐ</Text>
            </View>
            <Button
              title="Create an order"
              containerStyle={{marginVertical: 20}}
              buttonStyle={{backgroundColor: COLORS.golden}}
              titleStyle={{fontSize: 16, color: COLORS.black1, paddingVertical: 4}}
              onPress={onCreateOrder}></Button>
          </View>
        )}

        {!isEstmated && (
          <View style={{backgroundColor: '#f4f4f4'}}>
            <Button
              title="Estimate Fee"
              containerStyle={{marginVertical: 20, paddingHorizontal: 16}}
              buttonStyle={{backgroundColor: COLORS.golden}}
              titleStyle={{fontSize: 16, color: COLORS.black1, paddingVertical: 4}}
              onPress={onEstimateFee}></Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OrderScreen;
