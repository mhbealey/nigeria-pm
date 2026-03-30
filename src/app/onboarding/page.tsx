"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Home,
  Hammer,
  HardHat,
  Building2,
  Wrench,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Briefcase,
  Package,
  FileCheck,
  Users,
  Shield,
  TrendingUp,
  BarChart3,
  Sparkles,
} from "lucide-react";

const roles = [
  {
    id: "property-owner",
    label: "Property Owner",
    description: "Build or renovate your own property with professional oversight",
    icon: Home,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    activeColor: "bg-blue-100 border-blue-500 ring-2 ring-blue-500",
  },
  {
    id: "contractor",
    label: "Contractor",
    description: "Manage construction projects, teams, and material procurement",
    icon: Hammer,
    color: "bg-amber-50 border-amber-200 text-amber-700",
    activeColor: "bg-amber-100 border-amber-500 ring-2 ring-amber-500",
  },
  {
    id: "engineer",
    label: "Engineer",
    description: "Oversee structural integrity, quality control, and compliance",
    icon: HardHat,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    activeColor: "bg-emerald-100 border-emerald-500 ring-2 ring-emerald-500",
  },
  {
    id: "developer",
    label: "Real Estate Developer",
    description: "Plan and execute large-scale estate and commercial projects",
    icon: Building2,
    color: "bg-purple-50 border-purple-200 text-purple-700",
    activeColor: "bg-purple-100 border-purple-500 ring-2 ring-purple-500",
  },
  {
    id: "artisan",
    label: "Artisan",
    description: "Skilled trades including plumbing, electrical, tiling, and more",
    icon: Wrench,
    color: "bg-orange-50 border-orange-200 text-orange-700",
    activeColor: "bg-orange-100 border-orange-500 ring-2 ring-orange-500",
  },
];

const nigerianStates: Record<string, string[]> = {
  Lagos: ["Ikeja", "Lekki", "Victoria Island", "Surulere", "Yaba", "Ikoyi", "Ajah", "Epe"],
  Abuja: ["Garki", "Maitama", "Wuse", "Asokoro", "Gwarinpa", "Kubwa", "Jabi"],
  Rivers: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny", "Oyigbo"],
  Oyo: ["Ibadan", "Ogbomoso", "Oyo", "Iseyin", "Saki"],
  Kano: ["Kano Municipal", "Fagge", "Nassarawa", "Tarauni", "Ungogo"],
  Enugu: ["Enugu North", "Enugu South", "Nsukka", "Udi", "Igbo-Eze"],
  Delta: ["Warri", "Asaba", "Sapele", "Ughelli", "Agbor"],
  Kaduna: ["Kaduna North", "Kaduna South", "Zaria", "Kafanchan", "Kachia"],
  Anambra: ["Awka", "Onitsha", "Nnewi", "Ekwulobia", "Aguata"],
  Ogun: ["Abeokuta", "Sagamu", "Ijebu-Ode", "Ota", "Ilaro"],
  Edo: ["Benin City", "Auchi", "Ekpoma", "Uromi", "Irrua"],
  Osun: ["Osogbo", "Ile-Ife", "Ilesa", "Ede", "Iwo"],
  Kwara: ["Ilorin", "Offa", "Jebba", "Lafiagi", "Patigi"],
  Ondo: ["Akure", "Ondo", "Owo", "Ikare", "Okitipupa"],
  Cross River: ["Calabar", "Ogoja", "Ikom", "Obudu", "Ugep"],
  Abia: ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Isuikwuato"],
  Imo: ["Owerri", "Orlu", "Okigwe", "Oguta", "Mbaise"],
  Plateau: ["Jos", "Bukuru", "Pankshin", "Shendam", "Langtang"],
};

const productModules = [
  {
    id: "projects",
    label: "Project Management",
    description: "Track milestones, budgets, and timelines",
    icon: Briefcase,
  },
  {
    id: "materials",
    label: "Materials Tracking",
    description: "Procurement, inventory, and delivery management",
    icon: Package,
  },
  {
    id: "quality",
    label: "Quality & Inspections",
    description: "Defect tracking, checklists, and compliance",
    icon: FileCheck,
  },
  {
    id: "team",
    label: "Team & Labor",
    description: "Workforce scheduling, artisan management",
    icon: Users,
  },
  {
    id: "escrow",
    label: "Escrow Payments",
    description: "Secure milestone-based payments with escrow",
    icon: Shield,
  },
  {
    id: "market",
    label: "Market Intelligence",
    description: "Material prices, trends, and cost estimation",
    icon: TrendingUp,
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    description: "Financial reports, project analytics, investor updates",
    icon: BarChart3,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "projects",
    "materials",
    "quality",
  ]);

  const totalSteps = 4;
  const progressPercent = ((step + 1) / totalSteps) * 100;

  const stepLabels = ["Your Role", "Location", "Choose Tools", "All Set"];

  const canProceed = () => {
    switch (step) {
      case 0:
        return selectedRole !== null;
      case 1:
        return selectedState !== "" && selectedCity !== "";
      case 2:
        return selectedModules.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((m) => m !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleFinish = () => {
    router.push("/dashboard");
  };

  const selectedRoleData = roles.find((r) => r.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Building2 className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">BuildNG</h1>
          </div>
          <p className="text-gray-500">
            Let&apos;s set up your construction management workspace
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                    i < step
                      ? "bg-emerald-600 text-white"
                      : i === step
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={`hidden text-sm sm:inline ${
                    i <= step ? "font-medium text-gray-900" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Step 1: Role Selection */}
        {step === 0 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">What best describes your role?</CardTitle>
              <CardDescription>
                This helps us customize your dashboard and available features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                        isSelected ? role.activeColor : `${role.color} hover:shadow-md`
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                          isSelected ? "bg-white/80" : "bg-white"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {role.label}
                        </div>
                        <div className="text-sm text-gray-500">
                          {role.description}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Location */}
        {step === 1 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Where are you based?</CardTitle>
              <CardDescription>
                We use this to provide localized pricing, regulations, and market
                data for your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={selectedState}
                    onValueChange={(val) => {
                      setSelectedState(val);
                      setSelectedCity("");
                    }}
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(nigerianStates)
                        .sort()
                        .map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City / LGA</Label>
                  <Select
                    value={selectedCity}
                    onValueChange={setSelectedCity}
                    disabled={!selectedState}
                  >
                    <SelectTrigger id="city">
                      <SelectValue
                        placeholder={
                          selectedState
                            ? "Select your city"
                            : "Select a state first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedState &&
                        nigerianStates[selectedState].map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedState && selectedCity && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 text-emerald-800">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">
                        {selectedCity}, {selectedState}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-emerald-600">
                      We&apos;ll show material prices, contractors, and regulations
                      specific to this area.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Choose Tools */}
        {step === 2 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Choose your tools</CardTitle>
              <CardDescription>
                Select the modules you need. You can always change this later in
                settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {productModules.map((mod) => {
                  const Icon = mod.icon;
                  const isSelected = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {mod.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {mod.description}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                {selectedModules.length} of {productModules.length} modules
                selected
              </p>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Summary */}
        {step === 3 && (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Sparkles className="h-8 w-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">You&apos;re all set!</CardTitle>
              <CardDescription>
                Your BuildNG workspace is ready. Here&apos;s a summary of your
                setup.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mx-auto max-w-md space-y-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-1 text-xs font-medium uppercase text-gray-400">
                    Role
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedRoleData && (
                      <>
                        <selectedRoleData.icon className="h-5 w-5 text-emerald-600" />
                        <span className="font-semibold text-gray-900">
                          {selectedRoleData.label}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-1 text-xs font-medium uppercase text-gray-400">
                    Location
                  </div>
                  <div className="font-semibold text-gray-900">
                    {selectedCity}, {selectedState}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 text-xs font-medium uppercase text-gray-400">
                    Active Modules
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedModules.map((modId) => {
                      const mod = productModules.find((m) => m.id === modId);
                      return mod ? (
                        <Badge key={modId} variant="success">
                          {mod.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center">
                  <p className="text-sm text-emerald-800">
                    You can customize all of these settings anytime from your
                    dashboard preferences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {step < totalSteps - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish}>
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
