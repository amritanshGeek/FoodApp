/**
 * User
 * My Profile/user details
 */
export interface User {
  _id: string;
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
 *
 *
 *=================================================================
 *======================   Redux States   ======================
 *=================================================================
 */

export type AccessTokenState = {
  token?: AccessToken;
};
