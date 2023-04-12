import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {Button, CheckBox, Text} from 'react-native-elements';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';

import MyInput from '~/components/MyInput';
import {COLORS} from '~/constants/colors';
import {SUB_ORDER_TYPE} from '~/constants/status';
import {RootState} from '~/store';
import {addProduct, updateProduct} from '~/store/slices/productSlice';

const ProductScreen = ({route}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {products} = useSelector((state: RootState) => state.product);
  const {id} = route.params;

  const [product, setProduct] = useState({name: '', weight: ''});
  const [selectedType, setSelectedType] = useState(SUB_ORDER_TYPE.OTHERS);

  useEffect(() => {
    const temp = products.find(product => product.id === id);
    if (temp) {
      setProduct(temp);
      setSelectedType(temp.type);
      reset({
        name: temp.name,
        weight: temp.weight,
        dimension: temp.dimension,
        l: temp.l,
        w: temp.w,
        h: temp.h,
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
    data.type = selectedType;
    if (data.l && data.w && data.h) data.dimension = `${data.l}x${data.w}x${data.h}`;
    if (id) {
      dispatch(updateProduct({id, ...data}));
    } else {
      dispatch(addProduct({id: uuid.v4(), ...data}));
    }
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 30,
        paddingHorizontal: 20,
      }}>
      <Text style={{fontWeight: '700', fontSize: 16}}>Weight per package (kg)</Text>
      <MyInput
        name="weight"
        control={control}
        rules={{required: true}}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        containerStyle={{marginTop: 4}}
        inputContainerStyle={{borderRadius: 8}}
      />

      <Text style={{fontWeight: '700', fontSize: 16, marginTop: 16}}>Dimensions per package (cm)</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <MyInput
          name="l"
          control={control}
          placeholder="L"
          keyboardType="numeric"
          containerStyle={{maxWidth: '30%', marginTop: 4}}
          inputContainerStyle={{borderRadius: 8}}
        />
        <MyInput
          name="w"
          control={control}
          placeholder="W"
          keyboardType="numeric"
          containerStyle={{maxWidth: '30%', marginTop: 4}}
          inputContainerStyle={{borderRadius: 8}}
        />
        <MyInput
          name="h"
          control={control}
          placeholder="H"
          keyboardType="numeric"
          containerStyle={{maxWidth: '30%', marginTop: 4}}
          inputContainerStyle={{borderRadius: 8}}
        />
      </View>

      <Text style={{fontWeight: '700', fontSize: 16, marginTop: 16}}>Special product type</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 4, marginHorizontal: -8}}>
        <CheckBox
          checked={selectedType === SUB_ORDER_TYPE.FOODS}
          checkedIcon="ios-fast-food"
          uncheckedIcon="ios-fast-food-outline"
          iconType="ionicon"
          checkedColor={'orange'}
          title="Foods"
          size={20}
          onPress={() => setSelectedType(SUB_ORDER_TYPE.FOODS)}
        />
        <CheckBox
          checked={selectedType === SUB_ORDER_TYPE.CLOTHES}
          checkedIcon="ios-shirt"
          uncheckedIcon="ios-shirt-outline"
          iconType="ionicon"
          checkedColor={'blue'}
          title="Clothes"
          size={20}
          onPress={() => setSelectedType(SUB_ORDER_TYPE.CLOTHES)}
        />
        <CheckBox
          checked={selectedType === SUB_ORDER_TYPE.ELECTRIC}
          checkedIcon="game-controller"
          uncheckedIcon="game-controller-outline"
          iconType="ionicon"
          checkedColor={'green'}
          title="Electric"
          size={20}
          onPress={() => setSelectedType(SUB_ORDER_TYPE.ELECTRIC)}
        />
        <CheckBox
          checked={selectedType === SUB_ORDER_TYPE.FRAGILE}
          checkedIcon="glass-fragile"
          uncheckedIcon="glass-fragile"
          iconType="material-community"
          checkedColor={'purple'}
          title="Fragile"
          size={20}
          onPress={() => setSelectedType(SUB_ORDER_TYPE.FRAGILE)}
        />
        <CheckBox
          checked={selectedType === SUB_ORDER_TYPE.OTHERS}
          checkedIcon="social-dropbox"
          uncheckedIcon="social-dropbox"
          iconType="foundation"
          checkedColor={'red'}
          title="Others"
          size={20}
          onPress={() => setSelectedType(SUB_ORDER_TYPE.OTHERS)}
        />
      </View>

      <Text style={{fontWeight: '700', fontSize: 16, marginTop: 16}}>Description</Text>
      <MyInput
        name="name"
        control={control}
        placeholder="Short description about your package"
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
    </ScrollView>
  );
};

export default ProductScreen;
