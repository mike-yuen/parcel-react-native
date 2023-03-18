import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {Button, Image, Text, colors} from 'react-native-elements';

import logoImage from '~/assets/logo2x.png';
import googleImage from '~/assets/google.png';
import {COLORS} from '~/constants/colors';
import MyInput from '~/components/MyInput';

class Google extends React.Component {
  render() {
    return <Image source={googleImage} containerStyle={{width: 18, height: 18}} />;
  }
}

const AuthScreen = ({navigation}: any) => {
  const {
    control,
    reset,
    formState: {isValid},
    handleSubmit,
  } = useForm({mode: 'onChange'});

  return (
    <View style={styles.container}>
      <View>
        <Image source={logoImage} containerStyle={styles.logoImage} />
        <Text style={styles.welcomeText}>Welcome to ParcelGO</Text>
        <Text style={styles.descriptionText}>Tracking your parcel and make sure</Text>
        <Text style={styles.descriptionText}>it arrives to the destination.</Text>
      </View>
      <View>
        <View>
          <MyInput
            name="order-id"
            control={control}
            rules={{required: true}}
            placeholder="Your order ID"
            containerStyle={{marginTop: 4}}
            inputContainerStyle={{borderRadius: 8}}
          />
          <Button
            title="Track your order"
            containerStyle={{marginTop: 10, marginBottom: 40}}
            buttonStyle={{backgroundColor: COLORS.gray0, borderRadius: 4}}
            titleStyle={{color: COLORS.black1, marginVertical: 2}}
            onPress={() => navigation.navigate('Verify')}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 0.8, backgroundColor: COLORS.gray}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: COLORS.gray}}>OR</Text>
          </View>
          <View style={{flex: 1, height: 0.8, backgroundColor: COLORS.gray}} />
        </View>

        <View>
          <Button
            title="Sign in"
            containerStyle={{marginTop: 30, marginBottom: 10}}
            buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
            titleStyle={{color: COLORS.black1, marginVertical: 2}}
            onPress={() => navigation.navigate('Signin')}
          />
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 0.8, backgroundColor: COLORS.gray}} />
            <View>
              <Text style={{width: 50, textAlign: 'center', color: COLORS.gray}}>OR</Text>
            </View>
            <View style={{flex: 1, height: 0.8, backgroundColor: COLORS.gray}} />
          </View> */}
          <Button
            title="Sign up with Email"
            containerStyle={{marginTop: 10}}
            buttonStyle={{backgroundColor: COLORS.gray0, borderRadius: 4}}
            titleStyle={{color: COLORS.black, marginVertical: 2}}
            icon={{
              name: 'wallet-outline',
              type: 'ionicon',
              size: 22,
              color: COLORS.darkGolden,
            }}
            iconContainerStyle={{position: 'absolute', left: 20}}
            onPress={() => navigation.navigate('SignupStep1')}
          />
          {/* <Button
          title="Sign up with Google"
          containerStyle={{marginTop: 16, marginBottom: 20}}
          buttonStyle={{backgroundColor: COLORS.gray0, borderRadius: 4}}
          titleStyle={{color: COLORS.black, marginVertical: 2}}
          icon={{Component: Google}}
          iconContainerStyle={{position: 'absolute', left: 20}}
          onPress={() => console.log('Button with adjusted color pressed!!!')}
        /> */}
        </View>
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
    color: COLORS.black0,
    fontSize: 22,
    marginTop: 24,
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  descriptionText: {
    color: COLORS.gray,
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
    color: COLORS.gray,
    marginHorizontal: 8,
  },
  active: {
    color: COLORS.black0,
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;
