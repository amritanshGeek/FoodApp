import {ProfileComponents} from '../components';
import React, {FC, memo} from 'react';
import {useScrollValue} from '../utils';
const {Container, Header, List} = ProfileComponents;

/**
 * Account
 */
const Account: FC = () => {
  const {scrollClamp: scrollY} = useScrollValue();

  return (
    <Container>
      <Header {...{scrollY}} />
      <List />
    </Container>
  );
};

export default memo(Account);
