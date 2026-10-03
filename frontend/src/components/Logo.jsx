
/*
 * Reusable DevQueue logo component.
 *
 * The logo contains:
 * 1. A blue geometric icon created with SVG.
 * 2. The DevQueue brand name.
 *
 * SVG allows the logo to remain sharp at different sizes.
 */

// Accept a variant prop so we can use the logo on different backgrounds.
function Logo({ variant = "light" }) {
  // Choose the text color based on the background.
  const textColor = variant === "dark" ? "#ffffff" : "#0f2747";

  return (
    <div className="devqueue-logo">
      {/* Geometric DevQueue icon. */}
      <svg
        className="logo-icon"
        width="38"
        height="38"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DevQueue logo icon"
        role="img"
      >
        {/* Upper blue geometric shape. */}
        <path
          d="M24 4L43 15L24 26L5 15L24 4Z"
          fill="#2563EB"
        />

        {/* Left lower geometric shape. */}
        <path
          d="M5 15L24 26V44L5 33V15Z"
          fill="#1D4ED8"
        />

        {/* Right lower geometric shape. */}
        <path
          d="M43 15L24 26V44L43 33V15Z"
          fill="#60A5FA"
        />

        {/* Inner geometric detail. */}
        <path
          d="M24 13L34 19L24 25L14 19L24 13Z"
          fill="#DBEAFE"
        />

        {/* Inner lower detail. */}
        <path
          d="M14 19L24 25V35L14 29V19Z"
          fill="#93C5FD"
        />

        {/* Inner right detail. */}
        <path
          d="M34 19L24 25V35L34 29V19Z"
          fill="#2563EB"
        />
      </svg>

      {/* DevQueue brand name. */}
      <span
        className="logo-text"
        style={{ color: textColor }}
      >
        DevQueue
      </span>
    </div>
  );
}

export default Logo;