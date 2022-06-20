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
} from '../screens';

const AppStack = createStackNavigator();

const AuthNavigator: FC = () => {

  return (
    <ParentContainer>
        <AppStack.Navigator
          initialRouteName={NavigationService.ScreenNames.Dashboard}
          screenOptions={{
            headerMode: 'float',
            // headerBackgroundContainerStyle: {
            //   backgroundColor: colors.background,
            // },
            // cardStyle: { backgroundColor: colors.background },
            headerTintColor: '#fff',
          }}>
          <AppStack.Screen
            name={NavigationService.ScreenNames.Dashboard}
            component={Swiggy}
            options={{ title: 'Dashboard' }}
          />
          <AppStack.Screen
            name={NavigationService.ScreenNames.Food}
            options={{ title: 'Food' }}
            component={Food}
          />
          <AppStack.Screen
            name={NavigationService.ScreenNames.Instamart}
            component={Instamart}
            options={{ title: 'Instamart' }}
          />
          <AppStack.Screen
            name={NavigationService.ScreenNames.Search}
            component={Search}
            options={{ title: 'Search' }}
          />
          <AppStack.Screen
            name={NavigationService.ScreenNames.Account}
            options={{
              headerShown: false,
              header: () => <View />,
            }}
            component={Account}
          />
        </AppStack.Navigator>
    </ParentContainer>
  );
};

export default AuthNavigator;
