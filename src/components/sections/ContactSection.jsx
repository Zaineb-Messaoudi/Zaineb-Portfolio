import { motion, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { contactCards, personal, sectionMeta } from "../../data/portfolioData";
import { fadeUp, staggerParent } from "../../utils/motion";
import SectionShell from "../ui/SectionShell";
import { localize, useLanguage } from "../../i18n";

const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

async function submitContactForm(event, setStatus, t) {
  event.preventDefault();
  const formElement = event.currentTarget;
  const form = new FormData(formElement);
  setStatus({ type: "loading", message: t("Sending your message...") });

  if (!formEndpoint) {
    setStatus({
      type: "error",
      message: t("Contact form is not live yet. Please use email or LinkedIn until the form endpoint is connected."),
    });
    return;
  }

  try {
    const response = await fetch(formEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: form,
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const firstError = Array.isArray(result?.errors) ? result.errors[0] : null;
      throw new Error(
        firstError?.message || result?.error || t("Unable to send the message right now.")
      );
    }

    formElement.reset();
    setStatus({
      type: "success",
      message: t("Message sent successfully. Zaineb will receive it soon."),
    });
  } catch (error) {
    setStatus({
      type: "error",
      message:
        error.message || t("Something went wrong while sending the message. Please try again."),
    });
  }
}

function ContactSection() {
  const reduceMotion = useReducedMotion();
  const { language, t } = useLanguage();
  const localizedCards = localize(contactCards, language);
  const localizedMeta = localize(sectionMeta.contact, language);
  const [status, setStatus] = useState({ type: "", message: "" });

  return (
    <SectionShell id="contact" {...localizedMeta}>
      <motion.div
        className="contact-grid"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerParent}
      >
        <motion.div className="glass-card" variants={fadeUp}>
          <h3 className="card-title">{t("Direct channels")}</h3>
          <div style={{ marginTop: "1rem", display: "grid", gap: "0.85rem" }}>
            {localizedCards.map((card) => (
              <a
                key={card.label}
                className="contact-card"
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={`${card.label}: ${card.value}`}
              >
                <strong>{card.label}</strong>
                <span>{card.value}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div className="glass-card" variants={fadeUp}>
          <h3 className="card-title">{t("Send a message")}</h3>
          <p className="project-overview">
            {t("For internship roles, collaborative builds, or applied AI conversations, this form sends directly to Zaineb's inbox.")}
          </p>

          <form className="contact-form"           onSubmit={(event) => submitContactForm(event, setStatus, t)}>
            <input type="hidden" name="_subject" value="New portfolio contact" />
            <div className="field">
              <label htmlFor="name">{t("Name")}</label>
              <input id="name" name="name" type="text" autoComplete="name" required />
            </div>

            <div className="field">
              <label htmlFor="email">{t("Email")}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="subject">{t("Subject")}</label>
              <input
                id="subject"
                name="subject"
                type="text"
                autoComplete="off"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="message">{t("Message")}</label>
              <textarea
                id="message"
                name="message"
                required
                aria-describedby="message-help"
              />
              <span id="message-help" className="meta-line">
                {t("Include the opportunity, team, or collaboration context.")}
              </span>
            </div>

            <button type="submit" className="button button-primary">
              {t("Send via email")}
              <Send size={18} />
            </button>
            {status.message ? (
              <p className={`form-status form-status-${status.type}`} role="status">
                {status.message}
              </p>
            ) : null}
          </form>
        </motion.div>
      </motion.div>
    </SectionShell>
  );
}

export default ContactSection;
