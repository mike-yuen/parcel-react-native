import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {Button, Text, colors} from 'react-native-elements';

import {COLORS} from '~/constants/colors';
import MyInput from '~/components/MyInput';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';
import {getTrackingOrderDetail, verifyTrackingOrder} from '~/store/slices/orderSlice';

const VerifyScreen = ({navigation}: any) => {
  const {
    control,
    getValues,
    formState: {isValid},
    handleSubmit,
  } = useForm({mode: 'onChange'});

  const dispatch = useDispatch();
  const {trackingOrderData, verifiedTrackingOrder, verifiedData, gotOrder, order} = useSelector(
    (state: RootState) => state.order,
  );

  const onSubmit = (data: {[x: string]: string}) => {
    const {orderId} = trackingOrderData;
    const {code} = data;
    if (orderId && code) {
      dispatch(verifyTrackingOrder({orderId, code}));
    }
  };

  useEffect(() => {
    if (verifiedTrackingOrder && verifiedData.orderId) {
      dispatch(getTrackingOrderDetail(verifiedData.orderId));
    }
  }, [verifiedTrackingOrder]);

  useEffect(() => {
    const code = getValues('code');
    if (gotOrder && order.id && !!code) {
      navigation.navigate('Detail', {
        orderId: order.id,
        departure: 'Verify',
      });
    }
  }, [gotOrder]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Verification</Text>

      <Text style={{marginTop: 15, marginBottom: 5}}>{`Code will be sent to ${
        trackingOrderData && trackingOrderData.email ? trackingOrderData.email : 'your email'
      }`}</Text>
      <MyInput
        name="code"
        control={control}
        rules={{required: true}}
        placeholder="Email verification code"
        containerStyle={{marginTop: 4}}
        inputContainerStyle={{borderRadius: 8}}
      />
      <Button
        title="Submit"
        containerStyle={{marginTop: 30, marginBottom: 40}}
        buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
        titleStyle={{color: COLORS.black1, marginVertical: 2}}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  welcomeText: {
    color: COLORS.black0,
    fontSize: 22,
    marginTop: 24,
    marginBottom: 8,
    fontWeight: '700',
  },
  descriptionText: {
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  languages: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 34,
  },
  language: {
    color: COLORS.gray,
    marginHorizontal: 8,
  },
  active: {
    color: COLORS.black0,
    textDecorationLine: 'underline',
  },
});

export default VerifyScreen;
