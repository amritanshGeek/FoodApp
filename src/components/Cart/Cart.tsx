import React, {FC, memo, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Icon,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Image,
  Button,
} from 'native-base';
import {FoodItemCard, HeaderLeft, ParentContainer, SearchBar} from '../Commons';
import styles from './styles';
import {FoodItem} from '../../types';
import {Colors, NavigationService, Sizes, useHeaderHeight} from '../../utils';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Dimensions, StyleProp, ViewStyle, Alert as RNAlert} from 'react-native';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dispatch} from '../../store';
import {
  emptyCartData,
  reduceCartCount,
  removefromCart,
  setCartData,
  setOrderHistory,
} from '../../Features';
MaterialIcons.loadFont();
Ionicons.loadFont();

/**
 * Dashboard
 */
export const Container: FC = ({children}) => {
  return (
    <ParentContainer style={[styles.container]}>{children}</ParentContainer>
  );
};

export const Header: FC<{scrollY: Animated.SharedValue<number>}> = memo(
  ({scrollY}) => {
    const {headerHeight, header, statusBarHeight} = useHeaderHeight();

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
          // isMenuIcon
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
          <Text fontSize={20} bold>
            Cart
          </Text>
        </View>
        <TouchableOpacity
          style={{padding: 2, position: 'absolute', top: 0, right: 0}}
          onPress={() => dispatch(emptyCartData())}>
          <Icon
            as={MaterialIcons}
            name="delete-forever"
            color={'orange.400'}
            size={10}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

const AlertTag: FC = memo(() => {
  return (
    <Alert w="100%" status={'success'}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {'Order Placed Successfully'}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" color="coolGray.600" />}
          />
        </HStack>
      </VStack>
    </Alert>
  );
});

const OrderPlace: FC = memo(() => {
  const allData = useSelector(state => state.allCartData.data);
  let totalPrice = 0;
  allData.forEach(item => {
    totalPrice = totalPrice + item.price * item.cartCount;
  });
  return (
    <VStack>
      <Text
        color={'green.700'}
        textAlign={'right'}
        mr={5}>{`Total Price: Rs${totalPrice}`}</Text>
      <TouchableOpacity
        onPress={() => {
          RNAlert.alert('Order Placed Successfully');
          dispatch(
            setOrderHistory({
              orderData: allData,
              orderId: Date.now(),
              totalPrice,
            }),
          );
          setTimeout(() => dispatch(emptyCartData()), 100);

          // return <AlertTag />
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('screen').width,
          backgroundColor: Colors.THEME_COLOR,
          height: 60,
          alignSelf: 'flex-end',
        }}>
        <Text>Place Order</Text>
      </TouchableOpacity>
    </VStack>
  );
});

export const List: FC = memo(() => {
  const allData = useSelector(state => state.allCartData.data);
  const orderData = useSelector(state => state.orderData.data);

  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 2,
          paddingVertical: 16,
        }}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        key={'tag_tag_key'}
        style={{}}
        data={allData || []}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        renderItem={({item, index}) => (
          <FoodItemCard
            onAddPress={() => {
              dispatch(setCartData(item));
            }}
            onRemovePress={() => {
              if (item?.cartCount > 1) {
                dispatch(reduceCartCount(item));
              } else {
                dispatch(removefromCart(item));
              }
            }}
            item={item}
            index={index}
            disabled={true}
            isOrderHistory={false}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => {
          return orderData?.length ? (
            <View flex={1} width={'full'} justifyContent={'center'}>
              <HStack alignItems={'center'} p={5}>
                <Icon
                  as={Ionicons}
                  name="checkmark-done-outline"
                  color={'green.400'}
                  size={10}
                />
                <Text fontSize={16} ml={2}>
                  Thankyou for Ordering with us
                </Text>
              </HStack>
              {/* <View */}
              <Image
                source={require('../../assets/food_delivery.png')}
                alt="Aang flying and surrounded by clouds"
                height="200"
                width="200"
                alignSelf={'center'}
              />
              <HStack justifyContent={'space-around'}>
                <Text alignSelf={'center'}>Continue</Text>
                <Button
                  bgColor={'orange.400'}
                  borderRadius={'full'}
                  onPress={() =>
                    NavigationService.navigate(
                      NavigationService.ScreenNames.Home,
                    )
                  }>
                  {'Ordering'}
                </Button>
              </HStack>
            </View>
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  paddingVertical: 20,
                  color: '#000',
                  fontSize: 15,
                }}>
                No Food added yet
              </Text>
            </View>
          );
        }}
      />
      {allData?.length ? <OrderPlace /> : null}
    </View>
  );
});
