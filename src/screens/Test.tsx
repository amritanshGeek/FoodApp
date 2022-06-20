import React, { useCallback, useRef, useMemo, memo } from 'react';
import { StyleSheet, View,Text } from 'react-native';

const App = () => {
  return (
    <View style={styles.flex}>
      <Text>Heyy Test</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

export default App;
