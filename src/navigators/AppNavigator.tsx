import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ParentContainer} from '../components';
import {NavigationService} from '../utils';
import {View} from 'react-native';
import AppDrawer from './HomeDrawerNavigator';
import {Dashboard, Cart, Search, Account, OrderHistory, FoodDetail} from '../screens';

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
          options={{title: 'Dashboard'}}
        />
        <AppStack.Screen
          name={NavigationService.ScreenNames.Cart}
          options={{title: 'Cart'}}
          component={Cart}
        />
        <AppStack.Screen
          name={NavigationService.ScreenNames.Search}
          component={Search}
          options={{title: 'Search'}}
        />
        <AppStack.Screen
          name={NavigationService.ScreenNames.Account}
          options={{
            headerShown: false,
            header: () => <View />,
          }}
          component={Account}
        />
        <AppStack.Screen
          name={NavigationService.ScreenNames.OrderHistory}
          options={{
            headerShown: false,
          }}
          component={OrderHistory}
        />
        <AppStack.Screen
          name={NavigationService.ScreenNames.FoodDetail}
          options={{
            headerShown: false,
          }}
          component={FoodDetail}
        />
      </AppStack.Navigator>
    </ParentContainer>
  );
};

export default AppNavigator;
