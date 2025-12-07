'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { createInvestorProposal } from '@/lib/investorProposalApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const industryOptions = [
  "FinTech", "EdTech", "HealthTech", "Clean Energy", "AI & Machine Learning",
  "Food & Beverage", "E-commerce", "Real Estate", "Automotive", "Transportation",
  "Logistics", "Retail", "Manufacturing", "Agriculture", "Travel & Hospitality",
  "Entertainment", "Media & Publishing", "Fashion", "Sports", "Gaming",
  "Cybersecurity", "Blockchain & Web3", "Biotech", "Pharmaceuticals",
  "Telecommunications", "Hardware & IoT"
];

export default function CreateInvestorProposalPage() {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateProposal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) {
      toast({ variant: 'destructive', title: 'You must be logged in to create a proposal.' });
      return;
    }
    setIsSubmitting(true);

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value.trim();
    const thesis = (form.elements.namedItem("thesis") as HTMLTextAreaElement).value.trim();
    const industries = Array.from((form.elements.namedItem("industries") as unknown as HTMLSelectElement).selectedOptions).map(opt => opt.value);
    const minCheckSize = Number((form.elements.namedItem("minCheckSize") as HTMLInputElement).value || 0);
    const maxCheckSize = Number((form.elements.namedItem("maxCheckSize") as HTMLInputElement).value || 0);

    try {
      await createInvestorProposal({
        title,
        thesis,
        industries,
        minCheckSize,
        maxCheckSize,
      });

      toast({
        title: "Proposal Created!",
        description: "Your new investment proposal is now active.",
      });
      router.push("/investor/dashboard");
    } catch (err) {
      console.error("Investor proposal create error:", err);
      toast({
        variant: "destructive",
        title: "Could not create proposal",
        description: "An error occurred. Please check the console for details.",
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <main className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Investor Proposal</CardTitle>
          <CardDescription>Let entrepreneurs know what you're looking for.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProposal} className="space-y-6">
            <div>
              <Label htmlFor="title">Proposal Headline</Label>
              <Input id="title" name="title" placeholder="e.g., Seed Funding for B2B SaaS" required />
            </div>

            <div>
              <Label htmlFor="thesis">Investment Thesis</Label>
              <Textarea
                id="thesis"
                name="thesis"
                placeholder="Describe what you look for in a startup. What's your investment philosophy?"
                className="min-h-[150px]"
                required
              />
            </div>

            <div>
              <Label htmlFor="industries">Interested Industries (select multiple)</Label>
               <Select name="industries">
                    <SelectTrigger>
                        <SelectValue placeholder="Select industries" />
                    </SelectTrigger>
                    <SelectContent className="h-64">
                        {industryOptions.map(industry => (
                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="minCheckSize">Min. Check Size (INR)</Label>
                    <Input id="minCheckSize" name="minCheckSize" type="number" placeholder="e.g., 500000" />
                </div>
                 <div>
                    <Label htmlFor="maxCheckSize">Max. Check Size (INR)</Label>
                    <Input id="maxCheckSize" name="maxCheckSize" type="number" placeholder="e.g., 5000000" />
                </div>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Proposal'}
              </Button>
              <Button variant="ghost" type="button" onClick={() => router.back()} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
