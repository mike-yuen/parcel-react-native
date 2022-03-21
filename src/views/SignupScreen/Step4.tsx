import {Link} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, colors, Text} from 'react-native-elements';
import MyInput from '~/components/MyInput';

const Step4 = ({navigation}: any) => {
  const {
    control,
    formState: {isValid},
    handleSubmit,
  } = useForm({mode: 'onChange'});

  function onNext() {
    navigation.navigate('SignupStep5');
  }

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 30}}>
        <Text style={styles.welcomeText}>Create a password</Text>
        <MyInput
          name="password"
          control={control}
          placeholder="Password"
          containerStyle={{marginTop: 14, marginBottom: 10}}
          autoFocus
        />
        <Text style={styles.descriptionText}>Enter a combination of at least six numbers, letters</Text>
        <Text style={styles.descriptionText}>and punctuation marks (like ! and &).</Text>
        <Button
          title="Next"
          containerStyle={{marginTop: 10, marginBottom: 20}}
          buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
          titleStyle={{color: colors.white, marginVertical: 4}}
          onPress={handleSubmit(onNext)}
        />
      </View>
      <View style={styles.signinText}>
        <Link to={{screen: 'Signin'}} style={{fontSize: 13, color: '#5f5fff'}}>
          Already have an account?
        </Link>
      </View>
    </View>
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

export default Step4;
