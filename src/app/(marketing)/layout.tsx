"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Hammer,
  Shield,
  Package,
  ClipboardCheck,
  Building2,
  Users,
  FileCheck,
  AlertTriangle,
  ChevronDown,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    icon: Shield,
    title: "Escrow Payments",
    description: "Secure milestone-based payments",
    href: "/products/escrow",
  },
  {
    icon: Package,
    title: "Materials Marketplace",
    description: "Source quality building materials",
    href: "/products/materials",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Assurance",
    description: "Automated inspection and compliance",
    href: "/products/quality",
  },
  {
    icon: Building2,
    title: "Estate Management",
    description: "End-to-end estate development tools",
    href: "/products/estate",
  },
  {
    icon: Users,
    title: "Artisan Network",
    description: "Connect with verified skilled artisans",
    href: "/products/artisans",
  },
  {
    icon: FileCheck,
    title: "Permit Tracker",
    description: "Navigate building permits and approvals",
    href: "/products/permits",
  },
  {
    icon: AlertTriangle,
    title: "Defect Management",
    description: "Log, track, and resolve defects",
    href: "/products/defects",
  },
];

const footerProducts = [
  { title: "Escrow Payments", href: "/products/escrow" },
  { title: "Materials Marketplace", href: "/products/materials" },
  { title: "Quality Assurance", href: "/products/quality" },
  { title: "Estate Management", href: "/products/estate" },
  { title: "Artisan Network", href: "/products/artisans" },
  { title: "Permit Tracker", href: "/products/permits" },
  { title: "Defect Management", href: "/products/defects" },
];

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
              <Hammer className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Build<span className="text-emerald-600">NG</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600">
                Products
                <ChevronDown className="h-4 w-4" />
              </button>
              {productsOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 pt-2">
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                    <div className="grid grid-cols-2 gap-1">
                      {products.map((product) => (
                        <Link
                          key={product.title}
                          href={product.href}
                          className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-emerald-50"
                          onClick={() => setProductsOpen(false)}
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <product.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {product.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                pathname === "/pricing"
                  ? "text-emerald-600"
                  : "text-gray-600"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                pathname === "/about"
                  ? "text-emerald-600"
                  : "text-gray-600"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                pathname === "/contact"
                  ? "text-emerald-600"
                  : "text-gray-600"
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="hidden sm:inline-flex">Get Started</Button>
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white md:hidden">
            <div className="space-y-1 px-4 py-4">
              <div className="pb-2">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Products
                </div>
                {products.map((product) => (
                  <Link
                    key={product.title}
                    href={product.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <product.icon className="h-4 w-4" />
                    {product.title}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-2">
                <Link
                  href="/pricing"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
              <div className="border-t border-gray-100 pt-2">
                <div className="flex gap-2 px-3">
                  <Link href="/login" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                  <Hammer className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  Build<span className="text-emerald-600">NG</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                The all-in-one construction project management platform built
                for Nigeria. Empowering builders to deliver better projects.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Globe className="h-4 w-4" />
                Lagos, Nigeria
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Products</h4>
              <ul className="mt-4 space-y-2.5">
                {footerProducts.map((product) => (
                  <li key={product.title}>
                    <Link
                      href={product.href}
                      className="text-sm text-gray-500 transition-colors hover:text-emerald-600"
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Company</h4>
              <ul className="mt-4 space-y-2.5">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Careers", href: "/about#careers" },
                  { label: "Blog", href: "#" },
                  { label: "Press", href: "/about#press" },
                  { label: "Contact", href: "/contact" },
                  { label: "Partners", href: "/about#partners" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-500 transition-colors hover:text-emerald-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Data Processing",
                  "Security",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 transition-colors hover:text-emerald-600"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BuildNG. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Made in Nigeria{" "}
              <span role="img" aria-label="Nigerian flag">
                &#127475;&#127468;
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
