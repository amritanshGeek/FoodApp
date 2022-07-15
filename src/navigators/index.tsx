import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationService} from '../utils';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './MainNavigator';
import {StatusBar, View} from 'react-native';
import {AuthProvider} from './AuthProvider';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

/**
 *
 * Root Navigator
 */
export default () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="light-content" />
        {/* <BottomSheetModalProvider> */}
        <NavigationContainer ref={NavigationService.navigationRef}>
          <MainNavigator />
        </NavigationContainer>
        {/* </BottomSheetModalProvider> */}
      </AuthProvider>
    </SafeAreaProvider>
  );
};
