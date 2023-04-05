import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import MyInput from '~/components/MyInput';
import {COLORS} from '~/constants/colors';
import {RootState} from '~/store';
import {addRecipient} from '~/store/slices/recipientSlice';

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const RecipientScreen = ({route}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {recipient} = useSelector((state: RootState) => state.recipient);

  const [recipientState, setRecipientState] = useState({name: '', address: '', phone: ''});

  useEffect(() => {
    if (recipient.name) {
      setRecipientState(recipient);
      reset({
        name: recipient.name,
        phone: recipient.phone,
      });
    }
  }, [route]);

  const {
    control,
    reset,
    formState: {isValid},
    handleSubmit,
  } = useForm({resolver: yupResolver(schema), mode: 'onChange'});

  const onSubmit = (data: any) => {
    dispatch(addRecipient(data));
    navigation.goBack();
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 30,
        paddingHorizontal: 20,
      }}>
      <Text style={{fontWeight: '700', fontSize: 16}}>Recipient Name</Text>
      <MyInput
        name="name"
        control={control}
        rules={{required: true}}
        placeholder="Recipient Name"
        containerStyle={{marginTop: 4}}
        inputContainerStyle={{borderRadius: 8}}
      />

      <Text style={{fontWeight: '700', fontSize: 16, marginTop: 16}}>Email</Text>
      <MyInput
        name="email"
        control={control}
        rules={{required: true}}
        placeholder="Email"
        containerStyle={{marginTop: 4}}
        inputContainerStyle={{borderRadius: 8}}
      />

      <Text style={{fontWeight: '700', fontSize: 16, marginTop: 16}}>Phone</Text>
      <MyInput
        name="phone"
        control={control}
        rules={{required: true}}
        placeholder="Phone"
        keyboardType="numeric"
        containerStyle={{marginTop: 4}}
        inputContainerStyle={{borderRadius: 8}}
      />

      <Button
        title="Done"
        containerStyle={{marginTop: 28, marginBottom: 20}}
        buttonStyle={{backgroundColor: COLORS.golden, borderRadius: 4}}
        titleStyle={{color: COLORS.black1, marginVertical: 2}}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      />
    </View>
  );
};

export default RecipientScreen;
