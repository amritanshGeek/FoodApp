import React, { FC, memo} from 'react';
import { useScrollValue } from '../utils';
import { FilterComponents } from '../components';
const { Container, Header, List } = FilterComponents;
/**
 * Filter
 */

const Filter: FC = () => {
  const { scrollClamp: scrollY } = useScrollValue();


  return (
    <Container>
      <Header {...{ scrollY }} />
      {/* <List /> */}
    </Container>
  );
};

export default memo(Filter);
