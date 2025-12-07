
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { postSolution, useQueryAndSolutions } from '@/lib/queryApi';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

export default function QuerySolutionPage() {
  const router = useRouter();
  const params = useParams();
  const queryId = params.queryId as string;
  
  const { user, userData } = useUser();
  const { queryData, solutions, loading, error } = useQueryAndSolutions(queryId);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostSolution = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !userData) {
      toast({ variant: 'destructive', title: 'You must be logged in.' });
      return;
    }
     if (userData.role !== 'advisor') {
      toast({ variant: 'destructive', title: 'Only advisors can post solutions.' });
      return;
    }

    setIsSubmitting(true);
    const form = e.currentTarget;
    const content = (form.elements.namedItem("content") as HTMLTextAreaElement).value.trim();

    if (!content) {
        toast({ variant: 'destructive', title: 'Solution content cannot be empty.' });
        setIsSubmitting(false);
        return;
    }

    try {
      await postSolution(queryId, content, userData.name);
      toast({
        title: "Solution Posted!",
        description: "Thank you for contributing to the community.",
      });
      (form.elements.namedItem("content") as HTMLTextAreaElement).value = '';
    } catch (err) {
      console.error("Error posting solution:", err);
      toast({
        variant: "destructive",
        title: "Could not post solution",
        description: "An error occurred. Please check the console for details.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

  if (loading) {
    return (
      <main className="container mx-auto p-6">
        <Skeleton className="h-96 w-full max-w-4xl mx-auto" />
      </main>
    );
  }

  if (error) {
    return <div className="container mx-auto p-6 text-center text-red-500">Error: {error}</div>;
  }
  
  if (!queryData) {
      return <div className="container mx-auto p-6 text-center">Query not found.</div>;
  }

  return (
    <main className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold">{queryData.title}</CardTitle>
                <span className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-full whitespace-nowrap">{queryData.status}</span>
            </div>
            <CardDescription>
              Asked by {queryData.authorName} about {queryData.createdAt ? formatDistanceToNow(queryData.createdAt.toDate(), { addSuffix: true }) : 'some time ago'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{queryData.description}</p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-bold mb-4">Solutions ({solutions.length})</h2>
          {solutions.length > 0 ? (
            <div className="space-y-6">
              {solutions.map(solution => (
                <Card key={solution.id} className="bg-secondary">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                       <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${solution.advisorName}`} />
                            <AvatarFallback>{getInitials(solution.advisorName)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{solution.advisorName}</p>
                            <p className="text-xs text-muted-foreground">
                                Answered {solution.createdAt ? formatDistanceToNow(solution.createdAt.toDate(), { addSuffix: true }) : 'some time ago'}
                            </p>
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{solution.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No solutions have been posted yet. Be the first to help!</p>
          )}
        </div>

        {userData?.role === 'advisor' && queryData.status !== 'Closed' && (
          <Card>
            <CardHeader>
              <CardTitle>Post Your Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostSolution} className="space-y-4">
                <div>
                  <Label htmlFor="content" className="sr-only">Your Solution</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Share your expertise and provide a clear, helpful solution..."
                    className="min-h-[200px]"
                    required
                  />
                </div>
                <div className="flex items-center gap-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Posting...' : 'Post Solution'}
                  </Button>
                   <Button variant="ghost" type="button" onClick={() => router.back()}>
                    Back to Dashboard
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
