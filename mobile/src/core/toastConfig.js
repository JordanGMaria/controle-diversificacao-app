import React from 'react';

import {BaseToast} from 'react-native-toast-message';

export const toastConfig = {
  success: ({text1, text2, ...rest}) => (
    <BaseToast
      {...rest}
      style={{backgroundColor: '#202547', borderLeftColor: '#5cb85c'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        color: '#fff',
      }}
      text2Style={{
        color: '#fff',
      }}
      text1={text1}
      text2={text2}
    />
  ),
  error: ({text1, text2, ...rest}) => {
    <BaseToast
      {...rest}
      style={{backgroundColor: '#202547', borderLeftColor: '#d9534f'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        color: '#fff',
      }}
      text2Style={{
        color: '#fff',
      }}
      text1={text1}
      text2={text2}
    />;
  },
  info: ({text1, text2, ...rest}) => {
    <BaseToast
      {...rest}
      style={{backgroundColor: '#202547', borderLeftColor: '#5bc0de'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        color: '#fff',
      }}
      text2Style={{
        color: '#fff',
      }}
      text1={text1}
      text2={text2}
    />;
  },
};
