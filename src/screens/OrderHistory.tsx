import {OrderHistoryComponents} from '../components';
import React, {FC, memo} from 'react';
import {useScrollValue} from '../utils';
const {Container, Header, List} = OrderHistoryComponents;

/**
 * OrderHistory
 */
const OrderHistory: FC = () => {
  const {scrollClamp: scrollY} = useScrollValue();

  return (
    <Container>
      <Header {...{scrollY}} />
      <List />
    </Container>
  );
};

export default memo(OrderHistory);
