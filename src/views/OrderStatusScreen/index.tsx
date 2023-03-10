import React from 'react';
import {ScrollView, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View} from 'react-native';
import {Button, colors, Icon, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';

import {COLORS} from '~/constants/colors';

const workflow = [
  {
    date: '29 Dec',
    time: '09:37',
    title: 'Delivered',
    desc: 'Order is delivered',
    icon: 'book-check-outline',
    active: true,
  },
  {date: '29 Dec', time: '08:44', title: 'In transit', desc: 'Order is on the way', icon: 'truck-fast-outline'},
  {
    date: '26 Dec',
    time: '15:21',
    title: 'Preparing to ship',
    desc: 'Order is being preparing',
    icon: 'store-clock-outline',
  },
  {date: '26 Dec', time: '14:30', title: 'Order placed', desc: 'Order is placed', icon: 'file-image-plus-outline'},
];

const OrderStatusScreen = ({navigation, route}: any) => {
  const dimension = useWindowDimensions();
  const dispatch = useDispatch();
  const {orderId, departure} = route.params;

  const {user} = useSelector((state: RootState) => state.user);
  const {order} = useSelector((state: RootState) => state.order);

  return (
    <ScrollView>
      <View style={{backgroundColor: '#f4f4f4', paddingBottom: 6, paddingHorizontal: 16}}>
        {/* Status */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.white,
            marginTop: 10,
            paddingHorizontal: 16,
            paddingVertical: 18,
          }}>
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
            <Text style={{fontSize: 12, color: colors.grey3}}>2023</Text>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 24,
                fontStyle: 'italic',
                lineHeight: 26,
                color: COLORS.darkGolden,
              }}>
              25
            </Text>
            <Text style={{fontSize: 12, lineHeight: 12, textTransform: 'uppercase', color: colors.grey3}}>Feb</Text>
          </View>
          <View
            style={{
              marginLeft: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 16, fontWeight: '700', marginRight: 4}}>Delivered on</Text>
              <Text style={{fontSize: 16, fontWeight: '700', color: '#ee4d2d'}}>Thu, 29 Dec 2022</Text>
            </View>
            <Text style={{fontSize: 14, color: colors.grey2, marginTop: 2}}>Shipped by Chien Do</Text>
          </View>
        </View>

        {/* Status List */}
        <View
          style={{
            backgroundColor: colors.white,
            marginTop: 10,
          }}>
          {/* Heading */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.grey5,
            }}>
            <Text style={{fontSize: 14, color: colors.grey3}}>Tracking Number</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '700'}}>
                {order.id && `${order.id.slice(0, 9)}...${order.id.slice(order.id.length - 6, order.id.length)}`}
              </Text>
              <Button
                title="COPY"
                TouchableComponent={TouchableWithoutFeedback}
                containerStyle={{backgroundColor: 'transparent'}}
                buttonStyle={{backgroundColor: 'transparent'}}
                titleStyle={{color: '#1cbc9f', fontSize: 15}}
                onPress={() => console.log('View Status')}
              />
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}>
            <View style={{}}>
              {workflow.map((stage, index) => (
                <View key={index} style={styles.stepContainer}>
                  <View>
                    <Text style={{color: stage.active ? colors.grey2 : colors.grey4, fontSize: 14}}>{stage.date}</Text>
                    <Text style={{color: stage.active ? colors.grey2 : colors.grey4, fontSize: 14}}>{stage.time}</Text>
                  </View>
                  <View style={styles.stepIndicator}>
                    {workflow.length - 1 !== index && <View style={styles.stepLine}></View>}
                    <Icon
                      name={stage.icon}
                      type="material-community"
                      color={stage.active ? colors.white : colors.grey4}
                      size={18}
                      tvParallaxProperties={undefined}
                      style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: 1 / 1,
                        borderRadius: 50 / 2,
                        padding: 6,
                        backgroundColor: stage.active ? '#1cbc9f' : colors.white,
                        borderWidth: 1,
                        borderColor: stage.active ? '#1cbc9f' : colors.grey4,
                        zIndex: 2,
                      }}></Icon>
                    {/* </Text> */}
                  </View>
                  <View style={styles.step}>
                    <Text style={{color: stage.active ? '#1cbc9f' : colors.grey4, fontSize: 16, fontWeight: '700'}}>
                      {stage.title}
                    </Text>
                    <Text style={{color: stage.active ? '#1cbc9f' : colors.grey4}}>{stage.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  progressPath: {},
  stepContainer: {
    flexDirection: 'row',
    minHeight: 64,
  },
  stepIndicator: {
    position: 'relative',
    width: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    aspectRatio: 1 / 1,
    // paddingTop: 12.5,
  },
  stepLine: {
    position: 'absolute',
    top: 34,
    left: 24.5,
    width: 1,
    height: '100%',
    backgroundColor: '#bbb',
    zIndex: 1,
  },
  step: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
});

export default OrderStatusScreen;
