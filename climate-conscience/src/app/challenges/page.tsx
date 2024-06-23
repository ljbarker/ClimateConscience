"use client";

import { Box, Grid, Text } from "@chakra-ui/react";
import CompactChallenge from "../components/compactChallenge";
import { useEffect, useState } from "react";

const ChallengesPage = () => {

  const [challenges, setChallenges] = useState<{ title: string; description: string; points: number; user: string; streak: number; maxStreak: number; level: number; goal: number; daysComplete: number; taskEmmisionSaved: number; }[]>([
    {
      title: 'Turn Off Lights When Not In Use',
      description: 'Turning off lights when you leave a room can save a lot of energy.',
      points: 10,
      user: "",
      streak: 0,
      maxStreak: 0,
      level: 0,
      goal: 5,
      daysComplete: 0,
      taskEmmisionSaved: 10,
    },
    {
      title: 'Take Shorter Showers',
      description: 'Taking shorter showers can save a lot of water.',
      points: 10,
      user: "",
      streak: 0,
      maxStreak: 0,
      level: 0,
      goal: 5,
      daysComplete: 0,
      taskEmmisionSaved: 10,
    },
    {
      title: 'Use A Reusable Water Bottle',
      description: 'Using a reusable water bottle can save a lot of plastic.',
      points: 10,
      user: "",
      streak: 0,
      maxStreak: 0,
      level: 0,
      goal: 5,
      daysComplete: 0,
      taskEmmisionSaved: 10,
    },
    {
      title: 'Eat Less Meat',
      description: 'Eating less meat can reduce your carbon footprint.',
      points: 10,
      user: "",
      streak: 0,
      maxStreak: 0,
      level: 0,
      goal: 5,
      daysComplete: 0,
      taskEmmisionSaved: 10,
    },
    {
      title: 'Walk Or Bike Instead Of Driving',
      description: 'Walking or biking instead of driving can reduce your carbon footprint.',
      points: 10,
      user: "",
      streak: 0,
      maxStreak: 0,
      level: 0,
      goal: 5,
      daysComplete: 0,
      taskEmmisionSaved: 10,
    },
    {
      title: 'Plant A Tree',
      description: 'Planting a tree can help offset your carbon footprint.',
      points: 10,
      user: "",
      streak: 0,
      maxStreak: 0,
      level: 0,
      goal: 5,
      daysComplete: 0,
      taskEmmisionSaved: 10,
    },
    {
      title: 'Use A Reusable Bag',
      description: 'Using a reusable bag can save a lot of plastic.',
      points: 10,
      user: "",
      streak: 0,
      maxStreak: 0,
      level: 0,
      goal: 5,
      daysComplete: 0,
      taskEmmisionSaved: 10,
    },
    {
      title: 'Unplug Electronics When Not In Use',
      description: 'Unplugging electronics when not in use can save a lot of energy.',
      points: 10,
      user: "",
      streak: 0,
      maxStreak: 0,
      level: 0,
      goal: 5,
      daysComplete: 0,
      taskEmmisionSaved: 10,
    },
    {
      title: 'Use A Reusable Coffee Cup',
      description: 'Using a reusable coffee cup can save a lot of plastic.',
      points: 10,
      user: "",
      streak: 0,
      maxStreak: 0,
      level: 0,
      goal: 5,
      daysComplete: 0,
      taskEmmisionSaved: 10,
    },
  ]);


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
        justifyContent="center"
        alignItems="center"
      >
        {challenges.map((challenge, index) => {
          return (
            <CompactChallenge
              key={index}
              id={index.toString()}
              title={challenge.title}
              description={challenge.description}
              emissionsSaved={challenge.taskEmmisionSaved}
              points={challenge.points}
            />
          )
        })};
      </Grid>
    </Box>
  );
}

export default ChallengesPage;