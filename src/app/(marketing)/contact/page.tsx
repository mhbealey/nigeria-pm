"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  ArrowRight,
  Globe,
  AtSign,
  Briefcase,
  Camera,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const offices = [
  {
    city: "Lagos (Headquarters)",
    address: "3rd Floor, The Civic Centre\nOzumba Mbadiwe Ave\nVictoria Island, Lagos",
    phone: "+234 (0) 1 888 0000",
    email: "lagos@buildng.com",
    hours: "Monday - Friday, 8:00 AM - 6:00 PM WAT",
  },
  {
    city: "Abuja",
    address: "Suite 204, Churchgate Tower\nConstitution Avenue\nCentral Business District, Abuja",
    phone: "+234 (0) 9 765 4321",
    email: "abuja@buildng.com",
    hours: "Monday - Friday, 8:00 AM - 6:00 PM WAT",
  },
];

const socialLinks = [
  { name: "Twitter / X", icon: AtSign, href: "https://twitter.com/buildng", handle: "@buildng" },
  { name: "LinkedIn", icon: Briefcase, href: "https://linkedin.com/company/buildng", handle: "BuildNG" },
  { name: "Instagram", icon: Camera, href: "https://instagram.com/buildng", handle: "@buildng" },
  { name: "Facebook", icon: ThumbsUp, href: "https://facebook.com/buildng", handle: "BuildNG" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Get in touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Have a question, need a demo, or want to discuss how BuildNG can
            help your construction business? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will respond within 24
                    hours on business days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">
                          Full name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contact-name"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">
                          Email address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Phone number</Label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          placeholder="+234 (0) 800 000 0000"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-company">Company name</Label>
                        <Input
                          id="contact-company"
                          placeholder="Your company"
                          value={form.company}
                          onChange={(e) =>
                            updateField("company", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-type">
                        Inquiry type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={form.inquiryType}
                        onValueChange={(value) =>
                          updateField("inquiryType", value)
                        }
                      >
                        <SelectTrigger id="contact-type">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="demo">
                            Request a Demo
                          </SelectItem>
                          <SelectItem value="sales">
                            Sales / Enterprise Pricing
                          </SelectItem>
                          <SelectItem value="support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership Opportunity
                          </SelectItem>
                          <SelectItem value="media">
                            Press / Media Inquiry
                          </SelectItem>
                          <SelectItem value="careers">
                            Careers
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full gap-2 sm:w-auto">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6 lg:col-span-2">
              {/* WhatsApp CTA */}
              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Or reach us on WhatsApp
                      </h3>
                      <p className="text-xs text-gray-600">
                        Get a faster response on WhatsApp
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/2348123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block"
                  >
                    <Button className="w-full gap-2" size="sm">
                      Chat on WhatsApp
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Email Contacts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Email us directly
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                      <div>
                        <div className="text-xs text-gray-500">
                          General inquiries
                        </div>
                        <a
                          href="mailto:hello@buildng.com"
                          className="text-sm font-medium text-gray-900 hover:text-emerald-600"
                        >
                          hello@buildng.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                      <div>
                        <div className="text-xs text-gray-500">Sales</div>
                        <a
                          href="mailto:sales@buildng.com"
                          className="text-sm font-medium text-gray-900 hover:text-emerald-600"
                        >
                          sales@buildng.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                      <div>
                        <div className="text-xs text-gray-500">Support</div>
                        <a
                          href="mailto:support@buildng.com"
                          className="text-sm font-medium text-gray-900 hover:text-emerald-600"
                        >
                          support@buildng.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Call us
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                      <div>
                        <div className="text-xs text-gray-500">Lagos</div>
                        <a
                          href="tel:+23401888000"
                          className="text-sm font-medium text-gray-900 hover:text-emerald-600"
                        >
                          +234 (0) 1 888 0000
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                      <div>
                        <div className="text-xs text-gray-500">Abuja</div>
                        <a
                          href="tel:+23409765432"
                          className="text-sm font-medium text-gray-900 hover:text-emerald-600"
                        >
                          +234 (0) 9 765 4321
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                      <div>
                        <div className="text-xs text-gray-500">
                          Toll-free
                        </div>
                        <a
                          href="tel:+2340800BUILDNG"
                          className="text-sm font-medium text-gray-900 hover:text-emerald-600"
                        >
                          0800-BUILD-NG
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    <h3 className="text-sm font-semibold text-gray-900">
                      Business hours
                    </h3>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium text-gray-900">
                        8:00 AM - 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium text-gray-900">
                        9:00 AM - 2:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium text-gray-500">Closed</span>
                    </div>
                    <Separator className="my-2" />
                    <p className="text-xs text-gray-500">
                      All times are West Africa Time (WAT, GMT+1).
                      Enterprise customers with 24/7 support can reach us
                      anytime.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Our offices
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Visit us at any of our locations across Nigeria.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {offices.map((office) => (
              <Card key={office.city} className="border-0 shadow-lg">
                <CardContent className="p-0">
                  {/* Map Placeholder */}
                  <div className="flex h-48 items-center justify-center rounded-t-xl bg-gray-200">
                    <div className="text-center">
                      <MapPin className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Map view
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {office.city}
                    </h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="text-sm text-gray-600 whitespace-pre-line">
                          {office.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                        <a
                          href={`tel:${office.phone.replace(/[\s()-]/g, "")}`}
                          className="text-sm text-gray-600 hover:text-emerald-600"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                        <a
                          href={`mailto:${office.email}`}
                          className="text-sm text-gray-600 hover:text-emerald-600"
                        >
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="text-sm text-gray-600">
                          {office.hours}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Follow us
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Stay updated with the latest from BuildNG on social media.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2 md:grid-cols-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-all hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                  <social.icon className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {social.name}
                  </div>
                  <div className="text-xs text-gray-500">{social.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-emerald-600 px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "3rem 3rem",
              }}
            />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
                Create your free account today and see how BuildNG can transform
                your construction projects.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="gap-2 bg-white px-8 text-base text-emerald-700 hover:bg-emerald-50"
                  >
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-emerald-400 px-8 text-base text-white hover:bg-emerald-700"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
