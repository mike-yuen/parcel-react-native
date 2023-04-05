import React from 'react';
import {ScrollView, View} from 'react-native';
import {Image, Text, colors} from 'react-native-elements';
import {COLORS} from '~/constants/colors';

import warehouseImage from '~/assets/warehouse.png';

const WarehouseScreen = ({navigation}: any) => {
  return (
    <ScrollView>
      {/* Logo */}
      <View style={{backgroundColor: '#f4f4f4', paddingBottom: 6}}>
        <View style={{paddingHorizontal: 16, paddingTop: 24}}>
          <Text style={{fontSize: 14, color: COLORS.gray}}>Warehouse</Text>
          <View style={{flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8}}>
            <Text style={{fontSize: 22, fontWeight: '700', color: COLORS.black0}}>Parcel</Text>
            <Text style={{fontSize: 22, fontWeight: '700', color: COLORS.golden}}>Go</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View style={{paddingHorizontal: 16, paddingVertical: 16}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: COLORS.black0, marginBottom: 20}}>Warehouses</Text>

          <View style={{flexDirection: 'row'}}>
            <Image source={warehouseImage} containerStyle={{width: 74, height: 74, borderRadius: 8}}></Image>
            <View style={{marginLeft: 14}}>
              <View style={{flex: 1}}>
                <Text style={{marginBottom: 2, fontSize: 12, color: colors.grey3, fontWeight: '700'}}>PARCELGO</Text>
                <Text style={{marginBottom: 2, fontSize: 16, color: colors.black}}>108 Phạm Văn Đồng</Text>
              </View>
              <Text style={{marginBottom: 2, fontSize: 14, color: colors.grey3}}>Cách đây 12km</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default WarehouseScreen;
