import React, {FC, memo} from 'react';
import {useScrollValue} from '../utils';
import {FoodDetailComponents} from '../components';
const {Container, Header, List} = FoodDetailComponents;
/**
 * FoodDetail
 */

const FoodDetail: FC = () => {
  const {scrollClamp: scrollY} = useScrollValue();

  return (
    <Container>
      <Header {...{scrollY}} />
      <List />
    </Container>
  );
};

export default memo(FoodDetail);
