import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./notification.module.css";

function Notification({ title, message, status }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return mounted
    ? createPortal(
        <div className={cssClasses}>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>,
        document.querySelector("#notifications")
      )
    : null;
}

export default Notification;
