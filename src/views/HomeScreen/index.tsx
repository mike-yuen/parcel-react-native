import {Link} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors} from 'react-native-elements';

import MyHeader from '~/components/MyHeader';
import MyTrackingBar from '~/components/MyTrackingBar';

const HomeScreen = ({navigation}: any) => {
  return (
    <ScrollView style={styles.container}>
      <MyHeader />
      <MyTrackingBar />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default HomeScreen;
