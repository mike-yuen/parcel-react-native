import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Image, Input, Text} from 'react-native-elements';

import avatarHolderImage from '~/assets/avatar.png';

const MyHeader = ({navigation}: any) => {
  return (
    <View style={styles.header}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
        <Image
          source={avatarHolderImage}
          containerStyle={{width: 30, height: 30, borderRadius: 30}}
          onPress={() => navigation.navigate('Profile')}></Image>
      </View>
      <View style={{flex: 1}}>
        <Input
          containerStyle={{display: 'flex', paddingHorizontal: 0, flex: 1}}
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
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="qrcode-scan"
          type="material-community"
          size={16}
          color="#9397b0"
          containerStyle={{margin: 8, marginLeft: 16}}
          onPress={() => console.log('Notification')}
          tvParallaxProperties={undefined}
        />
        <Icon
          name="notifications"
          type="ionicon"
          size={16}
          color="#9397b0"
          containerStyle={{margin: 8}}
          onPress={() => console.log('Notification')}
          tvParallaxProperties={undefined}
        />
        <Icon
          name="plus"
          type="font-awesome-5"
          size={16}
          color="#9397b0"
          containerStyle={{margin: 8, marginRight: 0}}
          onPress={() => console.log('Notification')}
          tvParallaxProperties={undefined}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default MyHeader;
