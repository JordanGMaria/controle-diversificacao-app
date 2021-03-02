import React from 'react';
import {StatusBar} from 'react-native';
import {Page, TextTitulo, TextSubtitulo} from '../../components/styles';

export default function Sobre({navigation}) {
  return (
    <Page>
      <StatusBar barStyle="light-content" backgroundColor="#202547" />

      <TextTitulo>Sobre o App</TextTitulo>
      <TextSubtitulo>
        Buscando sempre a eficiência e simplicidade desenvolvemos um App pra
        facilitar o controle de sua carteira de investimentos, auxiliando na
        decisão compra de ativos.
      </TextSubtitulo>
      <TextSubtitulo>
        Um dos princípios básico do investimento é a diversificação, nosso foco
        é entregar para você de forma clara o peso de cada ativo da sua
        carteira.
      </TextSubtitulo>
      <TextSubtitulo>
        Nós encontramos na versão 1.0, novos recursos serão desenvolvidos na
        sequência, como por exemplo cotação automática.
      </TextSubtitulo>
      <TextSubtitulo>
        Fique a vontade para sugerir novas funcionalidades.
      </TextSubtitulo>
    </Page>
  );
}
