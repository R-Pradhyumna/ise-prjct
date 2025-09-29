// src/components/Modal.jsx
import React from "react";
import styles from "./Modal.module.css";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className={styles.modalContent} onClick={stopPropagation}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle} id="modalTitle">
            {title}
          </h3>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

// // src/components/Modal.jsx
// import React from 'react';
// import styles from './Modal.module.css'; // We'll create this CSS file next
// import { FaTimes } from 'react-icons/fa';

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) {
//     return null;
//   }

//   // Prevent clicks inside the modal from closing it, only overlay or close button
//   const handleModalContentClick = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
//       <div className={styles.modalContent} onClick={handleModalContentClick}>
//         <div className={styles.modalHeader}>
//           <h3 id="modalTitle" className={styles.modalTitle}>{title}</h3>
//           <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
//             <FaTimes />
//           </button>
//         </div>
//         <div className={styles.modalBody}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
