import React, {FC, memo} from 'react';
import {useScrollValue} from '../utils';
import {DashboardComponents} from '../components';
const {Container, List} = DashboardComponents;

/**
 * Dashboard
 */

const Dashboard: FC = () => {
  return (
    <Container>
      <List />
    </Container>
  );
};

export default memo(Dashboard);
