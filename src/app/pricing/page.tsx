
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

const plans = [
  {
    title: "Business Owner",
    price: 2499,
    period: "/month",
    description: "For entrepreneurs ready to launch and grow.",
    features: [
      "Post up to 5 business ideas",
      "Access to investor and loan listings",
      "Direct messaging with investors",
      "Basic analytics",
    ],
    cta: "Choose Business Plan",
  },
  {
    title: "Investor",
    price: 4999,
    period: "/month",
    description: "For investors seeking the next big thing.",
    features: [
      "Post unlimited investment proposals",
      "Advanced search and filtering",
      "Direct messaging with business owners",
      "Full access to business proposals",
      "Priority support",
    ],
    cta: "Choose Investor Plan",
  },
  {
    title: "Partner",
    price: 3999,
    period: "/month",
    description: "For bankers and advisors.",
    features: [
      "Post loan and advisory services",
      "Appear in partner listings",
      "Direct messaging with businesses",
      "Access to relevant business proposals",
    ],
    cta: "Choose Partner Plan",
  },
];

export default function PricingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'pricing-hero');
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">
                  Find the Perfect Plan
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                  Unlock powerful features to connect and grow. Simple, transparent pricing for everyone.
                </p>
          </div>
      </section>
      <div className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.title} className="flex flex-col h-full border-primary shadow-lg">
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(plan.price)}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full">
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
