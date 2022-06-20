import React, { FC, memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationService, Colors } from '../../utils';
import { DrawerActions } from '@react-navigation/native';
import DrawerButton from './DrawerButton';
// import { dispatch } from '@store';

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

  // const onLogoutPressed = useCallback(() => {
  //   Alert?.open({
  //     title: t('text.logout'),
  //     description: t('text.logoutDescription'),
  //     onPressConfirm: () => {
  //       NavigationService.replace('Auth');
  //       dispatch({ type: 'RESET' });
  //       console.log('lgout now');
  //     },
  //     onPressCancel: () => {
  //       console.log('cancel logo8ut');
  //     },
  //   });
  // }, [t]);
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
        <DrawerButton
          onPress={() => {
            NavigationService.navigate(
              NavigationService.ScreenNames.Cart,
            );
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
            NavigationService.navigate(
              NavigationService.ScreenNames.Home,
            );
            NavigationService.dispatch(DrawerActions.closeDrawer());
          }}
        />
        <DrawerButton
          icon="food-variant"
          text="New Varieties"
          onPress={() => {
            NavigationService.navigate(NavigationService.ScreenNames.Varieties);
            NavigationService.dispatch(DrawerActions.closeDrawer());
          }}
        />
        {/* <DrawerButton
          icon="logout"
          text="navigation.logout"
          onPress={onLogoutPressed}
        /> */}
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
