import React, { FC, memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { reSize, useHeaderHeight } from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderIcon from './HeaderIcon';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import { Pressable, Text } from 'native-base';
Ionicons.loadFont();

/**
 * HeaderLeftProps
 */
type HeaderLeftProps = {
  isMenuIcon?: boolean;
  onPress?: () => void;
  icon?: string;
  color?: string;
};

/**
 * HeaderLeft
 */
const HeaderLeft: FC<HeaderLeftProps> = props => {
  const { isMenuIcon, icon, onPress, color = '#fff' } = props;
  const { header } = useHeaderHeight();
  return (
    <Pressable
      {...{ onPress }}
      style={[styles.container, { height: header, width: header }]}>
      <Ionicons
        name={isMenuIcon ? 'location' : icon || 'arrow-back'}
        size={20}
        color={color}
      />
    </Pressable>
  );
};

export const SuggestionHeaderRight: FC = memo(() => {
  const route = useNavigationState(state =>
    state.routes.find(({ name }) => name === 'Suggestions'),
  );

  const insideRoute = useMemo(
    () => route?.state?.routes[0].state?.index || 0,
    [route?.state?.routes[0].state?.index],
  );
  if (route?.state?.index === 1) return <View />;
  return <HeaderIcon icon="settings" />;
});

export default memo(
  HeaderLeft,
  (prevProps, nextProps) =>
    prevProps.isMenuIcon === nextProps.isMenuIcon &&
    prevProps.color === prevProps.color,
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
