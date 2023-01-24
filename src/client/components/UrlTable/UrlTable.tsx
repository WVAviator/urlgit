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
import React from 'react';

const UrlTable = ({ urls }) => {
  if (!urls) {
    return <Spinner />;
  }

  return (
    <TableContainer
      fontSize={['xx-small', 'x-small', 'small', 'medium']}
      width={['90vw']}
      overflowX="scroll"
    >
      <Table variant="simple">
        <Thead maxWidth={['90vw']}>
          <Tr>
            <Th maxWidth="10rem">Long URL</Th>
            <Th>Short URL</Th>
            <Th isNumeric>Uses</Th>
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
                  <Flex gap={['0.25rem', '0.5rem', '0.75rem']}>
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={url.shortUrl}
                      // width="10rem"
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
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UrlTable;
