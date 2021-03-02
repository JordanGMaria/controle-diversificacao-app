import React, {useRef, useEffect, useState} from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import {Form} from '@unform/mobile';
import {Page, Button, TextButton} from '../../components/styles';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../core/toastConfig';
import Select from 'react-native-select-two';
import * as Yup from 'yup';
import api from '../../services/api';

export default function FazerAporte({route, navigation}) {
  const formRef = useRef(null);
  const [lista, setlista] = useState([]);

  const [ativo, setativo] = useState(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        preco: Yup.string().required('Preço é obrigatório'),
        quantidade: Yup.string().required('Quantidade é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      data.ativo = ativo;

      if (!data.ativo) {
        Toast.show({
          text1: 'Erro',
          text2: 'Selecionar um Ativo',
          type: 'error',
        });
      }

      const response = await api.post('/jwt/ativo/aporte', data);

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
    const response = await api.post('/jwt/ativo/list', {
      all: true,
    });
    response.data.data.map((el, i) => {
      el.id = el._id;
      el.name = el.nome;

      if (
        route.params &&
        route.params.ativo &&
        route.params.ativo._id.toString() === el._id.toString()
      ) {
        el.checked = true;
        setativo(route.params.ativo._id);
      } else {
        el.checked = false;
      }

      return el;
    });
    setlista(response.data.data);
  }

  useEffect(() => {
    fetchData();
  }, [route.params]);

  return (
    <Page>
      <StatusBar barStyle="light-content" backgroundColor="#202547" />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <View style={{marginRight: 10, marginLeft: 10}}>
          <Select
            isSelectSingle
            colorTheme="#202547"
            popupTitle="Selecionar Ativo"
            title="Selecionar Ativo"
            searchPlaceHolderText="Selecionar Ativo"
            cancelButtonText="Cancelar"
            selectButtonText="Selecionar"
            style={style.select}
            data={lista}
            onSelect={(data) => {
              setativo(data[0]);
            }}
          />
        </View>
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
          options={{
            mask: '99/99/9999',
          }}
          placeholder="Preço Compra"
        />
        <Input
          name="quantidade"
          keyboardType={'numeric'}
          placeholder="Quantidade"
        />
        <Button onPress={() => formRef.current.submitForm()}>
          <TextButton color="#ebeaea">Salvar</TextButton>
        </Button>
      </Form>
    </Page>
  );
}

const style = StyleSheet.create({
  select: {
    fontFamily: 'Poppins-Regular',
    height: 46,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomColor: '#202547',
    paddingLeft: 15,
    color: '#202547',
    marginTop: 10,
    marginBottom: 10,
  },
});
