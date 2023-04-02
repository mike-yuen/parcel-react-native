import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';
import {Input, colors} from 'react-native-elements';
import {COLORS} from '~/constants/colors';

const MyInput = (props: any) => {
  const {field} = useController({
    control: props.control,
    defaultValue: '',
    name: props.name,
    rules: props.rules,
  });
  const input: React.RefObject<TextInput> = React.createRef();
  const [focus, setFocus] = useState(false);

  function onFocus() {
    setFocus(true);
    const {onFocus} = props;
    if (onFocus) onFocus();
  }

  function onBlur() {
    setFocus(false);
    const {onBlur} = props;
    if (onBlur) onBlur();
  }

  return (
    <Input
      ref={input}
      {...props}
      value={field.value}
      onChangeText={field.onChange}
      containerStyle={StyleSheet.flatten([
        {
          display: 'flex',
          paddingHorizontal: 0,
        },
        props.containerStyle,
      ])}
      labelStyle={{fontWeight: '700', fontSize: 14, color: colors.grey2, marginBottom: 4}}
      inputContainerStyle={StyleSheet.flatten([
        {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: props.errors ? 'red' : COLORS.golden,
          borderRadius: 4,
          paddingHorizontal: 10,
        },
        props.inputContainerStyle,
      ])}
      inputStyle={{fontSize: 14, height: 36}}
      errorStyle={{display: 'none'}}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default MyInput;
