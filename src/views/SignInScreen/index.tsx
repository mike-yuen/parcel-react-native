import {Link} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Image, Text, colors, Button, CheckBox} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';

import bannerImage from '~/assets/banner2x.png';
import MyInput from '~/components/MyInput';
import {signIn} from '~/store/slices/userSlice';
import {COLORS} from '~/constants/colors';

const SigninScreen = ({navigation}: any) => {
  const [focus, setFocus] = useState(false);

  function onFocus() {
    setFocus(true);
  }
  function onBlur() {
    setFocus(false);
  }

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
          inputContainerStyle={{borderRadius: 0, borderTopStartRadius: 8, borderTopEndRadius: 8, borderBottomWidth: 0}}
          autoFocus
          onFocus={onFocus}
          onBlur={onBlur}
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
            borderTopColor: focus ? COLORS.golden : colors.grey4,
          }}
          onSubmitEditing={handleSubmit(onSubmit)}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <CheckBox
            title="Remember me"
            containerStyle={{backgroundColor: 'transparent', borderWidth: 0, margin: 0, padding: 0, marginLeft: 0}}
            textStyle={{color: COLORS.black0, fontWeight: '400'}}
            checked={false}
          />
          <Text style={{color: COLORS.black0}}>Forgot Password?</Text>
        </View>
        <Button
          title="Sign in"
          containerStyle={{marginTop: 10, marginBottom: 20}}
          buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
          titleStyle={{color: COLORS.black1, marginVertical: 2}}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
      </View>

      <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 60}}>
        <Text style={{color: COLORS.black0, marginTop: 14, marginBottom: 12}}>Don't have an account?</Text>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Link to={{screen: 'SignupStep1'}} style={{fontSize: 15, color: COLORS.darkGolden}}>
            Sign up for ParcelGO
          </Link>
          <Link to={{screen: 'Auth'}} style={{fontSize: 15, color: COLORS.darkGolden, marginTop: 8}}>
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
