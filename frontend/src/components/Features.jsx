// Defines the features section component.
function Features() {
  // Returns the features section displayed on the landing page.
  return (
    <section id="features" className="features">
      {/* Displays the section heading. */}
      <h2>DevQueue Features</h2>

      {/* Contains the feature cards. */}
      <div className="feature-container">

        {/* First feature card. */}
        <div className="feature-card">
          <h3>Project Management</h3>

          <p>
            Create and organize software development projects.
          </p>
        </div>

        {/* Second feature card. */}
        <div className="feature-card">
          <h3>Task Tracking</h3>

          <p>
            Track tasks, priorities, deadlines, and progress.
          </p>
        </div>

        {/* Third feature card. */}
        <div className="feature-card">
          <h3>Team Collaboration</h3>

          <p>
            Help team members coordinate their development work.
          </p>
        </div>

      </div>
    </section>
  );
}

// Makes the Features component available to other files.
export default Features;