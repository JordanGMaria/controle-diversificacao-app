import React from 'react';
import {StatusBar} from 'react-native';
import {
  PageAuth,
} from '../../../components/styles';

export default function Inicial({navigation}) {
  return (
    <PageAuth color='#7C62DB'>
      <StatusBar barStyle="light-content" backgroundColor="#7C62DB" />
     
    </PageAuth>
  );
}
