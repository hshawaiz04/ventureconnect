
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
import { createLoanProduct } from '@/lib/loanApi';

export default function PostLoanPage() {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreateLoanProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) {
      toast({ variant: 'destructive', title: 'You must be logged in to post a loan product.' });
      return;
    }
    setIsSubmitting(true);

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value.trim();
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value.trim();
    const minAmount = Number((form.elements.namedItem("minAmount") as HTMLInputElement).value || 0);
    const maxAmount = Number((form.elements.namedItem("maxAmount") as HTMLInputElement).value || 0);
    const interestRate = (form.elements.namedItem("interestRate") as HTMLInputElement).value.trim();

    try {
      await createLoanProduct({
        title,
        description,
        minAmount,
        maxAmount,
        interestRate,
      });

      toast({
        title: "Loan Product Created!",
        description: "Your new loan product is now visible to businesses.",
      });
      router.push("/banker/dashboard");
    } catch (err) {
      console.error("Loan product creation error:", err);
      toast({
        variant: "destructive",
        title: "Could not create loan product",
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
          <CardTitle className="text-2xl font-bold">Post a New Loan Product</CardTitle>
          <CardDescription>Describe the loan offering for businesses on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateLoanProduct} className="space-y-6">
            <div>
              <Label htmlFor="title">Loan Product Name</Label>
              <Input id="title" name="title" placeholder="e.g., Small Business Term Loan" required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the loan, its benefits, and ideal borrower."
                className="min-h-[150px]"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <Label htmlFor="minAmount">Min. Loan Amount (INR)</Label>
                    <Input id="minAmount" name="minAmount" type="number" placeholder="e.g., 100000" />
                </div>
                 <div>
                    <Label htmlFor="maxAmount">Max. Loan Amount (INR)</Label>
                    <Input id="maxAmount" name="maxAmount" type="number" placeholder="e.g., 5000000" />
                </div>
            </div>

             <div>
              <Label htmlFor="interestRate">Interest Rate</Label>
              <Input id="interestRate" name="interestRate" placeholder="e.g., 10.5% - 14% p.a." required />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Post Loan Product'}
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

    