import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../components/ContactForm";

// Mock the submitContact server function so it doesn't make network calls
const mockSubmitContact = vi.fn();
vi.mock("../server/contact", () => ({
  submitContact: (...args: unknown[]) => mockSubmitContact(...args),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all form fields and submit button", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "John");
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.type(screen.getByLabelText("Message"), "Hello");

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
    expect(screen.queryByText("Message is required")).not.toBeInTheDocument();
  });

  it("clears field-level error when user starts typing", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Submit empty to trigger validation
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(screen.getByText("Name is required")).toBeInTheDocument();

    // Type in the name field — error should clear
    await user.type(screen.getByLabelText("Name"), "J");
    expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
  });

  it("shows loading state during submission", async () => {
    const user = userEvent.setup();
    // Make submitContact never resolve
    mockSubmitContact.mockImplementation(() => new Promise(() => {}));

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "John");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.type(screen.getByLabelText("Message"), "Hello!");

    // Fire click without awaiting — the promise never resolves
    user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    });
  });

  it("shows success state after successful submission", async () => {
    const user = userEvent.setup();
    mockSubmitContact.mockResolvedValue({ success: true });

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Jane");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Message"), "I'd like to work with you.");

    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => {
      expect(screen.getByText("Message sent!")).toBeInTheDocument();
    });
    expect(
      screen.getByText("Thanks for reaching out. We'll get back to you soon."),
    ).toBeInTheDocument();
  });

  it("shows server error message when API returns an error", async () => {
    const user = userEvent.setup();
    mockSubmitContact.mockResolvedValue({
      success: false,
      errors: { _form: "Something went wrong. Please try again." },
    });

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Jane");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Message"), "Hello");

    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again."),
      ).toBeInTheDocument();
    });
  });

  it("shows network error message when fetch fails", async () => {
    const user = userEvent.setup();
    mockSubmitContact.mockRejectedValue(new Error("Network failure"));

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Jane");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("Message"), "Hello");

    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Network error. Please check your connection and try again.",
        ),
      ).toBeInTheDocument();
    });
  });

  it("clears form and shows success on valid submission", async () => {
    const user = userEvent.setup();
    mockSubmitContact.mockResolvedValue({ success: true });

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Message"), "Let's build something!");

    await user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => {
      expect(screen.getByText("Message sent!")).toBeInTheDocument();
    });

    // Verify submitContact was called with the right data
    expect(mockSubmitContact).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          name: "Alice",
          email: "alice@example.com",
          message: "Let's build something!",
        },
      }),
    );
  });

  it("disables inputs while loading", async () => {
    const user = userEvent.setup();
    mockSubmitContact.mockImplementation(() => new Promise(() => {}));

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Bob");
    await user.type(screen.getByLabelText("Email"), "bob@example.com");
    await user.type(screen.getByLabelText("Message"), "Hi");

    // Fire click without awaiting
    user.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toBeDisabled();
      expect(screen.getByLabelText("Email")).toBeDisabled();
      expect(screen.getByLabelText("Message")).toBeDisabled();
    });
  });
});