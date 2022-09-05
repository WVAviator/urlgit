import { CopyIcon } from '@chakra-ui/icons';
import {
  Flex,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import React from 'react';
import { useSWRConfig } from 'swr';

const UrlTable = ({ urls }) => {
  if (!urls) {
    return <Spinner />;
  }

  const { mutate } = useSWRConfig();

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th maxWidth="10rem">Long URL</Th>
            <Th>Short URL</Th>
            <Th isNumeric>Uses</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {urls.map((url) => {
            return (
              <Tr key={url.id}>
                <Td maxWidth="10rem" overflow="scroll">
                  {url.destinationUrl}
                </Td>
                <Td>
                  <Flex gap="1rem">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={url.shortUrl}
                      width="10rem"
                    >
                      {url.shortUrl
                        .replace('http://', '')
                        .replace('https://', '')}
                    </Link>
                    <span>
                      <CopyIcon
                        onClick={(e) => {
                          navigator.clipboard.writeText(url.shortUrl);
                        }}
                        cursor="pointer"
                      />
                    </span>
                  </Flex>
                </Td>
                <Td isNumeric>{url.redirects.length}</Td>
                <Td>
                  <FiTrash2
                    cursor={'pointer'}
                    onClick={async () => {
                      await fetch(`/urls/${url.id}`, {
                        method: 'DELETE',
                      });
                      mutate('/urls');
                    }}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UrlTable;
