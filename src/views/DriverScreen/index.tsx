import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, CheckBox, Icon, Image, Text, colors} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS} from '~/constants/colors';
import {RootState} from '~/store';

import driver1 from '~/assets/driver-1.jpg';
import driver2 from '~/assets/driver-2.jpg';
import driver3 from '~/assets/driver-3.jpg';
import driver4 from '~/assets/driver-4.jpg';
import driver5 from '~/assets/driver-5.jpg';

import {VEHICLE_TYPES} from '~/constants/driver';
import {assignDriverToOrders, exportParcel} from '~/store/slices/orderSlice';
import {ORDER_STATUS} from '~/constants/status';

const driverImages = [driver1, driver2, driver3, driver4, driver5];

const DriverScreen = ({route}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {drivers} = useSelector((state: RootState) => state.driver);
  const {orderId, status} = route.params;

  const getVehicleType = (type: VEHICLE_TYPES) => {
    switch (type) {
      case VEHICLE_TYPES.BIKE:
        return 'motorbike';
      case VEHICLE_TYPES.TRUCK:
        return 'truck';
      case VEHICLE_TYPES.REFRIGERATED:
        return 'truck-snowflake';
    }
  };

  const getVehicleColor = (type: VEHICLE_TYPES) => {
    switch (type) {
      case VEHICLE_TYPES.BIKE:
        return 'lightgreen';
      case VEHICLE_TYPES.TRUCK:
        return 'orange';
      case VEHICLE_TYPES.REFRIGERATED:
        return 'lightblue';
    }
  };

  const onSubmit = (userId: string) => {
    console.log('status: ', status);
    if (status === ORDER_STATUS.IN_STOCK) {
      dispatch(exportParcel({userId, orderId}));
    } else {
      dispatch(assignDriverToOrders({userId, orderId}));
    }
    setTimeout(() => navigation.goBack(), 100);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}>
      <Text style={{fontSize: 16, fontWeight: '700', paddingBottom: 20}}>Drivers of our company</Text>
      {drivers.data.length &&
        drivers.data.map((driver, index) => (
          <View
            key={driver.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: colors.grey5,
              paddingVertical: 12,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image source={driverImages[index % 5]} containerStyle={{width: 50, height: 50, borderRadius: 8}}></Image>
              <View style={{marginLeft: 14}}>
                <Text style={{flex: 1, fontWeight: '700', fontSize: 14, textTransform: 'uppercase'}}>
                  {driver.user.displayName}
                </Text>
                <Button
                  title="Assign"
                  buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4, paddingVertical: 3}}
                  titleStyle={{fontSize: 14, color: COLORS.black1}}
                  onPress={() => onSubmit(driver.user.id)}
                />
              </View>
            </View>

            <View>
              <Text style={{flex: 1, fontSize: 14, color: colors.grey3}}>Vehicle</Text>
              {driver.vehicle && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name={getVehicleType(driver.vehicle.type)}
                    color={getVehicleColor(driver.vehicle.type)}
                    type="material-community"></Icon>
                  <Text style={{fontSize: 14, fontWeight: '700', marginLeft: 4}}>[{driver.vehicle.number}]</Text>
                </View>
              )}
            </View>

            <View>
              <Text style={{flex: 1, fontSize: 14, color: colors.grey3}}>License</Text>
              <Text style={{fontSize: 14, fontWeight: '700'}}>{driver.licenses[0].name}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default DriverScreen;
