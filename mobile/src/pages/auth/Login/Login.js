import React, {useRef, useEffect} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../../../components/Input';
import {
  PageAuth,
  TextTitulo,
  TextSubtitulo,
  AreaForm,
  Button,
  ButtonLogin,
  TextButton,
  AreaDividida,
} from '../../../components/styles';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import {login} from '../../../services/auth';
import {toastConfig} from '../../../core/toastConfig';
import api from '../../../services/api';

export default function Login({navigation}) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Email inválido')
          .required('Email é obrigatório'),
        password: Yup.string().required('Senha é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('/login', data);

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
        text2: 'Login Efetuado com sucesso 🚀',
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
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <StatusBar barStyle="light-content" backgroundColor="#202547" />
      <AreaForm ref={formRef} onSubmit={handleSubmit}>
        <TextTitulo>Acessar carteira</TextTitulo>
        <TextSubtitulo>Digite seu email e senha para começar</TextSubtitulo>

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
        <TouchableOpacity onPress={() => navigation.navigate('Registrar')}>
          <TextSubtitulo>Esqueci minha senha</TextSubtitulo>
        </TouchableOpacity>
        <Button onPress={() => formRef.current.submitForm()}>
          <TextButton color="#ebeaea">Entrar</TextButton>
        </Button>
        <TextSubtitulo>Ou</TextSubtitulo>
        <AreaDividida>
          <ButtonLogin>
            <TextButton color="#202547">
              <Icon
                name="facebook"
                size={18}
                style={{color: '#166FE5', marginRight: 10}}
              />{' '}
              Facebook
            </TextButton>
          </ButtonLogin>
          <ButtonLogin>
            <TextButton color="#202547">
              <Icon
                name="google"
                size={18}
                style={{color: 'red', marginRight: 10}}
              />{' '}
              Google
            </TextButton>
          </ButtonLogin>
        </AreaDividida>
        <TouchableOpacity onPress={() => navigation.navigate('Registrar')}>
          <TextSubtitulo>Ainda não tenho conta</TextSubtitulo>
        </TouchableOpacity>
      </AreaForm>
    </PageAuth>
  );
}
