import React, { FC, memo, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationService, Colors, reSize } from '../../utils';
import { DrawerActions } from '@react-navigation/native';
import DrawerButton from './DrawerButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { dispatch } from '../../store';
import { removeAccessToken, removeUserDetails, removeUsersDataDetails } from '../../Features';

/**
 * DrawerProps
 */
type DrawerProps = DrawerContentComponentProps & {};

/**
 * Drawer
 */
const Drawer: FC<DrawerProps> = () => {
  const { top, bottom } = useSafeAreaInsets();
  // const { t } = useTranslation();

  const onLogoutPressed = useCallback(() => {
    // Alert.alert('logout pressed');
    Alert.alert(  
      'Are You Sure Want to Logout',
      '',
      [  
        {  
          text: 'Cancel',  
          onPress: () => {},
          style: 'cancel',  
        },  
        {
          text: 'Yes', 
          onPress: () => {
            dispatch(removeAccessToken());
            dispatch(removeUserDetails());
            // dispatch(removeUsersDataDetails());
            NavigationService.replace('Auth');
            // dispatch({ type: 'RESET' });
            console.log('lgout now');
          }
        },  
      ]
    );
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: Colors.LIGHT_BACKGROUND }]}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: top,
          paddingBottom: bottom,
          alignSelf: 'stretch',
        }}
        showsVerticalScrollIndicator={false}>
        {/* User Icon */}
        {/* <UserDetails /> */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            margin: reSize(20),
          }}>
          <Ionicons name="logo-foursquare" color="orange" size={reSize(50)} />
        </View>
        <DrawerButton
          onPress={() => {
            // NavigationService.navigate(
            //   NavigationService.ScreenNames.Cart,
            // );
            NavigationService.dispatch(DrawerActions.closeDrawer());
          }}
          icon="food-takeout-box"
          text="Cart"
          // badge={2}
        />
        <DrawerButton
          icon="food"
          text="Food Home"
          badge={4}
          onPress={() => {
            // NavigationService.navigate(
            //   NavigationService.ScreenNames.Home,
            // );
            NavigationService.dispatch(DrawerActions.closeDrawer());
          }}
        />
        <DrawerButton
          icon="food-variant"
          text="New Varieties"
          onPress={() => {
            // NavigationService.navigate(NavigationService.ScreenNames.Varieties);
            NavigationService.dispatch(DrawerActions.closeDrawer());
          }}
        />
        <DrawerButton
          icon="logout"
          text="Logout"
          onPress={onLogoutPressed}
        />
      </ScrollView>
    </View>
  );
};

export default memo(Drawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
