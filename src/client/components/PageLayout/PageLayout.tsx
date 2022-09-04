import React from 'react';
import { User } from 'src/shared/types';
import Header from '../header/Header';

interface PageLayoutProps {
  children: React.ReactNode;
  user: User;
}

const PageLayout = ({ children, user }) => {
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
};

export default PageLayout;
