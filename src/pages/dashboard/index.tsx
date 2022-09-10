import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import PageLayout from 'src/client/components/PageLayout/PageLayout';
import { Url, User } from 'src/shared/types';
import NewUrlForm from 'src/client/components/NewUrlForm/NewUrlForm';
import UrlTable from 'src/client/components/UrlTable/UrlTable';
import useSWR, { useSWRConfig } from 'swr';

interface DashboardProps {
  currentUser: User;
}

const Dashboard: NextPage<DashboardProps> = ({ currentUser }) => {
  const { data, error } = useSWR<Url[], any>('/urls', async () => {
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
