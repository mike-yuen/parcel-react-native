import {Link} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, colors, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '~/constants/colors';
import {RootState} from '~/store';
import {signUp} from '~/store/slices/userSlice';

const Step6 = ({navigation}: any) => {
  const {signUpData} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  function onDone() {
    dispatch(signUp(signUpData));
  }

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 30}}>
        <Text style={styles.welcomeText}>Finish signing up</Text>
        <Text style={styles.descriptionText}>By tapping Sign up, you agree to our Terms and</Text>
        <Text style={styles.descriptionText}>Data Policy. You may receive SMS notifications</Text>
        <Text style={styles.descriptionText}>from us and can opt out any time.</Text>
        <Button
          title="Sign up"
          containerStyle={{marginTop: 10, marginBottom: 20}}
          buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
          titleStyle={{color: COLORS.black1, marginVertical: 2}}
          onPress={onDone}
        />
      </View>
      <View style={styles.signinText}>
        <Link to={{screen: 'Signin'}} style={{fontSize: 13, color: COLORS.darkGolden}}>
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

export default Step6;
