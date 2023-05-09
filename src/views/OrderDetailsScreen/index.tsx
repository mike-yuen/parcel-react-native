import Clipboard from '@react-native-clipboard/clipboard';
import {Link} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View} from 'react-native';
import {Button, colors, Icon, Image, ListItem, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';
import {getOrder} from '~/store/slices/orderSlice';

import logoImage from '~/assets/logo2x.png';
import {COLORS} from '~/constants/colors';
import {ORDER_STATUS, SUB_ORDER_TYPE} from '~/constants/status';
import {DateTime} from 'luxon';

const OrderDetailsScreen = ({navigation, route}: any) => {
  const dimension = useWindowDimensions();
  const dispatch = useDispatch();
  const {orderId, departure} = route.params;

  const {user} = useSelector((state: RootState) => state.user);
  const {order} = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [orderId]);

  return (
    <ScrollView>
      <View style={{backgroundColor: '#f4f4f4', paddingBottom: 6}}>
        {/* Green */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: order.status === ORDER_STATUS.SUCCESS ? '#26a999' : COLORS.golden,
            paddingHorizontal: 16,
            paddingVertical: 18,
          }}>
          {
            {
              [ORDER_STATUS.INIT]: (
                <>
                  <View>
                    <Text style={{fontSize: 18, color: colors.grey0, fontWeight: '700'}}>Order is processing</Text>
                    <Text style={{fontSize: 16, color: colors.grey0}}>Thanks for your using ParcelGO!</Text>
                  </View>
                </>
              ),
              [ORDER_STATUS.AWAITING_PICKUP]: (
                <>
                  <View>
                    <Text style={{fontSize: 18, color: colors.grey0, fontWeight: '700'}}>Order is awaiting pickup</Text>
                    <Text style={{fontSize: 16, color: colors.grey0}}>Thanks for your using ParcelGO!</Text>
                  </View>
                </>
              ),
              [ORDER_STATUS.TRANSFERRING_TO_STOCK]: (
                <>
                  <View>
                    <Text style={{fontSize: 18, color: colors.grey0, fontWeight: '700'}}>
                      Order is transferring to stock
                    </Text>
                    <Text style={{fontSize: 16, color: colors.grey0}}>Thanks for your using ParcelGO!</Text>
                  </View>
                </>
              ),
              [ORDER_STATUS.IN_STOCK]: (
                <>
                  <View>
                    <Text style={{fontSize: 18, color: colors.grey0, fontWeight: '700'}}>Order is in stock</Text>
                    <Text style={{fontSize: 16, color: colors.grey0}}>Thanks for your using ParcelGO!</Text>
                  </View>
                </>
              ),
              [ORDER_STATUS.TRANSFERRING]: (
                <>
                  <View>
                    <Text style={{fontSize: 18, color: colors.grey0, fontWeight: '700'}}>Order is delivering</Text>
                    <Text style={{fontSize: 16, color: colors.grey0}}>Thanks for your using ParcelGO!</Text>
                  </View>
                </>
              ),
              [ORDER_STATUS.SUCCESS]: (
                <>
                  <View>
                    <Text style={{fontSize: 18, color: colors.white, fontWeight: '700'}}>Order is completed</Text>
                    <Text style={{fontSize: 16, color: colors.white}}>Thanks for your using ParcelGO!</Text>
                  </View>
                  <Icon name="check-decagram" type="material-community" color={colors.white} />
                </>
              ),
              [ORDER_STATUS.FAIL]: <></>,
              [ORDER_STATUS.CANCELED]: <></>,
            }[order.status as ORDER_STATUS]
          }
        </View>

        {/* Shipping Information */}
        <View style={{backgroundColor: colors.white, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="truck-delivery" type="material-community" size={20} color={colors.grey1} />
              <Text style={{fontSize: 17, fontWeight: '700', color: colors.grey0, marginLeft: 10}}>
                Shipping Information
              </Text>
            </View>
            <Button
              title="VIEW"
              TouchableComponent={TouchableWithoutFeedback}
              containerStyle={{backgroundColor: 'transparent'}}
              buttonStyle={{backgroundColor: 'transparent'}}
              titleStyle={{color: '#1cbc9f', fontSize: 15}}
              onPress={() =>
                navigation.navigate('Status', {
                  orderId: order.id,
                  departure: 'Detail',
                })
              }
            />
          </View>
          {order.drivers && (
            <View style={{marginLeft: 32}}>
              <Text style={{fontSize: 15, color: colors.grey3}}>Motorbike</Text>
              <Text style={{fontSize: 15, color: colors.grey3}}>{JSON.stringify(order.drivers)} - GAXGPQ8V</Text>
            </View>
          )}

          <View style={{marginTop: 2, marginLeft: 3}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="dot-single" type="entypo" size={28} color="#1cbc9f" />
              <Text style={{fontSize: 15, color: '#1cbc9f'}}>
                {
                  {
                    [ORDER_STATUS.INIT]: 'Order is processing',
                    [ORDER_STATUS.AWAITING_PICKUP]: 'Order is awaiting pickup',
                    [ORDER_STATUS.TRANSFERRING_TO_STOCK]: 'Order is transferring to stock',
                    [ORDER_STATUS.IN_STOCK]: 'Order is in stock',
                    [ORDER_STATUS.TRANSFERRING]: 'Order is delivering',
                    [ORDER_STATUS.SUCCESS]: 'Order is delivered',
                    [ORDER_STATUS.FAIL]: <></>,
                    [ORDER_STATUS.CANCELED]: <></>,
                  }[order.status as ORDER_STATUS]
                }
              </Text>
            </View>
            <Text style={{color: colors.grey3, marginLeft: 28, marginTop: 2}}>
              Priority: <Text style={{color: colors.black}}>{order.isExpress ? 'Express' : 'Standard'}</Text>
            </Text>
            {order.fee && (
              <Text style={{color: colors.grey3, marginLeft: 28, marginTop: 2}}>
                Value: <Text style={{color: colors.black}}>{`${order.fee.toLocaleString('en-US')}đ`}</Text>
              </Text>
            )}
            <Text style={{color: colors.grey3, marginLeft: 28, marginTop: 2}}>
              Created time: {order.createdAt && DateTime.fromISO(order.createdAt).toFormat('dd-MM-yyyy HH:mm')}
            </Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 16,
            paddingTop: 4,
            paddingBottom: 12,
            borderTopWidth: 1,
            borderTopColor: colors.grey5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="location-outline" type="ionicon" size={20} color={colors.grey1} />
              <Text style={{fontSize: 17, fontWeight: '700', color: colors.grey0, marginLeft: 10}}>
                Delivery Address
              </Text>
            </View>
            <Button
              title="COPY"
              TouchableComponent={TouchableWithoutFeedback}
              containerStyle={{backgroundColor: 'transparent'}}
              buttonStyle={{backgroundColor: 'transparent'}}
              titleStyle={{color: 'transparent', fontSize: 15}}
              onPress={() => console.log('View Status')}
            />
          </View>
          <View style={{marginLeft: 32}}>
            {order.recipient && <Text style={{fontSize: 15, color: '#1cbc9f'}}>{order.recipient.address}</Text>}
            {order.recipient && (
              <Text style={{fontSize: 15, color: colors.grey3}}>Recipient: {order.recipient.name}</Text>
            )}
            {order.recipient && <Text style={{fontSize: 15, color: colors.grey3}}>Phone: {order.recipient.phone}</Text>}
            {order.recipient && <Text style={{fontSize: 15, color: colors.grey3}}>Email: {order.recipient.email}</Text>}
          </View>
        </View>

        {/* Order */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 16,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.white,
            marginTop: 10,
          }}>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingTop: 8, paddingBottom: 10}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                marginBottom: 4,
                color: colors.white,
                backgroundColor: '#ed4d2d',
                paddingVertical: 2,
                paddingHorizontal: 6,
                borderRadius: 4,
              }}>
              Order
            </Text>
            <Text style={{marginLeft: 6, fontWeight: '700'}}>
              {!!order.id && `${order.id.slice(0, 9)}...${order.id.slice(order.id.length - 6, order.id.length)}`}
            </Text>
          </View>
          {!!order.id && (
            <Button
              title="Copy"
              TouchableComponent={TouchableWithoutFeedback}
              containerStyle={{borderRadius: 2, backgroundColor: 'transparent'}}
              buttonStyle={{backgroundColor: 'transparent'}}
              titleStyle={{color: '#ed4d2d', marginVertical: 2, fontSize: 14}}
              onPress={() => Clipboard.setString(order.id as string)}
            />
          )}
        </View>

        {/* Sub-orders */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.white,
            paddingBottom: 10,
          }}>
          {order.subOrders &&
            order.subOrders.map(subOrder => (
              <ListItem key={subOrder.id} style={{width: dimension.width - 32}}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: COLORS.golden,
                    borderWidth: 2,
                    borderRadius: 8,
                    height: 60,
                    width: 60,
                  }}>
                  {
                    {
                      [SUB_ORDER_TYPE.CLOTHES]: (
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                          <Icon type="ionicon" name="ios-shirt" color={'blue'} size={36}></Icon>
                        </View>
                      ),
                      [SUB_ORDER_TYPE.ELECTRIC]: (
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                          <Icon type="ionicon" name="game-controller" color={'green'} size={36}></Icon>
                        </View>
                      ),
                      [SUB_ORDER_TYPE.FOOD]: (
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                          <Icon type="ionicon" name="ios-fast-food" color={'orange'} size={36}></Icon>
                        </View>
                      ),
                      [SUB_ORDER_TYPE.FRAGILE]: (
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                          <Icon type="material-community" name="glass-fragile" color={'purple'} size={36}></Icon>
                        </View>
                      ),
                      [SUB_ORDER_TYPE.OTHERS]: (
                        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                          <Icon type="foundation" name="social-dropbox" color={'red'} size={36}></Icon>
                        </View>
                      ),
                    }[order.packageType as SUB_ORDER_TYPE]
                  }
                  {/* <Image source={logoImage} containerStyle={styles.logoImage} /> */}
                </View>
                <View style={{flex: 1}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
                      color: COLORS.black,
                    }}>
                    Order type:{' '}
                    {
                      {
                        [SUB_ORDER_TYPE.CLOTHES]: <Text style={{fontWeight: '700'}}>Clothes</Text>,
                        [SUB_ORDER_TYPE.ELECTRIC]: <Text style={{fontWeight: '700'}}>Electric</Text>,
                        [SUB_ORDER_TYPE.FOOD]: <Text style={{fontWeight: '700'}}>Food</Text>,
                        [SUB_ORDER_TYPE.FRAGILE]: <Text style={{fontWeight: '700'}}>Fragile</Text>,
                        [SUB_ORDER_TYPE.OTHERS]: <Text style={{fontWeight: '700'}}>Others</Text>,
                      }[order.packageType as SUB_ORDER_TYPE]
                    }
                  </Text>
                  <Text style={{color: colors.grey2, lineHeight: 22}}>
                    Weight: {subOrder.weight} kg | Dimension: {subOrder.dimension} cm
                  </Text>
                  <Text style={{color: colors.grey2, lineHeight: 22}}>Description: {subOrder.name}</Text>
                </View>
              </ListItem>
            ))}
        </View>

        {/* Images */}
        {order.pickupImageUrl && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              backgroundColor: colors.white,
              paddingBottom: 20,
            }}>
            <View style={{width: '50%', paddingRight: 10}}>
              <Text style={{fontWeight: '700', marginBottom: 10}}>Pickup Image</Text>
              <View style={{borderWidth: 1, borderColor: COLORS.golden, padding: 8, borderRadius: 10}}>
                <Image source={{uri: order.pickupImageUrl || ''}} containerStyle={styles.logoImage} />
              </View>
            </View>
            {order.deliverImageUrl && (
              <View style={{width: '50%', paddingLeft: 10}}>
                <Text style={{fontWeight: '700', marginBottom: 10}}>Delivery Image</Text>
                <View style={{borderWidth: 1, borderColor: COLORS.golden, padding: 8, borderRadius: 10}}>
                  <Image source={{uri: order.deliverImageUrl || ''}} containerStyle={styles.logoImage} />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
  },
});

export default OrderDetailsScreen;
