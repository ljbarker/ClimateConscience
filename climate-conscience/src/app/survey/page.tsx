'use client';
import { useState } from 'react';
import { HStack, Box, Text, useRadio, useRadioGroup, Button, Spinner } from '@chakra-ui/react';
import { set } from 'mongoose';

// Define the survey questions and their labels
const SurveyQuestions = {
  numInHousehold: "How often do you consider the number of people in your household for energy-saving measures?",
  primaryHeatSource: "How frequently do you think about the impact of your primary heat source on the environment?",
  numVehicles: "How often do you reflect on the environmental impact of the number of vehicles you own?",
  regularMaintainence: "How regularly do you perform maintenance on your vehicles?",
  amountNaturalGas: "How often do you consider the amount of natural gas you use monthly?",
  amountElectricity: "How often do you think about the amount of electricity you use monthly?",
  usesGreenPower: "How often do you use green power in your home?",
  percentageGreenPower: "How often do you evaluate the percentage of green power used in your home?",
  amountOil: "How often do you consider the amount of oil you use monthly?",
  amountPropane: "How often do you consider the amount of propane you use monthly?",
  recyclesAluSteel: "How often do you recycle aluminum and steel?",
  recyclesPlastic: "How often do you recycle plastic?",
  recyclesGlass: "How often do you recycle glass?",
  recyclesNewspaper: "How often do you recycle newspapers?",
  recyclesMagazines: "How often do you recycle magazines?"
};

// Options for the radio buttons
const options = ['Not Applicable', 'Never', 'Rarely', 'Sometimes', 'Always'];

// RadioCard component
const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        textAlign={"center"}
        alignContent={"center"}
        width={"200px"}
        height={"50px"}
        borderWidth='1px'
        borderRadius='10'
        boxShadow='md'
        bg={"#CCD0FC"}
        color='black'
        _checked={{
          bg: '#CCD0FC',
          color: 'black',
          borderColor: 'black',
          borderWidth: '2px',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

// SurveyQuestionGroup component
const SurveyQuestionGroup = ({ questionKey, onChange }: { questionKey: any, onChange: any }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: questionKey,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}
      spacing={5}
      justifyContent={"center"}
      alignContent={"center"}
      textAlign={"center"}
      wrap={"wrap"}
    >
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

// Survey component
const Survey = () => {
  const [responses, setResponses] = useState({});
  const [summary, setSummary] = useState('');
  const [loadTitle, setLoadTitle] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleChange = (questionKey: any, value: any) => {
    setResponses({
      ...responses,
      [questionKey]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setLoadTitle(true);
    console.log('Submitting survey responses');
    console.log(responses);

    setTimeout(() => {
      setLoadTitle(false);
    }, 2000);

    const response = await fetch('/api/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        responses
      }),
    });
    const data = await response.json();
    setSummary(data.content[0].text);
    setLoading(false);
  };

  return (
    <Box
      justifyContent={"center"}
      alignContent={"center"}
      textAlign={"center"}
      bg={'white'}
      pt={"30px"}
      pb={"30px"}
    >
      {Object.entries(SurveyQuestions).map(([key, question]) => (
        <Box key={key} mb={"30px"}>
          <Text fontSize={"20px"} mb={"10px"}>
            {question}
          </Text>
          <SurveyQuestionGroup
            questionKey={key}
            onChange={(value: any) => handleChange(key, value)}
          />
        </Box>
      ))}
      <Button
        onClick={handleSubmit}
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
        Submit
      </Button>
      <Box mt={"30px"} gap={48}>
        {
          loadTitle ? 
          null
          : 
          <Box>
            {
              loading ? 
              <Box>
                <Text fontSize={"32px"} fontFamily={'Abril-Fatface'}>
                  Thank you for completing the survey!
                </Text>
                <Spinner 
                  thickness='2px'
                  speed='0.65s'
                  color='blue.500'
                  size="l"
                  margin={"40px"}
                  h={60}
                  w={60}
                />
              </Box>
              :
              <Box>
                <Text fontSize={"32px"} fontFamily={'Abril-Fatface'}>
                  Your Personalized Climate Impact Summary
                </Text>
                <Text fontSize={"20px"} fontFamily={'Lato-regular'} padding={"24px"} px={100}>
                  {summary}
                </Text>
              </Box>
            }
          </Box>
        }
      </Box>
    </Box>
  );
}

export default Survey;