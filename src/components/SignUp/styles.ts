import {Sizes} from '../../utils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignSelf: 'stretch',
    paddingTop: Sizes.HEADER_OFFSET,
    paddingHorizontal: Sizes.LIST_PADDING_HORIZONTAL,
    top: Sizes.LIST_PADDING_TOP,
  },
});
