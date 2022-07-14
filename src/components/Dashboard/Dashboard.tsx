import React, {FC, memo, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  FormControl,
  Input,
  Button,
  Box,
  Select,
  CheckIcon,
  Spinner,
} from 'native-base';
import {HeaderLeft, HeaderTitle, ParentContainer, FoodItemCard} from '../Commons';
import styles from './styles';
import { categoryItem, GetData } from '../../types';
import { Api } from '../../Features/config';
import { Colors, useHeaderHeight, useScrollValue } from '../../utils';
// import { DrawerActions } from '@react-navigation/routers';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
   } from 'react-native-reanimated';
import { ActivityIndicator, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { dispatch } from './../../store/store';
import { setCartData } from '../../Features';
import firestore from '@react-native-firebase/firestore';
MaterialCommunityIcons.loadFont();

/**
 * Dashboard
 */
export const Container: FC = ({children}) => {
    return (
        <ParentContainer style={[styles.container]}>{children}</ParentContainer>
    );
};



  
export  const Header: FC<{ scrollY: Animated.SharedValue<number>,onFilterPress: () => void; }> = memo(
    ({ scrollY,onFilterPress }) => {
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
              // NavigationService.dispatch(DrawerActions.openDrawer());
            }}
            text={'Location'}
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
          <TouchableOpacity
            onPress={onFilterPress}
            style={{flex:1,alignItems:'flex-end',justifyContent:'center',padding:4}}
          >
            <MaterialCommunityIcons name={'filter'} color={'#000'} size={20} />
          </TouchableOpacity>
        </Animated.View>
      )
    }
)

/**
 * CategoryItemProps
 */
 type CategoryItemProps = {
  item: categoryItem;
  index: number;
};

/**
 * CategoryComponent
 */

const CategoryComponent: FC<CategoryItemProps>=({item,index}) => {
  console.log('iutem',item);
  return <Select.Item key={index} label={item.strCategory} value={item.strCategory} />
}

export const List: FC = memo(() => {
    const [loader,setLoader]=useState<boolean | undefined>(true);
    const [modalVisible,setModalVisible]=useState<boolean | undefined>(false);
    const [mealData,setMealData]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState<string | undefined>('');
    const [selectedArea,setSelectedArea]=useState<string | undefined>('');
    const [selectedIngredient,setSelectedIngredient]=useState<string | undefined>('');
    const [categoryList,setCategoryList]=useState([]);
    const [areaList,setAreaList]=useState([]);
    const [ingredientsList,setIngredientsList]=useState([]);
    const { scrollClamp: scrollY } = useScrollValue();
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    useEffect(() => {
      setLoader(true);
      // getDashboardData();
      getCategoryData();
      getAreaData();
      getIngredientsData();
      getDataFromDashboard();
    }, []);

    const getDataFromDashboard = async() => {
      const search = await firestore().collection('search').get();
      // console.log('search from firestore',search);
      setMealData(search._docs);
      setLoader(false);
    }
  
    const getDashboardData:FC =async()=>{
      // const getData: GetData = {
      //   endPoint: Api.EndPoint.SEARCH,
      //   params: {s:''}
      // };
      // // console.log('getData:', getData);
      // const response = await Api.get(getData);
      // // console.log('response on dashboard',response);
      // if(response?.data?.meals?.length){
      //   // setMealData(response.data.meals);
      // }
    }

    const getFilterData:FC =async()=>{
      // const getData: GetData = {
      //   endPoint: Api.EndPoint.FILTER,
      //   params: {
      //     a:selectedArea, //strArea
      //     c:selectedCategory, // strCategory
      //     i:selectedIngredient //
      //   }
      // };
      // console.log('getData:', getData);
      const response = await firestore().collection("search").where("strCategory","==",selectedCategory).get();
      // const response = await Api.get(getData);
      // console.log('response on filter',response);
      if(response?._docs){
        setMealData(response._docs);
      }
    }

    const getCategoryData:FC = async()=> {
      // const getCategoryList: GetData = {
      //   endPoint: Api.EndPoint.ALL_LIST,
      //   params: {c:'list'}
      // };
      // console.log('getData:', getData);
      // const response = await Api.get(getCategoryList);
      const response = await firestore().collection('categories').get();
      // console.log('response on categories',response);
      if(response?._docs){
        setCategoryList(response._docs);
      }
    }

    const getAreaData:FC =async()=>{
      // const getAreaList: GetData = {
      //   endPoint: Api.EndPoint.ALL_LIST,
      //   params: {a:'list'}
      // };
      // console.log('getData:', getData);
      // const response = await Api.get(getAreaList);
      const response = await firestore().collection('areas').get();
      // console.log('response on areas',response);
      // console.log('response on dashboard',response);
      if(response?._docs){
        setAreaList(response._docs);
      }
    }

    const getIngredientsData:FC =async()=>{
      // const getIngredientsList: GetData = {
      //   endPoint: Api.EndPoint.ALL_LIST,
      //   params: {i:'list'}
      // };
      // console.log('getData:', getData);
      // const response = await Api.get(getIngredientsList);
      const response = await firestore().collection('ingredients').get();
      // console.log('response on ingredients',response);
      // console.log('response on dashboard',response);
      if(response?._docs){
        setIngredientsList(response._docs);
      }
    }

    return (
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <Header {...{ scrollY }} onFilterPress={()=>setModalVisible(true)} />
          {loader?
            <Spinner flex={1} accessibilityLabel="Loading areas" />
            :
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
                      dispatch(setCartData(item?._data||item))
                    }}
                    onRemovePress={()=>{}}
                    item={item?._data||item}
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
                          style={{paddingVertical: 20, color: '#000', fontSize: 15}}>
                          No Foods Yet
                        </Text>
                      </View>
                  )
                }}
            />
          }
          <Modal 
            isOpen={modalVisible} 
            onClose={() => setModalVisible(false)}
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
          >
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Filter</Modal.Header>
              <Modal.Body>
                <Box w="3/4" maxW="300">
                  <Text>Category</Text>
                  <Select
                    selectedValue={selectedCategory}
                    minWidth="200"
                    accessibilityLabel="Choose Category"
                    placeholder="Choose Category"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />
                    }}
                    mt={1}
                    onValueChange={itemValue => setSelectedCategory(itemValue)}
                  >
                    {categoryList.length?
                      categoryList.map((item,index)=> <Select.Item key={index} label={item._data.strCategory} value={item._data.strCategory} />)
                      :
                      <Spinner accessibilityLabel="Loading categories" />
                    }
                  </Select>
                </Box>
                <Box w="3/4" maxW="300">
                  <Text>Area</Text>
                  <Select
                    selectedValue={selectedArea}
                    minWidth="200"
                    accessibilityLabel="Choose Area"
                    placeholder="Choose Area"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />
                    }}
                    mt={1}
                    onValueChange={itemValue => setSelectedArea(itemValue)}
                  >
                    {areaList.length?
                      areaList.map((item,index)=> <Select.Item key={index} label={item._data.strArea} value={item._data.strArea} />)
                      :
                      <Spinner accessibilityLabel="Loading areas" />
                    }
                  </Select>
                </Box>
                <Box w="3/4" maxW="300">
                  <Text>Ingredient</Text>
                  <Select
                    selectedValue={selectedIngredient}
                    minWidth="200"
                    accessibilityLabel="Choose Ingredient"
                    placeholder="Choose Ingredient"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />
                    }}
                    mt={1}
                    onValueChange={itemValue => setSelectedIngredient(itemValue)}
                  >
                    {ingredientsList.length?
                      ingredientsList.map((item,index)=> <Select.Item key={index} label={item._data.strIngredient} value={item._data.strIngredient} />)
                      :
                      <Spinner accessibilityLabel="Loading ingredients" />
                    }
                  </Select>
                </Box>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                      setSelectedCategory('');
                      setSelectedArea('');
                      setSelectedIngredient('');
                      setModalVisible(false);
                      // getDashboardData();
                      getDataFromDashboard();
                    }}>
                    Reset
                  </Button>
                  <Button onPress={() => {
                      setModalVisible(false);
                      getFilterData();
                    }}>
                    Apply
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </View>
      );
});
