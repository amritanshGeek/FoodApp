import React, { FC, useEffect } from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Account, Food, Instamart, Search, Swiggy } from '../screens';
import { NavigationService, reSize } from '../utils';
import { DrawerActions } from '@react-navigation/routers';
import {Colors} from '../utils';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
const { Navigator, Screen } = createBottomTabNavigator();

type TabBarProps = BottomTabBarProps & {};

const MyTabBar: FC<TabBarProps> =({ state, descriptors, navigation })=> {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
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
            style={{ flex: 1 , height:60}}
            key={index}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
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
        name="Swiggy"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="logo-foursquare" color="orange" size={reSize(20)} />
          )
        }}
        component={Swiggy}
      />
      {/* MaterialCommunityIcons */}
      <Screen name="Food" component={Food} />
      <Screen name="Instamart" component={Instamart} />
      <Screen name="Search" component={Search} />
      <Screen name="Account" component={Account} />
    </Navigator>
  );
};

export default HomeTabNavigator;
