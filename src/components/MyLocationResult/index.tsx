import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {colors, Icon, Text} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import {COLORS} from '~/constants/colors';
import {selectLocation} from '~/store/slices/searchSlice';

const MyLocationResult = ({data, departure}: any) => {
  const dimension = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handleSelectLocation(placeId: string) {
    dispatch(selectLocation(placeId));
    navigation.navigate(departure);
  }

  return (
    <View style={{flex: 1}}>
      {data &&
        data.length &&
        data.map((location: any) => (
          <View
            key={location.place_id}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: dimension.width,
              backgroundColor: colors.white,
              paddingLeft: 16,
              paddingRight: 16,
            }}>
            <Text style={{display: 'flex'}} onPress={() => handleSelectLocation(location.place_id)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon type="fontisto" name="map-marker-alt" size={16} tvParallaxProperties={undefined}></Icon>
                <View
                  style={{
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.grey5,
                    marginLeft: 16,
                    paddingRight: 16,
                    overflow: 'hidden',
                  }}>
                  <Text style={{fontWeight: '700', marginBottom: 4}}>{location.structured_formatting.main_text}</Text>
                  <Text style={{textAlign: 'justify', color: COLORS.gray}}>{location.description}</Text>
                </View>
              </View>
            </Text>
          </View>
        ))}
    </View>
  );
};

export default MyLocationResult;
