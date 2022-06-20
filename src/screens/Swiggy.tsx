import { ParentContainer } from '../components';
import { View, Text } from 'native-base';
import React, { FC, memo } from 'react';
import { StyleSheet } from 'react-native';

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
  },
})
export default memo(Swiggy);
