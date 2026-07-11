import { useState, type FormEvent } from "react";
import { submitContact } from "~/server/contact";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string>("");

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) {
      e.name = "Name is required";
    }
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Please enter a valid email address";
    }
    if (!form.message.trim()) {
      e.message = "Message is required";
    }
    return e;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const clientErrors = validate();
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setSubmitState("loading");
    setServerError("");

    try {
      const result = await submitContact({
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        },
      });

      if (!result.success) {
        if (result.errors) {
          const { _form, ...fieldErrors } = result.errors;
          setErrors(fieldErrors);
          if (_form) setServerError(_form);
        }
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setSubmitState("error");
    }
  }

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  if (submitState === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-800 dark:bg-green-950/40">
        <p className="text-lg font-semibold text-green-700 dark:text-green-300">
          Message sent!
        </p>
        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
          Thanks for reaching out. We'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          disabled={submitState === "loading"}
          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 ${
            errors.name
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          disabled={submitState === "loading"}
          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 ${
            errors.email
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          disabled={submitState === "loading"}
          className={`w-full resize-y rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 ${
            errors.message
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          placeholder="How can we help?"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Server error */}
      {serverError && submitState === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400">
          {serverError}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitState === "loading"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-gray-950"
      >
        {submitState === "loading" ? (
          <>
            <svg
              className="-ml-1 mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}