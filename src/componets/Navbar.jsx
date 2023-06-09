import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  useDisclosure,
  useColorModeValue,
  HStack,
  Button,
  Image
} from '@chakra-ui/react';

const Navbar = () => {

  return (
    <Box px={4} bg={"coral"}>
      <Flex h alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Link to="/">
            <Image
              boxSize="100px"
              objectFit="cover"
              src="data:image/jpeg;base64,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"
              alt="Logo"
              borderRadius={"50%"}
            />
          </Link>
        </HStack>
        <Flex alignItems={'center'}>
          <Button
            size="md"
            variant="solid"
            colorScheme="teal"
            mr={{ base: 2, md: 0 }}
          >
            <Link to={"/lazyloading"}>
            Lazy Loading
            </Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
