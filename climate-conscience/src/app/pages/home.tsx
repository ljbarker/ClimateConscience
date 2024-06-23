import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import earth from "../../../public/Climate_Conscience.jpeg";


const HomePage = () => {
  return (
    <Flex
      minH={"60px"}
      align={"center"}
      justify={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        gap={"24px"}
        padding={"24px"}
      >
        <Text 
          fontFamily={"Abril-Fatface"}
          fontSize="65"
          color={"#2F2B36"} 
          ml={1}
          maxW={"600px"}
        >
            Understanding Your Climate Impact Begins Here
        </Text>
        <Text
          fontFamily={"Lato"}
          fontSize="20"
          color={"#2F2B36"}
          ml={1}
        >
          At Climate Conscience we strive to raise awareness towards harmful daily habits that are negatively affecting our Earth. We aim to guide humanity to a cleaner, greener future for generations to come by fostering a community that takes proactive action against climate change through small daily tasks.        </Text>
        <Text/>
        <Button
          fontFamily={"Lato-semibold"}
          fontSize={"18"}
          fontWeight={400}
          variant={"link"}
          bg={"#CCD0FC"}
          borderRadius={100}
          _hover={{
            textDecoration: "underline",
            color: "#2F2B36",
          }}
          color={"#2F2B36"}
          padding={"24px"}
          maxW={"228px"}
          height={"40px"}
          px={"6px"}
        >
          Begin your journey today!
        </Button>
      </Box>
      <Image
        src={earth}
        alt="Picture of the earth"
        width={1000}
        height={500}
      />
    </Flex>
  );
}

export default HomePage;