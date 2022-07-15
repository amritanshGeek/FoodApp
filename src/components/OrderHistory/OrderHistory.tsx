import React, {FC, memo, useMemo, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Icon,
  HStack,
  Modal,
  Spinner,
  VStack,
} from 'native-base';
import {FoodItemCard, HeaderLeft, ParentContainer} from '../Commons';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Colors, NavigationService, useHeaderHeight} from '../../utils';
import {Dimensions, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {dispatch} from '../../store';
import {emptyOrderHistoryData, removefromOrderHistory} from '../../Features';
import {FoodItem} from '../../types';

AntDesign.loadFont();
MaterialIcons.loadFont();
Entypo.loadFont();

export const Container: FC = ({children}) => {
  return (
    <ParentContainer style={[styles.container]}>{children}</ParentContainer>
  );
};

export const Header: FC<{scrollY: Animated.SharedValue<number>}> = memo(
  ({scrollY}) => {
    const {headerHeight, header, statusBarHeight} = useHeaderHeight();
    const orderData = useSelector(state => state.orderData);
    const {orderCount} = orderData;

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
          text={''}
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // paddingRight: header,
          }}>
          <Text fontSize={20} bold>{`Order History (${orderCount})`}</Text>
        </View>
        <TouchableOpacity
          style={{padding: 2}}
          onPress={() => dispatch(emptyOrderHistoryData())}>
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

export const List: FC = memo(() => {
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(false);
  const [orderDataList, setOrderDataList] = useState<FoodItem[] | undefined>([]);
  const [currentTotalPrice, setCurrentTotalPrice] = useState<number | undefined>(0);
  const orderData = useSelector(state => state.orderData);
  const {data} = orderData;
  return (
    <View flex={1} alignItems={'center'}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 2,
          paddingVertical: 16,
        }}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        key={'tag_tag_key'}
        style={{}}
        data={data || []}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        renderItem={({item, index}) => (
          <View
            bg={'muted.50'}
            shadow={5}
            flex={1}
            width={Dimensions.get('window').width - 50}
            flexDirection={'row'}
            justifyContent={'space-around'}
            alignItems={'center'}
            py={10}>
            <VStack>
              <Text>{item.orderName}</Text>
              <Text
                color={'green.700'}
                textAlign={'right'}
                mr={5}>{`Total Price: Rs${item.totalPrice}`}</Text>
            </VStack>
            <HStack>
              <Button
                bg={'muted.50'}
                onPress={() => {
                  setOrderDataList(item.orderData);
                  setCurrentTotalPrice(item.totalPrice);
                  setTimeout(() => setModalVisible(true), 100);
                }}>
                <Icon
                  as={Entypo}
                  name="info-with-circle"
                  color={'orange.400'}
                  size={10}
                />
              </Button>
              <Button
                bg={'muted.50'}
                onPress={() => dispatch(removefromOrderHistory(item))}>
                <Icon
                  as={Entypo}
                  name="squared-cross"
                  color={'orange.400'}
                  size={10}
                />
              </Button>
            </HStack>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={() => {
          return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  paddingVertical: 20,
                  color: '#000',
                  fontSize: 15,
                }}>
                No order history recorded
              </Text>
            </View>
          );
        }}
      />

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            {'Order Details'}
            <Text color={'green.700'}>{`Rs ${currentTotalPrice}`}</Text>
          </Modal.Header>
          <Modal.Body>
            {orderDataList ? (
              <FlatList
                contentContainerStyle={{
                  paddingHorizontal: 2,
                  paddingVertical: 16,
                }}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                key={'tag_tag_key'}
                style={{}}
                data={orderDataList || []}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                renderItem={({item, index}) => (
                  <FoodItemCard
                    onAddPress={() => {}}
                    onRemovePress={() => {}}
                    item={item}
                    index={index}
                    isOrderHistory={true}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <Spinner />
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
});
