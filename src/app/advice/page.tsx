

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, FileText, MessageSquare, Briefcase, BookOpen, GraduationCap, BarChart, Scale, ShieldCheck, UserCheck, Calendar, File, LayoutTemplate, BarChart2, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const adviceTypes = [
    { icon: <GraduationCap className="w-8 h-8 mb-4 text-primary" />, title: "Fundraising Strategy", description: "Learn how to prepare for investor meetings, structure your pitch, and negotiate terms." },
    { icon: <BarChart className="w-8 h-8 mb-4 text-primary" />, title: "Business Planning & Growth", description: "From refining your business model to scaling operations with confidence." },
    { icon: <Briefcase className="w-8 h-8 mb-4 text-primary" />, title: "Marketing & Branding", description: "Get help with brand identity, customer acquisition, and digital marketing." },
    { icon: <Scale className="w-8 h-8 mb-4 text-primary" />, title: "Financial & Legal Guidance", description: "Understand valuations, compliance, tax planning, and documentation." },
    { icon: <UserCheck className="w-8 h-8 mb-4 text-primary" />, title: "Startup Mentorship", description: "Get real-world coaching from experienced founders and industry mentors." },
    { icon: <FileText className="w-8 h-8 mb-4 text-primary" />, title: "Product & Technology", description: "Advice for MVP development, UI/UX, and tech scalability." }
];

const whyUsFeatures = [
    { icon: <UserCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />, title: "Verified Industry Experts", description: "We onboard advisors with proven experience in startups, finance, and business strategy." },
    { icon: <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />, title: "Personalized Guidance", description: "Get advice tailored specifically to your business stage and industry." },
    { icon: <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />, title: "One-on-One Sessions", description: "Book private consultations with business experts." },
    { icon: <BarChart2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />, title: "Affordable & Transparent", description: "No hidden charges — advisors charge session-based or project-based fees." },
    { icon: <ShieldCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />, title: "Confidential & Secure", description: "Your business information stays private. Advisors only see what you choose to share." },
    { icon: <MessageSquare className="h-6 w-6 text-primary mt-1 flex-shrink-0" />, title: "Instant Messaging & Q&A", description: "Ask questions, get documents reviewed, or request help directly through our secure chat system." }
];

const featuredAdvisors = [
    { name: "Ananya Mehta", role: "Startup Mentor", expertise: "Pitch decks, fundraising, SaaS, D2C", experience: "8+ years, helped raise ₹25 Cr+ across startups", cta: "View Profile", ctaLink: "#" },
    { name: "Rohit Verma", role: "Financial Analyst", expertise: "Valuation, projections, investor readiness", experience: "Ex-KPMG, CA by profession", cta: "Book Session", ctaLink: "#" },
    { name: "Nisha Patel", role: "Marketing Strategist", expertise: "Branding, digital media, customer acquisition", experience: "Worked with 40+ small businesses across India", cta: "Ask a Question", ctaLink: "#" },
    { name: "David Fernandes", role: "Business Growth Advisor", expertise: "Scaling operations, sales strategy, automation", experience: "Built and sold 2 business consulting firms", cta: "Chat Now", ctaLink: "#" }
];

const howItWorksSteps = [
    { step: 1, title: "Choose Your Category", description: "Select the kind of help you need — fundraising, marketing, growth, financial planning, etc." },
    { step: 2, title: "Connect With an Advisor", description: "Browse expert profiles and request a consultation or ask questions directly." },
    { step: 3, title: "Get Actionable Guidance", description: "Receive step-by-step advice, document reviews, or strategic recommendations." },
];

const popularArticles = [
    "How to Build a Pitch Deck Investors Say Yes To",
    "Top Mistakes Entrepreneurs Make When Seeking Funding",
    "How to Validate Your Startup Idea Before Launching",
    "Understanding Startup Valuation in Simple Terms",
    "How to Scale Your Business Without Burning Cash",
    "Legal Essentials Every Small Business Must Know",
];

const tools = [
    { icon: <File className="w-6 h-6 mr-4 text-primary" />, title: "Pitch Deck Checklist", description: "A downloadable list of essential slides." },
    { icon: <LayoutTemplate className="w-6 h-6 mr-4 text-primary" />, title: "Market Research Templates", description: "Use predefined templates to analyze your market." },
    { icon: <BarChart2 className="w-6 h-6 mr-4 text-primary" />, title: "Financial Projection Sheet", description: "Basic Excel/Google Sheets template." },
    { icon: <Briefcase className="w-6 h-6 mr-4 text-primary" />, title: "Business Model Canvas", description: "A simple one-page business planning tool." },
    { icon: <Calendar className="w-6 h-6 mr-4 text-primary" />, title: "Advisor Booking System", description: "Schedule 30-minute, 45-minute, or 1-hour sessions." },
];

const testimonials = [
    { quote: "The advisors on VentureConnect helped me refine my pitch deck and secure my first investor meeting.", author: "Sahil K.", role: "Tech Startup Founder" },
    { quote: "Their financial advisor explained valuation clearly and helped me justify my ask confidently.", author: "Priya M.", role: "Small Business Owner" }
];

const faqs = [
    { q: "Is the advice free?", a: "Some advisors offer free Q&A; paid sessions depend on advisor rates." },
    { q: "How does VentureConnect select advisors?", a: "We verify backgrounds, experience, and professional credentials." },
    { q: "Can I ask questions anonymously?", a: "Yes, you can choose what information is visible to advisors." },
    { q: "Do advisors help with legal documentation?", a: "Yes — depending on their expertise. Some specialize in compliance and due diligence." },
    { q: "Are sessions recorded?", a: "No. All sessions are private and confidential." },
];


export default function AdvicePage() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'advice-hero');
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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">Expert Guidance to Grow, Scale, and Fund Your Business.</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                       Connect with verified business advisors, mentors, and financial experts. Get insights across fundraising, growth strategy, market analysis, branding, legal compliance, and more.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="#">Talk to an Advisor</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="#">Explore Advice Articles</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Types of Advice Available</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {adviceTypes.map(advice => (
                            <Card key={advice.title} className="text-center border-0 shadow-none bg-transparent">
                                <CardHeader className="items-center">
                                    {advice.icon}
                                    <CardTitle>{advice.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{advice.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Why Take Advice Through VentureConnect?</h2>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        {whyUsFeatures.map(feature => (
                            <div key={feature.title} className="flex items-start gap-4">
                                {feature.icon}
                                <div>
                                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Featured Advisors</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredAdvisors.map(advisor => (
                            <Card key={advisor.name} className="flex flex-col text-center items-center">
                                <CardHeader>
                                    <Avatar className="w-20 h-20 mb-4">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${advisor.name}`} alt={advisor.name} />
                                        <AvatarFallback>{advisor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle>{advisor.name}</CardTitle>
                                    <CardDescription>{advisor.role}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-2">
                                    <p className="text-sm"><span className="font-semibold">Expertise:</span> {advisor.expertise}</p>
                                    <p className="text-sm text-muted-foreground">{advisor.experience}</p>
                                </CardContent>
                                <div className="p-6 pt-0 w-full">
                                    <Button className="w-full" asChild>
                                        <Link href={advisor.ctaLink}>{advisor.cta}</Link>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             <section id="how-it-works" className="w-full py-16 md:py-24 bg-secondary">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">How It Works</h2>
                    </div>
                    <div className="relative mx-auto max-w-5xl grid gap-10 sm:grid-cols-3">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-border hidden sm:block"></div>
                        {howItWorksSteps.map((step) => (
                            <div key={step.step} className="relative flex flex-col items-center text-center p-4">
                                <div className="absolute -top-5 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold z-10 border-4 border-secondary">{step.step}</div>
                                <h3 className="mt-10 text-xl font-bold">{step.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
             <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Knowledge Hub</h2>
                    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {popularArticles.map(article => (
                            <Card key={article} className="hover:bg-secondary transition-colors">
                                <CardContent className="pt-6">
                                    <Link href="#" className="font-semibold hover:underline flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-primary"/>
                                        {article}
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Tools & Resources</h2>
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

            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Success Stories</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map(testimonial => (
                            <Card key={testimonial.author} className="bg-secondary border-secondary">
                                <CardContent className="pt-6">
                                    <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                                    <p className="text-right mt-4 font-semibold">— {testimonial.author}, <span className="text-muted-foreground">{testimonial.role}</span></p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                     <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Frequently Asked Questions</h2>
                     <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.q}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Empower Your Business with Expert Insights.</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Get personalized advice today.</p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="#">Talk to an Advisor</Link>
                        </Button>
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="#">Explore All Experts</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
