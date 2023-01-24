import React from 'react';
import { User } from 'src/shared/types';
import Header from '../_Header/Header';

interface PageLayoutProps {
  user: User;
}

const PageLayout: React.FC<React.PropsWithChildren<PageLayoutProps>> = ({
  children,
  user,
}) => {
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
};

export default PageLayout;
