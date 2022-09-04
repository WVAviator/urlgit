import { FormEvent, ChangeEvent, useState } from 'react';
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

interface NewUrlFormProps {
  onNewUrlCreated?: () => Promise<void>;
  onNewUrlFailed?: () => Promise<void>;
}

const NewUrlForm: React.FC<NewUrlFormProps> = ({
  onNewUrlCreated,
  onNewUrlFailed,
}) => {
  const [newUrl, setNewUrl] = useState('');
  const [state, setState] = useState<'initial' | 'submitting' | 'success'>(
    'initial',
  );
  const [error, setError] = useState(false);

  return (
    <Flex
      align={'center'}
      justify={'center'}
      paddingBlock={10}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Container
        maxW={'lg'}
        bg={useColorModeValue('white', 'whiteAlpha.100')}
        boxShadow={'xl'}
        rounded={'lg'}
        p={6}
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          as={'form'}
          spacing={'12px'}
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            setError(false);
            setState('submitting');

            const res = await fetch('/urls', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ destinationUrl: newUrl }),
            });

            if (res.status === 201) {
              setState('success');
              setNewUrl('');
              onNewUrlCreated?.();
              setTimeout(() => setState('initial'), 3000);
            } else {
              setError(true);
              onNewUrlFailed?.();
              setState('initial');
            }
          }}
        >
          <FormControl>
            <Input
              variant={'solid'}
              borderWidth={1}
              color={'gray.800'}
              _placeholder={{
                color: 'gray.400',
              }}
              borderColor={useColorModeValue('gray.300', 'gray.700')}
              id="url-input"
              type="url"
              required
              placeholder={'URL'}
              aria-label={'URL'}
              value={newUrl}
              disabled={state !== 'initial'}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewUrl(e.target.value)
              }
            />
          </FormControl>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              colorScheme={state === 'success' ? 'green' : 'blue'}
              isLoading={state === 'submitting'}
              w="100%"
              type={state === 'success' ? 'button' : 'submit'}
            >
              {state === 'success' ? <CheckIcon /> : 'Create New'}
            </Button>
          </FormControl>
        </Stack>
        <Text
          mt={2}
          textAlign={'center'}
          color={error ? 'red.500' : 'gray.500'}
        >
          {error ? 'An error occurred. Please try again.' : ''}
        </Text>
      </Container>
    </Flex>
  );
};

export default NewUrlForm;
