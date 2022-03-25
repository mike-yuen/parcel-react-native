import {Link} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Image, Text, colors, Button, CheckBox} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';

import bannerImage from '~/assets/banner2x.png';
import MyInput from '~/components/MyInput';
import {signIn} from '~/store/slices/userSlice';

const SigninScreen = ({navigation}: any) => {
  const {
    control,
    formState: {isValid},
    handleSubmit,
  } = useForm({mode: 'onChange'});
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    console.log('______________', data);
    dispatch(signIn({email: 'nhatminh.150596+15@gmail.com', password: '123456'}));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image source={bannerImage} containerStyle={styles.logoImage} />
      </View>

      <View style={{paddingHorizontal: 30}}>
        <MyInput
          name="email"
          control={control}
          rules={{required: true}}
          placeholder="Email Address"
          containerStyle={{marginTop: 32}}
          inputContainerStyle={{borderRadius: 0, borderTopStartRadius: 8, borderTopEndRadius: 8}}
          autoFocus
        />
        <MyInput
          name="password"
          control={control}
          rules={{required: true}}
          placeholder="Password"
          secureTextEntry={true}
          containerStyle={{marginBottom: 24}}
          inputContainerStyle={{
            borderRadius: 0,
            borderBottomStartRadius: 8,
            borderBottomEndRadius: 8,
          }}
          onSubmitEditing={handleSubmit(onSubmit)}
        />

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <CheckBox
            title="Remember me"
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0, margin: 0, padding: 0, marginLeft: 0}}
            textStyle={{fontWeight: '400'}}
            checked={false}
          />
          <Text style={{color: colors.grey1}}>Forgot Password?</Text>
        </View>
        <Button
          title="Sign in"
          containerStyle={{marginTop: 10, marginBottom: 20}}
          buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
          titleStyle={{color: colors.white, marginVertical: 4}}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </View>

      <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 60}}>
        <Text style={{marginTop: 14, marginBottom: 12}}>Don't have an account?</Text>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Link to={{screen: 'SignupStep1'}} style={{fontSize: 15, color: '#5f5fff'}}>
            Sign up for ParcelGO
          </Link>
          <Link to={{screen: 'Auth'}} style={{fontSize: 15, color: '#5f5fff', marginTop: 8}}>
            Back
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logoImage: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
});

export default SigninScreen;
