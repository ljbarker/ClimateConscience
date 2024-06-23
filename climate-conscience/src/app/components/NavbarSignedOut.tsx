import Link from "next/link";
import { Box, Flex, Text, Button, HStack, Image } from "@chakra-ui/react";
import { Lato } from "next/font/google";

const NavbarSignedOut = () => {
    return (
      <Box bg={"#FFFFFF"} px={16} width="100vw">
      <Flex
        minH={"60px"}
        align={"center"}
        justify={"space-between"}
      >
        <Flex align="center" ml={2}>
          <Text 
            fontFamily={"Lato-semibold"}
            fontSize="20" 
            color={"#2F2B36"} 
            ml={1}>
            Climate Conscience
          </Text>
        </Flex>
        <Flex>
        <Button
            as={Link}
            href="/login"
            fontFamily={"Lato-semibold"}
            fontStyle={"regular"}
            fontSize={"18"}
            fontWeight={400}
            variant={"link"}
            _hover={{
              textDecoration: "underline",
              color: "#2F2B36",
            }}
            color={"#2F2B36"}
            px="2vw"
          >
            Take the Servey
          </Button>
          <Button
            as={Link}
            href="/login"
            fontFamily={"Lato-semibold"}
            fontStyle={"regular"}
            fontSize={"18"}
            fontWeight={400}
            variant={"link"}
            _hover={{
              textDecoration: "underline",
              color: "#2F2B36",
            }}
            color={"#2F2B36"}
            px="2vw"
          >
            Climate Challenges
          </Button>
          <Button
            as={Link}
            href="/login"
            fontFamily={"Lato-semibold"}
            fontStyle={"regular"}
            fontSize={"18"}
            fontWeight={400}
            variant={"link"}
            _hover={{
              textDecoration: "underline",
              color: "#2F2B36",
            }}
            color={"#2F2B36"}
            px="2vw"
          >
            About Us
          </Button>
        </Flex>
        <HStack spacing={8} alignItems={"center"}>
          <Button
            as={Link}
            href="/login"
            fontFamily={"Lato-semibold"}
            fontStyle={"regular"}
            fontSize={"18"}
            fontWeight={400}
            variant={"link"}
            _hover={{
              textDecoration: "underline",
              color: "#2F2B36",
            }}
            color={"#2F2B36"}
          >
            Sign In
          </Button>
          <Button
            as={Link}
            href="/signup"
            fontFamily={"Lato-semibold"}
            fontStyle={"regular"}
            fontSize={"18"}
            fontWeight={600}
            color={"#2F2B36"}
            bg={"#CCD0FC"}
            borderRadius={100}
            _hover={{
              bg: "#DCDEF7",
              color: "#2F2B36",
            }}
          >
            Sign Up
          </Button>
        </HStack>
      </Flex>
    </Box>
    );
}

export default NavbarSignedOut;