"use client";

import { useState } from "react";
// import Link from "next/link";

import {
  Mail, Phone, MapPin, Clock,
  Send, 
  // ArrowLeft, 
  MessageSquare,
  Globe,
  CheckCircle2,
} from "lucide-react";

import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion, AccordionContent,
  AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

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
        <div className="text-center max-w-xl mx-auto space-y-3">

          <p className="text-sm text-[#b8975a] font-medium tracking-wider uppercase">
            Contact Us
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Get in <span className="text-[#b8975a]">Touch</span>
          </h1>

          <p className="text-muted-foreground text-sm">
            Questions, feedback, or partnerships — we’d love to hear from you.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {[
            { icon: Mail, label: "Email", value: "hello@solara.com" },
            { icon: Phone, label: "Phone", value: "+880 170 123 456" },
            { icon: MapPin, label: "Location", value: "Jashore, BD" },
            { icon: Clock, label: "Hours", value: "9AM - 6PM" },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label} className="hover:shadow-md transition">
              <CardContent className="p-4 flex flex-col gap-3">
                <Icon className="h-5 w-5 text-[#b8975a]" />
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}

        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#b8975a]" />
                Send a Message
              </CardTitle>
              <CardDescription>
                We usually reply within 24 hours
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">

              {sent ? (
                <div className="flex flex-col items-center text-center gap-3 py-10">

                  <CheckCircle2 className="text-[#b8975a] h-10 w-10" />

                  <h3 className="text-lg font-semibold">
                    Message Sent
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Thanks! We will get back to you soon.
                  </p>

                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">

                    <div>
                      <Label>Name</Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                  </div>

                  <div>
                    <Label>Subject</Label>
                    <Select onValueChange={setSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">Order</SelectItem>
                        <SelectItem value="refund">Refund</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Message</Label>
                    <Textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <Separator />

                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-[#b8975a] hover:bg-[#a88445]"
                  >
                    {loading ? "Sending..." : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                </>
              )}

            </CardContent>
          </Card>

          {/* Right Side */}
          <div className="space-y-6">

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>
                  FAQs
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Accordion type="single" collapsible>

                  <AccordionItem value="1">
                    <AccordionTrigger>Shipping time?</AccordionTrigger>
                    <AccordionContent>
                      3–5 business days standard delivery.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="2">
                    <AccordionTrigger>Return policy?</AccordionTrigger>
                    <AccordionContent>
                      Free returns within 60 days.
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </CardContent>
            </Card>

            {/* Social */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Follow Us
                </CardTitle>
                <CardDescription>
                  Stay updated on social media
                </CardDescription>
              </CardHeader>

              <CardContent className="flex gap-3">

                <Button variant="outline" size="icon">
                  {/* <Instagram className="h-4 w-4 text-[#b8975a]" /> */}
                </Button>

                <Button variant="outline" size="icon">
                  {/* <Twitter className="h-4 w-4 text-[#b8975a]" /> */}
                </Button>

                <Button variant="outline" size="icon">
                  <Globe className="h-4 w-4 text-[#b8975a]" />
                </Button>

              </CardContent>
            </Card>

            {/* Alert */}
            <Alert>
              <Clock className="h-4 w-4 text-[#b8975a]" />
              <AlertTitle>Fast Response</AlertTitle>
              <AlertDescription>
                Avg response time: under 4 hours.
              </AlertDescription>
            </Alert>

          </div>
        </div>
      </main>
    </div>
  );
}