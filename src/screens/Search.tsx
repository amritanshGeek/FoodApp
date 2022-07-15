import React, {FC, memo} from 'react';
import {useScrollValue} from '../utils';
import {SearchComponents} from '../components';
const {Container, Header, List} = SearchComponents;

/**
 * Search
 */

const Dashboard: FC = () => {
  const {scrollClamp: scrollY} = useScrollValue();

  return (
    <Container>
      <Header {...{scrollY}} />
      <List />
    </Container>
  );
};

export default memo(Dashboard);
