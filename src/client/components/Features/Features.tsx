import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcStatistics, FcAlphabeticalSortingAz, FcLink } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

const Features = () => {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAlphabeticalSortingAz} w={10} h={10} />}
          title={'Shorten URLs'}
          text={
            'To create a new URL, simply enter the URL you want to shorten and click the "Create New" button.'
          }
        />
        <Feature
          icon={<Icon as={FcLink} w={10} h={10} />}
          title={'Monitor usage'}
          text={
            "Get insights into the number of clicks for each of the shortened links you've created."
          }
        />
        <Feature
          icon={<Icon as={FcStatistics} w={10} h={10} />}
          title={'Analyze traffic'}
          text={
            '-This feature is under construction- View trends regarding usage including usage over time, approximate user location, and the referring web address.'
          }
        />
      </SimpleGrid>
    </Box>
  );
};

export default Features;
