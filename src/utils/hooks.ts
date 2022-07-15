import {useMemo} from 'react';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {clamp} from 'react-native-redash';
import {useHeaderHeight} from './header';

export const useScrollValue = () => {
  const scrollY = useSharedValue(0);
  const {header} = useHeaderHeight();
  const scrollClamp = useSharedValue(0);

  const handler = useAnimatedScrollHandler<{prevY: number}>({
    onScroll: (event, ctx) => {
      const diff = event.contentOffset.y - ctx.prevY;
      scrollY.value = event.contentOffset.y;
      scrollClamp.value = clamp(diff, 0, header);
    },
    onBeginDrag: (event, ctx) => {
      ctx.prevY = scrollY.value;
    },
  });

  return useMemo(
    () => ({scrollY, handler, scrollClamp}),
    [handler, scrollY, scrollClamp],
  );
};
