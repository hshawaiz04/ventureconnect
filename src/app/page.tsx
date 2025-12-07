
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Handshake, Target, Briefcase, BotMessageSquare, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        icon: <Target className="w-10 h-10 text-primary" />,
        role: "For Founders",
        title: "Bring Your Vision to Life",
        description: "Access the capital you need to get your business off the ground. Connect directly with investors who believe in your industry and vision.",
        cta: "Post Your Idea",
        link: "/post/idea"
    },
    {
        icon: <Briefcase className="w-10 h-10 text-primary" />,
        role: "For Investors",
        title: "Discover Your Next Big Bet",
        description: "Explore a curated pipeline of high-potential startups. Use our tools to filter by industry, stage, and funding goals to find your perfect match.",
        cta: "Browse Startups",
        link: "/proposals"
    },
    {
        icon: <Landmark className="w-10 h-10 text-primary" />,
        role: "For Bankers",
        title: "Finance the Future",
        description: "Offer tailored loan products to a captive audience of growing businesses. Review applications and manage your portfolio with our intuitive dashboard.",
        cta: "View Loan Requests",
        link: "/loans"
    },
    {
        icon: <BotMessageSquare className="w-10 h-10 text-primary" />,
        role: "For Advisors",
        title: "Share Your Expertise",
        description: "Guide the next generation of entrepreneurs by providing expert advice on strategy, finance, and growth. Build your reputation and find new clients.",
        cta: "Advise Startups",
        link: "/advice"
    },
]

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">
                    Connecting Innovators with Capital.
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                    The premier platform for founders to secure funding, for investors to discover opportunities, and for experts to guide the way.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" asChild>
                       <Link href="/proposals">Explore Business Ideas</Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                       <Link href="/sign-up">Join as an Investor</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold font-headline">A Platform for Growth</h2>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Whether you're building, funding, or advising, VentureConnect provides the tools you need to succeed.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map(feature => (
                        <div key={feature.role} className="text-center p-6 rounded-lg border border-transparent hover:border-primary hover:bg-secondary transition-all">
                           <div className="flex justify-center">{feature.icon}</div>
                           <p className="font-semibold text-muted-foreground mt-4">{feature.role}</p>
                           <h3 className="text-xl font-bold font-headline mt-1 mb-2">{feature.title}</h3>
                           <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                           <Button variant="link" asChild>
                               <Link href={feature.link}>{feature.cta} &rarr;</Link>
                           </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <Handshake className="w-12 h-12 mx-auto text-primary mb-4" />
                     <h2 className="text-3xl md:text-4xl font-bold font-headline">Join the Network</h2>
                     <p className="text-lg text-muted-foreground mt-4 mb-8">
                        Become part of a thriving ecosystem of ambition and innovation. Create your profile today and start making connections that matter.
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/sign-up">Get Started for Free</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
