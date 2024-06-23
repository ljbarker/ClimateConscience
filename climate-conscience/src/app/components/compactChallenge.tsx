import { Box, Text, Image, Button } from "@chakra-ui/react";
import earth from "../../../public/Climate_Conscience.jpeg";

const CompactChallenge = (
  {
    id,
    title,
    description,
    emissionsSaved,
    points
  }:
    {
      id: string,
      title: string,
      description: string,
      emissionsSaved: number,
      points: number,
    }
) => {
  return (
    <Box
      id={id}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={"white"}
      padding={"20px"}
      borderRadius={20}
    >
      <Image src={earth.src} alt="Earth" maxH={250} maxW={388} borderRadius={10} />
      <Text
        fontFamily={"Lato-regular"}
        fontSize={"22"}
        mt={"10px"}
        w={388}
        textAlign={"left"}
      >
        {title}
      </Text>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={388}
        pb={"10px"}
        borderBottom={"1px solid #D5D5D7"}
      >
        <Box>
          <Text
            fontFamily={"Lato-regular"}
            fontSize={"17"}
            color={"#76747B"}
          >
            Join the Others
          </Text>
          <Text
            fontFamily={"Lato-regular"}
            fontSize={"17"}
            color={"#2F2B36"}
          >
            Over 100k+ challengers
          </Text>
        </Box>
        <Box>
          <Text
            fontFamily={"Lato-regular"}
            fontSize={"17"}
            color={"#76747B"}
          >
            Communal Effect
          </Text>
          <Text
            fontFamily={"Lato-regular"}
            fontSize={"17"}
            color={"#2F2B36"}
          >
            Lowered emissions by {emissionsSaved} tons
          </Text>
        </Box>
      </Box>
      <Text
        fontFamily={"Lato-regular"}
        fontSize={"16"}
        color={"#76747B"}
        mt={"10px"}
        w={388}
        textAlign={"left"}
      >
        {description}
      </Text>
      <Button
        fontFamily={"Lato-semibold"}
        fontSize={"18"}
        fontWeight={400}
        bg={"#CCD0FC"}
        borderRadius={100}
        _hover={{
          color: "#2F2B36",
        }}
        color={"#2F2B36"}
        padding={"24px"}
        maxW={"270px"}
        height={"40px"}
        px={"24px"}
        mt={"20px"}
      >
        Join the Challenge! Earn {points} Points!
      </Button>
    </Box>
  );
}

export default CompactChallenge;
