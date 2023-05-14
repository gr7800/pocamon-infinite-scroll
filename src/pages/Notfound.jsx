import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";


const Notfound = () => {
    const bg = useColorModeValue("stone.300", "gray.900");
    const shadow = useColorModeValue("lg", "dark-lg");

    return (
        <Box bg={bg} h="100vh" d="flex" justifyContent="center" alignItems="center">
            <Box
                w={{ base: "80%", sm: "60%", md: "40%", lg: "30%" }}
                rounded="lg"
                shadow={shadow}
                bg="white"
                textAlign="center"
                pt={{ base: "8", md: "12" }}
                px={{ base: "6", md: "8" }}
                pb={{ base: "8", md: "12" }}
            >
                <Heading as="h1" fontSize={{ base: "3xl", lg: "4xl" }} mb="4">
                    Whoops!
                </Heading>
                <Text fontSize={{ base: "xl", md: "2xl" }} mb="8">
                    This page is unavailable.
                </Text>
                <Text fontSize={{ base: "md", lg: "lg" }} color="gray.900" mb="8">
                    You don't have access to this workspace or it doesn't exist anymore.
                </Text>
                <Link to="/">
                    <Button
                        bg="cyan.500"
                        color="white"
                        size={{ base: "sm", lg: "xl" }}
                        px={{ base: "4", md: "8" }}
                        py={{ base: "2", md: "4" }}
                        rounded="md"
                        fontWeight="normal"
                        fontSize={{ base: "xs", md: "xl" }}
                        _hover={{ bg: "cyan.600" }}
                    >
                        Go Back Home
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}

export default Notfound
