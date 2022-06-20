import React, {FC, memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, Modal, View, useWindowDimensions, Text} from 'react-native';
import {Highlight, ReHighlight, useColors} from '@slick-ui/core';
import {
  FontSize,
  IconSize,
  NavigationService,
  reSize,
  Sizes,
  useHeaderHeight,
} from '@utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  useAnimatedRef,
  runOnUI,
  measure,
} from 'react-native-reanimated';
Ionicons.loadFont();

/**
 * HeaderIconProps
 */
type HeaderIconProps = {
  onPress?: () => void;
  icon: string;
  isMenuIcon?: boolean;
  color?: string;
};

type CreationType = 'Moment' | 'BucketList';

type CreatePostButtonProps = {
  type: CreationType[];
};

type PageSize = {
  pageX: Animated.SharedValue<number>;
  pageY: Animated.SharedValue<number>;
  width: Animated.SharedValue<number>;
  height: Animated.SharedValue<number>;
};

type ModalContentProps = {
  onRequestClose: () => void;
  type: CreationType[];
  value: Animated.SharedValue<number>;
  viewRef: React.RefObject<Animated.View>;
  size: PageSize;
};

const WIDTH = reSize(200);
const LEFT_OFFSET = WIDTH + reSize(20);

const ModalContent = gestureHandlerRootHOC<ModalContentProps>(
  ({onRequestClose, type, value, size}) => {
    const colors = useColors();
    const {headerHeight} = useHeaderHeight();
    const {width} = useWindowDimensions();
    const backgroundStyles = useAnimatedStyle(() => ({
      opacity: value.value,
    }));

    const subViewStyles = useAnimatedStyle(() => ({
      opacity: interpolate(value.value, [0, 0.5, 1], [0, 0, 1]),
      flex: 1,
      width: WIDTH,
    }));

    const viewStyles = useAnimatedStyle(
      () => ({
        opacity: value.value,
        height: interpolate(
          value.value,
          [0, 1],
          [size.width.value, type.length * Sizes.BUTTON_HEIGHT],
        ),
        width: interpolate(
          value.value,
          [0, 0.4, 1],
          [size.width.value, size.width.value, WIDTH],
        ),
        top: interpolate(value.value, [0, 1], [size.pageY.value, headerHeight]),
        left: interpolate(
          value.value,
          [0, 0.4, 1],
          [size.pageX.value, size.pageX.value, width - LEFT_OFFSET],
        ),
      }),
      [type.length, width],
    );

    const renderButton = useMemo(
      () => (
        <Animated.View style={[styles.buttonBackground, backgroundStyles]}>
          <Highlight
            underlay="transparent"
            style={[styles.buttonBackground]}
            onPress={onRequestClose}
          />
        </Animated.View>
      ),
      [backgroundStyles, onRequestClose],
    );
    const renderList = useMemo(
      () => (
        <Animated.View style={subViewStyles}>
          {type.map(title => (
            <Highlight
              key={title}
              onPress={() => {
                onRequestClose();
              }}
              style={[styles.button]}>
              <Ionicons
                size={IconSize.REGULAR}
                name="message-filled"
                color={colors.darkText}
              />
              <Text style={[styles.titleText, {color: colors.darkText}]}>
                {title}
              </Text>
            </Highlight>
          ))}
        </Animated.View>
      ),
      [type, colors.darkText],
    );

    const renderMainView = useMemo(
      () => (
        <Animated.View
          style={[
            styles.listContainer,
            {
              height: type.length * Sizes.BUTTON_HEIGHT,
              backgroundColor: colors.background,
            },
            viewStyles,
          ]}>
          {renderList}
        </Animated.View>
      ),
      [renderList, viewStyles, type.length, colors.background],
    );
    return (
      <View style={{width: '100%', height: '100%'}}>
        {renderButton}
        {renderMainView}
      </View>
    );
  },
  {width: '100%', height: '100%'},
);

const IconForAdd: FC<
  HeaderIconProps & {viewRef: React.RefObject<Animated.View>}
> = props => {
  const {icon, isMenuIcon, onPress, color = '#fff', viewRef} = props;
  const {header} = useHeaderHeight();
  return (
    <ReHighlight
      {...{onPress}}
      style={[styles.container, {height: header, width: header}]}>
      <Animated.View ref={viewRef} style={styles.containerSub}>
        <Ionicons
          name={isMenuIcon ? 'menu' : icon || 'arrow-back'}
          size={16}
          color={color}
        />
      </Animated.View>
    </ReHighlight>
  );
};

const useViewSizeValues = () => {
  const pageX = useSharedValue(0);
  const pageY = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  return useMemo(
    () => ({pageX, pageY, width, height}),
    [pageX, pageY, width, height],
  );
};
export const CreatePostButton: FC<CreatePostButtonProps> = memo(({type}) => {
  const colors = useColors();
  const [visible, setVisible] = useState<boolean>(false);
  const value = useSharedValue(0);
  const viewRef = useAnimatedRef<Animated.View>();

  const size = useViewSizeValues();

  const measureViewWidth = () => {
    'worklet';
    const {pageX, pageY, width, height} = measure(viewRef);
    size.pageX.value = pageX;
    size.pageY.value = pageY;
    size.width.value = width;
    size.height.value = height;
    console.log('size:', size);
  };

  const openModal = useCallback(() => {
    setVisible(true);
    value.value = withTiming(1);
  }, []);
  const renderButton = useMemo(
    () => (
      <IconForAdd
        viewRef={viewRef}
        onPress={() => {
          runOnUI(measureViewWidth)();
          openModal();
        }}
        color={colors.darkText}
        icon="add"
      />
    ),
    [viewRef],
  );

  const closeModal = useCallback(() => setVisible(false), []);
  const onRequestClose = useCallback(() => {
    value.value = withTiming(0, {}, finished => {
      if (finished) runOnJS(closeModal)();
    });
  }, []);

  const renderModal = useMemo(
    () => (
      <Modal
        transparent
        {...{visible}}
        onRequestClose={() => setVisible(false)}>
        <ModalContent {...{onRequestClose, type, value, viewRef, size}} />
      </Modal>
    ),
    [visible],
  );
  return (
    <>
      {renderButton}
      {renderModal}
    </>
  );
});

/**
 * HeaderIcon
 */
const HeaderIcon: FC<HeaderIconProps> = props => {
  const {icon, isMenuIcon, onPress, color = '#fff'} = props;
  const {header} = useHeaderHeight();
  return (
    <ReHighlight
      {...{onPress}}
      style={[styles.container, {height: header, width: header}]}>
      <Ionicons
        name={isMenuIcon ? 'menu' : icon || 'arrow-back'}
        size={16}
        color={color}
      />
    </ReHighlight>
  );
};

export default memo(
  HeaderIcon,
  (prevProps, nextProps) =>
    prevProps.icon === nextProps.icon && prevProps.color === nextProps.color,
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSub: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: reSize(200),
    position: 'absolute',
    right: reSize(20),
    overflow: 'hidden',
    borderRadius: Sizes.BORDER_RADIUS,
  },
  buttonBackground: {flex: 1, backgroundColor: '#00000050'},
  button: {
    alignSelf: 'stretch',
    height: Sizes.BUTTON_HEIGHT,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Sizes.HORIZONTAL_PADDING,
  },
  titleText: {
    fontSize: FontSize.DEFAULT,
    marginLeft: reSize(10),
  },
});
