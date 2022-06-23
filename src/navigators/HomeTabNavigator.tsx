import React, { FC, useEffect } from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Account, Food, Instamart, Search, Dashboard } from '../screens';
import { NavigationService, reSize } from '../utils';
import { DrawerActions } from '@react-navigation/routers';
import {Colors} from '../utils';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View } from 'native-base';
Ionicons.loadFont();
MaterialCommunityIcons.loadFont();
const { Navigator, Screen } = createBottomTabNavigator();

type TabBarProps = BottomTabBarProps & {};

const MyTabBar: FC<TabBarProps> =({ state, descriptors, navigation })=> {
  return (
    <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
      {state.routes.map((route, index) => {
        console.log('route',route);
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 , height:60,alignItems:'center'}}
            key={index}
          >
            <MaterialCommunityIcons name={index==2?'store-search':route.name.toLocaleLowerCase()} color={'#000'} size={20} />
            <Text bold={isFocused} style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/**
 * HomeTabNavigator
 */
const HomeTabNavigator: FC = () => {

  return (
    <Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.LIGHT_BACKGROUND },
        // headerTitleStyle: Font.BOLD,
        headerTransparent: true,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
        }}
        component={Dashboard}
      />
      <Screen
        name="Filter"
        options={{
          headerShown: false,
          tabBarLabel: 'Filter',
        }} 
        component={Food}
      />
      <Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
        }}
        component={Search}
      />
      <Screen
        name="Account"
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
        }}
        component={Account}
      />
    </Navigator>
  );
};

export default HomeTabNavigator;
