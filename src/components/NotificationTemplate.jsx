import { useEffect, useRef, useState } from "react";
import status from "./data/Status";

function NotificationTemplate({ dispatch, statusKey }) {
  const [isOpen, setIsOpen] = useState(true);
  const timeRef = useRef(null);

  function onHandleCloseModal() {
    clearTimeout(timeRef.current);
    timeRef.current = null;
    setIsOpen(!isOpen);
    dispatch({ type: "clearNotification", payload: null });
  }

  useEffect(
    function () {
      timeRef.current = setTimeout(() => {
        setIsOpen((isOpen) => !isOpen);
        dispatch({ type: "clearNotification", payload: null });
      }, 4500);

      return () => clearTimeout(timeRef.current);
    },
    [timeRef, setIsOpen, dispatch],
  );

  return (
    <>
      {isOpen && (
        <div className={`toast toast-${status.get(statusKey)?.[0]}`}>
          {status.get(statusKey)?.[2]}
          <div className="toast-content">
            <div className="toast-title">{status.get(statusKey)?.[0]}</div>
            <div className="toast-msg">{status.get(statusKey)?.[1]}</div>
          </div>
          <button className="toast-close" onClick={onHandleCloseModal}>
            ×
          </button>
          <div className="toast-progress"></div>
        </div>
      )}
    </>
  );
}

// function Logo() {
//   return (
//     <div className="toast-icon">
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2.5"
//       >
//         <circle cx="12" cy="12" r="10"></circle>
//         <line x1="15" y1="9" x2="9" y2="15"></line>
//         <line x1="9" y1="9" x2="15" y2="15"></line>
//       </svg>
//     </div>
//   );
// }

export default NotificationTemplate;
