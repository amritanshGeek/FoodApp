import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
} from 'native-base';
import {HeaderLeft, ParentContainer, SearchBar, FoodItemCard} from '../Commons';
import styles from './styles';
import { FoodItem, GetData } from '../../types';
import { Api } from '../../Features/config';
import { Colors, NavigationService, Sizes, useHeaderHeight } from '../../utils';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
   } from 'react-native-reanimated';
import { Linking, StyleProp, ViewStyle } from 'react-native';
import { dispatch } from '../../store';
import { setCartData } from '../../Features';
import firestore from '@react-native-firebase/firestore';

/**
 * Search
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
          <Text fontSize={20} bold>Search</Text>
        </View>
      </Animated.View>
    )
  }
)

export const List: FC = memo(() => {
  const [loader,setLoader]=useState<boolean | undefined>(true);
  const [mealData,setMealData]=useState<FoodItem[] | undefined>([]);
  const [searchText, setSearchText] = useState<string | undefined>('');

  useEffect(() => {
    getDashboardData();
  }, [searchText]);
  
  const getDashboardData:FC =async()=>{
    setLoader(true);
    // const getData: GetData = {
    //     endPoint: Api.EndPoint.SEARCH,
    //     params: {s:searchText}
    // };
    // console.log('getData:', getData);
    // const response = await Api.get(getData);
    // const res =  (response.data as any).meals as FoodItem[];
    const response = await firestore().collection('search').where('strMeal', '>=', searchText).where('strMeal', '<', searchText+'z').get();
    // console.log('response on search',response);
    if(response?._docs){
      setMealData(response._docs);
    }
    setLoader(false);
  }

  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'}>
      <SearchBar
        style={{
            marginHorizontal: Sizes.HORIZONTAL_PADDING,
        }}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList 
        contentContainerStyle={{
            paddingHorizontal: 2,
            paddingVertical: 16,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        key={'tag_tag_key'}
        style={{}}
        data={mealData}
        keyboardShouldPersistTaps='always'
        keyboardDismissMode='on-drag'
        renderItem={({ item, index }) => (
          <FoodItemCard
            onAddPress={()=> {
              dispatch(setCartData(item._data))
            }}
            onRemovePress={()=>{}}
            item={item._data}
            index={index}
            isOrderHistory={false}
          />
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
                No Foods Yet
              </Text>
            </View>
          )
        }}
      />
    </View>
  );
});
