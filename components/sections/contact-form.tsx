"use client";

import { useEffect, useState } from "react";
import { contactTopics, type ContactTopic } from "@/content/contact";
import { site } from "@/content/site";
import styles from "./contact-form.module.css";

/** Sends to /api/contact. /contact?topic=idea opens on that topic. */
export function ContactForm() {
  const [topic, setTopic] = useState<ContactTopic>("support");
  const [status, setStatus] = useState<"ready" | "sending" | "sent" | "failed">("ready");

  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get("topic");
    const match = contactTopics.find((t) => t.value === asked);
    if (match) setTopic(match.value);
  }, []);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, email: form.get("email"), message: form.get("message"), company: form.get("company") }),
    }).catch(() => null);
    setStatus(res?.ok ? "sent" : "failed");
  }

  if (status === "sent") {
    return (
      <div className={styles.sent} role="status">
        <h2>Thanks, we've got it.</h2>
        <p>We read every message, and we'll reply to the email you gave us.</p>
      </div>
    );
  }

  const hint = contactTopics.find((t) => t.value === topic)?.hint;
  return (
    <form className={styles.form} onSubmit={send}>
      <fieldset>
        <legend>What's this about?</legend>
        <div className={styles.topics}>
          {contactTopics.map((t) => (
            <label key={t.value}>
              <input type="radio" name="topic" value={t.value} checked={topic === t.value} onChange={() => setTopic(t.value)} />
              <span>{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className={styles.field}>
        <span>Your email</span>
        <input type="email" name="email" autoComplete="email" required maxLength={320} />
      </label>
      <label className={styles.field}>
        <span>Your message</span>
        <textarea name="message" rows={6} required maxLength={2000} placeholder={hint} />
      </label>
      <label className={styles.trap} aria-hidden="true">
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
      {status === "failed" && (
        <p className={styles.error} role="alert">
          That didn't send. Try again, or email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
    </form>
  );
}
