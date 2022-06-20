import React, { FC, memo } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { reSize } from '@utils';
Ionicons.loadFont();

/**
 * HeaderTitleProps
 */
type HeaderTitleProps = {};

/**
 * HeaderTitle
 */
const HeaderTitle: FC<HeaderTitleProps> = () => {
  return <Ionicons name="logo-white" color="#fff" size={reSize(20)} />;
};

export default memo(HeaderTitle);
