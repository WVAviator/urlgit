import { Button, FormControl, FormLabel, Input, Link } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import PageLayout from 'src/client/components/PageLayout/PageLayout';
import SignInForm from 'src/client/components/SignInForm/SignInForm';
import { User } from 'src/shared/types';

interface SignInProps {
  currentUser: User;
}

const SignIn: NextPage<SignInProps> = ({ currentUser }) => {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignIn = async (event) => {
    event.preventDefault();
    const response = await fetch('/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 201) {
      router.push('/dashboard');
    }
  };

  return (
    <PageLayout user={currentUser}>
      <SignInForm
        onSubmit={onSignIn}
        heading="Sign in to your account"
        subHeaderElement={
          <>
            Or{' '}
            <NextLink href="/signup" passHref>
              <Link>create a new account</Link>
            </NextLink>
          </>
        }
        submitButtonLabel="Sign in"
      >
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </SignInForm>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentUser = context.query;

  return {
    props: {
      currentUser: currentUser.id ? currentUser : null,
    },
  };
};

export default SignIn;
