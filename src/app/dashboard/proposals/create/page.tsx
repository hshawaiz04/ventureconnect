// src/app/dashboard/proposals/create/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore } from '@/firebase';
import { createProposal } from '@/lib/proposalApi';
import useMyBusiness from '@/lib/useMyBusiness';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.'),
  description: z.string().min(50, 'Description must be at least 50 characters.'),
});

export default function CreateProposalPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { business, loading, error } = useMyBusiness();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!business) {
      toast({
        variant: 'destructive',
        title: 'No business found',
        description: 'You must create a business profile before adding a proposal.',
      });
      return;
    }

    try {
      createProposal(firestore, business.id, values);
      toast({
        title: 'Proposal Created!',
        description: 'Your new proposal has been saved as a draft.',
      });
      router.push('/dashboard');
    } catch (err) {
      console.error('Proposal creation error:', err);
      toast({
        variant: 'destructive',
        title: 'Error creating proposal',
        description: (err as Error).message || 'An unexpected error occurred.',
      });
    }
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
        <Button asChild>
          <Link href="/dashboard/create-business">Create Business Profile</Link>
        </Button>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposal Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Series A Funding Round for EcoCharge" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the purpose of this proposal, what the funds will be used for, and the expected outcome."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Creating...' : 'Create Proposal'}
                </Button>
                <Button variant="ghost" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
