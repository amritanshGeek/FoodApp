import React, { FC, useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ParentContainer,
} from '../components';
import { NavigationService } from '../utils';
import { View } from 'react-native';
import AppDrawer from './HomeDrawerNavigator';
import {
    Home,
    Cart,
    Drawer,
    Dashboard,
    Food,
    Instamart,
    Search,
    Account,
} from '../screens';

const AppStack = createStackNavigator();

const AppNavigator: FC = () => {

  return (
    <ParentContainer>
        <AppStack.Navigator
          initialRouteName={NavigationService.ScreenNames.AppDrawer}
          screenOptions={{
            headerMode: 'float',
            // headerBackgroundContainerStyle: {
            //   backgroundColor: colors.background,
            // },
            // cardStyle: { backgroundColor: colors.background },
            headerTintColor: '#fff',
          }}>
          <AppStack.Screen
            name={NavigationService.ScreenNames.AppDrawer}
            options={{
              headerShown: false,
            }}
            component={AppDrawer}
          />
          <AppStack.Screen
            name={NavigationService.ScreenNames.Dashboard}
            component={Dashboard}
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

export default AppNavigator;
