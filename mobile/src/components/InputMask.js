import React, {useEffect, useRef, useState} from 'react';
import {InputMask} from './styles';
import {useField} from '@unform/core';
function Input({name, type, rawValue, ...rest}) {
  const inputRef = useRef(null);
  const {fieldName, registerField, defaultValue, error} = useField(name);
  const [mask, setMask] = useState('');
  const [styleComponent, setstyleComponent] = useState({});
  const [placeholderTextColor, setplaceholderTextColor] = useState('#202547');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_input.value',
      getValue() {
        if (type === 'money') {
          return inputRef.current.getRawValue() || undefined;
        } else {
          return mask;
        }
      },
      setValue(ref, value) {
        setMask(value.toString());
      },
    });
  }, [fieldName, registerField, mask]);

  useEffect(() => {
    console.log('error', error);
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
      <InputMask
        ref={inputRef}
        type={type}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        placeholderTextColor={placeholderTextColor}
        style={styleComponent}
        value={mask}
        onChangeText={(e) => setMask(e)}
        {...rest}
      />
    </>
  );
}
export default Input;
