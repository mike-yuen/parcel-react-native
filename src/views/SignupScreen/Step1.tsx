import {Link} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, colors, Image, Text} from 'react-native-elements';

import stepOneImage from '~/assets/step-one.png';

const Step1 = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 30}}>
        <Image source={stepOneImage} containerStyle={styles.logoImage} />
        <Text style={styles.welcomeText}>Join ParcelGO</Text>
        <Text style={styles.descriptionText}>We'll help you create an account</Text>
        <Text style={styles.descriptionText}>in a few easy steps.</Text>
        <Button
          title="Get started"
          containerStyle={{marginTop: 10, marginBottom: 20}}
          buttonStyle={{backgroundColor: '#5f5fff', borderRadius: 8}}
          titleStyle={{color: colors.white, marginVertical: 4}}
          onPress={() => navigation.navigate('SignupStep2')}
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
  signinText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.grey5,
  },
});

export default Step1;
