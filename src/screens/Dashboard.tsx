import React, { FC, memo} from 'react';
import { useScrollValue } from '../utils';
import { DashboardComponents } from '../components';
const { Container, Header, List } = DashboardComponents;

/**
 * Dashboard
 */

const Dashboard: FC = () => {
  const { scrollClamp: scrollY } = useScrollValue();


  return (
    <Container>
      <Header {...{ scrollY }} />
      <List />
    </Container>
  );
};

export default memo(Dashboard);
