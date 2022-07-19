import React, {FC, memo, useMemo} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {reSize, useHeaderHeight} from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {Pressable, Text} from 'native-base';
Ionicons.loadFont();

/**
 * HeaderLeftProps
 */
type HeaderLeftProps = {
  isMenuIcon?: boolean;
  onPress?: () => void;
  icon?: string;
  color?: string;
  text: string;
};

/**
 * HeaderLeft
 */

const HeaderLeft: FC<HeaderLeftProps> = props => {
  const {isMenuIcon, icon, onPress, color = '#fff', text} = props;
  const {header} = useHeaderHeight();
  return (
    <Pressable
      {...{onPress}}
      style={[
        styles.container,
        {height: header, width: header},
        text ? {flex: 1} : {position: 'absolute', left: 0, top: Platform.OS==='ios'?50:0, zIndex: 99},
      ]}>
      <Ionicons
        name={isMenuIcon ? 'location' : icon || 'arrow-back'}
        size={20}
        color={color}
      />
      {text ? (
        <Text alignSelf={'center'} mt={3} color={'black'}>
          {text}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default memo(
  HeaderLeft,
  (prevProps, nextProps) =>
    prevProps.isMenuIcon === nextProps.isMenuIcon &&
    prevProps.color === prevProps.color,
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // flex:1,
    flexDirection: 'row',
    marginLeft: 10,
  },
});
