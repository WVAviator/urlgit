import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { HTMLAttributes } from 'react';

interface SignInFormProps extends HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  heading?: string;
  subHeaderElement?: React.ReactNode;
  submitButtonLabel?: string;
}

const SignInForm: React.FC<SignInFormProps> = ({
  children,
  heading = '',
  subHeaderElement = null,
  submitButtonLabel = 'Submit',
  ...rest
}) => {
  return (
    <form {...rest}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            {heading && <Heading fontSize={'4xl'}>{heading}</Heading>}
            {subHeaderElement && (
              <Text fontSize={'lg'} color={'gray.600'}>
                {subHeaderElement}
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  type="submit"
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  {submitButtonLabel}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
};

export default SignInForm;
