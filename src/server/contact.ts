import { createServerFn } from "@tanstack/react-start";
import { appendFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { existsSync } from "node:fs";

const LOG_DIR = resolve("data");
const LOG_FILE = resolve(LOG_DIR, "contact-submissions.ndjson");

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function ensureLogDir(): Promise<void> {
  if (!existsSync(LOG_DIR)) {
    await mkdir(LOG_DIR, { recursive: true });
  }
}

interface ContactInput {
  name: string;
  email: string;
  message: string;
}

interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
  _form?: string;
}

interface ContactResult {
  success: boolean;
  errors?: ContactErrors;
}

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown): ContactInput => {
    const d = data as Record<string, unknown>;
    return {
      name: typeof d.name === "string" ? d.name.trim() : "",
      email: typeof d.email === "string" ? d.email.trim() : "",
      message: typeof d.message === "string" ? d.message.trim() : "",
    };
  })
  .handler(async ({ data }): Promise<ContactResult> => {
    const { name, email, message } = data;

    const errors: ContactErrors = {};

    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!isValidEmail(email)) errors.email = "Please enter a valid email address";
    if (!message) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const entry =
      JSON.stringify({ name, email, message, timestamp: new Date().toISOString() }) + "\n";

    try {
      await ensureLogDir();
      await appendFile(LOG_FILE, entry, "utf-8");
    } catch (err) {
      console.error("Failed to write contact submission:", err);
      return { success: false, errors: { _form: "Something went wrong. Please try again later." } };
    }

    return { success: true };
  });