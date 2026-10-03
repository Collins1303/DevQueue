// Imports the hero section component.
import Hero from "../components/Hero";

// Imports the features section component.
import Features from "../components/Features";

// Defines the Home page component.
function Home() {
  // Displays the main content of the home page.
  return (
    <>
      {/* Displays the main introductory section. */}
      <Hero />

      {/* Displays the DevQueue features. */}
      <Features />
    </>
  );
}

// Makes the Home component available to other files.
export default Home;