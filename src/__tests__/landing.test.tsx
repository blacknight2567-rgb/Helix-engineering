import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomePage } from "../routes/index";

describe("Landing Page", () => {
  it("renders the Helix Engineering name in the navigation", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(screen.getByText("Helix Engineering")).toBeInTheDocument();
  });

  it("renders an empty business name gracefully", () => {
    render(<HomePage businessName="" />);
    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it("renders the value proposition heading", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(
      screen.getByText(
        "A small, focused engineering team that ships production-quality software",
      ),
    ).toBeInTheDocument();
  });

  it("renders 'end-to-end' highlighted text", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(screen.getByText("end-to-end.")).toBeInTheDocument();
  });

  it("renders the value proposition description", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(
      screen.getByText(
        /Architecture, backend, frontend, and tests/,
      ),
    ).toBeInTheDocument();
  });

  it("renders the 'Available for engagements' badge", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(screen.getByText("Available for engagements")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<HomePage businessName="Helix Engineering" />);
    // "About" appears both in the nav and the about section, so use getAllByText
    const aboutLinks = screen.getAllByText("About");
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    // Services only appears in the nav
    expect(screen.getByText("Services")).toBeInTheDocument();
    // Contact appears in nav but "Ready to ship?" is the section heading
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders CTA buttons with correct hrefs", () => {
    render(<HomePage businessName="Helix Engineering" />);
    const startProject = screen.getByText("Start a project");
    expect(startProject).toBeInTheDocument();
    expect(startProject.closest("a")).toHaveAttribute("href", "#contact");

    const seeWhatWeDo = screen.getByText("See what we do");
    expect(seeWhatWeDo).toBeInTheDocument();
    expect(seeWhatWeDo.closest("a")).toHaveAttribute("href", "#services");
  });

  it("renders all 6 service cards", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(screen.getByText("Architecture")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
    expect(screen.getByText("Project Builds")).toBeInTheDocument();
    expect(screen.getByText("Retainers")).toBeInTheDocument();
  });

  it("renders the about section headline", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(screen.getByText("Built different by design")).toBeInTheDocument();
  });

  it("renders about section highlights", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(screen.getByText("No overhead, all output")).toBeInTheDocument();
    expect(screen.getByText("Code review is non-negotiable")).toBeInTheDocument();
    expect(screen.getByText("End-to-end ownership")).toBeInTheDocument();
  });

  it("renders the '<5 people per project' stat", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(screen.getByText("people per project")).toBeInTheDocument();
  });

  it("renders the contact CTA section", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(screen.getByText("Ready to ship?")).toBeInTheDocument();
  });

  it("renders the footer with current year and business name", () => {
    render(<HomePage businessName="Helix Engineering" />);
    const currentYear = new Date().getFullYear();
    // &copy; entity renders as ©
    expect(
      screen.getByText(`© ${currentYear} Helix Engineering. All rights reserved.`),
    ).toBeInTheDocument();
  });

  it("renders the 'See what we do' section heading", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(
      screen.getByText("Full-stack engineering, distilled"),
    ).toBeInTheDocument();
  });

  it("renders service descriptions", () => {
    render(<HomePage businessName="Helix Engineering" />);
    expect(
      screen.getByText(
        "Clean, scalable system design that sets your project up for long-term success. We think before we build.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Component-driven UIs with clean architecture, responsive design, and thoughtful state management. Built for people to use.",
      ),
    ).toBeInTheDocument();
  });
});
