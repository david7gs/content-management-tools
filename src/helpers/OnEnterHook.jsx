import { useEffect } from "react";

/**
 * Custom hook to execute a callback when the Enter key is pressed.
 * @param {Function} callback - The function to run on Enter press.
 */
export const OnEnterHook = (callback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        callback(event);
      }
    };

    // Attach listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Clean up: remove listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]); // Re-run only if the callback changes
};
