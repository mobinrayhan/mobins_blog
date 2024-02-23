import { useEffect, useRef, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

const NOTIFICATION_TIMER_CHANGE = 3000; // 3 seconds

export default function ContactForm() {
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [error, setError] = useState("");

  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();

  async function contactHandler(eve) {
    eve.preventDefault();

    if (
      !emailRef.current.value ||
      !nameRef.current.value ||
      !messageRef.current.value
    ) {
      return null;
    }

    const postedData = {
      email: emailRef.current.value,
      userName: nameRef.current.value,
      message: messageRef.current.value,
    };

    try {
      setNotificationStatus("pending");
      const response = await fetch("/api/contacts?q=3", {
        method: "POST",
        body: JSON.stringify(postedData),
        "Content-Type": "application/json",
      });

      if (response.ok) {
        eve.target.reset();
        setNotificationStatus("success");
        return;
      }

      return await response.json().then(({ message }) => {
        throw new Error(message || "Something went wrong 🔥");
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setNotificationStatus("error");
    }
  }

  useEffect(() => {
    let timer;

    if (notificationStatus !== "pending") {
      timer = setTimeout(() => {
        setNotificationStatus(null);
      }, NOTIFICATION_TIMER_CHANGE);
    }

    return () => clearTimeout(timer);
  }, [notificationStatus]);

  let notification;

  if (notificationStatus === "pending") {
    notification = (
      <Notification
        message="Your Message Sending 🚶‍♀️ ..."
        status="pending"
        title="Pending"
      />
    );
  }

  if (notificationStatus === "error") {
    notification = (
      <Notification message={error} status="error" title="Error" />
    );
  }

  if (notificationStatus === "success") {
    notification = (
      <Notification
        message="Message has been sent successfully 😊"
        status="success"
        title="Successful"
      />
    );
  }

  return (
    <>
      <section className={classes.contact}>
        <h1>How can I help you?</h1>
        <form className={classes.form} onSubmit={contactHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" required ref={emailRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" required ref={nameRef} />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your message</label>
            <textarea
              id="message"
              rows="5"
              required
              ref={messageRef}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </form>
      </section>
      {notificationStatus && notification}
    </>
  );
}
