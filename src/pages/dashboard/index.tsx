import { GetServerSideProps, NextPage } from 'next';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import PageLayout from 'src/client/components/PageLayout/PageLayout';
import { Url, User } from 'src/shared/types';
import { useRouter } from 'next/router';
import NewUrlForm from 'src/client/components/NewUrlForm/NewUrlForm';
import UrlTable from 'src/client/components/UrlTable/UrlTable';
import useSWR, { useSWRConfig } from 'swr';

interface DashboardProps {
  currentUser: User;
  urls: Url[];
}

const Dashboard: NextPage<DashboardProps> = ({
  currentUser,
  urls: initialUrls,
}) => {
  const [urls, setUrls] = React.useState(initialUrls);

  const { data, error } = useSWR('/urls', async () => {
    return fetch('/urls').then((res) => res.json());
  });

  const { mutate } = useSWRConfig();

  // const onNewUrlCreated = async () => {
  //   const res = await fetch('/urls');
  //   const urls = await res.json();
  //   setUrls(urls);
  // };

  return (
    <PageLayout user={currentUser}>
      <NewUrlForm onNewUrlCreated={() => mutate('/urls')} />
      <UrlTable urls={data} />
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { currentUser, urls } = context.query;

  console.log(urls);

  return {
    props: {
      currentUser,
      urls,
    },
  };
};

export default Dashboard;
