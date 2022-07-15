import {Dimensions} from 'react-native';

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

const reSize = (size: number) => {
  const sizeResize = (WINDOW_WIDTH / guidelineBaseWidth) * size;
  return sizeResize > size ? size : sizeResize;
};

const BUTTON_HEIGHT = reSize(50);
const BORDER_RADIUS = reSize(12);
const BORDER_RADIUS_MAX = reSize(20);
const SNAP_TO_INTERVAL = WINDOW_WIDTH - reSize(8);

export const Sizes = {
  GALLERY_PADDING: reSize(1),
  HORIZONTAL_PADDING: reSize(20),
  PROFILE_HORIZONTAL_HEIGHT: reSize(60),
  HEADER_OFFSET: reSize(24),
  LIST_PADDING_TOP: reSize(10),
  LIST_PADDING_HORIZONTAL: reSize(4),
  MEDIA_SELECTOR_SIZE: reSize(114),
  MEDIA_SELECTOR_BUTTON_SIZE: reSize(54),
  MEDIA_SELECTOR_PADDING: reSize(20),
  BUTTON_HEIGHT,
  BORDER_RADIUS,
  BORDER_RADIUS_MAX,
  SNAP_TO_INTERVAL,
};
