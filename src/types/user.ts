import { ReducerState } from "./reducer";

/**
 * User
 * My Profile/user details
 */
 export interface User {
  _id: string;
  email: string;
  name: string;
  token: string;
  password: string;
}

/**
 * ProfileTileUser
 * Other User Details/use in ProfileTile etc
 * has the type for the user object for the pages where not all the user types should show
 */
export type ProfileTileUserDetails = {
  _id: string;
  userId: string;
};

/**
 * Access token type
 */
export type AccessToken = string;

/**
 * Complete Users Data type , as we are storing all user data in local
 */
export type UsersData = object;

/**
 *
 *
 *=================================================================
 *======================   Redux States   ======================
 *=================================================================
 */

export type AccessTokenState = {
  token?: AccessToken;
};

export type UsersDataState = {
  data?: UsersData;
};

export type UserState = ReducerState<User>;
