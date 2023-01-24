import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import NewUrlForm from 'src/client/components/NewUrlForm/NewUrlForm';
import PageLayout from 'src/client/components/PageLayout/PageLayout';
import UrlTable from 'src/client/components/UrlTable/UrlTable';
import { Url, User } from 'src/shared/types';
import useSWR, { useSWRConfig } from 'swr';

interface DashboardProps {
  currentUser: User;
}

const Dashboard: NextPage<DashboardProps> = ({ currentUser }) => {
  const { data, error } = useSWR('/urls', async () => {
    return fetch('/urls').then((res) => res.json());
  });

  const { mutate } = useSWRConfig();

  return (
    <PageLayout user={currentUser}>
      <NewUrlForm onNewUrlCreated={() => mutate('/urls')} />
      <UrlTable urls={data} />
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { currentUser } = context.query;

  return {
    props: {
      currentUser,
    },
  };
};

export default Dashboard;
