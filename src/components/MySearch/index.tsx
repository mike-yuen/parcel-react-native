import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Input} from 'react-native-elements';

const MySearch = ({onChange}: any) => {
  const dimension = useWindowDimensions();
  return (
    <View style={{flex: 1, maxWidth: dimension.width - 94}}>
      <Input
        containerStyle={{display: 'flex', paddingHorizontal: 0}}
        labelStyle={{display: 'none'}}
        placeholder="Search"
        inputContainerStyle={{
          borderRadius: 30,
          borderBottomWidth: 0,
          paddingHorizontal: 10,
          backgroundColor: '#ecedef',
        }}
        inputStyle={{fontSize: 14, height: 36}}
        leftIcon={{
          name: 'search',
          type: 'ionicon',
          size: 18,
          color: '#969fa8',
        }}
        leftIconContainerStyle={{marginVertical: 0, paddingVertical: 0}}
        rightIconContainerStyle={{marginVertical: 0, paddingVertical: 0}}
        errorStyle={{display: 'none'}}
        autoFocus={false}
        onChangeText={value => onChange(value)}
      />
    </View>
  );
};

export default MySearch;
