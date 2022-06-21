import { SignUpComponents } from '../components';
import React, { FC, memo } from 'react';
const { Container, List } = SignUpComponents;

/**
 * SignUp
 */
const SignUp: FC = () => {
  return (
    <Container>
      <List />
    </Container>
  );
};

export default memo(SignUp);
