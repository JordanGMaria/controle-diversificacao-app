import React from 'react';
import {TouchableOpacity, View, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import {TextTituloModal, TextSubTituloModal} from '../../components/styles';
import api from '../../services/api';

export default function ModalOption({modalVisibleOption, ativo, closeModal}) {
  const navigation = useNavigation();

  function excluir() {
    Alert.alert(
      'Ativo',
      'Deseja desativar o ativo selecionada?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const response = await api.delete(`/jwt/ativo/${ativo._id}`);
            closeModal();
            if (response.data.success) {
              Toast.show({
                text1: 'Sucesso',
                text2: 'Ativo Removido',
                type: 'success',
              });
              setloading(true);
            } else {
              Toast.show({
                text1: 'Erro',
                text2: response.data.err,
                type: 'error',
              });
            }
          },
        },
      ],
      {cancelable: false},
    );
  }
  return (
    <Modal isVisible={modalVisibleOption}>
      <View style={style.modal}>
        <TextTituloModal>Selecione uma opção</TextTituloModal>
        <TouchableOpacity
          onPress={() => {
            closeModal();
            navigation.navigate('Aporte', {ativo});
          }}>
          <TextSubTituloModal>Novo Aporte</TextSubTituloModal>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            closeModal();
            navigation.navigate('Ativo', {ativo});
          }}>
          <TextSubTituloModal>Editar Ativo</TextSubTituloModal>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => excluir()}>
          <TextSubTituloModal>Remover Ativo</TextSubTituloModal>
        </TouchableOpacity>
        <TouchableOpacity style={style.close} onPress={() => closeModal()}>
          <Icon name="closecircleo" color="#d9534f" size={22} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  modal: {padding: 20, borderRadius: 5, backgroundColor: '#ffff'},
  close: {position: 'absolute', top: 30, right: 20},
});
