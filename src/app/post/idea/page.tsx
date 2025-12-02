
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function PostIdeaPage() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'post-idea-hero');
    return (
        <div className="flex flex-col min-h-screen">
             <section className="relative w-full h-[50vh] flex items-center justify-center">
                {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.imageHint}
                />
                )}
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative container px-4 md:px-6 text-center text-primary-foreground z-10">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">Post Your Business Idea</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                        Fill out the form below to share your vision with potential investors and partners. Make it compelling!
                    </p>
                </div>
            </section>
            <div className="w-full py-12 md:py-16">
                <div className="container px-4 md:px-6 max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl md:text-3xl font-headline">Your Proposal Details</CardTitle>
                            <CardDescription>
                                Provide the details of your business idea.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="idea-title">Idea Title</Label>
                                    <Input id="idea-title" placeholder="e.g., Eco-Friendly Packaging Solution" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fintech">FinTech</SelectItem>
                                            <SelectItem value="healthtech">HealthTech</SelectItem>
                                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                                            <SelectItem value="sustainability">Sustainability</SelectItem>
                                            <SelectItem value="agritech">AgriTech</SelectItem>
                                            <SelectItem value="edtech">EdTech</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="funding-goal">Funding Goal (INR)</Label>
                                    <Input id="funding-goal" type="number" placeholder="e.g., 5000000" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Detailed Description</Label>
                                    <Textarea id="description" placeholder="Describe your business idea, target market, and what makes it unique." className="min-h-[150px]" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="contact-email">Contact Email</Label>
                                    <Input id="contact-email" type="email" placeholder="Your best contact email" />
                                </div>
                                <Button type="submit" className="w-full" size="lg">Submit Proposal</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
