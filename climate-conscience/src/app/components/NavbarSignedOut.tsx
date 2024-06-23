import Link from "next/link";
import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";

const NavbarSignedOut = () => {
    return (
      <Box bg={"#FFFFFF"} px={16} width="100%">
      <Flex
        minH={"60px"}
        align={"center"}
        justify={"space-between"}
      >
        <Flex align="center" ml={2}>
        <Button
            as={Link}
            href="/"
            fontFamily={"Lato-regular"}
            fontSize={"20"}
            fontWeight={400}
            variant={"link"}
            _hover={{
              textDecoration: "none",
              color: "#2F2B36",
            }}
            color={"#2F2B36"}
            px="2vw"
          >
            Climate Conscience
          </Button>
        </Flex>
        <Flex>
        <Button
            as={Link}
            href="/survey"
            fontFamily={"Lato-regular"}
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
            Take the Survey
          </Button>
          <Button
            as={Link}
            href="/challenges"
            fontFamily={"Lato-regular"}
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
        </Flex>
        <HStack spacing={"2vw"} alignItems={"center"} mr={"2vw"}>
          <Button
            as={Link}
            href="/login"
            fontFamily={"Lato-regular"}
            fontSize={"18"}
            fontWeight={400}
            variant={"link"}
            _hover={{
              textDecoration: "underline",
              color: "#2F2B36",
            }}
            color={"#2F2B36"}
          >
            Login
          </Button>
          <Button
            as={Link}
            href="/signup"
            fontFamily={"Lato-regular"}
            fontSize={"18"}
            fontWeight={400}
            color={"#2F2B36"}
            bg={"#CCD0FC"}
            borderRadius={100}
            _hover={{
              bg: "#DCDEF7",
              color: "#2F2B36",
            }}
            px={"12px"}
          >
            Sign Up
          </Button>
        </HStack>
      </Flex>
    </Box>
    );
}

export default NavbarSignedOut;