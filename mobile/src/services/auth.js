import AsyncStorage from '@react-native-community/async-storage';

export const TOKEN_KEY = 'token';

export const isAuthenticated = async () => await AsyncStorage.getItem(TOKEN_KEY) ? true : false;

export const getToken = async () => await AsyncStorage.getItem(TOKEN_KEY);

export const login = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};
