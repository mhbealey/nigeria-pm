"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Users,
  Briefcase,
  Star,
  MapPin,
  Clock,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Phone,
  Shield,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

interface Artisan {
  id: number;
  name: string;
  initials: string;
  skill: string;
  yearsExp: number;
  rating: number;
  location: string;
  dailyRate: number;
  availability: "Available" | "Busy" | "Available Next Week";
  tags: string[];
  jobsCompleted: number;
  verified: boolean;
}

const artisans: Artisan[] = [
  {
    id: 1,
    name: "Musa Ibrahim",
    initials: "MI",
    skill: "Bricklayer",
    yearsExp: 15,
    rating: 4.8,
    location: "Surulere, Lagos",
    dailyRate: 10000,
    availability: "Available",
    tags: ["Block Work", "Plastering", "Foundation"],
    jobsCompleted: 243,
    verified: true,
  },
  {
    id: 2,
    name: "Chinedu Obi",
    initials: "CO",
    skill: "Electrician",
    yearsExp: 8,
    rating: 4.6,
    location: "Wuse, Abuja",
    dailyRate: 15000,
    availability: "Busy",
    tags: ["Wiring", "Panel Installation", "Solar"],
    jobsCompleted: 187,
    verified: true,
  },
  {
    id: 3,
    name: "Sunday Adeyemi",
    initials: "SA",
    skill: "Tiler",
    yearsExp: 12,
    rating: 4.9,
    location: "Lekki, Lagos",
    dailyRate: 12000,
    availability: "Available",
    tags: ["Floor Tiling", "Wall Tiling", "Marble"],
    jobsCompleted: 312,
    verified: true,
  },
  {
    id: 4,
    name: "Yakubu Sani",
    initials: "YS",
    skill: "Plumber",
    yearsExp: 10,
    rating: 4.4,
    location: "Garki, Abuja",
    dailyRate: 8000,
    availability: "Available Next Week",
    tags: ["Pipe Fitting", "Drainage", "Water Heater"],
    jobsCompleted: 156,
    verified: true,
  },
  {
    id: 5,
    name: "Blessing Eze",
    initials: "BE",
    skill: "Painter",
    yearsExp: 6,
    rating: 4.7,
    location: "Ajah, Lagos",
    dailyRate: 7000,
    availability: "Available",
    tags: ["Interior", "Exterior", "POP Finishing"],
    jobsCompleted: 98,
    verified: true,
  },
  {
    id: 6,
    name: "Abdullahi Musa",
    initials: "AM",
    skill: "Welder",
    yearsExp: 20,
    rating: 4.5,
    location: "Dei-Dei, Abuja",
    dailyRate: 12000,
    availability: "Busy",
    tags: ["Gate Fabrication", "Burglar Proof", "Stainless Steel"],
    jobsCompleted: 421,
    verified: true,
  },
  {
    id: 7,
    name: "Tunde Bakare",
    initials: "TB",
    skill: "Carpenter",
    yearsExp: 14,
    rating: 4.3,
    location: "Ikeja, Lagos",
    dailyRate: 9000,
    availability: "Available",
    tags: ["Roofing", "Door Frames", "Wardrobes"],
    jobsCompleted: 276,
    verified: true,
  },
  {
    id: 8,
    name: "Emmanuel Nwachukwu",
    initials: "EN",
    skill: "Iron Bender",
    yearsExp: 11,
    rating: 4.6,
    location: "PH, Rivers",
    dailyRate: 10000,
    availability: "Available",
    tags: ["Reinforcement", "BBS Cutting", "Column Rings"],
    jobsCompleted: 198,
    verified: true,
  },
  {
    id: 9,
    name: "Kola Adesanya",
    initials: "KA",
    skill: "Aluminium",
    yearsExp: 9,
    rating: 4.7,
    location: "VI, Lagos",
    dailyRate: 14000,
    availability: "Available Next Week",
    tags: ["Windows", "Curtain Wall", "Sliding Doors"],
    jobsCompleted: 164,
    verified: true,
  },
  {
    id: 10,
    name: "Ibrahim Danladi",
    initials: "ID",
    skill: "POP",
    yearsExp: 7,
    rating: 4.8,
    location: "Maitama, Abuja",
    dailyRate: 11000,
    availability: "Available",
    tags: ["Ceiling", "Screeding", "Cornice"],
    jobsCompleted: 132,
    verified: true,
  },
  {
    id: 11,
    name: "Ade Johnson",
    initials: "AJ",
    skill: "Tiler",
    yearsExp: 18,
    rating: 5.0,
    location: "Ikoyi, Lagos",
    dailyRate: 18000,
    availability: "Busy",
    tags: ["Porcelain", "Granite", "Swimming Pool"],
    jobsCompleted: 387,
    verified: true,
  },
  {
    id: 12,
    name: "Victor Okonkwo",
    initials: "VO",
    skill: "Mason",
    yearsExp: 13,
    rating: 4.2,
    location: "Enugu",
    dailyRate: 7500,
    availability: "Available",
    tags: ["Stone Work", "Block Laying", "Retaining Wall"],
    jobsCompleted: 215,
    verified: true,
  },
];

interface JobPosting {
  id: number;
  title: string;
  skill: string;
  location: string;
  duration: string;
  rate: string;
  applicants: number;
  postedDate: string;
  status: "Active" | "Closed" | "Filled";
  description: string;
}

const jobPostings: JobPosting[] = [
  {
    id: 1,
    title: "Experienced Tiler for 4-Bedroom Duplex",
    skill: "Tiler",
    location: "Lekki Phase 1, Lagos",
    duration: "3 weeks",
    rate: "₦12,000 - ₦15,000/day",
    applicants: 14,
    postedDate: "2 days ago",
    status: "Active",
    description:
      "Need an experienced tiler for a 4-bedroom duplex project in Lekki. Must be proficient with porcelain and granite tiles.",
  },
  {
    id: 2,
    title: "Electrician for Commercial Building Wiring",
    skill: "Electrician",
    location: "Wuse II, Abuja",
    duration: "6 weeks",
    rate: "₦15,000 - ₦20,000/day",
    applicants: 9,
    postedDate: "1 day ago",
    status: "Active",
    description:
      "Seeking a certified electrician for complete wiring of a 3-storey commercial building. Solar integration experience preferred.",
  },
  {
    id: 3,
    title: "Plumber for Estate Development (20 Units)",
    skill: "Plumber",
    location: "Sangotedo, Lagos",
    duration: "8 weeks",
    rate: "₦10,000 - ₦12,000/day",
    applicants: 22,
    postedDate: "3 days ago",
    status: "Active",
    description:
      "Plumbing work for a 20-unit estate development. Must handle pipe fitting, drainage, and water heater installations.",
  },
  {
    id: 4,
    title: "Welder for Gate and Burglar Proof Installation",
    skill: "Welder",
    location: "Gwarinpa, Abuja",
    duration: "2 weeks",
    rate: "₦12,000 - ₦14,000/day",
    applicants: 7,
    postedDate: "5 hours ago",
    status: "Active",
    description:
      "Gate fabrication and burglar proof installation for a residential compound. Stainless steel experience required.",
  },
  {
    id: 5,
    title: "POP Ceiling and Screeding Team",
    skill: "POP",
    location: "Maitama, Abuja",
    duration: "4 weeks",
    rate: "₦11,000 - ₦13,000/day",
    applicants: 11,
    postedDate: "12 hours ago",
    status: "Active",
    description:
      "POP ceiling installation and wall screeding for a 5-bedroom mansion. Team of 3-4 artisans needed.",
  },
];

const myPostings: JobPosting[] = [
  {
    id: 101,
    title: "Bricklayer for Fence Construction",
    skill: "Bricklayer",
    location: "Ajah, Lagos",
    duration: "1 week",
    rate: "₦10,000/day",
    applicants: 18,
    postedDate: "4 days ago",
    status: "Active",
    description: "300m perimeter fence construction with pillars.",
  },
  {
    id: 102,
    title: "Carpenter for Roof Truss",
    skill: "Carpenter",
    location: "Ikeja, Lagos",
    duration: "2 weeks",
    rate: "₦9,000 - ₦11,000/day",
    applicants: 6,
    postedDate: "1 week ago",
    status: "Filled",
    description: "Roof truss construction for a bungalow.",
  },
];

function getAvailabilityColor(status: string) {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-700 border-green-200";
    case "Busy":
      return "bg-red-100 text-red-700 border-red-200";
    case "Available Next Week":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getRatingStars(rating: number) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let stars = "★".repeat(full);
  if (hasHalf) stars += "½";
  return stars;
}

export default function ArtisansPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [savedArtisans, setSavedArtisans] = useState<number[]>([1, 3, 8, 11]);

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSearch =
      searchQuery === "" ||
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkill =
      skillFilter === "all" ||
      artisan.skill.toLowerCase() === skillFilter.toLowerCase();

    const matchesCity =
      cityFilter === "all" ||
      artisan.location.toLowerCase().includes(cityFilter.toLowerCase());

    const matchesRating =
      ratingFilter === "all" || artisan.rating >= parseFloat(ratingFilter);

    const matchesAvailability =
      availabilityFilter === "all" ||
      artisan.availability === availabilityFilter;

    return (
      matchesSearch &&
      matchesSkill &&
      matchesCity &&
      matchesRating &&
      matchesAvailability
    );
  });

  const savedArtisansList = artisans.filter((a) =>
    savedArtisans.includes(a.id)
  );

  const toggleSave = (id: number) => {
    setSavedArtisans((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Artisan Marketplace
          </h1>
          <p className="text-muted-foreground">
            Find verified, skilled artisans for your construction projects
            across Nigeria
          </p>
        </div>
        <Dialog open={postJobOpen} onOpenChange={setPostJobOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Post a Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Post a Job</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  placeholder="e.g. Experienced Tiler for Duplex Project"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="job-skill">Skill Required</Label>
                  <Select>
                    <SelectTrigger id="job-skill">
                      <SelectValue placeholder="Select skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bricklayer">Bricklayer</SelectItem>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="tiler">Tiler</SelectItem>
                      <SelectItem value="plumber">Plumber</SelectItem>
                      <SelectItem value="painter">Painter</SelectItem>
                      <SelectItem value="welder">Welder</SelectItem>
                      <SelectItem value="carpenter">Carpenter</SelectItem>
                      <SelectItem value="iron-bender">Iron Bender</SelectItem>
                      <SelectItem value="aluminium">Aluminium</SelectItem>
                      <SelectItem value="pop">POP</SelectItem>
                      <SelectItem value="mason">Mason</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="job-location">Location</Label>
                  <Input id="job-location" placeholder="e.g. Lekki, Lagos" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="job-duration">Duration</Label>
                  <Input id="job-duration" placeholder="e.g. 3 weeks" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="job-rate">Daily Rate Range</Label>
                  <Input
                    id="job-rate"
                    placeholder="e.g. ₦10,000 - ₦15,000"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-description">Job Description</Label>
                <Input
                  id="job-description"
                  placeholder="Describe the scope of work, requirements, and any special skills needed..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="job-workers">Number of Workers</Label>
                  <Input
                    id="job-workers"
                    type="number"
                    placeholder="e.g. 2"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="job-start">Start Date</Label>
                  <Input id="job-start" type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setPostJobOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setPostJobOpen(false)}>
                Post Job
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Artisans
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+124</span> this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Jobs This Week
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
            <p className="text-xs text-muted-foreground">
              Across all verified artisans
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placements</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,205</div>
            <p className="text-xs text-muted-foreground">
              Successful job completions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Artisans</TabsTrigger>
          <TabsTrigger value="jobs">Job Board</TabsTrigger>
          <TabsTrigger value="postings">My Postings</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        {/* Browse Artisans Tab */}
        <TabsContent value="browse" className="space-y-4">
          {/* Filter Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search artisans by name, skill, or location..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={skillFilter} onValueChange={setSkillFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    <SelectItem value="bricklayer">Bricklayer</SelectItem>
                    <SelectItem value="electrician">Electrician</SelectItem>
                    <SelectItem value="tiler">Tiler</SelectItem>
                    <SelectItem value="plumber">Plumber</SelectItem>
                    <SelectItem value="painter">Painter</SelectItem>
                    <SelectItem value="welder">Welder</SelectItem>
                    <SelectItem value="carpenter">Carpenter</SelectItem>
                    <SelectItem value="iron bender">Iron Bender</SelectItem>
                    <SelectItem value="aluminium">Aluminium</SelectItem>
                    <SelectItem value="pop">POP</SelectItem>
                    <SelectItem value="mason">Mason</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="abuja">Abuja</SelectItem>
                    <SelectItem value="rivers">Rivers</SelectItem>
                    <SelectItem value="enugu">Enugu</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={availabilityFilter}
                  onValueChange={setAvailabilityFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Availability</SelectItem>
                    <SelectItem value="Available">Available Now</SelectItem>
                    <SelectItem value="Available Next Week">
                      Available Next Week
                    </SelectItem>
                    <SelectItem value="Busy">Busy</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Artisan Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredArtisans.map((artisan) => (
              <Card key={artisan.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {artisan.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">
                          {artisan.name}
                        </h3>
                        {artisan.verified && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 border-blue-200 shrink-0"
                          >
                            <Shield className="mr-1 h-3 w-3" />
                            NIN Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {artisan.skill} &middot; {artisan.yearsExp} yrs exp
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{artisan.rating}</span>
                        <span className="text-muted-foreground">
                          ({artisan.jobsCompleted} jobs)
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={getAvailabilityColor(artisan.availability)}
                      >
                        {artisan.availability}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {artisan.location}
                    </div>

                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      {formatNaira(artisan.dailyRate)}/day
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {artisan.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-1 h-3.5 w-3.5" />
                      Contact
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Briefcase className="mr-1 h-3.5 w-3.5" />
                      Hire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArtisans.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="mx-auto h-12 w-12 mb-4 opacity-30" />
              <p className="text-lg font-medium">No artisans found</p>
              <p className="text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </TabsContent>

        {/* Job Board Tab */}
        <TabsContent value="jobs" className="space-y-4">
          {jobPostings.map((job) => (
            <Card key={job.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-700 border-green-200"
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.skill}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {job.duration}
                      </span>
                      <span className="font-medium text-foreground">
                        {job.rate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-2xl font-bold">{job.applicants}</div>
                    <p className="text-xs text-muted-foreground">applicants</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Posted {job.postedDate}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* My Postings Tab */}
        <TabsContent value="postings" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              You have {myPostings.length} job postings
            </p>
            <Button onClick={() => setPostJobOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Posting
            </Button>
          </div>
          {myPostings.map((posting) => (
            <Card key={posting.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">
                        {posting.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={
                          posting.status === "Active"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : posting.status === "Filled"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }
                      >
                        {posting.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {posting.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {posting.skill}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {posting.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {posting.duration}
                      </span>
                      <span className="font-medium text-foreground">
                        {posting.rate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-2xl font-bold">
                      {posting.applicants}
                    </div>
                    <p className="text-xs text-muted-foreground">applicants</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Posted {posting.postedDate}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    View Applicants
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  {posting.status === "Active" && (
                    <Button variant="outline" size="sm" className="text-red-600">
                      Close
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Saved Tab */}
        <TabsContent value="saved" className="space-y-4">
          {savedArtisansList.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Star className="mx-auto h-12 w-12 mb-4 opacity-30" />
              <p className="text-lg font-medium">No saved artisans</p>
              <p className="text-sm">
                Save artisans from the Browse tab to see them here
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedArtisansList.map((artisan) => (
                <Card key={artisan.id} className="relative">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {artisan.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">
                            {artisan.name}
                          </h3>
                          {artisan.verified && (
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-700 border-blue-200 shrink-0"
                            >
                              <Shield className="mr-1 h-3 w-3" />
                              NIN Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {artisan.skill} &middot; {artisan.yearsExp} yrs exp
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{artisan.rating}</span>
                          <span className="text-muted-foreground">
                            ({artisan.jobsCompleted} jobs)
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={getAvailabilityColor(artisan.availability)}
                        >
                          {artisan.availability}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {artisan.location}
                      </div>

                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {formatNaira(artisan.dailyRate)}/day
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {artisan.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="mr-1 h-3.5 w-3.5" />
                        Contact
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Briefcase className="mr-1 h-3.5 w-3.5" />
                        Hire
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => toggleSave(artisan.id)}
                    >
                      Remove from Saved
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
