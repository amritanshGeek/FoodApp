import React, {
    FC,
    memo,
    useCallback,
    useContext,
    useMemo,
} from 'react';
import {
    View,
    Text,
    Image,
    VStack,
    Button,
    HStack,
} from 'native-base';
import { HeaderLeft, ParentContainer } from '../Commons';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Colors, NavigationService, useHeaderHeight } from '../../utils';
import { Alert, StyleProp, ViewStyle } from 'react-native';
import { AuthContext } from '../../navigators/AuthProvider';
import DrawerButton from '../Drawer/DrawerButton';
import moment from 'moment';
AntDesign.loadFont();

export const Container: FC = ({ children }) => {
    return (
        <ParentContainer style={[styles.container]}>{children}</ParentContainer>
    );
};

  
export  const Header: FC<{ scrollY: Animated.SharedValue<number> }> = memo(
    ({ scrollY }) => {
      const { headerHeight, header, statusBarHeight } = useHeaderHeight();
      const {logout}= useContext(AuthContext);
      const onLogoutPressed = useCallback(() => {
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
                logout();
                // NavigationService.replace('Auth');
              }
            },  
          ]
        );
      }, []);
  
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
            }}>
            <Text fontSize={20} bold>Profile</Text>
          </View>
          <DrawerButton
            icon="logout"
            text="Logout"
            onPress={onLogoutPressed}
            position={'absolute'}
          />
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
              uri: 'https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-986x1024.jpg'
          }}
          alt="Aang flying and surrounded by clouds"
          height="200"
          width="200"
          rounded="full"
        />
        <VStack mt={20}>
          <HStack>
            <Text bold fontSize={'lg'}>{'Email: '}</Text>
            <Text fontSize={'lg'}>{user?._user.email}</Text>
          </HStack>
          <HStack>
            <Text bold fontSize={'lg'}>{'Creation Time: '}</Text>
            <Text fontSize={'lg'}>{moment(user?._user.metadata.creationTime).format('llll')}</Text>
          </HStack>
          <HStack>
            <Text bold fontSize={'lg'}>{'Last Sign In Time: '}</Text>
            <Text fontSize={'lg'}>{moment(user?._user.metadata.lastSignInTime).format('llll')}</Text>
          </HStack>
        </VStack>
        <Button width={'full'} height={60} mt={20} onPress={()=>NavigationService.navigate(NavigationService.ScreenNames.OrderHistory)} >
          <Text bold color={'white'}>Check Order History</Text>
        </Button>
      </View>
    )
});
