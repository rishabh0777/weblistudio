"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  INSTAGRAM_URL,
  hasWhatsApp,
  whatsappHref,
  WEB3FORMS_KEY,
} from "./contactConfig";

const PROJECT_TYPES = [
  "Business website",
  "E-commerce store",
  "Landing page",
  "Interactive experience",
  "Website redesign",
  "Not sure yet",
];

const BUDGET_RANGES = [
  "Under ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹20,000",
  "₹20,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "Over ₹1,00,000",
];

const DETAILS_MAX = 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_ORDER = [
  "name",
  "email",
  "business",
  "projectType",
  "budget",
  "details",
  "privacyConsent",
];

const FOCUS_ID = {
  name: "cf-name",
  email: "cf-email",
  business: "cf-business",
  projectType: "cf-projectType-0",
  budget: "cf-budget-0",
  details: "cf-details",
  privacyConsent: "cf-privacy",
};

const INITIAL = {
  name: "",
  email: "",
  business: "",
  projectType: "",
  budget: "",
  details: "",
  privacyConsent: false,
};

const ANIM = "contact-anim opacity-0 motion-reduce:opacity-100";
const ERROR_COLOR = "#f87171";

const LABEL =
  "block font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:text-xs";

const FIELD =
  "mt-2 block w-full rounded-none border-b bg-transparent py-3 text-base text-foreground transition-colors duration-300 placeholder:text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";

const PILL_PRIMARY =
  "group inline-flex min-h-12 items-center gap-5 rounded-full border border-foreground bg-foreground px-6 text-sm font-medium text-[#080808] transition-colors duration-300 hover:bg-transparent hover:text-[#f5f5f5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground cursor-pointer";

const TEXT_ACTION =
  "group inline-flex min-h-12 items-center gap-3 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground cursor-pointer";

const TEXT_ACTION_LABEL =
  "border-b border-border pb-0.5 transition-colors duration-300 group-hover:border-foreground";

function validateField(field, value) {
  switch (field) {
    case "name": {
      const v = typeof value === "string" ? value.trim() : "";
      if (!v) return "Please enter your full name.";
      if (v.length < 2) return "That name looks too short.";
      return "";
    }
    case "email": {
      const v = typeof value === "string" ? value.trim() : "";
      if (!v) return "Please enter your email address.";
      if (!EMAIL_RE.test(v))
        return "Please enter a valid email address, like name@company.com.";
      return "";
    }
    case "business": {
      const v = typeof value === "string" ? value.trim() : "";
      return v ? "" : "Please enter your brand or business name.";
    }
    case "projectType":
      return value ? "" : "Please choose a project type.";
    case "budget":
      return value ? "" : "Please choose a budget range.";
    case "details": {
      const v = typeof value === "string" ? value.trim() : "";
      if (!v) return "Please tell us a little about your project.";
      if (v.length < 20)
        return "Please add a little more detail (at least 20 characters).";
      return "";
    }
    case "privacyConsent":
      return value ? "" : "Please read and agree to the Privacy Policy to continue.";
    default:
      return "";
  }
}

function validateAll(values) {
  const errors = {};
  for (const field of FIELD_ORDER) {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  }
  return errors;
}

function buildMessage(values) {
  return [
    "Hi Webli Studio, I’d like to start a project.",
    "",
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Brand / business: ${values.business.trim()}`,
    `Project type: ${values.projectType}`,
    `Budget range: ${values.budget}`,
    "",
    "Project details:",
    values.details.trim(),
  ].join("\n");
}

function FieldError({ id, children }) {
  if (!children) return null;

  return (
    <p
      id={id}
      className="mt-2 text-sm leading-snug"
      style={{ color: ERROR_COLOR }}
    >
      {children}
    </p>
  );
}

function TextField({ id, label, error, as: Tag = "input", ...rest }) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <Tag
        id={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${FIELD} ${error ? "" : "border-border focus:border-foreground"}`}
        style={error ? { borderColor: ERROR_COLOR } : undefined}
        {...rest}
      />
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

function ChoiceGroup({ name, legend, options, value, error, onChange }) {
  const errorId = `cf-${name}-error`;

  return (
    <fieldset
      className="min-w-0"
      aria-describedby={error ? errorId : undefined}
    >
      <legend className={LABEL}>{legend}</legend>

      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option, i) => {
          const id = `cf-${name}-${i}`;

          return (
            <div key={option} className="relative">
              <input
                id={id}
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={() => onChange(name, option)}
                aria-invalid={error ? "true" : undefined}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-border px-4 text-sm text-foreground transition-colors duration-300 hover:border-foreground peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-foreground"
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>

      <FieldError id={errorId}>{error}</FieldError>
    </fieldset>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [copyState, setCopyState] = useState("idle");

  const [toast, setToast] = useState(null);

  const panelRef = useRef(null);
  const previousStatus = useRef("idle");
  const copyTimer = useRef(null);
  const toastTimer = useRef(null);

  const triggerToast = (type, title, description) => {
    clearTimeout(toastTimer.current);
    setToast({ type, title, description });
    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  useEffect(() => {
    if (status !== "idle") {
      panelRef.current?.focus();
    } else if (previousStatus.current !== "idle") {
      document.getElementById(FOCUS_ID.name)?.focus();
    }
    previousStatus.current = status;
  }, [status]);

  useEffect(() => {
    return () => {
      clearTimeout(copyTimer.current);
      clearTimeout(toastTimer.current);
    };
  }, []);

  const setField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      const msg = validateField(field, value);
      const next = { ...errors };
      if (msg) next[field] = msg;
      else delete next[field];

      setErrors(next);
      if (!Object.keys(next).length) setShowSummary(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setField(name, type === "checkbox" ? checked : value);
  };

  const handleBlur = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    if (!val && !errors[name]) return;

    const msg = validateField(name, val);
    setErrors((current) => {
      const next = { ...current };
      if (msg) next[name] = msg;
      else delete next[name];
      return next;
    });
  };

  const handleActionClick = async (e) => {
    e.preventDefault();

    const found = validateAll(values);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      setShowSummary(true);
      document.getElementById(FOCUS_ID[firstInvalid])?.focus();
      triggerToast(
        "error",
        "INCOMPLETE FORM",
        "Please fill in all required fields and accept the privacy policy."
      );
      return;
    }

    setShowSummary(false);
    setIsSubmitting(true);

    const text = buildMessage(values);
    setMessage(text);

    try {
      if (WEB3FORMS_KEY) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New Project Inquiry from ${values.name} (${values.business})`,
            from_name: "Webli Studio Contact",
            name: values.name,
            email: values.email,
            business: values.business,
            project_type: values.projectType,
            budget: values.budget,
            message: values.details,
          }),
        });

        const data = await res.json();
        if (!data.success) {
          throw new Error(data.message || "Submission failed");
        }
      }

      triggerToast(
        "success",
        "INQUIRY SENT",
        "Details recorded. Opening WhatsApp now..."
      );

      const href = whatsappHref(text);
      if (href) {
        setTimeout(() => {
          window.location.href = href;
        }, 1200);
      } else {
        setStatus("fallback");
      }
    } catch (err) {
      triggerToast(
        "error",
        "DELIVERY FAILED",
        "Email backup failed, redirecting to WhatsApp directly..."
      );

      const href = whatsappHref(text);
      if (href) {
        setTimeout(() => {
          window.location.href = href;
        }, 1500);
      } else {
        setStatus("fallback");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyMessage = async () => {
    clearTimeout(copyTimer.current);

    try {
      await navigator.clipboard.writeText(message);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }

    copyTimer.current = setTimeout(() => setCopyState("idle"), 4000);
  };

  const errorCount = Object.keys(errors).length;
  const detailsLength = values.details.length;

  return (
    <>
      {/* Floating Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3.5 border bg-transparent px-5 py-4 backdrop-blur-md transition-all duration-300 ${
            toast.type === "success"
              ? "border-emerald-500/80 text-emerald-400"
              : "border-red-500/80 text-red-400"
          }`}
        >
          <span
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
              toast.type === "success" ? "bg-emerald-400" : "bg-red-400"
            }`}
          />
          <div className="flex-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
              {toast.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed opacity-90">
              {toast.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Close notification"
            className="text-xs opacity-60 transition-opacity hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {status !== "idle" ? (
        <div data-contact="form" className={ANIM}>
          <div
            ref={panelRef}
            tabIndex={-1}
            className="border border-border bg-surface p-6 focus:outline-none sm:p-8"
          >
            <p className={LABEL}>One more step</p>

            <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground md:text-3xl">
              Send it on{" "}
              <em className="font-serif text-[1.08em] font-normal italic leading-[0.8] tracking-[-0.02em]">
                Instagram.
              </em>
            </h3>

            <p className="mt-4 max-w-[32rem] text-pretty text-sm leading-relaxed text-muted md:text-base">
              We couldn’t open WhatsApp directly. Copy your message and send it to us on Instagram.
            </p>

            <pre className="mt-6 max-h-64 overflow-auto whitespace-pre-wrap break-words border border-border p-4 font-mono text-xs leading-relaxed text-foreground">
              {message}
            </pre>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className={PILL_PRIMARY}
              >
                Open Instagram
                <span aria-hidden="true">↗</span>
              </a>

              <button type="button" onClick={copyMessage} className={TEXT_ACTION}>
                <span className={TEXT_ACTION_LABEL}>Copy message</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className={TEXT_ACTION}
              >
                <span className={TEXT_ACTION_LABEL}>Edit details</span>
              </button>
            </div>

            <p aria-live="polite" className="mt-3 min-h-5 text-sm text-muted">
              {copyState === "copied" && "Message copied to your clipboard."}
              {copyState === "failed" &&
                "We couldn’t copy automatically. Select the message above and copy it."}
            </p>
          </div>
        </div>
      ) : (
        <div data-contact="form" className={ANIM}>
          <form
            noValidate
            onSubmit={(e) => e.preventDefault()}
            aria-label="Project inquiry"
          >
            <p className="mb-8 text-sm leading-relaxed text-muted">
              All fields are required. Clicking below sends your inquiry and opens WhatsApp with your details.
            </p>

            {showSummary && errorCount > 0 && (
              <div
                role="alert"
                className="mb-8 border p-4 text-sm leading-relaxed text-foreground"
                style={{ borderColor: ERROR_COLOR }}
              >
                {errorCount === 1
                  ? "Please fix 1 field to continue."
                  : `Please fix ${errorCount} fields to continue.`}
              </div>
            )}

            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <TextField
                id="cf-name"
                name="name"
                label="Full name"
                type="text"
                autoComplete="name"
                maxLength={80}
                value={values.name}
                error={errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your name"
              />

              <TextField
                id="cf-email"
                name="email"
                label="Email address"
                type="email"
                autoComplete="email"
                inputMode="email"
                maxLength={120}
                value={values.email}
                error={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="name@company.com"
              />
            </div>

            <div className="mt-8">
              <TextField
                id="cf-business"
                name="business"
                label="Brand or business name"
                type="text"
                autoComplete="organization"
                maxLength={100}
                value={values.business}
                error={errors.business}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Your brand or business"
              />
            </div>

            <div className="mt-8">
              <ChoiceGroup
                name="projectType"
                legend="Project type"
                options={PROJECT_TYPES}
                value={values.projectType}
                error={errors.projectType}
                onChange={setField}
              />
            </div>

            <div className="mt-8">
              <ChoiceGroup
                name="budget"
                legend="Budget range"
                options={BUDGET_RANGES}
                value={values.budget}
                error={errors.budget}
                onChange={setField}
              />
            </div>

            <div className="mt-8">
              <TextField
                as="textarea"
                id="cf-details"
                name="details"
                label="Project details"
                rows={5}
                maxLength={DETAILS_MAX}
                value={values.details}
                error={errors.details}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="What do you do, what do you need, and when would you like to launch?"
              />
              <p
                aria-hidden="true"
                className="mt-2 text-right font-mono text-[11px] tracking-[0.18em] text-muted"
              >
                {detailsLength} / {DETAILS_MAX}
              </p>
            </div>

            {/* Mandatory Privacy Policy Checkbox */}
            <div className="mt-6">
              <div className="flex items-start gap-3">
                <div className="relative flex items-center pt-0.5">
                  <input
                    id="cf-privacy"
                    type="checkbox"
                    name="privacyConsent"
                    checked={values.privacyConsent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.privacyConsent ? "true" : undefined}
                    className="peer h-4 w-4 shrink-0 appearance-none rounded-[4px] border border-border bg-transparent transition-colors duration-200 checked:border-foreground checked:bg-foreground hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground cursor-pointer"
                  />
                  {/* Custom Checkmark Icon */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="pointer-events-none absolute left-0 top-0.5 h-4 w-4 stroke-[#080808] opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                  >
                    <path
                      d="M3 7.5L5.5 10L11 4"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <label
                  htmlFor="cf-privacy"
                  className="text-xs leading-relaxed text-muted cursor-pointer select-none"
                >
                  I have read and agree to the{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="text-blue-500 underline decoration-[#fff] underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and consent to processing my details for project inquiries.
                </label>
              </div>
              <FieldError id="cf-privacy-error">
                {errors.privacyConsent}
              </FieldError>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#whatsapp"
                onClick={handleActionClick}
                className={PILL_PRIMARY}
                style={
                  isSubmitting
                    ? { pointerEvents: "none", opacity: 0.6 }
                    : undefined
                }
              >
                {isSubmitting
                  ? "Preparing..."
                  : hasWhatsApp
                  ? "Send via WhatsApp"
                  : "Prepare my message"}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}