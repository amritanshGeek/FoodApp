import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
// import { Test } from '@screens';

const MainStack = createStackNavigator();

const MainNavigator = () => {
    const { token } = useSelector(state => state.accessToken);
    console.log('token:', token);
    return (
        <MainStack.Navigator
            initialRouteName={token ? 'App' : 'Auth'}
            // initialRouteName={'App'}
            // initialRouteName="Test"
            screenOptions={{
                headerShown: false,
            }}>
            <MainStack.Screen name="Auth" component={AuthNavigator} />
            <MainStack.Screen name="App" component={AppNavigator} />
        </MainStack.Navigator>
    );
};

export default MainNavigator;
