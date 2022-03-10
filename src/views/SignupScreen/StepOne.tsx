import {Link} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, colors, Image, Text} from 'react-native-elements';

import stepOneImage from '~/assets/step-one.png';

const StepOne = (props: any) => {
  const {onNext} = props;
  return (
    <View style={styles.container}>
      <View>
        <Image source={stepOneImage} containerStyle={styles.logoImage} />
        <Text style={styles.welcomeText}>Join ParcelGO</Text>
        <Text style={styles.descriptionText}>Enter your name, email address & password</Text>
        <Text style={styles.descriptionText}>to register account.</Text>
        <Button
          title="Get started"
          containerStyle={{marginTop: 10, marginBottom: 20}}
          buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
          titleStyle={{color: colors.white, marginVertical: 4}}
          onPress={onNext}
        />
      </View>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 30}}>
        <Link to={{screen: 'Signin'}} style={{fontSize: 15, color: '#5f5fff'}}>
          Already have account?
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
    paddingHorizontal: 30,
  },
  logoImage: {
    width: 200,
    height: 140,
    alignSelf: 'center',
    marginTop: 40,
  },
  welcomeText: {
    color: 'rgb(5, 31, 50)',
    fontSize: 22,
    marginTop: 36,
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

export default StepOne;
