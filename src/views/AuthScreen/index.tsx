import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Image, Text, colors} from 'react-native-elements';

import logoImage from '~/assets/logo.png';
import googleImage from '~/assets/google.png';

class Google extends React.Component {
  render() {
    return <Image source={googleImage} containerStyle={{width: 20, height: 20}} />;
  }
}

const AuthScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Image source={logoImage} containerStyle={styles.logoImage} />
      <Text style={styles.welcomeText}>Welcome to ParcelGO</Text>
      <Text style={styles.descriptionText}>Tracking your parcel and make sure</Text>
      <Text style={styles.descriptionText}>it arrives to the destination.</Text>
      <Button
        title="Sign Up with Email"
        containerStyle={{marginTop: 30}}
        buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
        titleStyle={{color: colors.white, marginVertical: 6}}
        icon={{
          name: 'wallet-outline',
          type: 'ionicon',
          size: 22,
          color: 'white',
        }}
        iconContainerStyle={{position: 'absolute', left: 20}}
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button
        title="Sign Up with Google"
        containerStyle={{marginTop: 16, marginBottom: 20}}
        buttonStyle={{backgroundColor: '#ececec', borderRadius: 8}}
        titleStyle={{color: colors.grey0, marginVertical: 6}}
        icon={{Component: Google}}
        iconContainerStyle={{position: 'absolute', left: 20}}
        onPress={() => console.log('Button with adjusted color pressed!!!')}
      />
      <Text style={styles.termAgreement}>By signing up you are agreed with our</Text>
      <Text style={styles.termAgreement}>friendly terms and conditions.</Text>

      <Text style={styles.already}>Already have an account?</Text>
      <Text style={styles.signin} onPress={() => navigation.navigate('SignIn')}>
        Sign In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 54,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.white,
  },
  logoImage: {
    width: 62,
    height: 48,
    alignSelf: 'center',
  },
  welcomeText: {
    color: colors.black,
    fontSize: 24,
    lineHeight: 62,
    fontWeight: '700',
    textAlign: 'center',
  },
  descriptionText: {
    color: colors.grey2,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  termAgreement: {
    color: colors.grey3,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  already: {
    color: colors.grey2,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
  },
  signin: {
    marginVertical: 10,
    textAlign: 'center',
    color: '#5f5fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AuthScreen;
