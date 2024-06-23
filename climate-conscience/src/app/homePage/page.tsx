import { Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import earth from "../../../public/Climate_Conscience.jpeg";

const HomePage = () => {
  return (
    <Flex
      minH={"60px"}
      align={"center"}
      justify={"center"}
      position="relative"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage={`url(${earth.src})`}
        bgSize="cover"
        bgPosition="center"
        zIndex={-1}
        filter="brightness(0.5)"
        height={"100vh"}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        gap={"24px"}
        padding={"24px"}
        zIndex={1}
        color="white"
        textAlign="center"
        alignItems={"center"}
      >
        <Text 
          fontFamily={"Abril-Fatface"}
          fontSize="65"
          color={"white"} 
          ml={1}
          maxW={"600px"}
        >
          Understanding Your Climate Impact Begins Here
        </Text>
        <Text
          fontFamily={"Lato-regular"}
          fontSize="20"
          color={"white"}
          ml={1}
          maxW={"600px"}
        >
          At Climate Conscience we strive to raise awareness towards harmful daily habits that are negatively affecting our Earth. We aim to guide humanity to a cleaner, greener future for generations to come by fostering a community that takes proactive action against climate change through small daily tasks.
        </Text>
        <Button
          as={Link}
          href="/survey"
          fontFamily={"Lato-bold"}
          fontSize={"18"}
          bg={"#CCD0FC"}
          borderRadius={100}
          _hover={{
            color: "#2F2B36",
            bg: "#DCDEF7",
            textDecoration: "none",
          }}
          color={"#2F2B36"}
          padding={"24px"}
          maxW={"300px"}
          height={"40px"}
        >
          Begin your journey today!
        </Button>
      </Box>
    </Flex>
  );
}

export default HomePage;