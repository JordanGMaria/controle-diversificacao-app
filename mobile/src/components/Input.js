import React, {useEffect, useRef, useState} from 'react';
import {Input} from './styles';
import {useField} from '@unform/core';

function InputForm({name, ...rest}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue, error} = useField(name);
  const [styleComponent, setstyleComponent] = useState({});
  const [placeholderTextColor, setplaceholderTextColor] = useState('#202547');

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({text: value.toString()});
        inputRef.current.value = value.toString();
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (error) {
      setstyleComponent({borderColor: '#d9534f'});
      setplaceholderTextColor('#d9534f');
    } else {
      setplaceholderTextColor('#202547');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return (
    <>
      <Input
        ref={inputRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        placeholderTextColor={placeholderTextColor}
        style={styleComponent}
        onChangeText={(value) => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />
    </>
  );
}
export default InputForm;
