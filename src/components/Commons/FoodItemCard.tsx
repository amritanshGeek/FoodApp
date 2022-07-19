import { NavigationService } from '../../utils';
import {Box, Button, HStack, Image, Pressable, Text, View, VStack} from 'native-base';
import React, {FC, memo} from 'react';
import {Linking} from 'react-native';
import {FoodItem} from '../../types';

/**
 * FoodComponentProps
 */
type FoodComponentProps = {
  item: FoodItem;
  index: number;
  onAddPress: () => void;
  isOrderHistory: boolean;
  onRemovePress: () => void;
  disabled: boolean;
};

/**
 * FoodComponent
 */

const FoodItemCard: FC<FoodComponentProps> = ({
  item,
  index,
  onAddPress,
  isOrderHistory,
  onRemovePress,
  disabled
}) => {
  return (
    <Pressable
      onPress={()=>NavigationService.navigate(NavigationService.ScreenNames.FoodDetail,{...item})}
      key={index}
      disabled={disabled}
      bg="white"
      py="4"
      px="3"
      borderRadius="5"
      rounded="md"
      width={375}
      maxWidth="100%">
      <HStack flex={1} justifyContent={'space-between'}>
        <Image
          source={{
            uri: item?.strMealThumb
              ? item.strMealThumb
              : 'https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg',
          }}
          alt="Aang flying and surrounded by clouds"
          height="100"
          rounded="full"
          width="100"
        />
        <VStack flex={1}>
          <HStack flex={1} justifyContent={'space-between'}>
            <Box justifyContent="space-between" ml={5}>
              <VStack space="2">
                <Text fontSize="sm" color="black">
                  {item.strArea || 'Area Name'}
                </Text>
                <Text numberOfLines={1} width={120} color="black" fontSize="xl">
                  {item.strMeal || 'Meal Name'}
                </Text>
              </VStack>
            </Box>
            {item?.cartCount ? (
              isOrderHistory ? (
                <Text>{item.cartCount}</Text>
              ) : (
                <VStack>
                  <View
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    style={{borderRadius: 20, minWidth: 80}}
                    bgColor={'muted.50'}
                    alignItems={'center'}
                    rounded="xs"
                    alignSelf="flex-start"
                    shadow={2}>
                    <Button bgColor={'muted.50'} onPress={onRemovePress}>
                      <Text color={'black'}>{'-'}</Text>
                    </Button>
                    <Text textTransform="uppercase" fontSize="sm" color="black">
                      {item?.cartCount ? item.cartCount : 'Add'}
                    </Text>
                    <Button bgColor={'muted.50'} onPress={onAddPress}>
                      <Text color={'black'}>{'+'}</Text>
                    </Button>
                  </View>
                  <Text color={'green.700'} textAlign={'center'}>{`Rs ${
                    item?.price * item.cartCount
                  }`}</Text>
                </VStack>
              )
            ) : (
              <VStack>
                <Button
                  style={{borderRadius: 20, minWidth: 100}}
                  bgColor={'muted.50'}
                  alignItems={'center'}
                  onPress={onAddPress}
                  rounded="xs"
                  alignSelf="flex-start"
                  p="1"
                  shadow={2}>
                  <Text textTransform="uppercase" fontSize="sm" color="black">
                    {item?.cartCount ? item.cartCount : 'Add'}
                  </Text>
                </Button>
                <Text
                  color={'green.700'}
                  textAlign={'center'}>{`Rs ${item?.price}`}</Text>
              </VStack>
            )}
          </HStack>
          {isOrderHistory ? (
            <Text color={'green.700'} textAlign={'center'}>
              {`Rs ${item?.price * item.cartCount}`}
            </Text>
          ) : (
            <HStack
              flex={1}
              justifyContent={'space-around'}
              alignItems={'center'}>
              <Button
                style={{borderRadius: 20}}
                bgColor={'muted.50'}
                onPress={() =>
                  item?.strYoutube ? Linking.openURL(item.strYoutube) : null
                }
                rounded="xs"
                alignSelf="flex-start"
                p="2"
                shadow={2}>
                <Text textTransform="uppercase" fontSize="sm" color="black">
                  Reference
                </Text>
              </Button>
              <Button
                style={{borderRadius: 20}}
                bgColor={'muted.50'}
                onPress={() =>
                  item?.strSource ? Linking.openURL(item.strSource) : null
                }
                rounded="xs"
                alignSelf="flex-start"
                p="2"
                ml="3"
                shadow={2}>
                <Text textTransform="uppercase" fontSize="sm" color="black">
                  Source
                </Text>
              </Button>
            </HStack>
          )}
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default memo(
  FoodItemCard,
  (prev, next) => prev.item === next.item && prev.index === next.index,
);
