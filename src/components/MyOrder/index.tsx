import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Button, colors, Icon, Text} from 'react-native-elements';
import {COLORS} from '~/constants/colors';

const MyOrder = (props: any) => {
  const dimension = useWindowDimensions();
  const {data} = props;

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: dimension.width - 32,
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderBottomColor: colors.grey5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* truck-fast */}
          {/* truck-check */}
          <Button
            icon={{
              type: 'material-community',
              name: 'truck-delivery',
              size: 20,
              color: '#a8a8a8',
            }}
            containerStyle={{borderRadius: 50}}
            buttonStyle={{backgroundColor: '#f5f5f5', width: 50, height: 50, borderRadius: 60}}
          />
          <View
            style={{
              paddingVertical: 14,
              marginLeft: 16,
              paddingRight: 16,
              overflow: 'hidden',
            }}>
            <Text style={{textAlign: 'justify', color: COLORS.gray, marginBottom: 4}}>Order ID:</Text>
            <Text style={{fontWeight: '700'}}>
              {data.id.slice(0, 6)}...{data.id.slice(data.id.length - 4, data.id.length)}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{fontWeight: '700', marginBottom: 4}}>{data.value} VND</Text>
          <Text style={{textAlign: 'justify', color: '#a8a8a8', marginBottom: 4}}>Preparation</Text>
        </View>
      </View>
    </View>
  );
};

export default MyOrder;
