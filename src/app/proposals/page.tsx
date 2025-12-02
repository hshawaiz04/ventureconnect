import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ListFilter, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const proposals = [
    {
        id: 1,
        title: 'Eco-Friendly Packaging Solution',
        category: 'Sustainability',
        fundingGoal: 50000,
        description: 'A biodegradable alternative to plastic packaging for consumer goods, aiming to reduce plastic waste in landfills and oceans.',
        image: PlaceHolderImages.find(img => img.id === 'proposal-1'),
    },
    {
        id: 2,
        title: 'AI-Powered Personal Finance App',
        category: 'FinTech',
        fundingGoal: 120000,
        description: 'An intelligent mobile app to help users manage budgets, track expenses, and receive personalized investment advice.',
        image: PlaceHolderImages.find(img => img.id === 'proposal-2'),
    },
    {
        id: 3,
        title: 'Urban Vertical Farming Initiative',
        category: 'AgriTech',
        fundingGoal: 85000,
        description: 'Bringing fresh, locally-grown produce to city centers with minimal environmental footprint using hydroponic technology.',
        image: PlaceHolderImages.find(img => img.id === 'proposal-3'),
    },
    {
        id: 4,
        title: 'Remote Health Monitoring Platform',
        category: 'HealthTech',
        fundingGoal: 250000,
        description: 'A platform for doctors to monitor patients with chronic conditions remotely, improving patient outcomes and reducing hospital visits.',
        image: {imageUrl: 'https://picsum.photos/seed/vc-prop4/600/400', imageHint: 'health tech'},
    },
    {
        id: 5,
        title: 'Subscription Box for Artisanal Coffee',
        category: 'E-commerce',
        fundingGoal: 30000,
        description: 'A monthly subscription service delivering curated, high-quality coffee from independent roasters around the world.',
        image: {imageUrl: 'https://picsum.photos/seed/vc-prop5/600/400', imageHint: 'coffee beans'},
    },
    {
        id: 6,
        title: 'Gamified Language Learning App',
        category: 'EdTech',
        fundingGoal: 75000,
        description: 'A mobile app that makes learning a new language fun and engaging through games, challenges, and leaderboards.',
        image: {imageUrl: 'https://picsum.photos/seed/vc-prop6/600/400', imageHint: 'mobile app'},
    },
]


export default function ProposalsPage() {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-start justify-center space-y-4 mb-8">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Explore Business Ideas
                    </h1>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        Discover the next big thing. Filter by category or search for keywords to find your perfect investment.
                    </p>
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search proposals by keyword..." className="pl-10" />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-1">
                                <ListFilter className="h-4 w-4" />
                                <span>Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>FinTech</DropdownMenuItem>
                            <DropdownMenuItem>HealthTech</DropdownMenuItem>
                            <DropdownMenuItem>E-commerce</DropdownMenuItem>
                            <DropdownMenuItem>Sustainability</DropdownMenuItem>
                            <DropdownMenuItem>AgriTech</DropdownMenuItem>
                            <DropdownMenuItem>EdTech</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/post/idea">
                        <Button>Post an Idea</Button>
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {proposals.map((proposal) => (
                        <Card key={proposal.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        {proposal.image && (
                          <div className="relative h-48 w-full">
                            <Image
                              src={proposal.image.imageUrl}
                              alt={proposal.title}
                              fill
                              className="object-cover"
                              data-ai-hint={proposal.image.imageHint}
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex justify-between items-start gap-2">
                            <CardTitle className="pr-2">{proposal.title}</CardTitle>
                            <span className="text-xs font-semibold bg-secondary text-secondary-foreground rounded-full px-2 py-1 whitespace-nowrap">{proposal.category}</span>
                          </div>
                          <CardDescription>
                            <span className="font-semibold text-primary">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(proposal.fundingGoal)}</span> in funding sought
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground line-clamp-3">{proposal.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                          <Button variant="outline" className="w-full" asChild>
                            {/* This would link to a dynamic proposal page e.g. /proposals/${proposal.id} */}
                            <Link href="#">View Details</Link>
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
