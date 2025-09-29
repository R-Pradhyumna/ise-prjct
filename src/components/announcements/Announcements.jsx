import { useMemo, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import Papa from "papaparse";
import styles from "./Announcements.module.css";
import {
  FaBullhorn,
  FaSpinner,
  FaExternalLinkAlt,
  FaFilePdf,
} from "react-icons/fa";

const sheetUrl = import.meta.env.VITE_SHEET_URL;
const ANNOUNCEMENT_LINK_COLUMN = "Innovata Announcements";
const ANNOUNCEMENT_TITLE_COLUMN = "Announcement Title";
const ANNOUNCEMENT_DATE_COLUMN = "Announcement Date";
const ANNOUNCEMENT_SUMMARY_COLUMN = "Announcement Summary";

// Extract Papa.parse logic into a Promise-based function
const fetchAnnouncementsData = (csvUrl) => {
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

        // Filter relevant announcements
        const relevantRows = results.data.filter(
          (row) =>
            row[ANNOUNCEMENT_LINK_COLUMN] &&
            row[ANNOUNCEMENT_LINK_COLUMN].trim().length > 0
        );

        resolve(relevantRows);
      },
      error: (err) => {
        reject(new Error(`Failed to fetch announcements: ${err.message}`));
      },
    });
  });
};

// Memoized component to prevent unnecessary re-renders
const AnnouncementItem = memo(({ announcement, index }) => {
  const title =
    announcement[ANNOUNCEMENT_TITLE_COLUMN] || `Announcement #${index + 1}`;
  const dateStr = announcement[ANNOUNCEMENT_DATE_COLUMN] || null;
  const summary =
    announcement[ANNOUNCEMENT_SUMMARY_COLUMN] ||
    "View the announcement for more details.";
  const link = announcement[ANNOUNCEMENT_LINK_COLUMN];
  const isPdf = link && link.toLowerCase().includes(".pdf");

  return (
    <div className={styles.announcementItem}>
      <div className={styles.itemHeader}>
        <h3 className={styles.itemTitle}>{title}</h3>
        {!isPdf && dateStr && (
          <span className={styles.itemDate}>
            {new Date(dateStr).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        )}
      </div>
      <p className={styles.itemSummary}>{summary}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.itemLink}
      >
        {isPdf ? (
          <>
            <FaFilePdf /> View PDF
          </>
        ) : (
          <>
            <FaExternalLinkAlt /> View Details
          </>
        )}
      </a>
    </div>
  );
});

function Announcements() {
  // React Query for data fetching
  const {
    data: announcementsData = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["announcements", sheetUrl],
    queryFn: () => fetchAnnouncementsData(sheetUrl),
    enabled: !!sheetUrl,
  });

  // Memoize announcements to prevent unnecessary filtering
  const announcements = useMemo(() => {
    return announcementsData; // No additional filtering needed since it's done in fetchAnnouncementsData
  }, [announcementsData]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.loadingSpinner} />
        <p>Loading Announcements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Failed to load announcements: {error.message}</p>
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
    <div className={styles.announcementsPage}>
      <div className={styles.pageHeader}>
        <FaBullhorn className={styles.headerIcon} />
        <h1 className={styles.pageTitle}>Announcements</h1>
        <p className={styles.pageSubtitle}>
          Stay updated with the latest news and notices from the department.
        </p>
        {/* Background refresh indicator */}
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

      {announcements.length > 0 ? (
        <div className={styles.announcementsList}>
          {announcements.map((announcementData, index) => (
            <AnnouncementItem
              key={`${
                announcementData[ANNOUNCEMENT_TITLE_COLUMN] || "announcement"
              }-${index}`}
              announcement={announcementData}
              index={index}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noAnnouncements}>
          No announcements posted yet. Please check back later.
        </p>
      )}
    </div>
  );
}

export default Announcements;
