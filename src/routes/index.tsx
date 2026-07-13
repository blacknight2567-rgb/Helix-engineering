import { createFileRoute, Link } from "@tanstack/react-router";
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
  { href: "#work", label: "Our Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "/hire", label: "Hire Us" },
];

const SERVICES = [
  {
    title: "Architecture",
    description:
      "Clean, scalable system design that sets your project up for long-term success. We think before we build.",
    accent: "from-indigo-500 to-blue-500",
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
    accent: "from-emerald-500 to-teal-500",
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
    accent: "from-violet-500 to-purple-500",
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
    accent: "from-amber-500 to-orange-500",
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
    accent: "from-pink-500 to-rose-500",
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
    accent: "from-cyan-500 to-sky-500",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const PROJECTS = [
  {
    title: "SaaS Analytics Dashboard",
    category: "Frontend + Backend",
    description:
      "A real-time analytics dashboard with interactive charts, user management, and role-based access control. Built with React, D3, and a serverless API layer.",
    image: "/images/dashboard.png",
    tags: ["React", "D3.js", "Serverless", "Postgres"],
    gradient: "from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/5 dark:to-violet-500/5",
  },
  {
    title: "Mobile Health Platform",
    category: "Mobile App",
    description:
      "Cross-platform mobile app for health tracking with offline support, push notifications, and real-time sync. Designed for clinicians and patients.",
    image: "/images/mobile-app.png",
    tags: ["React Native", "WebSockets", "Offline-first"],
    gradient: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5",
  },
  {
    title: "Microservice Architecture",
    category: "Architecture",
    description:
      "Designed and implemented a scalable microservice architecture handling 10M+ requests/day. Event-driven, with automated service discovery and observability.",
    image: "/images/architecture.png",
    tags: ["Kubernetes", "gRPC", "Kafka", "Grafana"],
    gradient: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5",
  },
  {
    title: "Code Review Culture",
    category: "Process + Quality",
    description:
      "Established a rigorous code review workflow for a 15-person engineering team. Reduced production bugs by 73% and cut PR cycle time in half.",
    image: "/images/code-review.png",
    tags: ["GitHub Actions", "ESLint", "Vitest", "Playwright"],
    gradient: "from-pink-500/10 to-rose-500/10 dark:from-pink-500/5 dark:to-rose-500/5",
  },
];

/** Pure presentational component — extracts loader data so it can be tested directly. */
export function HomePage({ businessName }: { businessName: string }) {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#"
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {businessName}
          </a>
          <div className="hidden items-center gap-8 sm:flex">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to="/hire"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern" />
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 animate-float opacity-20">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 blur-3xl" />
        </div>
        <div className="pointer-events-none absolute -bottom-40 left-0 h-80 w-80 animate-float-delayed opacity-15">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-emerald-400 to-cyan-600 blur-3xl" />
        </div>

        <div className="relative">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            Available for engagements
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-gray-900 dark:text-white">
              A small, focused engineering team that ships production-quality
              software
            </span>
            <span className="block animate-gradient bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-300 dark:to-purple-400">
              end-to-end.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
            Architecture, backend, frontend, and tests — without the overhead of
            a larger org. We partner with founders and product teams to build
            and extend SaaS products.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/hire"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:shadow-white/10 dark:hover:bg-gray-200"
            >
              <span className="relative z-10">Start a project</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <a
              href="#services"
              className="rounded-lg border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              See what we do
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-600">
              Scroll to explore
            </span>
            <div className="h-8 w-5 rounded-full border border-gray-300 p-1 dark:border-gray-700">
              <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-gray-400 dark:bg-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="relative overflow-hidden border-t border-gray-100 bg-gray-50/50 px-6 py-24 dark:border-gray-800 dark:bg-gray-900/50"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern-light" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              What we offer
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Full-stack engineering, distilled
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Every engagement is led by experienced engineers who write code,
              review code, and ship code. No account managers, no red tape.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="card-hover-lift group relative rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              >
                {/* Accent gradient line */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r ${service.accent} opacity-0 transition-opacity group-hover:opacity-100`}
                />
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

      {/* Project Examples Section */}
      <section
        id="work"
        className="relative overflow-hidden px-6 py-24"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-40 top-0 h-72 w-72 animate-float opacity-10">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Our work
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Projects we've built
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              From SaaS dashboards to mobile apps and backend architecture —
              here's a look at what we deliver.
            </p>
          </div>
          <div className="mt-16 grid gap-16">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.title}
                className={`grid items-center gap-8 md:grid-cols-2 ${
                  idx % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`group relative ${idx % 2 === 1 ? "md:col-start-2" : ""}`}
                >
                  <div
                    className={`absolute -inset-4 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-50 blur-xl transition-opacity group-hover:opacity-80`}
                  />
                  <div className="image-glow relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={idx % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-gray-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-6 py-20 dark:border-gray-800 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div className="rounded-xl bg-white/60 p-8 shadow-sm backdrop-blur-sm dark:bg-gray-900/60">
              <p className="text-4xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                50+
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                Projects shipped
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                From MVPs to enterprise features
              </p>
            </div>
            <div className="rounded-xl bg-white/60 p-8 shadow-sm backdrop-blur-sm dark:bg-gray-900/60">
              <p className="text-4xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                &lt;2
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                Days to first PR
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Average from spec to code
              </p>
            </div>
            <div className="rounded-xl bg-white/60 p-8 shadow-sm backdrop-blur-sm dark:bg-gray-900/60">
              <p className="text-4xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                100%
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                Code reviewed
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Every line, every PR, without exception
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative overflow-hidden px-6 py-24">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -left-40 top-1/2 h-64 w-64 animate-float-delayed opacity-10">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              About
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Built different by design
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We are Helix Engineering — a small team that thinks like a startup
              and ships like a pro shop.
            </p>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    No overhead, all output
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    We skip the layers that slow engineering down. When you work
                    with us, you talk directly to the people building your
                    product.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Code review is non-negotiable
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Every line of code we write is reviewed by a teammate. We
                    ship quality, not speed at any cost — though speed follows
                    from quality.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    End-to-end ownership
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    From architecture decisions to the last test case, we own
                    the full delivery. You get a working PR, not a handoff.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="group relative w-full max-w-sm">
                {/* Decorative ring */}
                <div className="absolute -inset-4 animate-float rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 opacity-50 blur-xl transition-opacity group-hover:opacity-80" />
                <div className="relative rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-lg dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-6xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                    &lt;5
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    people per project
                  </p>
                  <div className="mx-auto mt-6 h-px w-12 bg-gradient-to-r from-indigo-500 to-violet-500" />
                  <p className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    Small teams communicate faster, make fewer mistakes, and
                    ship cleaner code. That's the bet — and it pays off.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-gray-100 bg-gray-50/50 px-6 py-24 dark:border-gray-800 dark:bg-gray-900/50"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern-light" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-72 w-72 animate-float opacity-10">
          <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-lg">
          <div className="text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Get in touch
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Ready to ship?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Tell us what you're building. We'll scope it, estimate it, and
              ship it — production-quality, on your timeline.
            </p>
          </div>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-6 py-8 dark:border-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {businessName}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/hire"
              className="text-sm text-gray-400 underline hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"
            >
              Hire us
            </Link>
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
        </div>
      </footer>
    </div>
  );
}

export function Home() {
  const businessName = Route.useLoaderData();
  return <HomePage businessName={businessName || ""} />;
}