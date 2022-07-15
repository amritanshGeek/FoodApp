import {Platform, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useHeaderHeight = (): {
  headerHeight: number;
  header: number;
  statusBarHeight: number;
} => {
  const layout = useWindowDimensions();
  const {top: statusBarHeight} = useSafeAreaInsets();
  const isLandscape = layout.width > layout.height;

  let headerHeight;

  if (Platform.OS === 'ios') {
    if (isLandscape && !Platform.isPad) {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return {
    headerHeight: headerHeight + statusBarHeight,
    header: headerHeight,
    statusBarHeight,
  };
};
