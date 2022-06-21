import React, { FC, useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ParentContainer,
  } from '../components';
  import { NavigationService } from '../utils';
import {
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
            options={{ headerShown: false, }}
          />
          <AppStack.Screen
            name={NavigationService.ScreenNames.SignUp}
            component={SignUp}
            options={{ headerShown: false, }}
          />
        </AppStack.Navigator>
    </ParentContainer>
  );
};

export default AuthNavigator;
