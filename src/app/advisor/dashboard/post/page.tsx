
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';

export default function PostArticlePage() {
  const router = useRouter();
  const { user, userData } = useUser();
  const { toast } = useToast();

  async function handleCreateArticle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user || !userData) {
      toast({ variant: 'destructive', title: 'You must be logged in to post an article.' });
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value.trim();
    const summary = (form.elements.namedItem("summary") as HTMLTextAreaElement).value.trim();
    const content = (form.elements.namedItem("content") as HTMLTextAreaElement).value.trim();

    if (!title || !summary || !content) {
        toast({ variant: 'destructive', title: 'All fields are required.' });
        return;
    }

    try {
      const articlesCollection = collection(db, 'articles');
      await addDoc(articlesCollection, {
        title,
        summary,
        content,
        authorUid: user.uid,
        authorName: userData.name,
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Article Published!",
        description: "Your new article is now live in the Knowledge Hub.",
      });
      router.push("/advisor/dashboard");
    } catch (err) {
      console.error("Article publishing error:", err);
      toast({
        variant: "destructive",
        title: "Could not publish article",
        description: "Please check the console for more details.",
      });
    }
  }

  return (
    <main className="container mx-auto p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a New Article</CardTitle>
          <CardDescription>Share your knowledge with the VentureConnect community.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateArticle} className="space-y-6">
            <div>
              <Label htmlFor="title">Article Title</Label>
              <Input id="title" name="title" placeholder="e.g., How to Build a Pitch Deck That Wins" required />
            </div>
            
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                placeholder="A short summary of your article (1-2 sentences)."
                className="min-h-[100px]"
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Full Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write the full content of your article here. You can use Markdown for formatting."
                className="min-h-[300px]"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit">
                Publish Article
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
