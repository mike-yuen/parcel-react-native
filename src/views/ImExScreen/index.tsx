import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Image, ListItem, Text, colors} from 'react-native-elements';
import {useSelector} from 'react-redux';

import notFoundImage from '~/assets/not-found.png';
import MyOrderListItem from '~/components/MyOrderListItem';
import {COLORS} from '~/constants/colors';
import {parcelApi} from '~/services/api';
import {RootState} from '~/store';

const ImExScreen = ({navigation}: any) => {
  const {orderList} = useSelector((state: RootState) => state.order);
  const {user} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user && user.warehouse) {
      console.log('------', user, user.warehouse);
      parcelApi.getOrdersByWarehouse(user.warehouse.id);
    }
  }, [user]);

  return (
    <ScrollView>
      {/* Logo */}
      <View style={{backgroundColor: '#f4f4f4', paddingBottom: 6}}>
        <View style={{paddingHorizontal: 16, paddingTop: 24}}>
          <Text style={{fontSize: 14, color: COLORS.gray}}>Import/Export parcel</Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8}}>
            <Text style={{fontSize: 22, fontWeight: '700', color: COLORS.black0}}>Parcel</Text>
            <Text style={{fontSize: 22, fontWeight: '700', color: COLORS.golden}}>Go</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View style={{paddingHorizontal: 16}}>
          <View style={{paddingVertical: 24}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Button
                title={'In stock'}
                containerStyle={{borderRadius: 30, marginRight: 10}}
                buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
                titleStyle={{color: '#24252a', fontSize: 14, fontWeight: '600', paddingHorizontal: 10}}
              />
              <Button
                title={'Ready to import'}
                containerStyle={{borderRadius: 30, marginRight: 10}}
                buttonStyle={{backgroundColor: '#f5f5f5', borderRadius: 30, paddingVertical: 4}}
                titleStyle={{color: '#24252a', fontSize: 14, fontWeight: '600', paddingHorizontal: 10}}
              />
            </View>
          </View>

          {orderList.data && orderList.data.length ? (
            orderList.data.map(order => (
              <ListItem
                key={order.id}
                containerStyle={{padding: 0}}
                onPress={() =>
                  navigation.navigate('Detail', {
                    orderId: order.id,
                    departure: 'ImEx',
                  })
                }>
                <MyOrderListItem data={order} />
              </ListItem>
            ))
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 100, paddingBottom: 210}}>
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
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ImExScreen;
