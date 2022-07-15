import React, {FC, memo, ReactNode} from 'react';
import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {Colors} from '../../utils';

/**
 * ParentContainerProps
 */
export type ParentContainerProps = ViewProps & {children: ReactNode};

/**
 * ParentContainer
 */
const ParentContainer: FC<ParentContainerProps> = ({
  children,
  style = {flex: 1},
  ...rest
}) => {
  return (
    <View style={[style, {backgroundColor: Colors.LIGHT_BACKGROUND}]} {...rest}>
      {children}
    </View>
  );
};

export default memo(ParentContainer);

export const Line = memo(() => {
  return (
    <View
      style={{
        alignSelf: 'stretch',
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.PRIMARY,
      }}
    />
  );
});

export const Card: FC<{style?: StyleProp<ViewStyle>}> = memo(
  ({style, children}) => {
    return (
      <View
        style={[
          {
            backgroundColor: Colors.LIGHT_BACKGROUND,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.2,
            shadowRadius: 16.0,

            elevation: 24,
          },
          style,
        ]}>
        {children}
      </View>
    );
  },
);
