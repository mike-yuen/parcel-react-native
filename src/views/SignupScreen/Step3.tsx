import {Link} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, colors, Text} from 'react-native-elements';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import MyInput from '~/components/MyInput';

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const Step3 = ({navigation}: any) => {
  const {
    control,
    formState: {errors, isValid},
    handleSubmit,
  } = useForm({resolver: yupResolver(schema), mode: 'onBlur'});

  const [focus, setFocus] = useState(false);

  const emailErrors = errors.email && errors.email.type === 'email';

  function onFocus() {
    setFocus(true);
  }
  function onBlur() {
    setFocus(false);
  }

  function onNext() {
    navigation.navigate('SignupStep4');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardDismissMode="interactive">
      <View style={{paddingHorizontal: 30}}>
        <Text style={styles.welcomeText}>What's your email address?</Text>
        <Text style={{color: 'red', fontSize: 14, textAlign: 'center', opacity: emailErrors ? 1 : 0}}>
          Email invalid
        </Text>
        <MyInput
          name="email"
          control={control}
          placeholder="Enter your email address"
          containerStyle={{marginTop: 14, marginBottom: 10}}
          autoFocus
          errors={emailErrors}
          onSubmitEditing={handleSubmit(onNext)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Text style={styles.descriptionText}>You'll use this email when you log in and if you ever</Text>
        <Text style={styles.descriptionText}>need to reset your password. </Text>
        {isValid && !focus && (
          <Button
            title="Next"
            containerStyle={{marginTop: 10, marginBottom: 20}}
            buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
            titleStyle={{color: colors.white, marginVertical: 4}}
            onPress={handleSubmit(onNext)}
          />
        )}
      </View>
      <View style={styles.signinText}>
        <Link to={{screen: 'Signin'}} style={{fontSize: 13, color: '#5f5fff'}}>
          Already have an account?
        </Link>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.grey5,
  },
  welcomeText: {
    color: '#5f5fff',
    fontSize: 20,
    marginTop: 36,
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  descriptionText: {
    color: colors.grey2,
    fontSize: 13,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  signinText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.grey5,
  },
});

export default Step3;
