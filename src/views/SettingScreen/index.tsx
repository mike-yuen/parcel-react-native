import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, colors} from 'react-native-elements';
import {useDispatch} from 'react-redux';

import MyHeader from '~/components/MyHeader';
import {signOut} from '~/store/slices/userSlice';

const SettingScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  async function delToken() {
    await AsyncStorage.removeItem('jt');
  }

  async function handleSignOut() {
    await delToken();
    dispatch(signOut());
  }

  return (
    <ScrollView style={styles.container}>
      <MyHeader />
      <Button
        title="Logout"
        containerStyle={{marginTop: 14, marginBottom: 20}}
        buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
        titleStyle={{color: colors.white, marginVertical: 2, marginHorizontal: 10}}
        onPress={handleSignOut}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});

export default SettingScreen;
