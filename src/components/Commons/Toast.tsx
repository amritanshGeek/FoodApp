import React, {
    FC,
    forwardRef,
    memo,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
  } from 'react';
  import { View, StyleSheet,Text } from 'react-native';
  import Animated, {
    withTiming,
    withSpring,
    useSharedValue,
    withDelay,
    Easing,
    runOnJS,
    useAnimatedStyle,
    cancelAnimation,
  } from 'react-native-reanimated';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { FontSize, reSize } from '../../utils';
  import { Colors } from '../../utils';
  
  /**
   * ToastProps
   * @export
   * @interface ToastProps
   */
  export interface ToastProps {
    /**
     * Tost text
     */
    text: string;
    /**
     * Toast Type
     * @default 'default'
     */
    type?: 'error' | 'success' | 'default';
    /**
     * Duration
     * @default 1000 -> 1s
     */
    duration?: number;
    /**
     * Function  to call when Toast is finished
     * @default ()=>{}
     */
    onDone?: () => void;
  }
  
  /**
   * ToastInterface
   */
  export interface ToastInterface {
    show: (props: ToastProps) => void;
  }
  
  /**
   * Toast State
   */
  interface ToastState {
    text: string;
    type?: 'error' | 'success' | 'default';
    visible: boolean;
  }
  
  /**
   * Default Values
   */
  const DURATION = 1000;
  
  let duration = DURATION;
  let onDone: (() => void) | undefined;
  
  /**
   * ToastUI
   */
  const ToastUI = forwardRef<ToastInterface>(({}, ref) => {
    /**
     * State
     */
    const [{ visible, text, type }, setState] = useState<ToastState>({
      visible: false,
      text: '',
    });
  
    /**
     * Constant Values
     */
    const { bottom } = useSafeAreaInsets();
  
    /**
     * Animated Values
     */
    const value = useSharedValue(0);
  
    useEffect(() => {
      cancelAnimation(value);
      if (visible) {
        value.value = withSpring(
          1,
          {
            damping: 15,
            mass: 1,
            stiffness: 121.6,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
          },
          finished => {
            console.log('finished:', finished);
            if (finished) {
              value.value = withDelay(
                duration || DURATION,
                withTiming(
                  0,
                  {
                    duration: 300,
                    easing: Easing.linear,
                  },
                  finished => {
                    if (finished) {
                      runOnJS(clearState)();
                    }
                  },
                ),
              );
            }
          },
        );
      }
    }, [visible, duration, value]);
    /**
     *
     * @param props Open Alert
     * @description Opens up Alert used in ref object in Root
     */
    const show = ({
      onDone: oD,
      type = 'default',
      duration,
      ...rest
    }: ToastProps) => {
      onDone = oD;
      setState(st => ({
        ...st,
        ...rest,
        visible: true,
        type,
      }));
    };
  
    /**
     * Handler to bind open menu to ref object
     */
    useImperativeHandle(
      ref,
      () => ({
        show,
      }),
      [],
    );
  
    /**
     * Function to clearState of the Alert
     */
    const clearState = () => {
      onDone?.();
      // onDone = undefined;
      setState(st => ({
        ...st,
        visible: false,
        text: '',
        type: undefined,
      }));
    };
  
    const color = type
      ? ['error', 'success'].includes(type)
        ? '#fff'
        : Colors.DARK_TEXT
      : Colors.DARK_TEXT;
  
    const backgroundColor =
      type === 'error'
        ? Colors.PRIMARY
        : type === 'success'
        ? Colors.SECONDARY
        : Colors.LIGHT_BACKGROUND;
  
    /**
     * Animated styles for Parent
     */
    const viewStyle = useAnimatedStyle(() => ({
      opacity: value.value,
    }));
  
    /**
     * Animated styles for Alert View
     */
    const subViewStyle = useAnimatedStyle(() => ({
      transform: [{ scale: value.value }],
    }));
  
    return visible ? (
      <View pointerEvents="none" style={[styles.container]}>
        <Animated.View style={[styles.subContainer, viewStyle]} />
        <Animated.View
          style={[
            styles.toastContainer,
            {
              bottom: reSize(100) + bottom,
              backgroundColor,
            },
            subViewStyle,
          ]}>
          <Text
            style={[
              styles.text,
              {
                color,
              },
            ]}>
            {text}
          </Text>
        </Animated.View>
      </View>
    ) : (
      <View />
    );
  });
  
  type ToastRefObj = {
    current: ToastInterface | null;
  };
  
  let refs: ToastRefObj[] = [];
  
  /**
   * Adds a ref to the end of the array, which will be used to show the toasts until its ref becomes null.
   *
   * @param newRef the new ref, which must be stable for the life of the Toast instance.
   */
  function addNewRef(newRef: ToastInterface) {
    refs.push({
      current: newRef,
    });
  }
  
  /**
   * Removes the passed in ref from the file-level refs array using a strict equality check.
   *
   * @param oldRef the exact ref object to remove from the refs array.
   */
  function removeOldRef(oldRef: ToastInterface | null) {
    refs = refs.filter(r => r.current !== oldRef);
  }
  
  const Toast: FC & { show: (data: ToastProps) => void } = props => {
    const toastRef = useRef<ToastInterface | null>(null);
  
    /*
      This must use `useCallback` to ensure the ref doesn't get set to null and then a new ref every render.
      Failure to do so will cause whichever Toast *renders or re-renders* last to be the instance that is used,
      rather than being the Toast that was *mounted* last.
    */
    const setRef = React.useCallback((ref: ToastInterface | null) => {
      // Since we know there's a ref, we'll update `refs` to use it.
      if (ref) {
        // store the ref in this toast instance to be able to remove it from the array later when the ref becomes null.
        toastRef.current = ref;
        addNewRef(ref);
      } else {
        // remove the this toast's ref, wherever it is in the array.
        removeOldRef(toastRef.current);
      }
    }, []);
  
    return useMemo(() => <ToastUI ref={setRef} {...props} />, [setRef]);
  };
  
  /**
   * Get the active Toast instance `ref`, by priority.
   * The "highest" Toast in the `View` hierarchy has the highest priority.
   *
   * For example, a Toast inside a `Modal`, would have had its ref set later than a Toast inside App's Root.
   * Therefore, the library knows that it is currently visible on top of the App's Root
   * and will thus use the `Modal`'s Toast when showing/hiding.
   *
   * ```js
   * <>
   *  <Toast />
   *  <Modal>
   *    <Toast />
   *  </Modal>
   * </>
   * ```
   */
  function getRef() {
    const reversePriority = [...refs].reverse();
    const activeRef = reversePriority.find(ref => ref?.current !== null);
    if (!activeRef) {
      return null;
    }
    return activeRef.current;
  }
  
  Toast.show = (params: ToastProps) => {
    getRef()?.show(params);
  };
  
  export default Toast;
  
  const styles = StyleSheet.create({
    text: {
      fontSize: FontSize.MEDIUM,
      marginHorizontal: reSize(30),
      textAlign: 'center',
    },
    container: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
      zIndex: 5,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    subContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    toastContainer: {
      position: 'absolute',
      paddingVertical: reSize(10),
      marginHorizontal: reSize(30),
      zIndex: 3,
      borderRadius: reSize(30),
      overflow: 'hidden',
    },
  });
  