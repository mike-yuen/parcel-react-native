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
            backgroundColor: '#26a999',
            paddingHorizontal: 16,
            paddingVertical: 18,
          }}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '700', color: colors.white}}>Order Completed</Text>
            <Text style={{fontSize: 16, color: colors.white}}>Thanks for your using ParcelGO!</Text>
          </View>
          <Icon name="check-decagram" type="material-community" color={colors.white} tvParallaxProperties={undefined} />
        </View>

        {/* Shipping Information */}
        <View style={{backgroundColor: colors.white, paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12}}>
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
              <Icon
                name="truck-delivery"
                type="material-community"
                size={20}
                color={colors.grey1}
                tvParallaxProperties={undefined}
              />
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
          <View style={{marginLeft: 32}}>
            <Text style={{fontSize: 15, color: colors.grey3}}>Motorbike</Text>
            <Text style={{fontSize: 15, color: colors.grey3}}>{JSON.stringify(order.drivers)} - GAXGPQ8V</Text>
          </View>

          <View style={{marginTop: 2, marginLeft: 3}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="dot-single" type="entypo" size={28} color="#1cbc9f" tvParallaxProperties={undefined} />
              <Text style={{fontSize: 15, fontWeight: '700', color: '#1cbc9f'}}>Order is completed</Text>
            </View>
            <Text style={{color: colors.grey3, marginLeft: 28, marginTop: 2}}>15-12-2022 17:10</Text>
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
              <Icon
                name="location-outline"
                type="ionicon"
                size={20}
                color={colors.grey1}
                tvParallaxProperties={undefined}
              />
              <Text style={{fontSize: 17, fontWeight: '700', color: colors.grey0, marginLeft: 10}}>
                Delivery Address
              </Text>
            </View>
            <Button
              title="COPY"
              TouchableComponent={TouchableWithoutFeedback}
              containerStyle={{backgroundColor: 'transparent'}}
              buttonStyle={{backgroundColor: 'transparent'}}
              titleStyle={{color: '#1cbc9f', fontSize: 15}}
              onPress={() => console.log('View Status')}
            />
          </View>
          <View style={{marginLeft: 32}}>
            {order.recipient && <Text style={{fontSize: 15, color: colors.grey3}}>{order.recipient.name}</Text>}
            {order.recipient && <Text style={{fontSize: 15, color: colors.grey3}}>{order.recipient.phone}</Text>}
            {order.recipient && <Text style={{fontSize: 15, color: colors.grey3}}>{order.recipient.address}</Text>}
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
          }}>
          {order.subOrders &&
            order.subOrders.map(subOrder => (
              <ListItem
                key={subOrder.id}
                hasTVPreferredFocus={undefined}
                tvParallaxProperties={undefined}
                style={{width: dimension.width - 32}}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: COLORS.golden,
                    borderWidth: 2,
                    borderRadius: 8,
                    height: 50,
                    width: 50,
                  }}>
                  <Image source={logoImage} containerStyle={styles.logoImage} />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: COLORS.black,
                    }}>
                    {subOrder.name}
                  </Text>
                  <Text style={{color: colors.grey2, lineHeight: 22}}>Weight: {subOrder.weight} kg</Text>
                </View>
              </ListItem>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 35,
    height: 28,
    alignSelf: 'center',
  },
});

export default OrderDetailsScreen;
