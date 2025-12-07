
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, FileText, Check, Landmark, Banknote, Briefcase, Factory, FileClock, Percent, PiggyBank, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const loanTypes = [
    { icon: <PiggyBank className="w-8 h-8 mb-4 text-primary" />, title: "Startup Loan", description: "For early-stage businesses needing initial working capital." },
    { icon: <Briefcase className="w-8 h-8 mb-4 text-primary" />, title: "MSME / Small Business Loan", description: "Designed for small businesses looking to expand operations." },
    { icon: <Banknote className="w-8 h-8 mb-4 text-primary" />, title: "Working Capital Loan", description: "Ideal for inventory, invoices, running expenses, and day-to-day cash flow." },
    { icon: <Factory className="w-8 h-8 mb-4 text-primary" />, title: "Equipment Financing", description: "Flexible funding for purchasing machinery or technology upgrades." },
    { icon: <Landmark className="w-8 h-8 mb-4 text-primary" />, title: "Business Expansion Loan", description: "For scaling operations, opening new branches, or entering new markets." },
    { icon: <FileClock className="w-8 h-8 mb-4 text-primary" />, title: "Invoice Financing", description: "Get instant cash against unpaid invoices." },
    { icon: <Percent className="w-8 h-8 mb-4 text-primary" />, title: "Line of Credit", description: "Borrow as needed, pay interest only on the utilized amount." },
];

const eligibility = [
    "Minimum 6–12 months of business history (varies by lender)",
    "Valid business registration",
    "Latest bank statements",
    "Basic financial documents (GST returns, ITR, etc.)",
    "Credit score requirements (flexible based on loan type)",
    "Revenue and cash flow stability"
];

const documents = {
    basic: ["PAN Card", "Aadhaar Card", "Business Registration Certificate", "Passport-size photograph"],
    financial: ["Last 6 months bank statements", "GST filings (if applicable)", "ITR returns (1–2 years, optional for early stage)"],
    business: ["Pitch deck (optional but helpful)", "Projected revenue statements", "Business plan / proposal"]
};

const whyUsFeatures = [
    { title: "Compare Offers Instantly", description: "Instead of applying to banks one-by-one, apply once and receive multiple offers." },
    { title: "Verified Lenders", description: "We only allow trusted banks, NBFCs, and registered financial advisors." },
    { title: "No Hidden Charges", description: "Transparent processing fees and clear loan terms." },
    { title: "Personalized Guidance", description: "Financial advisors on the platform can help you understand the best loan type for your situation." },
    { title: "Faster Approvals", description: "Digital processing reduces paperwork and time delays." },
    { title: "Secure Document Upload", description: "Your files are encrypted and only visible to lenders you choose." },
];

const howItWorksSteps = [
    { step: 1, title: "Submit Your Application", description: "Tell us your loan requirement and upload essential documents." },
    { step: 2, title: "Get Multiple Offers", description: "Banks, NBFCs, and advisors review your profile and send personalized offers." },
    { step: 3, title: "Choose & Finalize", description: "Pick the most suitable loan. Negotiate directly and finalize offline or through the lender’s portal." },
];

const featuredLenders = [
    { name: "Horizon Finance (NBFC)", amount: "₹1–50 Lakhs", rate: "10–16%", time: "48 hours" },
    { name: "GreenLeaf Bank", amount: "₹5–75 Lakhs", rate: "9–14%", time: "3–5 days" },
    { name: "CapitalBridge Lending", amount: "₹2–25 Lakhs", rate: "12–20%", time: "Same-Day" },
];

const testimonials = [
    { quote: "VentureConnect helped me secure a working capital loan in just 3 days. Zero hassle.", author: "Meera S.", role: "Boutique Owner" },
    { quote: "I loved that I could compare lenders easily without committing to anything.", author: "Arjun P.", role: "Manufacturing Startup" }
];

const faqs = [
    { q: "Do you directly provide loans?", a: "No. VentureConnect connects you with verified lenders and advisors." },
    { q: "Will checking loan options affect my credit score?", a: "No. Browsing or pre-screening does not impact your score." },
    { q: "Are there any hidden fees?", a: "No hidden charges. All fees are shown before you apply." },
    { q: "How long does approval take?", a: "It depends on the lender, typically 24 hours to 7 days." },
    { q: "Is my data safe?", a: "Yes. Your documents are encrypted and shared only with lenders you select." },
];

export default function LoansPage() {
    const heroImage = PlaceHolderImages.find(img => img.id === 'loans-hero');
    
    const ComingSoonDialog = ({ children }: { children: React.ReactNode }) => (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Coming Soon!</AlertDialogTitle>
                    <AlertDialogDescription>
                        The site hasn't gone commercial yet. This feature is currently unavailable. Please check back later.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">Get the Right Loan for Your Business — Fast, Simple, Transparent.</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                        Compare offers from verified lenders, banks, and financial advisors. Apply once and receive multiple financing options tailored to your business.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/proposals?category=loan">Check Loan Options</Link>
                        </Button>
                        <ComingSoonDialog>
                            <Button size="lg" variant="outline">Apply for a Business Loan</Button>
                        </ComingSoonDialog>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Types of Loans Available</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loanTypes.map(loan => (
                            <Card key={loan.title} className="text-center border-0 shadow-none bg-transparent">
                                <CardHeader className="items-center">
                                    {loan.icon}
                                    <CardTitle>{loan.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{loan.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold font-headline mb-6">Eligibility Criteria</h2>
                        <ul className="space-y-3">
                            {eligibility.map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold font-headline mb-6">Required Documents</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Basic Documents</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    {documents.basic.map(doc => <li key={doc} className="flex items-center gap-2"><FileText className="h-4 w-4" />{doc}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Financial Documents</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    {documents.financial.map(doc => <li key={doc} className="flex items-center gap-2"><FileText className="h-4 w-4" />{doc}</li>)}
                                </ul>
                            </div>
                             <div>
                                <h3 className="font-semibold text-lg mb-2">Business Documents</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    {documents.business.map(doc => <li key={doc} className="flex items-center gap-2"><FileText className="h-4 w-4" />{doc}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Why Use VentureConnect to Secure a Loan?</h2>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        {whyUsFeatures.map(feature => (
                            <div key={feature.title} className="flex items-start gap-4">
                                <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <section id="how-it-works" className="w-full py-16 md:py-24 bg-secondary">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">A Simple Path to Funding</h2>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Featured Lenders</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredLenders.map(lender => (
                            <Card key={lender.name} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <Landmark className="w-8 h-8 text-primary" />
                                        <CardTitle className="text-xl">{lender.name}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p className="text-sm"><span className="font-semibold">Loan Amount:</span> {lender.amount}</p>
                                    <p className="text-sm"><span className="font-semibold">Interest Rate:</span> {lender.rate}</p>
                                    <p className="text-sm"><span className="font-semibold">Approval Time:</span> {lender.time}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             <section className="py-16 md:py-24 bg-secondary">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">What Borrowers Say</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map(testimonial => (
                            <Card key={testimonial.author} className="bg-card border-card">
                                <CardContent className="pt-6">
                                    <blockquote className="text-lg italic text-card-foreground">"{testimonial.quote}"</blockquote>
                                    <p className="text-right mt-4 font-semibold">— {testimonial.author}, <span className="text-muted-foreground">{testimonial.role}</span></p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-background">
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

            <section className="py-20 bg-secondary">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Empower Your Business with the Right Loan.</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">Apply today and access multiple offers instantly.</p>
                    <div className="flex justify-center gap-4">
                        <ComingSoonDialog>
                           <Button size="lg">Apply Now</Button>
                        </ComingSoonDialog>
                        <ComingSoonDialog>
                           <Button size="lg" variant="outline">Talk to a Loan Advisor</Button>
                        </ComingSoonDialog>
                    </div>
                </div>
            </section>
        </div>
    );
}
