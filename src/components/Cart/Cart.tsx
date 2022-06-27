import React, {FC, memo, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Icon,
} from 'native-base';
import {FoodItemCard, HeaderLeft, ParentContainer, SearchBar} from '../Commons';
import styles from './styles';
import { FoodItem } from '../../types';
import { Colors, NavigationService, Sizes, useHeaderHeight } from '../../utils';
import Animated, {
    Extrapolate,
    // Extrapolation,
    interpolate,
    // interpolateNode,
    useAnimatedStyle,
    // useSharedValue,
   } from 'react-native-reanimated';
import { StyleProp, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { dispatch } from '../../store';
import { emptyCartData } from '../../Features';
MaterialIcons.loadFont();

/**
 * Dashboard
 */
export const Container: FC = ({children}) => {
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
            paddingRight: header,
          }}>
          <Text fontSize={20} bold>Cart</Text>
        </View>
        <TouchableOpacity style={{padding:2}} onPress={()=>dispatch(emptyCartData())}>
          <Icon  as={MaterialIcons} name='delete-forever' color={'orange.400'} size={10} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
)

const OrderPlace:FC = memo(() => {
  return(
    <View height={60} width={'full'} justifyContent={'center'} alignItems={'center'} bgColor={'green.400'}>
      {/* <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor:'green',height:60}}> */}
        <Text>Place Order</Text>
      {/* </TouchableOpacity> */}
    </View>
  )
})

export const List: FC = memo(() => {
    const allData = useSelector(state => state.allCartData.data);

    return (
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <FlatList 
              contentContainerStyle={{
              paddingHorizontal: 2,
              paddingVertical: 16,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            key={'tag_tag_key'}
            style={{}}
            data={allData||[]}
            keyboardShouldPersistTaps='always'
            keyboardDismissMode='on-drag'
            renderItem={({ item, index }) => ( item?
              <FoodItemCard
                onAddPress={()=> {
                  // dispatch(setCartData([...item]))
                }}
                item={item}
                index={index}
              />
              :null
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={()=>{
              return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text
                    style={{
                      paddingVertical: 20,
                      color: '#000',
                      fontSize: 15
                    }}
                  >
                    No Food added yet
                  </Text>
                </View>
              )
            }}
          />
          <OrderPlace />
        </View>
      );
});
