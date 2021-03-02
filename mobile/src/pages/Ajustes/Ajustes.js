import React, {useRef, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import {Form} from '@unform/mobile';
import {Page, Button, TextButton} from '../../components/styles';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {toastConfig} from '../../core/toastConfig';
import wait from '../../core/wait';
import * as Yup from 'yup';
import api from '../../services/api';

export default function Ajustes({navigation}) {
  const formRef = useRef(null);
  const [usuario, setusuario] = useState(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Email inválido')
          .required('Email é obrigatório'),
        nome: Yup.string().required('Nome é obrigatório'),
        telefone: Yup.string().required('Telefone é obrigatório'),
        dataNasc: Yup.string().required('Data de Nascimento é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      data._id = usuario._id;

      data.dataNasc = moment(data.dataNasc, 'DD/MM/YYYY').toDate();

      const response = await api.put('/jwt/usuario', data);

      if (!response.data.success) {
        Toast.show({
          text1: 'Erro',
          text2: response.data.err,
          type: 'error',
        });
        return;
      }

      Toast.show({
        text1: 'Sucesso',
        text2: 'Alterações Salva com sucesso 🚀',
        type: 'success',
      });

      await wait(1000);

      navigation.navigate('Home');
    } catch (err) {
      console.log('err', err);
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        Toast.show({
          text1: 'Erro',
          text2: 'Completar dados',
          type: 'error',
        });
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  async function fetchData() {
    const response = await api.post('/jwt/usuario/me');
    if (response.data && formRef.current) {
      setusuario(response.data);
      formRef.current.setData(response.data);
      formRef.current.setFieldValue(
        'dataNasc',
        moment(response.data.dataNasc).format('DD/MM/YYYY'),
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page>
      <StatusBar barStyle="light-content" backgroundColor="#202547" />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="nome"
          autoCapitalize="none"
          autoCorrect={true}
          placeholder="Nome completo"
        />
        <InputMask
          name="dataNasc"
          type={'custom'}
          keyboardType={'numeric'}
          options={{
            mask: '99/99/9999',
          }}
          autoCapitalize="none"
          autoCorrect={true}
          placeholder="Data de Nascimento"
        />
        <InputMask
          name="telefone"
          type={'custom'}
          keyboardType={'numeric'}
          options={{
            mask: '(99) 99999-9999',
          }}
          autoCapitalize="none"
          autoCorrect={true}
          placeholder="Telefone"
        />
        <Input
          name="email"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Email"
        />

        <Button onPress={() => formRef.current.submitForm()}>
          <TextButton color="#ebeaea">Salvar</TextButton>
        </Button>
      </Form>
    </Page>
  );
}
