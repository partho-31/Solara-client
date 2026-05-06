"use client";

// import Link from "next/link";
import {
  // ArrowLeft, 
  Users, Target, Heart, Globe,
  Truck, ShieldCheck, Sparkles
} from "lucide-react";

import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 bg-muted/40 px-4">

      {/* Navbar */}
      {/* <header className="sticky top-0 z-20 bg-background border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-lg font-semibold tracking-wide">
            Quick<span className="text-[#b8975a]">Cart</span>
          </h1>

          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </header> */}

      <main className="container mx-auto py-12 space-y-12">

        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-sm text-[#b8975a] font-medium tracking-wider uppercase">
            About Us
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Built for Simplicity, Designed for{" "}
            <span className="text-[#b8975a]">You</span>
          </h1>

          <p className="text-muted-foreground text-sm leading-relaxed">
            QuickCart is more than just an online store — it’s a seamless shopping
            experience crafted with care, speed, and trust at its core.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6">

          <Card>
            <CardHeader>
              <Target className="h-5 w-5 text-[#b8975a]" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                To make online shopping effortless, fast, and enjoyable.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Heart className="h-5 w-5 text-[#b8975a]" />
              <CardTitle>Customer First</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Every decision is centered around customer experience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-5 w-5 text-[#b8975a]" />
              <CardTitle>Global Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Delivering worldwide with reliable logistics.
              </CardDescription>
            </CardContent>
          </Card>

        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Our <span className="text-[#b8975a]">Story</span>
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              QuickCart started with a simple idea — remove friction from online shopping.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Today, we serve thousands with a growing catalog of curated products.
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">

              {[
                { icon: Users, text: "10,000+ Happy Customers" },
                { icon: Truck, text: "Fast Delivery" },
                { icon: ShieldCheck, text: "Secure Payments" },
                { icon: Sparkles, text: "Premium Quality" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[#b8975a]" />
                  <p className="text-sm font-medium">{text}</p>
                </div>
              ))}

            </CardContent>
          </Card>

        </div>

        {/* Team */}
        <div className="space-y-6">

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">
              Our <span className="text-[#b8975a]">Team</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              The people behind QuickCart
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              { name: "Partho Kumar", role: "Founder & Developer" },
              { name: "Jane Doe", role: "Product Designer" },
              { name: "John Smith", role: "Operations Manager" },
            ].map((member) => (
              <Card key={member.name}>
                <CardContent className="p-6 text-center space-y-2">
                  <div className="w-14 h-14 mx-auto rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#b8975a]" />
                  </div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>

      </main>
    </div>
  );
}