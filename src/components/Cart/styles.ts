import { Sizes } from '../../utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Sizes.LIST_PADDING_HORIZONTAL,
    paddingTop: Sizes.HEADER_OFFSET,
  },
  contentContainer: {
    alignSelf: 'stretch',
    paddingTop: Sizes.HEADER_OFFSET,
    paddingHorizontal: Sizes.LIST_PADDING_HORIZONTAL,
    top: Sizes.LIST_PADDING_TOP,
  },
  header: {
    alignSelf: 'stretch',
    // position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
  },
});
