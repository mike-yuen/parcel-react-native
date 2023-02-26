import {Link} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, colors, Divider, Icon, ListItem, Switch, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '~/constants/colors';
import {RootState} from '~/store';
import {addOrder} from '~/store/slices/orderSlice';

const OrderDetailsScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const {orderId, departure} = route.params;
  const {user} = useSelector((state: RootState) => state.user);

  return (
    <ScrollView>
      <View style={{backgroundColor: '#f4f4f4', paddingBottom: 6}}>
        <View style={{backgroundColor: colors.white, paddingHorizontal: 16, paddingVertical: 10, marginTop: 4}}>
          <Text style={{fontSize: 16, fontWeight: '700', color: colors.black}}>Shipping Information</Text>
          <Text>Nhanh</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;
