import {Colors, FontSize, IconSize, reSize, Sizes} from '../../utils';
import React, {FC, memo} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';

/**
 * SearchBarProps
 */
type SearchBarProps = {
  value?: string;
  defaultValue?: string;
  onChangeText?: (str: string) => void;
  style?: StyleProp<ViewStyle>;
};

/**
 * SearchBar
 */
const SearchBar: FC<SearchBarProps> = ({style, ...props}) => {
  return (
    <View
      style={[
        style,
        styles.container,
        {
          backgroundColor: Colors.LIGHT_BACKGROUND,
          borderColor: Colors.PRIMARY,
        },
      ]}>
      <Ionicons name="search" size={IconSize.BIG} color={Colors.LIGHT_TEXT} />
      <TextInput
        {...props}
        placeholder={'Search Meal'}
        placeholderTextColor={Colors.LIGHT_TEXT}
        style={[styles.input, {color: Colors.DARK_TEXT}]}
      />
      {props.value?.length ? (
        <Icon
          onPress={() => props.onChangeText('')}
          as={Entypo}
          name="circle-with-cross"
          color={Colors.DARK_TEXT}
          size={8}
        />
      ) : null}
    </View>
  );
};

export default memo(
  SearchBar,
  (prev, next) =>
    prev.onChangeText === next.onChangeText &&
    prev.value === next.value &&
    prev.style === next.style &&
    prev.defaultValue === next.defaultValue,
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: reSize(50),
    paddingHorizontal: Sizes.HORIZONTAL_PADDING,
    borderRadius: Sizes.BORDER_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    marginLeft: reSize(15),
    fontSize: FontSize.SUB_TITLE,
  },
});
