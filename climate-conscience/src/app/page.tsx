import NavbarSignedOut from "./components/NavbarSignedOut";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/home";

export default function Home() {
  return (
    <ChakraProvider>
      <NavbarSignedOut />
      <HomePage/>
    </ChakraProvider>
  );
}
