import { ParentContainer } from '../components';
import { View, Text } from 'native-base';
import React, { FC, memo, useMemo } from 'react';
import { Colors, NavigationService, Sizes, useHeaderHeight } from '../utils';
import Animated, {
  Extrapolate,
  // Extrapolation,
  interpolate,
  // interpolateNode,
  useAnimatedStyle,
  // useSharedValue,
 } from 'react-native-reanimated';
import {HeaderLeft,HeaderTitle} from '../components/Commons';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { useScrollValue } from '../utils';
import { DrawerActions } from '@react-navigation/routers';

/**
 * Swiggy
 */

const Container: FC = ({ children }) => {
  return <ParentContainer style={styles.container}>{children}</ParentContainer>;
};

const Header: FC<{ scrollY: Animated.SharedValue<number> }> = memo(
  ({ scrollY }) => {
    const { headerHeight, header, statusBarHeight } = useHeaderHeight();

    const headerStyle = useMemo<StyleProp<ViewStyle>>(
      () => ({
        height: headerHeight,
        paddingTop: statusBarHeight,
        backgroundColor: Colors.LIGHT_BACKGROUND,
      }),
      [headerHeight, statusBarHeight, Colors.LIGHT_BACKGROUND],
    );

    const headerAnimatedStyles = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [0, header],
          [1, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              [0, header],
              [0, -header],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    });

    return (
      <Animated.View style={[styles.header, headerStyle, headerAnimatedStyles]}>
        <HeaderLeft
          color={Colors.DARK_TEXT}
          isMenuIcon
          onPress={() => {
            NavigationService.dispatch(DrawerActions.openDrawer());
          }}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // paddingLeft: header,
          }}>
          <HeaderTitle />
        </View>
      </Animated.View>
    )
  })

const Swiggy: FC = () => {
  const { handler, scrollClamp: scrollY } = useScrollValue();
  return (
    <Container>
      <Header {...{ scrollY }} />
      <View>
        <Text>Swiggy page </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.LIST_PADDING_HORIZONTAL,
    paddingTop: Sizes.HEADER_OFFSET,
  },
  contentContainer: {
    alignSelf: 'stretch',
    paddingTop: Sizes.HEADER_OFFSET,
    paddingHorizontal: Sizes.LIST_PADDING_HORIZONTAL,
    top: Sizes.LIST_PADDING_TOP,
  },
  header: {
    alignSelf: 'stretch',
    // position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
  },
})
export default memo(Swiggy);
