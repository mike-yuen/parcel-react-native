import React, {Fragment, useEffect} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {Button, colors, Image, ListItem, Text} from 'react-native-elements';
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
  const {order, orderList} = useSelector((state: RootState) => state.order);
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    if (user.roles.some(role => role.role === ROLE.ADMIN)) {
      dispatch(getOrders({statusIds: [ORDER_STATUS.INIT]}));
    }
    dispatch(getDrivers());
  }, [user]);

  useEffect(() => {
    if (order.id) {
      dispatch(getOrders({}));
    }
  }, [order]);

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
          autoplay
          enableMomentum={false}
          lockScrollWhileSnapping
          onSnapToItem={(index: number) => setActiveIndex(index)}
        />
        <View style={{paddingHorizontal: 16}}>
          <Text style={{fontSize: 24, fontWeight: '700', color: '#24252a', paddingTop: 18}}>Parcels</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 14}}>
            <View style={{flexDirection: 'row'}}>
              <Button
                title="All"
                containerStyle={{width: 60, borderRadius: 30}}
                buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
                titleStyle={{color: '#24252a', fontSize: 14, fontWeight: '600'}}
              />
              <Button
                icon={{
                  type: 'antdesign',
                  name: 'star',
                  size: 18,
                  color: '#b6bdc7',
                  style: {marginTop: 1, marginBottom: 2},
                }}
                containerStyle={{width: 60, borderRadius: 30, marginLeft: 10}}
                buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button
                title="Hot"
                icon={{
                  type: 'antdesign',
                  name: 'arrowdown',
                  size: 18,
                  color: '#24252a',
                }}
                iconRight
                containerStyle={{width: 70, borderRadius: 30, marginLeft: 10}}
                buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
                titleStyle={{color: '#24252a', fontSize: 14, fontWeight: '600', marginLeft: 4}}
              />
            </View>
          </View>

          {/* <Text>{JSON.stringify(orderList)}</Text> */}

          {orderList.data && orderList.data.length ? (
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
              <Button
                title="Create new request"
                containerStyle={{marginTop: 14, marginBottom: 20}}
                buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
                titleStyle={{color: COLORS.black1, fontSize: 14, marginVertical: 0, marginHorizontal: 20}}
                onPress={() => navigation.navigate('Order')}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
