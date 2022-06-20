import { ParentContainer } from '../components';
import { View, Text } from 'native-base';
import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { Sizes } from '../utils';

/**
 * Swiggy
 */

const Container: FC = ({ children }) => {
  return <ParentContainer style={styles.container}>{children}</ParentContainer>;
};

const Swiggy: FC = () => {
  return (
    <Container>
      <View>
        <Text>Swiggy page </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.LIST_PADDING_HORIZONTAL,
    paddingTop: Sizes.HEADER_OFFSET,
  },
})
export default memo(Swiggy);
