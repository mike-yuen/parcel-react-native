import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Image, Text, colors} from 'react-native-elements';

import logoImage from '~/assets/logo2x.png';
import googleImage from '~/assets/google.png';

class Google extends React.Component {
  render() {
    return <Image source={googleImage} containerStyle={{width: 20, height: 20}} />;
  }
}

const AuthScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={logoImage} containerStyle={styles.logoImage} />
        <Text style={styles.welcomeText}>Welcome to ParcelGO</Text>
        <Text style={styles.descriptionText}>Tracking your parcel and make sure</Text>
        <Text style={styles.descriptionText}>it arrives to the destination.</Text>
      </View>
      <View>
        <Button
          title="Sign in"
          containerStyle={{marginTop: 30, marginBottom: 20}}
          buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
          titleStyle={{color: colors.white, marginVertical: 4}}
          onPress={() => navigation.navigate('Signin')}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 0.8, backgroundColor: colors.grey4}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: colors.grey3}}>OR</Text>
          </View>
          <View style={{flex: 1, height: 0.8, backgroundColor: colors.grey4}} />
        </View>
        <Button
          title="Sign up with Email"
          containerStyle={{marginTop: 22}}
          buttonStyle={{backgroundColor: 'rgb(236, 236, 236)', borderRadius: 8}}
          titleStyle={{color: colors.grey0, marginVertical: 4}}
          icon={{
            name: 'wallet-outline',
            type: 'ionicon',
            size: 22,
            color: '#5f5fff',
          }}
          iconContainerStyle={{position: 'absolute', left: 20}}
          onPress={() => navigation.navigate('SignupStep1')}
        />
        <Button
          title="Sign up with Google"
          containerStyle={{marginTop: 16, marginBottom: 20}}
          buttonStyle={{backgroundColor: 'rgb(236, 236, 236)', borderRadius: 8}}
          titleStyle={{color: colors.grey0, marginVertical: 4}}
          icon={{Component: Google}}
          iconContainerStyle={{position: 'absolute', left: 20}}
          onPress={() => console.log('Button with adjusted color pressed!!!')}
        />
        <View style={styles.languages}>
          <Text style={styles.language}>Tiếng Việt</Text>
          <Text style={[styles.language, styles.active]}>English</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    color: colors.grey1,
    fontSize: 22,
    marginTop: 24,
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
  languages: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 34,
  },
  language: {
    color: colors.grey4,
    marginHorizontal: 8,
  },
  active: {
    color: colors.grey2,
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;
