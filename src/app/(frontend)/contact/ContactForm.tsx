"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

type RecaptchaRenderParams = {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

declare global {
  interface Window {
    grecaptcha?: {
      ready?: (callback: () => void) => void;
      render?: (container: HTMLElement, params: RecaptchaRenderParams) => number;
      reset?: (widgetId?: number) => void;
    };
  }
}

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "rounded border border-[#e3beb8] bg-[#f6faff] px-4 py-3 text-[#141d23] outline-none transition placeholder:text-[#8e706b] focus:border-[#610000] focus:bg-white";

const textareaClass =
  "min-h-36 rounded border border-[#e3beb8] bg-[#f6faff] px-4 py-3 text-[#141d23] outline-none transition placeholder:text-[#8e706b] focus:border-[#610000] focus:bg-white";

export default function ContactForm() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const resetCaptcha = useCallback(() => {
    if (widgetIdRef.current !== null && typeof window.grecaptcha?.reset === "function") {
      window.grecaptcha.reset(widgetIdRef.current);
    }
    setRecaptchaToken("");
  }, []);

  const renderRecaptcha = useCallback(() => {
    if (!siteKey || !scriptReady || !recaptchaRef.current || !window.grecaptcha) {
      return;
    }

    if (widgetIdRef.current !== null) {
      return;
    }

    const renderWidget = () => {
      if (!recaptchaRef.current || widgetIdRef.current !== null) {
        return;
      }

      if (typeof window.grecaptcha?.render !== "function") {
        setSubmitState("error");
        setMessage("Human verification could not load. Please try again.");
        return;
      }

      widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          setRecaptchaToken(token);
          setSubmitState("idle");
          setMessage("");
        },
        "expired-callback": () => {
          setRecaptchaToken("");
          setSubmitState("error");
          setMessage("Human verification expired. Please try again.");
        },
        "error-callback": () => {
          setRecaptchaToken("");
          setSubmitState("error");
          setMessage("Human verification could not load. Please try again.");
        },
      });
    };

    if (typeof window.grecaptcha.ready === "function") {
      window.grecaptcha.ready(renderWidget);
      return;
    }

    renderWidget();
  }, [scriptReady, siteKey]);

  useEffect(() => {
    renderRecaptcha();
  }, [renderRecaptcha]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!siteKey) {
      setSubmitState("error");
      setMessage("reCAPTCHA is not configured yet.");
      return;
    }

    if (!recaptchaToken) {
      setSubmitState("error");
      setMessage("Please complete the human verification.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          mobile: formData.get("mobile"),
          email: formData.get("email"),
          organization: formData.get("organization"),
          city: formData.get("city"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          recaptchaToken,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit the form.");
      }

      form.reset();
      resetCaptcha();
      setSubmitState("success");
      setMessage(result.message || "Thanks, your message has been received.");
    } catch (error) {
      resetCaptcha();
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit the form.");
    }
  }

  return (
    <>
      {siteKey && (
        <Script
          id="google-recaptcha"
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
          onReady={() => setScriptReady(true)}
          onError={() => {
            setSubmitState("error");
            setMessage("Human verification could not load. Please try again.");
          }}
        />
      )}

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} name="name" placeholder="Full Name" required type="text" />
          <input
            className={inputClass}
            name="mobile"
            placeholder="Mobile Number"
            required
            type="tel"
          />
          <input
            className={inputClass}
            name="email"
            placeholder="Email Address"
            required
            type="email"
          />
          <input
            className={inputClass}
            name="organization"
            placeholder="Organization / Hospital"
            type="text"
          />
          <input className={inputClass} name="city" placeholder="City" type="text" />
          <input className={inputClass} name="subject" placeholder="Subject" required type="text" />
        </div>
        <textarea className={textareaClass} name="message" placeholder="Message" required />

        <div className="min-h-[78px]">
          {siteKey ? (
            <div ref={recaptchaRef} />
          ) : (
            <p className="rounded border border-[#e3beb8] bg-[#ffdad4]/35 px-4 py-3 text-sm font-semibold text-[#610000]">
              Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to enable human verification.
            </p>
          )}
        </div>

        {message && (
          <p
            className={
              submitState === "success"
                ? "text-sm font-semibold text-[#610000]"
                : "text-sm font-semibold text-[#ba1a1a]"
            }
            role="status"
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="inline-flex w-fit rounded bg-[#610000] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#920703] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {submitState === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}
