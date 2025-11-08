import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import { memo, useEffect, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaFilter,
  FaLink,
  FaListOl,
  FaSpinner,
} from "react-icons/fa";
import styles from "./Formats.module.css";

const sheetUrl = import.meta.env.VITE_SHEET_URL;

// Hardcoded link names based on order for each phase
const PHASE_LINK_NAMES = {
  "Phase-1": [
    "Literature Survey Guidelines",
    "Introduction & Report Format",
    "Project Guidelines",
    "Synopsis Guidelines",
  ],
  "Phase-2": [
    "Evaluation Annexure",
    "Presentation Template",
    "Final Report Front sheet",
  ],
};

// Extract Papa.parse logic into a Promise-based function
const fetchFormatsData = (csvUrl) => {
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

        const rowWithGuidelineData = results.data.find(
          (r) =>
            (r["Phase-1"] && r["Phase-1"].trim() !== "") ||
            (r["Phase-2"] && r["Phase-2"].trim() !== "")
        );

        if (!rowWithGuidelineData) {
          reject(
            new Error(
              "No format data found in the sheet for Phase-1 or Phase-2."
            )
          );
          return;
        }

        const extractedPhaseData = {};
        const phasesFound = [];

        ["Phase-1", "Phase-2"].forEach((phase) => {
          if (rowWithGuidelineData[phase]) {
            extractedPhaseData[phase] = rowWithGuidelineData[phase]
              .split(/\r?\n/)
              .map((url) => url.trim())
              .filter((url) => url.startsWith("http"));
            if (extractedPhaseData[phase].length > 0) {
              phasesFound.push(phase);
            }
          } else {
            extractedPhaseData[phase] = [];
          }
        });

        resolve({
          phaseData: extractedPhaseData,
          availablePhases: phasesFound,
        });
      },
      error: (err) => {
        reject(new Error(`Failed to fetch formats: ${err.message}`));
      },
    });
  });
};

// Memoized component for rendering guidelines list
const GuidelinesList = memo(({ links, selectedPhase }) => (
  <ul className={styles.guidelinesList}>
    {links.map((link, index) => {
      const linkName =
        PHASE_LINK_NAMES[selectedPhase]?.[index] ||
        `Guideline Link ${index + 1}`;
      return (
        <li key={`${selectedPhase}-${index}`} className={styles.guidelineItem}>
          <FaLink className={styles.linkIcon} />
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.guidelineName}
            title={`Open ${linkName}`}
          >
            {linkName}
          </a>
        </li>
      );
    })}
  </ul>
));

function Formats() {
  // React Query for data fetching
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["formats", sheetUrl],
    queryFn: () => fetchFormatsData(sheetUrl),
    enabled: !!sheetUrl,
  });

  // Extract data with defaults
  const phaseData = data?.phaseData || {};
  const availablePhases = data?.availablePhases || [];

  // Local state for UI selections
  const [availableSchemes] = useState(["2021"]);
  const [selectedScheme, setSelectedScheme] = useState("2021");
  const [selectedPhase, setSelectedPhase] = useState("");

  // Update selected phase when data changes
  useEffect(() => {
    if (availablePhases.length > 0 && !selectedPhase) {
      setSelectedPhase(availablePhases[0]);
    }
  }, [availablePhases, selectedPhase]);

  // Memoized current phase links calculation
  const currentPhaseLinks = useMemo(() => {
    return phaseData[selectedPhase] || [];
  }, [phaseData, selectedPhase]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.loadingSpinner} />
        <p>Loading Formats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load formats: {error.message}</p>
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
    <div className={styles.guidelinesPage}>
      <div className={styles.pageHeader}>
        <FaBookOpen className={styles.headerIcon} />
        <h1 className={styles.pageTitle}>Innovata Formats</h1>
        <p className={styles.pageSubtitle}>
          Find all necessary guidelines and templates for project phases.
        </p>
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

      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <label htmlFor="schemeFilter" className={styles.filterLabel}>
            <FaFilter /> Select Scheme:
          </label>
          <select
            id="schemeFilter"
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className={styles.filterSelect}
            disabled={availableSchemes.length <= 1}
          >
            {availableSchemes.map((scheme) => (
              <option key={scheme} value={scheme}>
                {scheme}
              </option>
            ))}
          </select>
        </div>

        {availablePhases.length > 0 && (
          <div className={styles.filterGroup}>
            <label htmlFor="phaseFilter" className={styles.filterLabel}>
              <FaListOl /> Select Phase:
            </label>
            <select
              id="phaseFilter"
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className={styles.filterSelect}
            >
              {availablePhases.map((phase) => (
                <option key={phase} value={phase}>
                  {phase.replace("-", " ")}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedPhase && (
        <div className={styles.guidelinesContent}>
          <h2 className={styles.selectedPhaseTitle}>
            {selectedPhase.replace("-", " ")} Guidelines ({selectedScheme})
          </h2>
          {currentPhaseLinks.length > 0 ? (
            <GuidelinesList
              links={currentPhaseLinks}
              selectedPhase={selectedPhase}
            />
          ) : (
            <p className={styles.noGuidelinesMessage}>
              No guideline links found for {selectedPhase.replace("-", " ")} in
              scheme {selectedScheme}.
            </p>
          )}
        </div>
      )}

      {!selectedPhase && availablePhases.length > 0 && (
        <p className={styles.noGuidelinesMessage}>
          Please select a phase to view guidelines for scheme {selectedScheme}.
        </p>
      )}

      {availablePhases.length === 0 && (
        <p className={styles.noGuidelinesMessage}>
          No guidelines available for scheme {selectedScheme}.
        </p>
      )}
    </div>
  );
}

export default Formats;
