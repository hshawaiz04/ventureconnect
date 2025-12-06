// src/app/dashboard/proposals/create/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import useMyBusiness from '@/lib/useMyBusiness';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { debugCreateProposal } from '@/lib/proposalApi';

export default function CreateProposalPage() {
  const router = useRouter();
  const { business, loading, error } = useMyBusiness();
  const { toast } = useToast();

  async function handleCreateProposal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
  
    const title = (form.elements.namedItem('title') as HTMLInputElement).value.trim();
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value.trim();
    const amountRequested = Number((form.elements.namedItem('amountRequested') as HTMLInputElement).value || 0);
  
    const res = await debugCreateProposal({ title, description, amountRequested });
  
    if (!res.ok) {
      console.error("Proposal creation failed:", res.err);
      toast({
        variant: "destructive",
        title: "Error creating proposal",
        description: "Check the console for more details."
      });
      return;
    }
  
    console.log("Proposal created:", res.id);
    toast({
        title: "Proposal Created!",
        description: "Your new proposal has been saved as a draft.",
    });
    router.push("/dashboard");
  }


  if (loading) {
    return <div className="container mx-auto p-6 text-center">Loading business details...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-center text-red-500">Error: {error}</div>;
  }

  if (!business) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-xl font-bold">No Business Profile Found</h2>
        <p className="text-muted-foreground my-4">You need to create a business profile first.</p>
        <Button onClick={() => router.push('/dashboard/create-business')}>Create Business Profile</Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create a New Proposal</CardTitle>
          <CardDescription>This proposal will be associated with your business: {business.name}</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleCreateProposal} className="space-y-6">
                <div>
                    <Label htmlFor="title">Proposal Title</Label>
                    <Input id="title" name="title" placeholder="e.g., Series A Funding Round for EcoCharge" required />
                </div>

                <div>
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe the purpose of this proposal, what the funds will be used for, and the expected outcome."
                        className="min-h-[200px]"
                        required
                      />
                </div>

                 <div>
                    <Label htmlFor="amountRequested">Amount Requested (INR)</Label>
                    <Input id="amountRequested" name="amountRequested" type="number" placeholder="e.g., 5000000" />
                </div>

              <div className="flex items-center gap-4">
                <Button type="submit">
                  Create Proposal
                </Button>
                <Button variant="ghost" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
        </CardContent>
      </Card>
    </main>
  );
}
