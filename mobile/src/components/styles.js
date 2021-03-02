import React from 'react';
import styled from 'styled-components/native';
import {Form as Unform} from '@unform/mobile';
import {TextInputMask} from 'react-native-masked-text';

// Pages Auth Style
export const PageAuth = styled.View`
  background-color: ${(props) => props.color || '#ffff'};
  flex: 1;
`;

export const AreaInfo = styled.View`
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

export const AreaForm = styled(Unform)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AreaDividida = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const ButtonLogin = styled.TouchableOpacity`
  font-family: 'Poppins-Regular';
  height: 46px;
  align-self: stretch;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-color: #202547;
  margin: 2%;
  width: 48%;
`;

// Padrão Style

export const Page = styled.ScrollView`
  flex: 1;
  min-height: 800px;
  background-color: ${(props) => props.color || '#ffff'};
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const TextTitulo = styled.Text`
  color: ${(props) => props.color || '#202547'};
  font-family: 'Poppins-Bold';
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
`;

export const TextSubtitulo = styled.Text`
  color: ${(props) => props.color || '#202547'};
  font-family: 'Poppins-Regular';
  font-size: 12px;
  font-weight: normal;
  padding: 10px;
`;

export const Label = styled.Text`
  color: ${(props) => props.color || '#202547'};
  font-family: 'Poppins-Bold';
  font-size: 13px;
  font-weight: 600;
  padding-left: 20px;
  margin-top: 10px;
`;

export const Input = styled.TextInput`
  font-family: 'Poppins-Regular';
  min-height: 46px;
  align-self: stretch;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #202547;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const InputMask = styled(TextInputMask)`
  font-family: 'Poppins-Regular';
  height: 46px;
  align-self: stretch;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #202547;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  font-family: 'Poppins-Regular';
  height: 46px;
  align-self: stretch;
  background: ${(props) => props.color || '#202547'};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
`;

export const TextButton = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${(props) => props.color};
  font-size: 14px;
`;

export const Card = styled.View`
  padding: 10px 15px;
  background-color: #202547;
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const CardInfo = styled.View`
  padding: 10px 15px;
  background-color: #2a356a;
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const CardAreaDividida = styled.View`
  display: flex;
  flex-direction: row;
  padding-top: 5px;
`;

export const Linha = styled.View`
  border-style: solid;
  border-top-width: 1px;
  border-top-color: #ffff;
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const CardLeft = styled.View`
  flex: 1;
  width: 50%;
  align-items: flex-start;
`;

export const CardRight = styled.View`
  flex: 1;
  width: 50%;
  align-items: flex-end;
`;

export const CardButton = styled.TouchableOpacity`
  font-family: 'Poppins-Regular';
  height: 26px;
  align-self: stretch;
  background: ${(props) => props.color || '#fff'};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const CardTextButton = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${(props) => props.color};
  font-size: 12px;
`;

export const TextCardPrimary = styled.Text`
  color: #ffff;
  font-family: 'Poppins-Bold';
  font-size: 14px;
`;

export const TextCardSubtitulo = styled.Text`
  color: #ffff;
  font-family: 'Poppins-Regular';
  font-size: 10px;
`;

export const Lucro = styled.Text`
  color: ${(props) => props.color || '#ffff'};
  font-family: 'Poppins-Regular';
  font-size: 10px;
`;

export const TextTituloModal = styled.Text`
  color: ${(props) => props.color || '#202547'};
  font-family: 'Poppins-Regular';
  font-size: 17px;
  font-weight: 600;
  padding: 10px;
`;

export const TextSubTituloModal = styled.Text`
  color: ${(props) => props.color || '#202547'};
  font-family: 'Poppins-Bold';
  font-size: 13px;
  font-weight: normal;
  padding: 10px 10px;
`;

export const SideBarView = styled.View`
  flex: 1;
  background-color: #202547;
`;

export const HeaderBar = styled.View`
  height: 180px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #fff;
`;

export const TextTituloBar = styled.Text`
  color: ${(props) => props.color || '#202547'};
  font-family: 'Poppins-Bold';
  font-size: 17px;
  font-weight: 600;
  padding: 10px;
`;

export const BodyBar = styled.View`
  padding: 20px;
`;

export const ListItem = styled.View`
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
`;
