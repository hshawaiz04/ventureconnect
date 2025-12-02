"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Handshake, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/proposals", label: "Business Ideas" },
  { href: "/investors", label: "Investors" },
  { href: "/loans", label: "Loans" },
  { href: "/advice", label: "Advice" },
  { href: "/pricing", label: "Pricing" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Desktop Header */}
        <div className="hidden w-full items-center justify-between md:flex">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <Handshake className="h-6 w-6 text-primary" />
              <span className="font-bold sm:inline-block">
                VentureConnect
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/sign-in">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
            </Button>
          </nav>
        </div>
        
        {/* Mobile Header */}
        <div className="flex flex-1 items-center justify-between md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <Handshake className="h-6 w-6 text-primary" />
                <span className="font-bold">VentureConnect</span>
              </Link>
              <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-primary text-lg",
                    pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              </div>
            </SheetContent>
          </Sheet>
          
           <Link href="/" className="flex items-center space-x-2">
            <Handshake className="h-6 w-6 text-primary" />
            <span className="font-bold">VentureConnect</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/sign-in">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
