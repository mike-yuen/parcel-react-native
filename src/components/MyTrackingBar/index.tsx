import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, colors, Input} from 'react-native-elements';

const MyTrackingBar = (props: any) => {
  return (
    <View style={styles.trackingBar}>
      <Input
        containerStyle={{display: 'flex', paddingHorizontal: 0, flex: 1}}
        labelStyle={{display: 'none'}}
        placeholder="Enter tracking number"
        inputContainerStyle={{
          borderRadius: 8,
          borderBottomWidth: 0,
          paddingHorizontal: 10,
          backgroundColor: colors.white,
        }}
        inputStyle={{fontSize: 14, height: 36}}
        leftIcon={{
          name: 'package-variant-closed',
          type: 'material-community',
          size: 18,
          color: '#ff7d00',
        }}
        rightIcon={{
          name: 'search',
          type: 'ionicon',
          size: 18,
          color: '#222831',
        }}
        leftIconContainerStyle={{marginVertical: 0, paddingVertical: 0}}
        rightIconContainerStyle={{marginVertical: 0, paddingVertical: 0}}
        errorStyle={{display: 'none'}}
        autoCompleteType={false}
        autoFocus={false}
      />
      <Button
        containerStyle={{marginLeft: 18}}
        icon={{
          name: 'qrcode-scan',
          type: 'material-community',
          size: 15,
          color: colors.white,
        }}
        iconContainerStyle={{marginHorizontal: 0}}
        buttonStyle={{width: 38, height: 38, backgroundColor: '#222831', borderRadius: 8}}
        onPress={() => console.log('Notification')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  trackingBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f8fa',
    borderTopWidth: 0.35,
    borderTopColor: colors.grey5,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});

export default MyTrackingBar;
