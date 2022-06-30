import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { ReHighlight } from '@slick-ui/core';
import {
  useHeaderHeight,
} from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

/**
 * HeaderIconProps
 */
type HeaderIconProps = {
  onPress?: () => void;
  icon: string;
  isMenuIcon?: boolean;
  color?: string;
};


/**
 * HeaderIcon
 */
const HeaderIcon: FC<HeaderIconProps> = props => {
  const {icon, isMenuIcon, onPress, color = '#fff'} = props;
  const {header} = useHeaderHeight();
  return (
    <ReHighlight
      {...{onPress}}
      style={[styles.container, {height: header, width: header}]}>
      <Ionicons
        name={isMenuIcon ? 'location' : icon || 'arrow-back'}
        size={16}
        color={color}
      />
    </ReHighlight>
  );
};

export default memo(
  HeaderIcon,
  (prevProps, nextProps) =>
    prevProps.icon === nextProps.icon && prevProps.color === nextProps.color,
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
