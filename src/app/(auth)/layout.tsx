import Link from "next/link";
import { Hammer, Shield, Package, ClipboardCheck, Users } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="relative hidden w-1/2 overflow-hidden bg-emerald-600 lg:flex">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "3rem 3rem",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
              <Hammer className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">BuildNG</span>
          </Link>

          {/* Main content */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight text-white">
              Build Nigeria
              <br />
              Better, Together.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-emerald-100">
              Join thousands of construction professionals managing projects
              across all 36 states with confidence and transparency.
            </p>

            {/* Feature highlights */}
            <div className="mt-10 space-y-4">
              {[
                {
                  icon: Shield,
                  text: "Secure escrow payments that protect every party",
                },
                {
                  icon: Package,
                  text: "Source verified materials from trusted suppliers",
                },
                {
                  icon: ClipboardCheck,
                  text: "Automated quality assurance and inspections",
                },
                {
                  icon: Users,
                  text: "Network of 10,000+ verified skilled artisans",
                },
              ].map((feature) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <feature.icon className="h-4 w-4 text-emerald-200" />
                  </div>
                  <span className="text-sm text-emerald-100">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom quote */}
          <div className="max-w-md">
            <blockquote className="border-l-2 border-emerald-400 pl-4">
              <p className="text-sm italic text-emerald-100">
                &ldquo;BuildNG helped us deliver our 200-unit estate project 3
                months ahead of schedule with zero payment disputes.&rdquo;
              </p>
              <footer className="mt-2 text-sm font-medium text-emerald-200">
                &mdash; Engr. Adebayo Ogundimu, Greenfield Developers
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
              <Hammer className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              Build<span className="text-emerald-600">NG</span>
            </span>
          </Link>
        </div>

        {/* Form container */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
