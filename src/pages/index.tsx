import { Container } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NewUrlForm from 'src/client/components/NewUrlForm/NewUrlForm';
import PageLayout from 'src/client/components/PageLayout/PageLayout';
import { User } from 'src/shared/types';

interface HomePageProps {
  currentUser: User;
}

const HomePage: NextPage<HomePageProps> = ({ currentUser }) => {
  const router = useRouter();

  const onNewUrlCreated = async () => {
    router.push('/dashboard');
  };

  const onNewUrlFailed = async () => {
    router.push('/signin');
  };

  return (
    <PageLayout user={currentUser}>
      <Container centerContent>
        <NewUrlForm
          onNewUrlCreated={onNewUrlCreated}
          onNewUrlFailed={onNewUrlFailed}
        />
      </Container>
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

export default HomePage;
