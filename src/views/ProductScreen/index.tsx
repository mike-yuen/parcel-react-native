import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useWindowDimensions, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';

import MyInput from '~/components/MyInput';
import {COLORS} from '~/constants/colors';
import {RootState} from '~/store';
import {addProduct, updateProduct} from '~/store/slices/productSlice';

const ProductScreen = ({route}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const dimemsion = useWindowDimensions();
  const {products} = useSelector((state: RootState) => state.product);
  const {id} = route.params;

  const [product, setProduct] = useState({name: '', weight: ''});

  useEffect(() => {
    const temp = products.find(product => product.id === id);
    if (temp) {
      setProduct(temp);
      reset({
        name: temp.name,
        weight: temp.weight,
      });
    }
  }, [route]);

  const {
    control,
    reset,
    formState: {isValid},
    handleSubmit,
  } = useForm({mode: 'onChange'});

  const onSubmit = (data: any) => {
    if (id) {
      dispatch(updateProduct({id, ...data}));
    } else {
      dispatch(addProduct({id: uuid.v4(), ...data}));
    }
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
      <Text style={{fontWeight: '700', fontSize: 16}}>Product Name</Text>
      <MyInput
        name="name"
        control={control}
        rules={{required: true}}
        placeholder="Product Name"
        containerStyle={{marginTop: 4}}
        inputContainerStyle={{borderRadius: 8}}
      />

      <Text style={{fontWeight: '700', fontSize: 16, marginTop: 16}}>Weight</Text>
      <MyInput
        name="weight"
        control={control}
        rules={{required: true}}
        placeholder="Weight"
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

export default ProductScreen;
