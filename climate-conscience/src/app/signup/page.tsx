"use client";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    HStack,
    Box,
    Link,
    Flex,
    Text,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginUser } from "../../auth/auth";
import { NextResponse } from "next/server";
import earth from "../../../public/Climate_Conscience.jpeg";

const SignupPage = () => {
    // State variables for form inputs and other states
    const [fullName, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState(false);

    // Function to handle form submission
    const handleSumbit = async (e: React.FormEvent) => {
        console.log("submitting form");
        e.preventDefault(); // Prevent default form submission
        setErrorMessage(""); // Clear previous error message
        setUsernameError(false); // Clear previous username error state
        if (
            // Validate form inputs
            fullName === "" ||
            username === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill out all fields");
            return;
        } else if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } else {
            try {
                // Create a new user object with form data
                const user = { name: fullName, username: username, password: password, mode: "signup" };
                const res = await fetch(`/api/creds`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                }); // Send request to create a new user
                let data;
                if (res.status === 200) {
                    // If account creation is successful
                    data = await res.json();
                    console.log("Account created successfully!");

                    // Automatically log in the user after account creation
                    const loginRes = await loginUser({ username, password });
                    if (loginRes.status === 200) {
                        const loginData = await loginRes.json();
                        localStorage.setItem("token", loginData.token);
                    } else {
                        const loginErr = await loginRes.text();
                        console.log("Login failed:", loginErr);
                    }
                } else {
                    // Handle account creation failure
                    const err = await res.text();
                    if (err === "User already exists") {
                        setErrorMessage(
                            "User already exists. Please enter another username.",
                        );
                        setUsername(""); // Clear the username field
                        setUsernameError(true); // Set the username error state
                    } else {
                        setErrorMessage(err);
                    }
                    console.log("Account creation failed:", err);
                }
            } catch (error) {
                console.error("Error during form submission:", error);
                setErrorMessage("An error occurred during signup. Please try again.");
            }
        }
    };

    return (

        <Flex
            justify="center"
            p={4}
            pt={200}
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
                p={30}
                width={{ base: "full", sm: "md", lg: "lg" }}
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                bg="white"
                mt={{ base: "1rem", md: "0.5rem" }} // Reduced top margin to prevent overlap with navbar
            >
                <VStack spacing={6}>
                    <Text fontSize="2xl" color="#216869">
                        Create New Account
                    </Text>
                    {errorMessage && (
                        <Text color="red.500" textAlign="center">
                            {errorMessage}
                        </Text>
                    )}
                    <HStack
                        spacing={6}
                        width="full"
                        flexDirection={{ base: "column", md: "row" }}
                    >
                        <FormControl id="fullName" isRequired>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                                type="text"
                                borderColor="#216869"
                                border={"1px solid #D5D5D7"}
                                borderRadius={5}
                                p={3}
                                _hover={{ borderColor: "#49A078" }}
                                onChange={(e) => setName(e.target.value)}
                                value={fullName}
                            />
                        </FormControl>
                    </HStack>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            borderColor="#216869"
                            border={"1px solid #D5D5D7"}
                            borderRadius={5}
                            p={3}
                            _hover={{ borderColor: "#49A078" }}
                            onFocus={() => setUsernameError(false)} // Reset the background color on focus
                            value={username}
                            bg={usernameError ? "red.100" : "white"} // Change background color if there's an error
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                borderColor="#216869"
                                border={"1px solid #D5D5D7"}
                                borderRadius={5}
                                p={3}
                                _hover={{ borderColor: "#49A078" }}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <InputRightElement h={"full"}>
                                <Button
                                    variant={"ghost"}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <FormControl id="confirmPassword" isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                borderColor="#216869"
                                border={"1px solid #D5D5D7"}
                                borderRadius={5}
                                p={3} _hover={{ borderColor: "#49A078" }}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                            <InputRightElement h={"full"}>
                                <Button
                                    variant={"ghost"}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        width="full"
                        onClick={handleSumbit}
                    >
                        Sign Up
                    </Button>
                    <Link color="teal.500" href="/login">
                        Already have an account? Log In
                    </Link>
                </VStack>
            </Box>
        </Flex>
    );
};

export default SignupPage; 