import React, {useState} from 'react';
import {Link} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, colors, Text} from 'react-native-elements';
import MyInput from '~/components/MyInput';

const Step2 = ({navigation}: any) => {
  const {
    control,
    formState: {isValid},
    handleSubmit,
  } = useForm({mode: 'onChange'});

  const [focus, setFocus] = useState(false);

  function onFocus() {
    setFocus(true);
  }
  function onBlur() {
    setFocus(false);
  }

  function onNext() {
    navigation.navigate('SignupStep3');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardDismissMode="interactive">
      <View style={{paddingHorizontal: 30}}>
        <Text style={styles.welcomeText}>What's your name?</Text>
        <Text style={{color: 'red', fontSize: 14, textAlign: 'center', opacity: 0}}>Please enter your name.</Text>
        <MyInput
          name="fullname"
          control={control}
          rules={{required: true}}
          placeholder="Full name"
          containerStyle={{marginTop: 14, marginBottom: 10}}
          autoFocus
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Text style={styles.descriptionText}>Using your real name makes it easier for </Text>
        <Text style={styles.descriptionText}>receivers to recognize you.</Text>
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

export default Step2;
