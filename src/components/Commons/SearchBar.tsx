import { Colors, FontSize, IconSize, reSize, Sizes } from '../../utils';
import React, { FC, memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
const SearchBar: FC<SearchBarProps> = ({ style, ...props }) => {
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
        style={[styles.input, { color: Colors.DARK_TEXT }]}
      />
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
