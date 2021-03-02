import React, {useRef} from 'react';
import {StatusBar} from 'react-native';
import Input from '../../../components/Input';
import InputMask from '../../../components/InputMask';
import {
  PageAuth,
  TextTitulo,
  TextSubtitulo,
  AreaInfo,
  AreaForm,
  Button,
  TextButton,
} from '../../../components/styles';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import * as Yup from 'yup';
import {login} from '../../../services/auth';
import {toastConfig} from '../../../core/toastConfig';
import api from '../../../services/api';

export default function Registrar({navigation}) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Email inválido')
          .required('Email é obrigatório'),
        password: Yup.string().required('Senha é obrigatório'),
        nome: Yup.string().required('Nome é obrigatório'),
        telefone: Yup.string().required('Telefone é obrigatório'),
        dataNasc: Yup.string().required('Data de Nascimento é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      data.dataNasc = moment(data.dataNasc, 'DD/MM/YYYY').toDate();

      const response = await api.post('/registrar', data);
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
        text2: 'Cadastro Efetuado com sucesso 🚀',
        type: 'success',
      });
      await login(response.data.token);
      navigation.navigate('Home');
    } catch (err) {
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
  return (
    <PageAuth>
      <StatusBar barStyle="light-content" backgroundColor="#202547" />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <AreaForm ref={formRef} onSubmit={handleSubmit}>
        <AreaInfo>
          <TextTitulo>Faça seu registro</TextTitulo>
          <TextSubtitulo>Informe os dados necessários</TextSubtitulo>
        </AreaInfo>
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
        <Input
          name="password"
          type="password"
          password
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Senha"
        />
        <Button onPress={() => formRef.current.submitForm()}>
          <TextButton color="#ebeaea">Registrar</TextButton>
        </Button>
      </AreaForm>
    </PageAuth>
  );
}
