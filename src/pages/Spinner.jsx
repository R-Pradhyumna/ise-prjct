import "./Spinner.css"; // We'll provide new CSS for this

function Spinner() {
  return (
    <div
      className="pulsing-dots-spinner"
      role="status"
      aria-label="Loading content"
    >
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}

export default Spinner;
