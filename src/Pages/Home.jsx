import About from "../Components/About";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { Box, Container } from '@mui/material';
import Services from "../Components/Services";
import Projects from "./Projects";

function Home() {
  return (
    <Box>
      <Container maxWidth="xl">
        <Header />
        <Hero />
        <About />
        <Services/>
        <Projects />
      </Container>
    </Box>
  );
}

export default Home;
