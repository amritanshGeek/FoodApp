import React, { FC, useMemo } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontSize, reSize, Sizes, useHeaderHeight } from '../../utils';
import HeaderBackground from './HeaderBackgroundSvg';
import HeaderLeft from './HeaderLeft';
import Svg, { Path } from 'react-native-svg';

/**
 * HeaderProps
 */
type HeaderProps = {
  onPressHeaderLeft?: () => void;
  headerLeft?: () => JSX.Element;
  isMenuIcon?: boolean;
  transparent?: boolean;
  headerRight?: () => JSX.Element;
  headerTitle?: () => JSX.Element;
};

/**
 * Header
 */
const Header: FC<HeaderProps> = props => {
  // deconstruct props
  const {
    headerLeft,
    headerRight,
    headerTitle,
    isMenuIcon,
    onPressHeaderLeft,
    transparent,
  } = props;
  const { width, height } = useWindowDimensions();
  // hooks
  const { header, headerHeight, statusBarHeight } = useHeaderHeight();
  const route = useRoute();
  const navigation = useNavigation();

  // Header styles
  const headerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      height: headerHeight + Sizes.HEADER_OFFSET,
      paddingTop: statusBarHeight,
      flexDirection: 'row',
    }),
    [headerHeight, statusBarHeight],
  );

  // Header title styles
  const titleStyles: StyleProp<ViewStyle> = useMemo(
    () => ({
      paddingRight: isMenuIcon
        ? !headerRight
          ? header
          : 0
        : !headerRight
        ? header
        : 0,
    }),
    [
      headerHeight,
      header,
      statusBarHeight,
      isMenuIcon,
      headerLeft,
      headerRight,
    ],
  );

  // check weather can go back
  const canGoBack = navigation.canGoBack();

  return (
    <View style={[styles.container, headerStyle]}>
      {!transparent && <HeaderBackground />}
      {isMenuIcon ? (
        <HeaderLeft onPress={onPressHeaderLeft} isMenuIcon />
      ) : headerLeft ? (
        headerLeft()
      ) : (
        <HeaderLeft onPress={onPressHeaderLeft} isMenuIcon={false} />
      )}
      <View
        style={[
          styles.title,
          titleStyles,
          { paddingBottom: Sizes.HEADER_OFFSET },
        ]}>
        {headerTitle ? (
          headerTitle()
        ) : (
          <Text
            style={[styles.titleText]}
            numberOfLines={1}
            accessibilityRole="header"
            aria-level="1">
            {route.name}
          </Text>
        )}
      </View>
      {headerRight && headerRight()}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: FontSize.BIG,
  },
});
