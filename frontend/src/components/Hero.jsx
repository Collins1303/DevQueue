// Defines the main hero section component.
function Hero() {
  // Returns the main introductory section of DevQueue.
  return (
    <main id="home" className="hero">
      {/* Displays the main heading. */}
      <h2>Manage Your Development Projects With Ease</h2>

      {/* Explains what DevQueue does. */}
      <p>
        DevQueue helps software development teams organize projects,
        manage tasks, and collaborate more efficiently.
      </p>

      {/* Displays the main call-to-action button. */}
      <button className="primary-button">Get Started</button>
    </main>
  );
}

// Makes the Hero component available to other files.
export default Hero;