import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { HTMLAttributes } from 'react';

interface SignUpFormProps extends HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  heading?: string;
  subheading?: string;
  submitButtonLabel?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  children,
  heading = '',
  subheading = '',
  submitButtonLabel = 'Sign up',
  ...rest
}) => {
  return (
    <form {...rest}>
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            {heading && (
              <Heading fontSize={'4xl'} textAlign={'center'}>
                {heading}
              </Heading>
            )}
            {subheading && (
              <Text fontSize={'lg'} color={'gray.600'}>
                {subheading}
              </Text>
            )}
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              {children}
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  type="submit"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  {submitButtonLabel}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
};

export default SignUpForm;
