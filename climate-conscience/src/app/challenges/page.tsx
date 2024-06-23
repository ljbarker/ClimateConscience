import { Box, Grid, Text } from "@chakra-ui/react";

const challengesPage = () => {  
  return (
    <Box ml={"26px"} mr={"26px"}>
      <Box>
        <Text
          fontFamily={"Abril-Fatface"}
          fontSize={"65"} 
          borderBottom={"2px solid #000000"}
          mt={"100px"}
          mb={"35px"}
        >
          Daily Challenges
        </Text>
        <Text
          fontFamily={"Lato-regular"}
        >
          Reduce carbon emissions by making minor adjustments to your daily routine!
        </Text>
      </Box>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        mt={"50px"}
      >
        <Box>
          sad
        </Box>

        <Box>
          sad
        </Box>

        <Box>
          sad
        </Box>
      </Grid>
    </Box>
  );
}

export default challengesPage;