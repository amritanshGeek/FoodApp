import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabNavigator from './HomeTabNavigator';
import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../utils';
import { Drawer } from '../components';
import { useSelector } from 'react-redux';

const { Navigator, Screen } = createDrawerNavigator();
const isIpad = Platform.OS === 'ios' ? Platform.isPad : false;

/**
 * HomeDrawerNavigator
 */
const HomeDrawerNavigator: FC = () => {
  const data = useSelector(state => state.userDetails.data);
  const token = useSelector(state => state.accessToken.token);
  const allData = useSelector(state => state.allUserDetails.data);

  return (
    <Navigator
      screenOptions={{
        drawerType: 'front',
        sceneContainerStyle: { backgroundColor: Colors.LIGHT_BACKGROUND },
        drawerStyle: [
          styles.drawerStyle,
          { borderRightColor: Colors.LIGHT_BACKGROUND },
        ],
        overlayColor: '#00000040',
        headerShown: false,
      }}
      drawerContent={props => <Drawer {...props} />}
      >
      <Screen name="MainScreen" component={HomeTabNavigator} />
    </Navigator>
  );
};

export default HomeDrawerNavigator;

const styles = StyleSheet.create({
  drawerStyle: {
    borderRightWidth: 0,
  },
});
