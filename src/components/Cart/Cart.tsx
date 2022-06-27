import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  Box,
  Center,
  Button,
  useColorMode,
  useColorModeValue,
  Input,
  Icon,
  useToast,
  HStack,
  VStack,
  Pressable,
  Image,
  FlatList,
} from 'native-base';
import {HeaderLeft, HeaderTitle, ParentContainer, SearchBar} from '../Commons';
import styles from './styles';
import { FoodItem, GetData } from '../../types';
import { Api } from '../../Features/config';
import { Colors, NavigationService, Sizes, useHeaderHeight } from '../../utils';
import { DrawerActions } from '@react-navigation/routers';
import Animated, {
    Extrapolate,
    // Extrapolation,
    interpolate,
    // interpolateNode,
    useAnimatedStyle,
    // useSharedValue,
   } from 'react-native-reanimated';
import { Linking, StyleProp, ViewStyle } from 'react-native';

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
        </Animated.View>
      )
    }
)

/**
 * FoodComponentProps
 */
 type FoodComponentProps = {
    item: FoodItem;
    index: number;
  };
  
  /**
   * FoodComponent
   */

const FoodComponent: FC<FoodComponentProps> = memo(({item,index}) => {
    return (
        <Box bg="primary.600" py="4" px="3" borderRadius="5" rounded="md" width={375} maxWidth="100%">
            <HStack justifyContent="space-between">
                <Box justifyContent="space-between">
                    <VStack space="2">
                    <Text fontSize="sm" color="white">
                        {item.strArea || 'Area Name'}
                    </Text>
                    <Text color="white" fontSize="xl">
                        {item.strMeal || 'Meal Name'}
                    </Text>
                    </VStack>
                    <Pressable onPress={()=> item?.strYoutube?Linking.openURL(item.strYoutube):null} rounded="xs" bg="primary.400" alignSelf="flex-start" py="1" px="3">
                        <Text textTransform="uppercase" fontSize="sm" color="white">
                            Reference
                        </Text>
                    </Pressable>
                </Box>
                <Image source={{
                uri: item?.strMealThumb?item.strMealThumb:'https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg'
                }} alt="Aang flying and surrounded by clouds" height="100" rounded="full" width="100" />
            </HStack>
        </Box>
    )
})

export const List: FC = memo(() => {
    const [loader,setLoader]=useState<boolean | undefined>(true);
    const [mealData,setMealData]=useState<FoodItem[] | undefined>([]);
    const [searchText, setSearchText] = useState<string | undefined>('');

    // useEffect(() => {
    //   getDashboardData();
    // }, [searchText]);
  
    const getDashboardData:FC =async()=>{
        setLoader(true);
        const getData: GetData = {
            endPoint: Api.EndPoint.SEARCH,
            params: {s:searchText}
        };
        // console.log('getData:', getData);
        const response = await Api.get(getData);
        const res =  (response.data as any).meals as FoodItem[];
        // console.log('response on dashboard',response);
        if(res.length){
            setMealData(res);
        }
        setLoader(false);
    }

    // console.log('mealData',mealData);

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
                    <FoodComponent item={item} index={index}  />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={()=>{
                    return (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text
                                style={{paddingVertical: 20, color: '#000', fontSize: 15}}>
                                    No Food added yet
                            </Text>
                        </View>
                    )
                }}
            />
        </View>
      );
});
