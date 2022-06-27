import React, {useContext, useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
// import { Test } from '@screens';

const MainStack = createStackNavigator();

import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';


const MainNavigator = () => {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
  
    const onAuthStateChanged = (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;

    // const { token } = useSelector(state => state.accessToken);
    // console.log('token:', token);
    return (
        <MainStack.Navigator
          initialRouteName={user ? 'App' : 'Auth'}
          // initialRouteName={'App'}
          // initialRouteName="Test"
          screenOptions={{
              headerShown: false,
          }}>
          {user?
          <MainStack.Screen name="App" component={AppNavigator} />
          :
          <MainStack.Screen name="Auth" component={AuthNavigator} />
          }
        </MainStack.Navigator>
    );
};

export default MainNavigator;
