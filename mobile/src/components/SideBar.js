import React, {useState, useEffect} from 'react';
import {
  SideBarView,
  HeaderBar,
  TextTituloBar,
  BodyBar,
  ListItem,
  TextSubtitulo,
} from './styles';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { logout } from '../services/auth';

export default function SideBar({navigation, usuario, drawer}) {

  const list = [
    {
      title: 'Ajustes',
      page: 'Ajustes',
      icon: 'wrench',
    },
    {
      title: 'Ajuda e Feedback',
      page: 'Feedback',
      icon: 'question',
    },
    {
      title: 'Sobre o App',
      page: 'Sobre',
      icon: 'info',
    },
    {
      title: 'Sair',
      page: 'Login',
      icon: 'logout',
    },
  ];

  return (
    <SideBarView>
      <HeaderBar>
        <TextTituloBar>Olá {usuario ? usuario.nome : 'Investidor'}</TextTituloBar>
      </HeaderBar>
      <BodyBar>
        {list.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={async () => {
              if (item.page === 'Login') {
                await logout();
              }
              drawer.current.close();
              navigation?.navigate(item.page);
            }}>
            <ListItem>
              <Icon
                name={item.icon}
                style={{marginTop: 10}}
                color="#fff"
                size={18}
              />
              <TextSubtitulo color="#fff">{item.title}</TextSubtitulo>
            </ListItem>
          </TouchableOpacity>
        ))}
      </BodyBar>
    </SideBarView>
  );
}
