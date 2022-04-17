import {Link} from '@react-navigation/native';
import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {colors, Icon, Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import MyLocationResult from '~/components/MyLocationResult';
import {RootState} from '~/store';

const SearchScreen = ({route}: any) => {
  const dimemsion = useWindowDimensions();
  const {searched, searchData} = useSelector((state: RootState) => state.search);

  const {departure} = route.params;

  return (
    <View style={{backgroundColor: '#f4f4f4', flex: 1, flexDirection: 'column'}}>
      <Link to={{screen: 'Map'}} style={{backgroundColor: colors.white, marginVertical: 16, paddingHorizontal: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: dimemsion.width,
            paddingVertical: 14,
            paddingHorizontal: 16,
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              type="entypo"
              name="map"
              size={16}
              containerStyle={{marginRight: 16}}
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
      <MyLocationResult data={searched ? searchData : null} departure={departure} />
    </View>
  );
};

export default SearchScreen;
