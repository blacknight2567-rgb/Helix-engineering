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

export const Route = createFileRoute("/hire")({
  loader: () => getBusinessName(),
  component: HirePage,
});

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Tell us what you need",
    description:
      "Share your project goals, timeline, and constraints. A quick call or a few sentences — whatever works best for you.",
  },
  {
    step: 2,
    title: "We scope it",
    description:
      "We break down the work into a clear specification with deliverables, estimated timeline, and a fixed price — no surprises.",
  },
  {
    step: 3,
    title: "We build it",
    description:
      "Our team writes production-quality code end-to-end: architecture, backend, frontend, and tests. Every line is reviewed before it ships.",
  },
  {
    step: 4,
    title: "You get production code",
    description:
      "You receive a deployed feature or a merge-ready PR. We stay engaged through launch and beyond with ongoing support.",
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Full Feature Builds",
    price: "From $5,000",
    description:
      "Scoped, fixed-price projects for specific features or modules. You define the requirement, we deliver production-ready code with tests and documentation.",
    features: [
      "Fixed scope, fixed price, fixed timeline",
      "Architecture, backend, frontend, and tests",
      "Code review on every PR",
      "Deployable artifact or merge-ready PR",
    ],
  },
  {
    title: "Monthly Retainers",
    price: "From $3,000/mo",
    description:
      "Ongoing engineering partnership for teams that need steady delivery without the hiring overhead. Prioritize work weekly, we ship continuously.",
    features: [
      "Dedicated engineering capacity each sprint",
      "Flexible scope — priorities shift weekly",
      "Maintenance, features, and improvements",
      "Slack/async communication included",
    ],
  },
  {
    title: "Architecture & Consulting",
    price: "From $200/hr",
    description:
      "Expert guidance when you need it most — system design reviews, tech stack decisions, performance audits, or hands-on architecture planning.",
    features: [
      "System design and architecture review",
      "Technology stack evaluation and selection",
      "Performance and security audits",
      "Ad-hoc advisory — engage as needed",
    ],
  },
];

function HirePage() {
  const businessName = Route.useLoaderData();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {businessName}
          </Link>
          <div className="hidden items-center gap-8 sm:flex">
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Home
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              How it works
            </a>
            <a
              href="#models"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Models
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-[80dvh] flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Hire Helix Engineering
        </div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-gray-900 dark:text-white">
            Let's build something
          </span>
          <span className="block bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-300">
            extraordinary.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
          You have a vision, tight deadlines, and no time to ramp up a team.
          We're a small, battle-tested engineering squad that ships
          production-quality software — fast, clean, and ready to scale.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-lg bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Start a project
          </a>
          <a
            href="#how-it-works"
            className="rounded-lg border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            See how it works
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="border-t border-gray-100 bg-gray-50/50 px-6 py-24 dark:border-gray-800 dark:bg-gray-900/50"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              How it works
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              From idea to production, in four steps
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              No red tape, no account managers, no handoffs. Just a direct
              engineering partnership that delivers.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section id="models" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Engagement models
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Pick the right fit for your team
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Every engagement includes code review, test coverage, and direct
              communication with the engineers building your product.
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.title}
                className="group relative rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-indigo-800"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {model.title}
                </h3>
                <p className="mt-1 text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                  {model.price}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  Estimated range — actual pricing depends on scope
                </p>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {model.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {model.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / FAQ Section */}
      <section
        id="pricing"
        className="border-t border-gray-100 bg-gray-50/50 px-6 py-24 dark:border-gray-800 dark:bg-gray-900/50"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Pricing
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Transparent, predictable pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              No hourly billing surprises. We quote fixed prices for scoped work
              and flat monthly rates for retainers — so you always know what
              you're paying.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                $5k+
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                Feature builds
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Fixed price per project
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                $3k/mo
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                Retainers
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Flat monthly rate
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                $200/hr
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                Consulting
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Pay-as-you-go advisory
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
            All prices are estimates. Final pricing depends on scope, timeline,
            and complexity. We'll provide a firm quote before any work begins.
          </p>
        </div>
      </section>

      {/* CTA Section with ContactForm */}
      <section
        id="contact"
        className="px-6 py-24"
      >
        <div className="mx-auto max-w-lg">
          <div className="text-center">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Get in touch
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 mb-10 text-lg text-gray-600 dark:text-gray-400">
              Tell us about your project. We'll respond within a business day
              with a scope estimate and next steps.
            </p>
          </div>
          <ContactForm />
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
              to="/"
              className="text-sm text-gray-400 underline hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400"
            >
              Home
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