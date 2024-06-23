import NavbarSignedOut from "./components/NavbarSignedOut";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./homePage/page";

export default function Home() {
  return (
    <ChakraProvider>
      <NavbarSignedOut />
      <HomePage/>
    </ChakraProvider>
  );
}
