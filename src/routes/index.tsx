import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";
import { ContactForm } from "~/components/ContactForm";

const getBusinessName = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const cfg = JSON.parse(await readFile("site.json", "utf8")) as {
      businessName?: string;
    };
    return cfg.businessName?.trim() ?? "";
  } catch {
    return "";
  }
});

export const Route = createFileRoute("/")({
  loader: () => getBusinessName(),
  component: Home,
});

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  {
    title: "Architecture",
    description:
      "Clean, scalable system design that sets your project up for long-term success. We think before we build.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    title: "Backend",
    description:
      "Server-side logic, database schema design, and third-party integrations. APIs that are a pleasure to consume.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5M5.25 9.75h13.5M12 14.25V9.75M6 5.25h12a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-9A2.25 2.25 0 016 5.25z" />
      </svg>
    ),
  },
  {
    title: "Frontend",
    description:
      "Component-driven UIs with clean architecture, responsive design, and thoughtful state management. Built for people to use.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: "Testing",
    description:
      "Unit, integration, and end-to-end tests that give you confidence to ship fast. We treat test coverage as a first-class deliverable.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Project Builds",
    description:
      "Full-scope feature builds from spec to deployable PR. Scoped engagements that ship production-quality code without the overhead of a larger org.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Retainers",
    description:
      "Ongoing maintenance and incremental delivery for teams that want a reliable engineering partner on retainer — no hiring hassle.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

/** Pure presentational component — extracts loader data so it can be tested directly. */
export function HomePage({ businessName }: { businessName: string }) {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {businessName}
          </a>
          <div className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Available for engagements
        </div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-gray-900 dark:text-white">
            A small, focused engineering team that ships production-quality software
          </span>
          <span className="block bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-300">
            end-to-end.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
          Architecture, backend, frontend, and tests — without the overhead of a larger org.
          We partner with founders and product teams to build and extend SaaS products.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-lg bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Start a project
          </a>
          <a
            href="#services"
            className="rounded-lg border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            See what we do
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="border-t border-gray-100 bg-gray-50/50 px-6 py-24 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              What we offer
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Full-stack engineering, distilled
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Every engagement is led by experienced engineers who write code, review code, and ship code. No account managers, no red tape.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-indigo-800"
              >
                <div className="mb-4 inline-flex rounded-lg bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              About
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Built different by design
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We are Helix Engineering — a small team that thinks like a startup and ships like a pro shop.
            </p>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">No overhead, all output</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    We skip the layers that slow engineering down. When you work with us, you talk directly to the people building your product.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Code review is non-negotiable</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Every line of code we write is reviewed by a teammate. We ship quality, not speed at any cost — though speed follows from quality.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">End-to-end ownership</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    From architecture decisions to the last test case, we own the full delivery. You get a working PR, not a handoff.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-12 dark:border-gray-800 dark:bg-gray-900">
              <div className="text-center">
                <div className="text-5xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                  &lt;5
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  people per project
                </p>
                <div className="mt-6 h-px w-12 bg-gray-300 dark:bg-gray-700 mx-auto" />
                <p className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  Small teams communicate faster, make fewer mistakes, and ship cleaner code. That's the bet — and it pays off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="border-t border-gray-100 bg-gray-50/50 px-6 py-24 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto max-w-lg">
          <div className="text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Get in touch
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Ready to ship?
            </h2>
            <p className="mt-4 mb-10 text-lg text-gray-600 dark:text-gray-400">
              Tell us what you're building. We'll scope it, estimate it, and ship it — production-quality, on your timeline.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8 dark:border-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-600">
            Built with{" "}
            <a
              href="https://cto.new"
              className="underline hover:text-gray-600 dark:hover:text-gray-400"
            >
              cto.new
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export function Home() {
  const businessName = Route.useLoaderData();
  return <HomePage businessName={businessName || ""} />;
}