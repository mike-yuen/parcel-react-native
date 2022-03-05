import {Link} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Image, Text, colors, Button, CheckBox} from 'react-native-elements';

import logoImage from '~/assets/logo2x.png';
import MyInput from '~/components/MyInput';

const SigninScreen = ({navigation}: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image source={logoImage} containerStyle={styles.logoImage} />
        <Text style={styles.welcomeText}>Welcome back 👋</Text>
        <Text style={styles.descriptionText}>Enter your email address and password to</Text>
        <Text style={styles.descriptionText}>get access your account.</Text>
      </View>

      <View>
        <MyInput
          placeholder="Email Address"
          containerStyle={{marginTop: 32}}
          inputContainerStyle={{borderRadius: 0, borderTopStartRadius: 8, borderTopEndRadius: 8}}
        />
        <MyInput
          placeholder="Password"
          secureTextEntry={true}
          containerStyle={{marginBottom: 24}}
          inputContainerStyle={{
            borderRadius: 0,
            borderBottomStartRadius: 8,
            borderBottomEndRadius: 8,
            borderTopWidth: 0,
          }}
        />

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <CheckBox
            title="Remember me"
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0, margin: 0, padding: 0, marginLeft: 0}}
            textStyle={{fontWeight: '400'}}
          />
          <Text style={{color: colors.grey1}}>Forgot Password?</Text>
        </View>
        <Button
          title="Sign in"
          containerStyle={{marginTop: 10, marginBottom: 20}}
          buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
          titleStyle={{color: colors.white, marginVertical: 4}}
          onPress={() => navigation.navigate('Auth')}
        />
      </View>

      <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 60}}>
        <Text style={{marginTop: 14, marginBottom: 12}}>Don't have an account?</Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Link to={{screen: 'Signup'}} style={{fontSize: 15, color: '#5f5fff'}}>
            Register Account
          </Link>
          <Text style={{fontSize: 14, color: colors.grey2}}> or </Text>
          <Link to={{screen: 'Auth'}} style={{fontSize: 15, color: '#5f5fff'}}>
            Go Back
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default SigninScreen;
