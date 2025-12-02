
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
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-8">
            <Handshake className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              VentureConnect
            </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 whitespace-nowrap">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary text-sm font-medium",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <Button variant="ghost" asChild>
              <Link href="/sign-in">Login</Link>
          </Button>
          <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
        
        <div className="flex flex-1 items-center justify-end md:hidden">
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
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                <Button variant="ghost" asChild>
                    <Link href="/sign-in">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
