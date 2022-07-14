import { Colors, FontSize, reSize } from '../../utils';
import React, { FC, memo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
MaterialCommunityIcons.loadFont();

/**
 * DrawerButtonProps
 */
type DrawerButtonProps = {
  icon: string;
  onPress?: () => void;
  text: string;
  badge?: number;
  position?: string
};

const size = reSize(20);
const buttonSize = reSize(60);

/**
 * DrawerButton
 */
const DrawerButton: FC<DrawerButtonProps> = props => {
  const { icon, onPress, text, position } = props;

  return (
    <TouchableOpacity {...{ onPress }} style={position?styles.absoluteContainer:styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} color={Colors.DARK_TEXT} size={size} />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.text,
            {
              marginLeft: position?0:reSize(10),
              color: Colors.DARK_TEXT,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(
  DrawerButton,
  (prevProps, nextProps) =>
    prevProps.badge === nextProps.badge &&
    prevProps.onPress === nextProps.onPress,
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: reSize(30),
  },
  absoluteContainer: {
    position:'absolute',
    right: 0,
    top: 40,
    // alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: reSize(30),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: FontSize.SUB_TITLE,
  },
  iconContainer: {
    width: reSize(30),
    height: buttonSize,
    justifyContent: 'center',
  },
  badge: {
    width: size,
    position: 'absolute',
    right: 0,
    top: reSize(5),
    height: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
