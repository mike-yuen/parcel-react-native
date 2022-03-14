import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, colors, Image, Text} from 'react-native-elements';

import avatarHolderImage from '~/assets/avatar.png';

const MyHeader = (props: any) => {
  return (
    <View style={styles.header}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Image source={avatarHolderImage} containerStyle={{width: 38, height: 38, borderRadius: 40}}></Image>
        <View style={{paddingHorizontal: 12}}>
          <Text style={{color: colors.grey3, fontSize: 13}}>Good morning!</Text>
          <Text style={{color: colors.black, fontSize: 16, fontWeight: '700', lineHeight: 20}}>Mike Yuen</Text>
        </View>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Button
          containerStyle={{marginLeft: 10}}
          icon={{
            name: 'notifications',
            type: 'ionicon',
            size: 14,
            color: colors.black,
          }}
          iconContainerStyle={{marginHorizontal: 0}}
          buttonStyle={{width: 30, height: 30, backgroundColor: '#ebedf0', borderRadius: 30}}
          onPress={() => console.log('Notification')}
        />
        <Button
          containerStyle={{marginLeft: 14}}
          icon={{
            name: 'plus',
            type: 'font-awesome-5',
            size: 14,
            color: colors.black,
          }}
          iconContainerStyle={{marginHorizontal: 0}}
          buttonStyle={{width: 30, height: 30, backgroundColor: '#ebedf0', borderRadius: 30}}
          onPress={() => console.log('Notification')}
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
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default MyHeader;
