import {
  NavigationAction,
  createNavigationContainerRef,
  NavigationState,
  StackActions,
  ParamListBase,
} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();

/**
 * Navigate to a route in current navigation tree.
 * @param name — Name of the route to navigate to.
 * @param params — Params object for the route.
 */
export const navigate = (routeName: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.navigate(routeName as never, params as never);
  }
};

/**
 * Go back to the previous route in history
 */
export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  }
};

/**
 * replace
 */
export const replace = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  }
};

/**
 * Dispatch an action or an update function to the router.
 * The update function will receive the current state,
 *
 * @param action Action object or update function.
 */
export const dispatch = (
  action: NavigationAction | ((state: NavigationState) => NavigationAction),
) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(action);
  }
};

/**
 * Update the param object for the route.
 * The new params will be shallow merged with the old one.
 *
 * @param params Params object for the current route.
 */
export const setParams = (params: Partial<ParamListBase[any]>) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.setParams(params as never);
  }
};

export const push = (screen: any, params: any) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(StackActions.push(screen, params));
  }
};

export const ScreenNames = {
  AppDrawer: 'AppDrawer',
  Home: 'Home',
  Cart: 'Cart',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  Dashboard: 'Dashboard',
  Search: 'Search',
  Account: 'Account',
  OrderHistory: 'OrderHistory',
  FoodDetail: 'FoodDetail',
};
