import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Drawer from 'react-native-drawer';
import SideBar from './src/components/SideBar';
import api from './src/services/api';
import {isAuthenticated} from './src/services/auth';
import Inicial from './src/pages/auth/Inicial/Inicial';
import Login from './src/pages/auth/Login/Login';
import Registrar from './src/pages/auth/Registrar/Registrar';
import Home from './src/pages/Home/Home';
import AddEditAtivo from './src/pages/Ativo/AddEditAtivo';
import FazerAporte from './src/pages/Ativo/FazerAporte';
import Ajustes from './src/pages/Ajustes/Ajustes';
import Feedback from './src/pages/Feedback/Feedback';
import Sobre from './src/pages/Sobre/Sobre';

const Stack = createStackNavigator();

export default function App() {
  const [Authenticated, setAuthenticated] = useState(false);
  const [usuario, setusuario] = useState(null);

  const navigationRef = useRef(null);
  const drawer = useRef(null);

  const fetchData = async () => {
    const authenticated = await isAuthenticated();
    setAuthenticated(authenticated);

    if (authenticated) {
      const response = await api.post('/jwt/usuario/me');
      if (response.data) setusuario(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Drawer
          ref={drawer}
          type="overlay"
          tapToClose={true}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          content={
            <SideBar drawer={drawer} usuario={usuario} navigation={navigationRef.current} />
          }>
          <Stack.Navigator initialRouteName={Authenticated ? 'Home' : 'Login'}>
            <Stack.Screen
              name="Inicial"
              component={Inicial}
              options={{
                title: '',
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: '',
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="Registrar"
              component={Registrar}
              options={{
                title: 'Etapa 1 / 2',
                headerStyle: {
                  backgroundColor: '#ffff',
                },
                headerTintColor: '#202547',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 'normal',
                  fontSize: 15,
                },
              }}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Home',
                headerStyle: {
                  backgroundColor: '#2a356a',
                },
                headerTintColor: '#ffff',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 'normal',
                  fontSize: 15,
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => drawer.current.open()}>
                    <Icon
                      name="menu"
                      style={{marginLeft: 20, color: '#ffff'}}
                      size={22}
                    />
                  </TouchableOpacity>
                ),
              }}
            />

            <Stack.Screen
              name="Ativo"
              component={AddEditAtivo}
              options={{
                title: 'Adicionar Ativo',
                headerStyle: {
                  backgroundColor: '#ffff',
                },
                headerTintColor: '#202547',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 'normal',
                  fontSize: 15,
                },
              }}
            />
            
            <Stack.Screen
              name="Aporte"
              component={FazerAporte}
              options={{
                title: 'Novo Aporte',
                headerStyle: {
                  backgroundColor: '#ffff',
                },
                headerTintColor: '#202547',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 'normal',
                  fontSize: 15,
                },
              }}
            />
            <Stack.Screen
              name="Ajustes"
              component={Ajustes}
              options={{
                title: 'Ajustes',
                headerStyle: {
                  backgroundColor: '#ffff',
                },
                headerTintColor: '#202547',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 'normal',
                  fontSize: 15,
                },
              }}
            />
            <Stack.Screen
              name="Feedback"
              component={Feedback}
              options={{
                title: 'Feedback',
                headerStyle: {
                  backgroundColor: '#ffff',
                },
                headerTintColor: '#202547',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 'normal',
                  fontSize: 15,
                },
              }}
            />
            <Stack.Screen
              name="Sobre"
              component={Sobre}
              options={{
                title: 'Sobre',
                headerStyle: {
                  backgroundColor: '#ffff',
                },
                headerTintColor: '#202547',
                headerTitleStyle: {
                  fontFamily: 'Poppins-Regular',
                  fontWeight: 'normal',
                  fontSize: 15,
                },
              }}
            />
          </Stack.Navigator>
        </Drawer>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
