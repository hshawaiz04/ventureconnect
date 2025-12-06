// src/components/CreateBusinessForm.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createBusinessProfile } from "@/lib/businessApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateBusinessForm() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const industry = (form.elements.namedItem("industry") as HTMLSelectElement).value;
    const stage = (form.elements.namedItem("stage") as HTMLSelectElement).value;
    const pitch = (form.elements.namedItem("pitch") as HTMLTextAreaElement).value.trim();
    const targetRaise = Number(
      (form.elements.namedItem("targetRaise") as HTMLInputElement).value || 0
    );

    try {
      await createBusinessProfile({ name, industry, stage, pitch, targetRaise });
      router.push("/dashboard");
    } catch (err) {
      console.error("create error", err);
      alert("Could not save business. Check console for details.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card className="bg-surface border border-border">
        <CardHeader className="px-8 py-6">
          <CardTitle className="text-2xl">Create Business Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Business Name</label>
              <input
                name="name"
                required
                minLength={2}
                className="w-full rounded-md border bg-background/50 border-input px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., EcoCharge Solutions"
              />
            </div>

            {/* Industry + Stage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Industry (FULL LIST) */}
              <div>
                <label className="block text-sm font-medium mb-2">Industry</label>
                <select
                  name="industry"
                  required
                  defaultValue=""
                  className="w-full rounded-md border bg-background/50 border-input px-4 py-3 focus:outline-none"
                >
                  <option value="" disabled>Select an industry</option>

                  {/* FULL INDUSTRIES LIST */}
                  <option>FinTech</option>
                  <option>EdTech</option>
                  <option>HealthTech</option>
                  <option>Clean Energy</option>
                  <option>AI & Machine Learning</option>
                  <option>Food & Beverage</option>
                  <option>E-commerce</option>
                  <option>Real Estate</option>
                  <option>Automotive</option>
                  <option>Transportation</option>
                  <option>Logistics</option>
                  <option>Retail</option>
                  <option>Manufacturing</option>
                  <option>Agriculture</option>
                  <option>Travel & Hospitality</option>
                  <option>Entertainment</option>
                  <option>Media & Publishing</option>
                  <option>Fashion</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>Cybersecurity</option>
                  <option>Blockchain & Web3</option>
                  <option>Biotech</option>
                  <option>Pharmaceuticals</option>
                  <option>Telecommunications</option>
                  <option>Hardware & IoT</option>
                </select>
              </div>

              {/* Stage */}
              <div>
                <label className="block text-sm font-medium mb-2">Business Stage</label>
                <select
                  name="stage"
                  required
                  defaultValue=""
                  className="w-full rounded-md border bg-background/50 border-input px-4 py-3 focus:outline-none"
                >
                  <option value="" disabled>Select stage</option>
                  <option>Idea</option>
                  <option>Prototype</option>
                  <option>Early Revenue</option>
                  <option>Growth</option>
                </select>
              </div>
            </div>

            {/* Short Pitch */}
            <div>
              <label className="block text-sm font-medium mb-2">Short Pitch</label>
              <textarea
                name="pitch"
                minLength={20}
                required
                placeholder="Describe your business in a few sentences..."
                className="w-full rounded-md border bg-background/50 border-input px-4 py-3 h-36 resize-y focus:outline-none"
              />
              <p className="text-xs text-muted-foreground mt-2">Minimum 20 characters.</p>
            </div>

            {/* Funding Target */}
            <div>
              <label className="block text-sm font-medium mb-2">Funding Target (INR)</label>
              <input
                name="targetRaise"
                type="number"
                defaultValue={5000000}
                required
                className="w-full rounded-md border bg-background/50 border-input px-4 py-3 focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <Button type="submit">Create Business Profile</Button>
              <Button variant="ghost" type="button" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
