import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image, Text, colors} from 'react-native-elements';

import logoImage from '~/assets/logo2x.png';
import MyInput from '~/components/MyInput';

const SignupScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Image source={logoImage} containerStyle={styles.logoImage} />
      <Text style={styles.welcomeText}>Register Account</Text>
      <Text style={styles.descriptionText}>Enter your name, email address & password</Text>
      <Text style={styles.descriptionText}>to register account.</Text>

      <MyInput label="Full Name" placeholder="Only alphabetical characters" containerStyle={{marginTop: 20}} />
      <MyInput label="Email Address" placeholder="Email Address" containerStyle={{marginTop: 0}} />
      <MyInput placeholder="Password" containerStyle={{marginTop: 0}} />

      {/* <Text>Already have an account?</Text>
      <Text onPress={() => navigation.navigate('Signin')}>Sign in</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  logoImage: {
    width: 62,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
  },
  welcomeText: {
    color: 'rgb(5, 31, 50)',
    fontSize: 22,
    marginTop: 36,
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  descriptionText: {
    color: colors.grey2,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SignupScreen;
