import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { User } from 'src/shared/types';
import Logo from '../Logo/Logo';

const Links = ['Dashboard'];

interface HeaderProps {
  user: User;
}

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.700', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const signOut = async () => {
    await fetch('/auth/signout', {
      method: 'POST',
    });
    router.push('/signin');
  };

  const userDisplay = user ? (
    <Menu>
      <MenuButton
        as={Button}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
        color="gray.200"
      >
        {user.email}
      </MenuButton>
      <MenuList bg="gray.700">
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      align={'center'}
      direction={'row'}
      spacing={6}
    >
      <NextLink href="/signin" passHref>
        <Button
          as={'a'}
          fontSize={'sm'}
          fontWeight={400}
          variant={'link'}
          color="gray.200"
        >
          Sign In
        </Button>
      </NextLink>
      <NextLink href="/signup" passHref>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'pink.400'}
          _hover={{
            bg: 'pink.300',
          }}
        >
          Sign Up
        </Button>
      </NextLink>
    </Stack>
  );

  return (
    <>
      <Box
        bg={useColorModeValue('gray.900', 'gray.900')}
        color="gray.200"
        px={4}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <NextLink href="/" passHref>
              <Link>
                <Box>
                  <Logo />
                </Box>
              </Link>
            </NextLink>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>{userDisplay}</Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
