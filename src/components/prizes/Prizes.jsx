import { useState, useEffect, useMemo, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import styles from "./Prizes.module.css";
import {
  FaTrophy,
  FaSpinner,
  FaExternalLinkAlt,
  FaUsers,
  FaProjectDiagram,
  FaCalendarAlt,
} from "react-icons/fa";

const sheetUrl = import.meta.env.VITE_SHEET_URL;

// Extract Papa.parse logic into a Promise-based function
const fetchPrizesData = (csvUrl) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing failed: ${results.errors[0].message}`));
          return;
        }

        // Filter for rows that have at least a "Prizes" link or a "Prize Category/Event Name"
        const relevantRows = results.data.filter(
          (row) =>
            (row.Prizes && row.Prizes.trim().length > 0) ||
            (row["Prize Category"] &&
              row["Prize Category"].trim().length > 0) ||
            (row["Event Name"] && row["Event Name"].trim().length > 0)
        );

        resolve(relevantRows);
      },
      error: (err) => {
        reject(new Error(`Failed to fetch prize data: ${err.message}`));
      },
    });
  });
};

// Memoized Prize item component for better performance
const PrizeItem = memo(({ prizeData }) => {
  const category =
    prizeData["Prize Category"] || prizeData["Event Name"] || "General Awards";
  const prizeName = prizeData["Prize Name"] || "Award";
  const winners = prizeData["Winner Name(s) / Team Name"] || "To Be Announced";
  const projectTitle = prizeData["Project Title (if applicable)"] || null;
  const detailsLink = prizeData["Prizes"];
  const year = prizeData["Year"] || prizeData["Scheme"] || null;

  return (
    <div className={styles.prizeItem}>
      <div className={styles.prizeIconColor}>
        <FaTrophy className={styles.trophyIcon} />
      </div>
      <div className={styles.prizeDetails}>
        {year && (
          <span className={styles.prizeYear}>
            <FaCalendarAlt /> {year}
          </span>
        )}
        <h3 className={styles.prizeCategory}>{category}</h3>
        <h4 className={styles.prizeName}>{prizeName}</h4>

        <p className={styles.prizeWinner}>
          <FaUsers /> Winner(s): <strong>{winners}</strong>
        </p>
        {projectTitle && (
          <p className={styles.prizeProject}>
            <FaProjectDiagram /> Project: <em>{projectTitle}</em>
          </p>
        )}
        {detailsLink && (
          <a
            href={detailsLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.detailsLink}
          >
            View Full List / Details <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  );
});

function Prizes() {
  const [selectedYear, setSelectedYear] = useState("");

  // React Query replaces all your manual state management
  const {
    data: prizesData = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["prizes", sheetUrl],
    queryFn: () => fetchPrizesData(sheetUrl),
    enabled: !!sheetUrl,
  });

  // Memoized available years calculation for better performance
  const availableYears = useMemo(() => {
    return [
      ...new Set(
        prizesData.map((r) => r["Year"] || r["Scheme"]).filter(Boolean)
      ),
    ].sort((a, b) => b.localeCompare(a)); // Sort descending
  }, [prizesData]);

  // Set default year when data loads
  useEffect(() => {
    if (availableYears.length > 0 && !selectedYear) {
      setSelectedYear(availableYears[0]); // Default to latest year
    }
  }, [availableYears, selectedYear]);

  // Memoized filtered prizes for better performance
  const filteredPrizes = useMemo(() => {
    return prizesData.filter(
      (prize) =>
        !selectedYear || (prize["Year"] || prize["Scheme"]) === selectedYear
    );
  }, [prizesData, selectedYear]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.loadingSpinner} />
        <p>Loading Prize Information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load prize information: {error.message}</p>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          style={{
            marginTop: "12px",
            padding: "8px 16px",
            backgroundColor: isFetching
              ? "#ccc"
              : "var(--color-primary, #004aad)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: isFetching ? "not-allowed" : "pointer",
            opacity: isFetching ? 0.7 : 1,
          }}
        >
          {isFetching ? "Retrying..." : "Try Again"}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.prizesPage}>
      <div className={styles.pageHeader}>
        <FaTrophy className={styles.headerIcon} />
        <h1 className={styles.pageTitle}>Awards & Recognition</h1>
        <p className={styles.pageSubtitle}>
          Celebrating the outstanding achievements of our students and their
          projects.
        </p>
        {/* Optional: Show background refresh indicator */}
        {isFetching && !isLoading && (
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-secondary, #4A5568)",
              marginTop: "8px",
            }}
          >
            🔄 Checking for updates...
          </p>
        )}
      </div>

      {availableYears.length > 1 && (
        <div className={styles.filterContainer}>
          <label htmlFor="yearFilter" className={styles.filterLabel}>
            Filter by Year/Scheme:
          </label>
          <select
            id="yearFilter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className={styles.yearSelect}
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {filteredPrizes.length > 0 ? (
        <div className={styles.prizesGrid}>
          {filteredPrizes.map((prize, index) => (
            <PrizeItem
              key={`${prize["Prize Category"] || "prize"}-${
                prize["Year"] || "year"
              }-${index}`}
              prizeData={prize}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noPrizes}>
          No prize information available for the selected year, or no prizes
          have been posted yet.
        </p>
      )}
    </div>
  );
}

export default Prizes;
