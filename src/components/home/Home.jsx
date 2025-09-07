// src/components/home/Home.jsx
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"; // Import CSS Modules

// Simple Arrow Icon for the button (can be replaced with an SVG library)
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginLeft: "8px", verticalAlign: "middle" }}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homePageContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>
            Project Expo <span className={styles.highlightYear}>2025</span>:
            <br />
            Innovation Unleashed
          </h1>
          <p className={styles.heroSubtitle}>
            Welcome to the annual showcase of talent from the Department of
            Information Science & Engineering at MIT Mysore.
          </p>
          <p className={styles.heroDescription}>
            Explore groundbreaking student projects, discover emerging
            technologies, and celebrate the spirit of innovation that defines
            our department.
          </p>
          <button
            className={styles.heroCtaButton}
            onClick={() => navigate("/project")}
          >
            View Projects
            <ArrowRightIcon />
          </button>
        </div>
        <div className={styles.heroImageContainer}>
          <img
            src="/assets/Event-logo.webp" // Assuming this is your main expo branding
            alt="Project Expo 2025 Event Logo"
            className={styles.heroImage}
          />
          {/* You could add an illustrative graphic here too or instead of the logo */}
        </div>
      </section>
    </div>
  );
}

export default Home;
