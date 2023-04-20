import React, {useEffect} from 'react';
import {TouchableWithoutFeedback, useWindowDimensions, View} from 'react-native';
import {Button, colors, Icon, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {DateTime} from 'luxon';

import {COLORS} from '~/constants/colors';
import {ORDER_STATUS, SUB_ORDER_TYPE} from '~/constants/status';
import {RootState} from '~/store';
import {getOrders, processOrder} from '~/store/slices/orderSlice';
import {ROLE} from '~/constants/role';

const MyOrderListItem = (props: any) => {
  const dimension = useWindowDimensions();
  const {data} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation() as any;
  const {processedOrder} = useSelector((state: RootState) => state.order);
  const {user} = useSelector((state: RootState) => state.user);

  const onAcceptOrder = () => {
    dispatch(processOrder({orderId: data.id, nextStatusId: ORDER_STATUS.TRANSFERRING}));
  };

  const onDeliverOrder = () => {
    dispatch(processOrder({orderId: data.id, nextStatusId: ORDER_STATUS.PENDING}));
  };

  const onDeliveredOrder = () => {
    dispatch(processOrder({orderId: data.id, nextStatusId: ORDER_STATUS.SUCCESS}));
  };

  const onGoToDriverScreen = (orderId: string) => {
    navigation.navigate('Driver', {orderId: orderId});
  };

  return (
    <View style={{flex: 1, borderTopWidth: 4, borderTopColor: colors.grey4}}>
      <View
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: dimension.width - 32,
          backgroundColor: colors.white,
        }}>
        {/* Order */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: dimension.width - 32,
            alignItems: 'center',
            justifyContent: 'space-between',
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
              {data.id.slice(0, 9)}...{data.id.slice(data.id.length - 6, data.id.length)}
            </Text>
          </View>
          <Button
            title="Copy"
            TouchableComponent={TouchableWithoutFeedback}
            containerStyle={{borderRadius: 2, backgroundColor: 'transparent'}}
            buttonStyle={{backgroundColor: 'transparent'}}
            titleStyle={{color: '#ed4d2d', marginVertical: 2, fontSize: 14}}
            onPress={() => Clipboard.setString(data.id)}
          />
        </View>
        {/* Main */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: dimension.width - 32,
            backgroundColor: colors.white,
            borderBottomWidth: 1,
            borderBottomColor: colors.grey5,
            paddingBottom: 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <View
              style={{
                alignItems: 'center',
                borderWidth: 2,
                borderColor: colors.grey5,
                paddingVertical: 1,
                width: 60,
                height: 64,
                borderRadius: 6,
              }}>
              <Text style={{fontSize: 12, color: colors.grey3}}>{DateTime.fromISO(data.createdAt).year}</Text>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 24,
                  fontStyle: 'italic',
                  lineHeight: 26,
                  color: COLORS.darkGolden,
                }}>
                {DateTime.fromISO(data.createdAt).day}
              </Text>
              <Text style={{fontSize: 12, lineHeight: 12, textTransform: 'uppercase', color: colors.grey3}}>
                {DateTime.fromISO(data.createdAt).monthShort}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 16,
                paddingRight: 16,
                overflow: 'hidden',
              }}>
              <Text style={{textAlign: 'justify', color: COLORS.gray, marginBottom: 2, fontSize: 12}}>Recipient:</Text>
              {data && data.recipient && (
                <>
                  <Text style={{fontWeight: '700', fontSize: 15}}>{data.recipient.name}</Text>
                  <Text style={{fontSize: 14, color: colors.grey3}}>{data.recipient.phone}</Text>
                </>
              )}
            </View>
          </View>
          <View>
            <Text style={{textAlign: 'right', color: COLORS.gray, marginBottom: 2, fontSize: 12}}>Total</Text>
            <Text style={{textAlign: 'right', fontWeight: '700'}}>
              {data.fee && `${data.fee.toLocaleString('en-US')}đ`}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'baseline', marginTop: 2}}>
              {
                {
                  [SUB_ORDER_TYPE.CLOTHES]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="ionicon" name="ios-shirt" color={'blue'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Clothes</Text>
                    </View>
                  ),
                  [SUB_ORDER_TYPE.ELECTRIC]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="ionicon" name="game-controller" color={'green'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Electric</Text>
                    </View>
                  ),
                  [SUB_ORDER_TYPE.FOOD]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="ionicon" name="ios-fast-food" color={'orange'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Food</Text>
                    </View>
                  ),
                  [SUB_ORDER_TYPE.FRAGILE]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="material-community" name="glass-fragile" color={'purple'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Fragile</Text>
                    </View>
                  ),
                  [SUB_ORDER_TYPE.OTHERS]: (
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Icon type="foundation" name="social-dropbox" color={'red'} size={16}></Icon>
                      <Text style={{fontSize: 14, color: colors.grey3}}>Others</Text>
                    </View>
                  ),
                }[data.packageType as SUB_ORDER_TYPE]
              }
            </View>
          </View>
        </View>
        {/* Sub-order */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: dimension.width - 32,
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: colors.grey5,
            paddingVertical: 6,
          }}>
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingTop: 8, paddingBottom: 10}}>
            {/* truck-fast */}
            {/* truck-check */}
            {
              {
                [ORDER_STATUS.INIT]: (
                  <>
                    <Icon name="truck-delivery" type="material-community" size={18} color={colors.grey4} />
                    <Text style={{marginLeft: 8, fontSize: 14, color: colors.grey4}}>Order is placed</Text>
                  </>
                ),
                [ORDER_STATUS.TRANSFERRING]: (
                  <>
                    <Icon name="truck-delivery" type="material-community" size={18} color={COLORS.darkGolden} />
                    <Text style={{marginLeft: 8, fontSize: 14, color: COLORS.darkGolden}}>Order is preparing</Text>
                  </>
                ),
                [ORDER_STATUS.PENDING]: (
                  <>
                    <Icon name="truck-fast" type="material-community" size={18} color={COLORS.darkGolden} />
                    <Text style={{marginLeft: 8, fontSize: 14, color: COLORS.darkGolden}}>Order is delivering</Text>
                  </>
                ),
                [ORDER_STATUS.SUCCESS]: (
                  <>
                    <Icon name="truck-check" type="material-community" size={18} color="#1cbc9f" />
                    <Text style={{marginLeft: 8, fontSize: 14, color: '#1cbc9f'}}>Order is delivered</Text>
                  </>
                ),
                [ORDER_STATUS.FAIL]: <></>,
                [ORDER_STATUS.CANCELED]: <></>,
              }[data.status as ORDER_STATUS]
            }
          </View>

          {/* Actions */}
          {user.roles && !!user.roles.length ? (
            {
              [ORDER_STATUS.INIT]: user.roles.some(role => role.role === ROLE.ADMIN) ? (
                <Button
                  title={'Assign driver'}
                  buttonStyle={{
                    backgroundColor: COLORS.golden,
                    borderRadius: 4,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                  }}
                  titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                  onPress={() => onGoToDriverScreen(data.id)}
                />
              ) : (
                <></>
              ),
              [ORDER_STATUS.TRANSFERRING]: user.roles.some(role => role.role === ROLE.DRIVER) ? (
                <Button
                  title={'Deliver'}
                  buttonStyle={{
                    backgroundColor: COLORS.golden,
                    borderRadius: 4,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                  }}
                  titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                  onPress={onDeliverOrder}
                />
              ) : (
                <></>
              ),
              [ORDER_STATUS.PENDING]: user.roles.some(role => role.role === ROLE.DRIVER) ? (
                <Button
                  title={'Delivered?'}
                  buttonStyle={{
                    backgroundColor: COLORS.golden,
                    borderRadius: 4,
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                  }}
                  titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
                  onPress={onDeliveredOrder}
                />
              ) : (
                <></>
              ),
              [ORDER_STATUS.SUCCESS]: <></>,
              [ORDER_STATUS.FAIL]: <></>,
              [ORDER_STATUS.CANCELED]: <></>,
            }[data.status as ORDER_STATUS]
          ) : (
            <Button
              title={'Need our Support'}
              buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4, paddingVertical: 4, paddingHorizontal: 12}}
              titleStyle={{fontSize: 14, color: colors.black, marginVertical: 2}}
              onPress={() => console.log('Support')}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default MyOrderListItem;
