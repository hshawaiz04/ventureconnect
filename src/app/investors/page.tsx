
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MessageCircle, Search, Star, FileText, Bell, BarChart, ShieldCheck, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const whyInvestFeatures = [
    {
        icon: <Search className="w-8 h-8 mb-4 text-primary" />,
        title: "Curated Deal Flow",
        description: "Get access to business ideas screened for clarity, traction, and growth potential.",
    },
    {
        icon: <FileText className="w-8 h-8 mb-4 text-primary" />,
        title: "Transparent Founder Profiles",
        description: "Every entrepreneur provides background, pitch deck, documents, and business metrics.",
    },
    {
        icon: <BarChart className="w-8 h-8 mb-4 text-primary" />,
        title: "Smart Matching Engine",
        description: "We recommend startups based on your investment range, industry preferences, and past activity.",
    },
    {
        icon: <MessageCircle className="w-8 h-8 mb-4 text-primary" />,
        title: "Secure Communication",
        description: "Message founders directly using our encrypted chat system — no personal details revealed unless you choose to share.",
    },
];

const opportunities = [
    {
        id: "ecowash",
        name: "EcoWash Solutions",
        stage: "Seed",
        industry: "CleanTech",
        funding: "$50,000 – $100,000",
        traction: "5,000 paying customers",
        image: { imageUrl: 'https://images.unsplash.com/photo-1542601906-8b3683833857?q=80&w=600&auto=format&fit=crop', imageHint: 'eco friendly' }
    },
    {
        id: "byteschool",
        name: "ByteSchool EdTech",
        stage: "Pre-Series A",
        industry: "Education",
        funding: "$150,000 – $300,000",
        traction: "20+ schools onboard",
        image: { imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop', imageHint: 'education technology' }
    },
    {
        id: "farmlink",
        name: "FarmLink Logistics",
        stage: "Growth",
        industry: "Agriculture",
        funding: "$250,000 – $400,000",
        traction: "₹2.5 Crore Annual Revenue",
        image: { imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=600&auto=format&fit=crop', imageHint: 'agriculture technology' }
    }
];

const howItWorksSteps = [
    {
        step: 1,
        title: "Create Your Investor Profile",
        description: "Choose your industries, ticket size, and investment interests.",
    },
    {
        step: 2,
        title: "Browse Curated Startups",
        description: "Access business ideas, traction reports, and founder details.",
    },
    {
        step: 3,
        title: "Connect & Invest Securely",
        description: "Chat with founders, request documents, negotiate, and finalize deals offline.",
    },
];

const tools = [
    { icon: <BarChart className="w-6 h-6 mr-4 text-primary" />, title: "Deal Screening Dashboard", description: "See financials, risk score, pitch deck summaries." },
    { icon: <Filter className="w-6 h-6 mr-4 text-primary" />, title: "Deep Search Filters", description: "Filter by funding amount, industry, stage, revenue model, and more." },
    { icon: <FileText className="w-6 h-6 mr-4 text-primary" />, title: "Pitch Deck & Document Viewer", description: "Review documents without downloading." },
    { icon: <Star className="w-6 h-6 mr-4 text-primary" />, title: "Save Opportunities", description: "Bookmark deals and get update notifications." },
    { icon: <Bell className="w-6 h-6 mr-4 text-primary" />, title: "Deal Alerts", description: "Receive notifications when new startups match your preferences." }
];

const testimonials = [
    {
        quote: "VentureConnect made it incredibly easy to discover startups in sectors I care about. Clear, transparent, and well-structured.",
        author: "Rahul M.",
        role: "Angel Investor"
    },
    {
        quote: "The platform's matching engine saved me weeks of screening and shortlisting.",
        author: "Priya K.",
        role: "VC Analyst"
    }
];

const safetyFeatures = [
    { icon: <Check className="h-5 w-5 text-green-500" />, text: "Each startup undergoes identity and documentation checks." },
    { icon: <Check className="h-5 w-5 text-green-500" />, text: "All communication is encrypted." },
    { icon: <Check className="h-5 w-5 text-green-500" />, text: "We charge only for premium features — no commissions." },
    { icon: <Check className="h-5 w-5 text-green-500" />, text: "We do not recommend or influence investment choices. You remain in full control." }
];


export default function InvestorsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-secondary text-primary-foreground py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">Discover High-Potential Startups. Invest With Confidence.</h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Explore verified business ideas, connect with founders, and access curated opportunities tailored to your investment preferences.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/proposals">Browse Startups</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/sign-up?role=investor">Create Investor Profile</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyInvestFeatures.map(feature => (
                            <Card key={feature.title} className="text-center border-0 shadow-none bg-transparent">
                                <CardHeader className="items-center">
                                    {feature.icon}
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Investment Opportunities</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {opportunities.map(opp => (
                            <Card key={opp.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48 w-full">
                                    <Image src={opp.image.imageUrl} alt={opp.name} fill className="object-cover" data-ai-hint={opp.image.imageHint} />
                                </div>
                                <CardHeader>
                                    <CardTitle>{opp.name}</CardTitle>
                                    <CardDescription>{opp.stage} • {opp.industry}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p className="text-sm"><span className="font-semibold">Funding Needed:</span> {opp.funding}</p>
                                    <p className="text-sm"><span className="font-semibold">Traction:</span> {opp.traction}</p>
                                </CardContent>
                                <div className="p-6 pt-0">
                                    <Button className="w-full" asChild>
                                        <Link href={`/proposals`}>View Opportunity</Link>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="w-full py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">A Simple Path to Investment</h2>
                    </div>
                    <div className="relative grid gap-10 sm:grid-cols-3">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-border hidden sm:block"></div>
                        {howItWorksSteps.map((step) => (
                            <div key={step.step} className="relative flex flex-col items-center text-center p-4">
                                <div className="absolute -top-5 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold z-10 border-4 border-background">{step.step}</div>
                                <h3 className="mt-10 text-xl font-bold">{step.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Investor Tools & Features</h2>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-8">
                        {tools.map(tool => (
                            <div key={tool.title} className="flex items-start">
                                {tool.icon}
                                <div>
                                    <h3 className="text-lg font-semibold">{tool.title}</h3>
                                    <p className="text-muted-foreground">{tool.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">What Our Investors Say</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map(testimonial => (
                            <Card key={testimonial.author} className="bg-secondary border-secondary">
                                <CardContent className="pt-6">
                                    <blockquote className="text-lg italic text-primary-foreground">"{testimonial.quote}"</blockquote>
                                    <p className="text-right mt-4 font-semibold">— {testimonial.author}, <span className="text-muted-foreground">{testimonial.role}</span></p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <ShieldCheck className="h-12 w-12 mx-auto text-primary mb-4" />
                        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Safety, Transparency & Compliance</h2>
                        <ul className="space-y-3 text-left max-w-md mx-auto">
                            {safetyFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    {feature.icon}
                                    <span>{feature.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Ready to Discover Your Next Investment?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Create your investor profile and start exploring opportunities today.</p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/sign-up?role=investor">Get Started</Link>
                        </Button>
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/proposals">View Opportunities</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
