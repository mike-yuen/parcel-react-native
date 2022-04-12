import {Link} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Icon, Input, Text} from 'react-native-elements';

const SearchScreen = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <Link to={{screen: 'Map'}} style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              type="font-awesome"
              name="chevron-right"
              size={12}
              containerStyle={{paddingLeft: 12}}
              tvParallaxProperties={undefined}></Icon>
            <Text>Select on map</Text>
          </View>
          <Icon
            type="font-awesome"
            name="chevron-right"
            size={12}
            containerStyle={{paddingLeft: 12}}
            tvParallaxProperties={undefined}></Icon>
        </View>
      </Link>
    </View>
  );
};

export default SearchScreen;
