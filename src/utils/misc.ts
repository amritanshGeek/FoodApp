import { Dimensions } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

const guidelineBaseWidth = 400;

/**
 * Gives the resized value for the size
 * @param size Size in number
 * @returns size according to the screen width
 *
 * ```
 * style={{ width: reSize(12) }}
 * ```
 */
export const reSize = (size: number) => {
  const sizeResize = (WINDOW_WIDTH / guidelineBaseWidth) * size;
  return sizeResize > size ? size : sizeResize;
};
