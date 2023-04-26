import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, ScrollView, TouchableOpacity, View} from 'react-native';
import {Button, colors, Icon, Image, ListItem, Text} from 'react-native-elements';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';

import MyHeader from '~/components/MyHeader';

import notFoundImage from '~/assets/not-found.png';
import guide1Image from '~/assets/guide-1.png';
import guide2Image from '~/assets/guide-2.png';
import {COLORS} from '~/constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MyOrderListItem from '~/components/MyOrderListItem';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from '~/store/slices/orderSlice';
import {RootState} from '~/store';
import {getDrivers} from '~/store/slices/driverSlice';
import {ROLE} from '~/constants/role';
import {ORDER_STATUS} from '~/constants/status';
import {launchCamera} from 'react-native-image-picker';

const carouselItems = [
  {
    title: "Beginner's Guide",
    text: 'Learn how to get started',
    image: guide1Image,
  },
  {
    title: 'How to track your parcel',
    text: 'Try our new webapp',
    image: guide2Image,
  },
];

const statusItems = [
  {icon: {name: 'list', type: 'entypo'}, key: 0, text: 'All'},
  {icon: {name: 'cogs', type: 'material-community'}, key: ORDER_STATUS.INIT, text: 'Processing'},
  {icon: {name: 'package', type: 'material-community'}, key: ORDER_STATUS.AWAITING_PICKUP, text: 'Awaiting pickup'},
  {icon: {name: 'truck-fast', type: 'material-community'}, key: ORDER_STATUS.TRANSFERRING, text: 'Delivering'},
  {icon: {name: 'truck-check', type: 'material-community'}, key: ORDER_STATUS.SUCCESS, text: 'Delivered'},
];

const _renderItem = ({item, index}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey5,
      }}>
      <View>
        <Text style={{fontSize: 15, color: '#24252a', marginBottom: 4}}>{item.title}</Text>
        <Text style={{fontSize: 13, color: '#8c8f96'}}>{item.text}</Text>
      </View>
      <Image source={item.image} containerStyle={{width: 40, height: 40, marginRight: 20}} />
    </View>
  );
};

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.user);
  const {gotOrders, order, orderList} = useSelector((state: RootState) => state.order);
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);

  const [isLoading, setLoading] = useState(true);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [tempStatus, setTempStatus] = useState<null | ORDER_STATUS | 0>(null); // 0: All
  const [currentStatus, setCurrentStatus] = useState<null | ORDER_STATUS | 0>(null); // 0: All

  const onOpenFilter = () => {
    setFilterVisible(true);
  };

  const onCloseFilter = () => {
    setTempStatus(currentStatus);
    setFilterVisible(false);
  };

  const onApplyFilter = () => {
    setFilterVisible(false);
    setCurrentStatus(tempStatus);
  };

  const takeAPhoto = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    console.log('-----------', result);
  };

  useEffect(() => {
    if (!!user) {
      if (user.roles.some(role => role.role === ROLE.ADMIN)) {
        setTempStatus(ORDER_STATUS.INIT);
        setCurrentStatus(ORDER_STATUS.INIT);
      } else if (user.roles.some(role => role.role === ROLE.DRIVER)) {
        setTempStatus(ORDER_STATUS.TRANSFERRING);
        setCurrentStatus(ORDER_STATUS.TRANSFERRING);
      } else if (user.roles.some(role => role.role === ROLE.USER)) {
        setTempStatus(0);
        setCurrentStatus(0);
      }
      dispatch(getDrivers());
    }
  }, [user]);

  useEffect(() => {
    if (order.id) {
      if (currentStatus != null) {
        setLoading(true);
        currentStatus !== 0 ? dispatch(getOrders({statusIds: [currentStatus]})) : dispatch(getOrders({}));
      }
    }
  }, [order]);

  useEffect(() => {
    if (currentStatus != null) {
      setLoading(true);
      currentStatus !== 0 ? dispatch(getOrders({statusIds: [currentStatus]})) : dispatch(getOrders({}));
    }
  }, [currentStatus]);

  useEffect(() => {
    if (gotOrders) setLoading(false);
  }, [gotOrders]);

  return (
    <>
      <View style={{backgroundColor: '#f4f4f4', paddingTop: insets.top, paddingBottom: 6}}>
        <MyHeader navigation={navigation} />
      </View>
      <ScrollView style={{flex: 1, backgroundColor: colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
        <Carousel
          layout={'default'}
          data={carouselItems}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          renderItem={_renderItem}
          loop
          loopClonesPerSide={1}
          enableMomentum={false}
          lockScrollWhileSnapping
          onSnapToItem={(index: number) => setActiveIndex(index)}
        />
        <View style={{paddingHorizontal: 16}}>
          <Text style={{fontSize: 24, fontWeight: '700', color: '#24252a', paddingTop: 18}}>Parcels</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 14}}>
            <View style={{flexDirection: 'row'}}>
              {currentStatus != null && (
                <Button
                  title={statusItems.find(item => item.key === currentStatus)?.text}
                  containerStyle={{borderRadius: 30, marginRight: 10}}
                  buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
                  titleStyle={{color: '#24252a', fontSize: 14, fontWeight: '600', paddingHorizontal: 10}}
                />
              )}
              <Button
                icon={{
                  type: 'antdesign',
                  name: 'filter',
                  size: 18,
                  color: '#24252a',
                  style: {marginTop: 1, marginBottom: 2},
                }}
                containerStyle={{width: 60, borderRadius: 30}}
                buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
                onPress={onOpenFilter}
              />
            </View>
            {user.roles.some(role => role.role === ROLE.ADMIN) && (
              <View style={{flexDirection: 'row'}}>
                <Button
                  title="Bulk assign"
                  containerStyle={{borderRadius: 30, marginLeft: 10}}
                  buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
                  titleStyle={{color: '#24252a', fontSize: 14, fontWeight: '600', marginLeft: 4}}
                />
              </View>
            )}
          </View>

          <Modal
            isVisible={isFilterVisible}
            backdropOpacity={0.5}
            onBackdropPress={onCloseFilter}
            style={{margin: 0, justifyContent: 'flex-end'}}>
            <View style={{flex: 0.62, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
              <Text style={{textAlign: 'center', marginTop: 8, paddingVertical: 10, fontSize: 17, fontWeight: '700'}}>
                Parcel filter
              </Text>

              <Text style={{textTransform: 'uppercase', paddingHorizontal: 24, color: colors.grey3, marginBottom: 12}}>
                Status
              </Text>
              {statusItems.map(statusItem => (
                <ListItem
                  key={statusItem.text}
                  containerStyle={{paddingHorizontal: 24, paddingVertical: 8}}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => setTempStatus(statusItem.key)}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      type={statusItem.icon.type}
                      name={statusItem.icon.name}
                      size={20}
                      color={COLORS.golden}
                      style={{borderWidth: 2, borderColor: colors.grey5, borderRadius: 6, padding: 4}}></Icon>
                    <Text style={{marginLeft: 12, fontSize: 16}}>{statusItem.text}</Text>
                  </View>

                  {statusItem.key === tempStatus && (
                    <Icon type={'entypo'} name={'check'} size={20} color={'green'}></Icon>
                  )}
                </ListItem>
              ))}

              <View style={{paddingHorizontal: 24, marginTop: 10}}>
                <Button
                  title="Apply"
                  buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
                  titleStyle={{color: COLORS.black1, marginVertical: 2}}
                  onPress={onApplyFilter}
                />
              </View>
            </View>
          </Modal>

          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : orderList.data && orderList.data.length ? (
            orderList.data.map(order => (
              <ListItem
                key={order.id}
                containerStyle={{padding: 0}}
                onPress={() =>
                  navigation.navigate('Detail', {
                    orderId: order.id,
                    departure: 'Home',
                  })
                }>
                <MyOrderListItem data={order} />
              </ListItem>
            ))
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={notFoundImage}
                containerStyle={{
                  width: 92,
                  height: 84,
                  alignSelf: 'center',
                  marginTop: 30,
                }}
              />
              <Text style={{fontSize: 12, color: '#8c8f96', marginTop: 6}}>No parcels found</Text>
              {user.roles.length === 1 && user.roles[0].role === ROLE.USER && (
                <Button
                  title="Create new request"
                  containerStyle={{marginTop: 14, marginBottom: 20}}
                  buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
                  titleStyle={{color: COLORS.black1, fontSize: 14, marginVertical: 0, marginHorizontal: 20}}
                  // onPress={() => navigation.navigate('Order')}
                  onPress={takeAPhoto}
                />
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
