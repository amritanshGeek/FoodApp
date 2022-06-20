import {Dimensions, StyleSheet, useWindowDimensions} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

const guidelineBaseWidth = 400;

const reSize = (size: number) => {
  const sizeResize = (WINDOW_WIDTH / guidelineBaseWidth) * size;
  return sizeResize > size ? size : sizeResize;
};

export const IconSize = {
  BIG: reSize(20),
  REGULAR: reSize(16),
  MEDIUM: reSize(20),
  VERY_SMALL: reSize(8),
  SMALL: reSize(12),
  LOGIN_ICON: reSize(60),
};

export const FontSize = {
  HEADER: reSize(20),
  BIG: reSize(18),
  SUB_TITLE: reSize(16),
  MEDIUM: reSize(15),
  DEFAULT: reSize(14),
  SMALL: reSize(12),
  VERY_SMALL: reSize(10),
};

export const LineHeight = {
  HEADER: reSize(24),
  BIG: reSize(22),
  SUB_TITLE: reSize(20),
  MEDIUM: reSize(17),
  DEFAULT: reSize(17),
  SMALL: reSize(15),
  VERY_SMALL: reSize(13),
};
