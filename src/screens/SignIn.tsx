import { SignInComponents } from '../components';
import React, { FC, memo } from 'react';
const { Container, List } = SignInComponents;

/**
 * SignIn
 */
const SignIn: FC = () => {
  return (
    <Container>
      <List />
    </Container>
  );
};

export default memo(SignIn);
