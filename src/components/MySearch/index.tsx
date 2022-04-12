import React from 'react';
import {Dimensions, StyleSheet, useWindowDimensions, View} from 'react-native';
import {Button, Icon, Image, Input, Text} from 'react-native-elements';

const MySearch = ({navigation}: any) => {
  const dimension = useWindowDimensions();
  return (
    <View style={{flex: 1, maxWidth: dimension.width - 94}}>
      <Input
        containerStyle={{display: 'flex', paddingHorizontal: 0}}
        labelStyle={{display: 'none'}}
        placeholder="Enter tracking number"
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
        autoCompleteType={false}
        autoFocus={false}
      />
    </View>
  );
};

export default MySearch;
