import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
export const Notifications = ({ type, message, closeNotification }) => {
  const [visible, setVisible] = useState(true);

  const closeRef = useRef(closeNotification);
  useEffect(() => {
    closeRef.current = closeNotification;
  }, [closeNotification]);
  const timersRef = useRef({ timer: null, afterTimer: null });

  useEffect(() => {
    if (!message) {
      if (timersRef.current.timer) {
        clearTimeout(timersRef.current.timer);
        timersRef.current.timer = null;
      }
      if (timersRef.current.afterTimer) {
        clearTimeout(timersRef.current.afterTimer);
        timersRef.current.afterTimer = null;
      }
      return;
    }
    setVisible(true);

    timersRef.current.timer = setTimeout(() => {
      setVisible(false);
      timersRef.current.timer = null;

      timersRef.current.afterTimer = setTimeout(() => {
        if (typeof closeRef.current === "function") closeRef.current();
        timersRef.current.afterTimer = null;
      }, 300);
    }, 3000);
    return () => {
      if (timersRef.current.timer) {
        clearTimeout(timersRef.current.timer);
        timersRef.current.timer = null;
      }
      if (timersRef.current.afterTimer) {
        clearTimeout(timersRef.current.afterTimer);
        timersRef.current.afterTimer = null;
      }
    };
  }, [message]);

  if (!message) return null;

  const isSuccess = type === "success";

  const handleManualClose = () => {
    if (timersRef.current.timer) {
      clearTimeout(timersRef.current.timer);
      timersRef.current.timer = null;
    }
    if (timersRef.current.afterTimer) {
      clearTimeout(timersRef.current.afterTimer);
      timersRef.current.afterTimer = null;
    }

    setVisible(false);
    setTimeout(() => {
      if (typeof closeRef.current === "function") closeRef.current();
    }, 300);
  };

  return (
    <main
      className={`fixed bottom-4 right-4 w-[20rem] transform transition-all duration-300 ease-in-out z-50 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <section
        role="status"
        aria-live="polite"
        className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg relative"
      >
        <article className="flex flex-row items-center">
          <div className="px-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 1792 1792"
              fill={isSuccess ? "#44C997" : "#D9534F"}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
            </svg>
          </div>

          <div className="mx-2 flex-1">
            <span className="font-semibold block">
              {isSuccess ? "Successfully Saved!" : "Error"}
            </span>
            <span className="block text-gray-500">
              {message ||
                (isSuccess
                  ? "Anyone with a link can now view this file"
                  : "error")}
            </span>
          </div>

          <div className="self-start">
            <button
              aria-label="close notification"
              onClick={handleManualClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Notifications;
