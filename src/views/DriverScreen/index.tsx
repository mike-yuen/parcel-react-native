import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, CheckBox, Image, Text, colors} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS} from '~/constants/colors';
import {RootState} from '~/store';

import driverImage from '~/assets/driver-placeholder.png';
import {VEHICLE_TYPES} from '~/constants/driver';

const DriverScreen = ({route}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {drivers} = useSelector((state: RootState) => state.driver);
  const {orderId} = route.params;

  const getVehicleType = (type: VEHICLE_TYPES) => {
    switch (type) {
      case VEHICLE_TYPES.BIKE:
        return 'Bike';
      case VEHICLE_TYPES.TRUCK:
        return 'Truck';
      case VEHICLE_TYPES.REFRIGERATED:
        return 'Refrigerated';
    }
  };

  const onSubmit = (data: any) => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 30,
        paddingHorizontal: 20,
      }}>
      {drivers.data.length &&
        drivers.data.map(driver => (
          <View
            key={driver.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: colors.grey5,
              paddingBottom: 12,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image source={driverImage} containerStyle={{width: 50, height: 50, borderRadius: 8}}></Image>
              <View style={{marginLeft: 14}}>
                <Text style={{flex: 1, fontWeight: '700', fontSize: 14, textTransform: 'uppercase'}}>
                  {driver.user.displayName}
                </Text>
                <Button
                  title="Assign"
                  buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4, paddingVertical: 3}}
                  titleStyle={{fontSize: 14, color: COLORS.black1}}
                  onPress={onSubmit}
                />
              </View>
            </View>

            <View>
              <Text style={{flex: 1, fontSize: 14, color: colors.grey3}}>Vehicle</Text>
              <Text style={{fontSize: 14, fontWeight: '700', marginBottom: 4}}>{`${getVehicleType(
                driver.vehicle.type,
              )} [${driver.vehicle.number}]`}</Text>
            </View>

            <View>
              <Text style={{flex: 1, fontSize: 14, color: colors.grey3}}>License</Text>
              <Text style={{fontSize: 14, fontWeight: '700', marginBottom: 4}}>{driver.licenses[0].name}</Text>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default DriverScreen;
