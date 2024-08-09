import About from "../Components/About";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import { Box, Container } from "@mui/material";
import Services from "../Components/Services";
import Projects from "./Projects";
import LanguagesAndTools from "../Components/LanguagesAndTools";
import Certifications from "../Components/Certifications";
import Footer from "../Components/footer";

function Home() {
  return (
    <Box>
      <Container maxWidth="xl">
        <Header />
        <Hero />
        <About />
        <Services />
        <LanguagesAndTools />
        <Projects />
        <Certifications />
        <Footer />
      </Container>
    </Box>
  );
}

export default Home;
