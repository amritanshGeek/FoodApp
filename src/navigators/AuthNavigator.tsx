import React, { FC, useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ParentContainer,
  } from '../components';
  import { NavigationService } from '../utils';
import { View } from 'react-native';
import {
    Home,
    Cart,
    Drawer,
    Swiggy,
    Food,
    Instamart,
    Search,
    Account,
    SignIn,
    SignUp,
} from '../screens';

const AppStack = createStackNavigator();

const AuthNavigator: FC = () => {

  return (
    <ParentContainer>
        <AppStack.Navigator
          initialRouteName={NavigationService.ScreenNames.SignIn}
          screenOptions={{
            headerMode: 'float',
            // headerBackgroundContainerStyle: {
            //   backgroundColor: colors.background,
            // },
            // cardStyle: { backgroundColor: colors.background },
            headerTintColor: '#fff',
          }}>
          <AppStack.Screen
            name={NavigationService.ScreenNames.SignIn}
            component={SignIn}
            options={{ title: 'Dashboard' }}
          />
          <AppStack.Screen
            name={NavigationService.ScreenNames.SignUp}
            options={{ title: 'Food' }}
            component={SignUp}
          />
        </AppStack.Navigator>
    </ParentContainer>
  );
};

export default AuthNavigator;
