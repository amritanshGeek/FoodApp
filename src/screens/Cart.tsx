import React, {FC, memo} from 'react';
import {useScrollValue} from '../utils';
import {CartComponents} from '../components';
const {Container, Header, List} = CartComponents;
/**
 * Cart
 */

const Cart: FC = () => {
  const {scrollClamp: scrollY} = useScrollValue();

  return (
    <Container>
      <Header {...{scrollY}} />
      <List />
    </Container>
  );
};

export default memo(Cart);
