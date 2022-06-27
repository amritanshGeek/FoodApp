import React, {
    FC,
    memo,
    useContext,
    useMemo,
} from 'react';
import {
    View,
    Text,
    Box,
    Center,
    Image,
    VStack,
} from 'native-base';
import { HeaderLeft, ParentContainer } from '../Commons';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
    Extrapolate,
    // Extrapolation,
    interpolate,
    // interpolateNode,
    useAnimatedStyle,
    // useSharedValue,
   } from 'react-native-reanimated';
import { Colors, NavigationService, useHeaderHeight } from '../../utils';
import { StyleProp, ViewStyle } from 'react-native';
import { AuthContext } from '../../navigators/AuthProvider';
AntDesign.loadFont();

export const Container: FC = ({ children }) => {
    return (
        <ParentContainer style={[styles.container]}>{children}</ParentContainer>
    );
};

  
export  const Header: FC<{ scrollY: Animated.SharedValue<number> }> = memo(
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
            onPress={() => {
              NavigationService.goBack();
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: header,
            }}>
            <Text fontSize={20} bold>Profile</Text>
          </View>
        </Animated.View>
      )
    }
)
  


export const List: FC = memo(() => {
    const {user} = useContext(AuthContext);
    return(
        <View flex={1} alignItems={'center'}>
            <Image 
                source={{
                    uri: 'https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg'
                }}
                alt="Aang flying and surrounded by clouds"
                height="200"
                width="200"
                rounded="full"
            />
            <VStack mt={20}>
                <Text bold fontSize={'lg'}>{`Email: ${user._user.email}`}</Text>
                <Text bold fontSize={'lg'}>{`Creation Time: ${user._user.metadata.creationTime}`}</Text>
                <Text bold fontSize={'lg'}>{`Last Sign In Time: ${user._user.metadata.lastSignInTime}`}</Text>
            </VStack>
        </View>
    )
});
