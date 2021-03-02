import React, {useRef, useEffect} from 'react';
import {StatusBar} from 'react-native';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import {Form} from '@unform/mobile';
import {Page, Button, TextButton, Label, PageAuth} from '../../components/styles';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../core/toastConfig';
import wait from '../../core/wait';
import * as Yup from 'yup';
import api from '../../services/api';

export default function AddEditAtivo({route, navigation}) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome é obrigatório'),
        preco_medio: Yup.string().required('Preço Médio é obrigatório'),
        quantidade: Yup.string().required('Quantidade é obrigatório'),
        nota: Yup.string().required('Nota é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      let response;
      if (route.params && route.params.ativo) {
        const ativo = route.params.ativo;

        data._id = ativo._id;

        response = await api.put('/jwt/ativo', data);
      } else {
        response = await api.post('/jwt/ativo', data);
      }

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
        text2: 'Ativo Salvo com sucesso 🚀',
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
    const ativo = route.params?.ativo;
    if (ativo && formRef.current) {
      formRef.current.setData(ativo);
    }
  }

  useEffect(() => {
    fetchData();
  }, [route.params]);

  return (
    <PageAuth>
      <StatusBar barStyle="light-content" backgroundColor="#202547" />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Label>Nome Ativo (SIGLA)</Label>
        <Input
          name="nome"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Exemplo ITSA4"
        />
        <Label>Corretora</Label>
        <Input
          name="corretora"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Exemplo CLEAR"
        />
        <Label>Preço Médio do Ativo</Label>
        <InputMask
          name="preco_medio"
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: '',
          }}
          keyboardType={'numeric'}
          placeholder="Preço Médio"
        />
        <Label>Quantidade</Label>
        <Input
          name="quantidade"
          keyboardType={'numeric'}
          placeholder="Quantidade"
        />
        <Label>Nota</Label>
        <Input name="nota" keyboardType={'numeric'} placeholder="Exemplo 10" />
        <Label>Preço atual da cotação</Label>
        <InputMask
          name="preco"
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$',
            suffixUnit: '',
          }}
          keyboardType={'numeric'}
          placeholder="Preço"
        />
        <Label>Catergoria</Label>
        <Input
          name="tipo"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Exemplo Ação"
        />

        <Label>Setor</Label>
        <Input
          name="setor"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Financeiro"
        />
        <Button onPress={() => formRef.current.submitForm()}>
          <TextButton color="#ebeaea">Salvar</TextButton>
        </Button>
      </Form>
    </PageAuth>
  );
}
