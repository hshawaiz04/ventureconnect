

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Briefcase, Handshake, Landmark, Lightbulb, Users, CheckCircle } from 'lucide-react';

const roles = [
  {
    icon: <Lightbulb className="w-8 h-8 mb-4 text-primary" />,
    title: 'Business Owner',
    description: 'Share your innovative idea and secure the funding you need to grow.',
    link: '/sign-up?role=business',
    cta: 'Post Your Idea'
  },
  {
    icon: <Users className="w-8 h-8 mb-4 text-primary" />,
    title: 'Investor',
    description: 'Discover and invest in the next generation of disruptive startups.',
    link: '/sign-up?role=investor',
    cta: 'Find Opportunities'
  },
  {
    icon: <Landmark className="w-8 h-8 mb-4 text-primary" />,
    title: 'Banker',
    description: 'Offer competitive business loans and support local entrepreneurs.',
    link: '/sign-up?role=banker',
    cta: 'Provide Loans'
  },
  {
    icon: <Briefcase className="w-8 h-8 mb-4 text-primary" />,
    title: 'Business Advisor',
    description: 'Lend your expertise and guide businesses towards success.',
    link: '/sign-up?role=advisor',
    cta: 'Offer Advice'
  },
];

const featuredProposals = [
  {
    id: 1,
    title: 'Eco-Friendly Packaging Solution',
    category: 'Sustainability',
    fundingGoal: 5000000,
    description: 'A biodegradable alternative to plastic packaging for consumer goods.',
  },
  {
    id: 2,
    title: 'AI-Powered Personal Finance App',
    category: 'FinTech',
    fundingGoal: 12000000,
    description: 'An intelligent mobile app to help users manage budgets and investments.',
  },
  {
    id: 3,
    title: 'Urban Vertical Farming Initiative',
    category: 'AgriTech',
    fundingGoal: 8500000,
    description: 'Bringing fresh, locally-grown produce to city centers with minimal footprint.',
  },
];

const howItWorksSteps = [
    {
        step: 1,
        title: "Sign Up & Create Profile",
        description: "Choose your role and set up your profile in minutes. Tell us what you're looking for.",
    },
    {
        step: 2,
        title: "Post or Discover",
        description: "Business owners post ideas. Investors, bankers, and advisors post their offerings and criteria.",
    },
    {
        step: 3,
        title: "Connect & Collaborate",
        description: "Our platform helps you find the right match. Search, filter, and connect directly.",
    },
    {
        step: 4,
        title: "Grow Together",
        description: "Forge partnerships that fuel growth, innovation, and success. Your next venture starts here.",
    }
]

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[70vh] flex items-center justify-center">
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
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
            Connecting Innovators with Capital
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl mt-4">
            VentureConnect is the premier platform where business ideas meet investment opportunities. Find your next partner and bring your vision to life.
          </p>
          <div className="mt-6">
            <Button size="lg" asChild>
              <Link href="/sign-up">Get Started Today <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="roles" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Choose Your Path</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Are you a...</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Whether you're looking for funding, seeking to invest, offering loans, or providing expert advice, there's a place for you at VentureConnect.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-4 md:grid-cols-2">
            {roles.map((role) => (
              <Card key={role.title} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="items-center">
                  {role.icon}
                  <CardTitle>{role.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full" asChild>
                    <Link href={role.link}>{role.cta}</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Simple Path to Partnership</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We've streamlined the process of connecting talent, ideas, and capital.
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl grid gap-10 sm:grid-cols-4">
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

      <section id="featured" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Featured Ideas</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Hot Right Now</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out some of the most promising business proposals currently on our platform.
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 pt-12 w-full">
            {featuredProposals.map((proposal) => (
              <Card key={proposal.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{proposal.title}</h3>
                    <p className="text-sm text-muted-foreground">{proposal.description}</p>
                    <p className="text-primary font-semibold mt-2">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(proposal.fundingGoal)} sought</p>
                  </div>
                  <Button variant="outline" asChild className="ml-6 flex-shrink-0">
                    <Link href={`/proposals`}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/proposals">
                Explore All Proposals <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              Ready to Build the Future?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join our community of innovators, investors, and experts today. Your next big opportunity is just a click away.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <Button size="lg" className="w-full" asChild>
              <Link href="/sign-up">
                Join VentureConnect Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

    