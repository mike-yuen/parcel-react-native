import {yupResolver} from '@hookform/resolvers/yup';
import {Link} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {useController, useForm} from 'react-hook-form';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, colors, Text} from 'react-native-elements';
import PhoneInput from 'react-native-phone-number-input';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';

import {COLORS} from '~/constants/colors';
import {setSignUpData} from '~/store/slices/userSlice';

const Step4 = ({navigation}: any) => {
  const {
    control,
    formState: {isDirty},
    handleSubmit,
  } = useForm({mode: 'onSubmit'});

  const {field} = useController({
    control: control,
    defaultValue: '',
    name: 'phone',
  });

  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');

  const phoneInput = useRef<PhoneInput>(null);

  function onNext(data: any) {
    setShowError(true);
    if (phoneInput.current?.isValidNumber(data.phone)) {
      dispatch(setSignUpData({phone: formattedValue}));
      navigation.navigate('SignupStep5');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardDismissMode="interactive">
      <View style={{paddingHorizontal: 30}}>
        <Text style={styles.welcomeText}>What's your phone number?</Text>

        <Text
          style={{
            color: 'red',
            fontSize: 14,
            textAlign: 'center',
            opacity: showError && !phoneInput.current?.isValidNumber(field.value) ? 1 : 0,
          }}>
          Phone number invalid
        </Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={field.value}
          defaultCode="VN"
          disableArrowIcon={true}
          layout="second"
          onChangeText={field.onChange}
          onChangeFormattedText={text => setFormattedValue(text)}
          containerStyle={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: COLORS.golden,
            borderRadius: 4,
            marginTop: 14,
            marginBottom: 10,
          }}
          textContainerStyle={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            backgroundColor: colors.white,
          }}
          flagButtonStyle={{width: 60, backgroundColor: COLORS.golden, paddingHorizontal: 10}}
          codeTextStyle={{fontSize: 14, color: COLORS.black1, marginRight: 0}}
          textInputStyle={{height: 36, paddingVertical: 0, paddingHorizontal: 16, fontSize: 14}}
          autoFocus
        />
        <Text style={styles.descriptionText}>We'll use this phone number when</Text>
        <Text style={styles.descriptionText}>our customer service need to connect to you.</Text>
        {isDirty && (
          <Button
            title="Next"
            containerStyle={{marginTop: 10, marginBottom: 20}}
            buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
            titleStyle={{color: COLORS.black1, marginVertical: 2}}
            onPress={handleSubmit(onNext)}
          />
        )}
      </View>
      <View style={styles.signinText}>
        <Link to={{screen: 'Signin'}} style={{fontSize: 13, color: COLORS.darkGolden}}>
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
    color: COLORS.black0,
    fontSize: 20,
    marginTop: 36,
    marginBottom: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  descriptionText: {
    color: COLORS.gray,
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

export default Step4;
