import React, {useRef} from 'react';
import {StatusBar} from 'react-native';
import Input from '../../components/Input';
import {Form} from '@unform/mobile';
import {Page, Button, TextButton, TextSubtitulo} from '../../components/styles';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../core/toastConfig';
import wait from '../../core/wait';
import * as Yup from 'yup';
import api from '../../services/api';

export default function Feedback({navigation}) {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        msg: Yup.string().required('Mensagem é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('/jwt/feedback', data);

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
        text2: 'Feedback enviado com sucesso 🚀',
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

  return (
    <Page>
      <StatusBar barStyle="light-content" backgroundColor="#202547" />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <TextSubtitulo>
        Conte sobre sua experiência com o uso do App
      </TextSubtitulo>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="msg"
          autoCapitalize="none"
          autoCorrect={true}
          placeholder="Digite sua Mensagem"
          multiline={true}
          numberOfLines={3}
        />

        <Button onPress={() => formRef.current.submitForm()}>
          <TextButton color="#ebeaea">Salvar</TextButton>
        </Button>
      </Form>
    </Page>
  );
}
