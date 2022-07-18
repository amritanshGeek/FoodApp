import React, {FC, memo, useMemo, useState} from 'react';
import {
  View,
  Text,
  Icon,
  Image,
  ScrollView,
} from 'native-base';
import {HeaderLeft, ParentContainer} from '../Commons';
import styles from './styles';
import {FoodItem} from '../../types';
import {Colors, NavigationService, Sizes, useHeaderHeight} from '../../utils';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Dimensions, StyleProp, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dispatch} from '../../store';
import {emptyCartData} from '../../Features';
import { useRoute } from '@react-navigation/native';
MaterialIcons.loadFont();
Ionicons.loadFont();

const {width,height} = Dimensions.get('window');
const strData=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

/**
 * FoodDetail
 */

export const Container: FC = ({children}) => {
  return (
    <ParentContainer style={[styles.container]}>{children}</ParentContainer>
  );
};

export const Header: FC<{scrollY: Animated.SharedValue<number>}> = memo(
  ({scrollY}) => {
    const {headerHeight, header, statusBarHeight} = useHeaderHeight();
    const item = useRoute().params as FoodItem ;

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
            {item.strMeal}
          </Text>
        </View>
      </Animated.View>
    );
  },
);

export const List: FC = memo(() => {
    const item = useRoute().params as FoodItem ;
  return (
    <ScrollView flex={1} contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
        <Image
            source={{
                uri: item?.strMealThumb
                ? item.strMealThumb
                : 'https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg',
            }}
            alt="Aang flying and surrounded by clouds"
            height={width}
            rounded="2xl"
            width={width}
        />
        <View mb={10}>
            <Text bold numberOfLines={1} width={120} color="black" fontSize="xl">
                {'Instructions'}
            </Text>
            <Text color="black" fontSize="xl">
                {item.strInstructions || 'Meal Name'}
            </Text>
            <View flexDirection={'row'} mt={5}>
                <Text color="black" fontSize="xl" bold flex={1} textAlign={'center'} >Ingredients</Text>
                <Text fontSize="xl">|</Text>
                <Text color="black" fontSize="xl" bold flex={1} textAlign={'center'} >Measurements</Text>
            </View>
            {strData.map((it,index)=>{
                let IngredientTag = 'strIngredient'+it;
                let MeasureTag = 'strMeasure'+it;
                if(item[`${IngredientTag}`]?.length){
                    return (
                        <View key={index} flexDirection={'row'} mt={5}>
                            <Text color="black" fontSize="xl" mx={2} >{it}</Text>
                            <Text color="black" fontSize="xl" flex={1} textAlign={'center'} >{item[`${IngredientTag}`]}</Text>
                            <Text fontSize="xl">-</Text>
                            <Text color="black" fontSize="xl" flex={1} textAlign={'center'} >{item[`${MeasureTag}`]}</Text>
                        </View>
                    )
                }else{
                    return null
                }
            })}
        </View>
    </ScrollView>
  );
});
