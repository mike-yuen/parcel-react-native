import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';
import {Input, colors} from 'react-native-elements';

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
          borderColor: props.errors ? 'red' : focus ? '#5f5fff' : colors.grey4,
          borderRadius: 8,
          paddingHorizontal: 10,
        },
        props.inputContainerStyle,
      ])}
      inputStyle={{fontSize: 14, height: 36}}
      errorStyle={{display: 'none'}}
      autoCompleteType={false}
      //   rightIcon={{type: 'ionicon', name: 'close-circle', size: 18}}
      //   rightIconContainerStyle={{fontSize: 10}}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default MyInput;
