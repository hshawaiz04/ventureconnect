"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Handshake, Menu, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// This is a mock hook. Replace with your actual authentication logic.
const useUser = () => {
  // To test the business owner view, you can temporarily set this to 'business'
  // and then set it back to null or a different role.
  const user = { role: 'business' }; // or { role: 'investor' } or null
  return { user };
};

const defaultNavLinks = [
  { href: "/proposals", label: "Business Ideas" },
  { href: "/investors", label: "Investors" },
  { href: "/loans", label: "Loans" },
  { href: "/advice", label: "Advice" },
  { href: "/pricing", label: "Pricing" },
];

const businessNavLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ...defaultNavLinks,
];


export function Header() {
  const pathname = usePathname();
  const { user } = useUser(); // In a real app, this would come from your auth provider

  const navLinks = user?.role === 'business' ? businessNavLinks : defaultNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex items-center h-16 px-4 sm:px-6 lg:px-8">

        {/* LEFT - Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-8">
          <Handshake className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">VentureConnect</span>
        </Link>

        {/* CENTER - Nav Links */}
        <nav className="hidden md:flex items-center gap-8 whitespace-nowrap mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary text-sm font-medium flex items-center gap-2",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE - Auth + Mobile Menu */}
        <div className="flex items-center gap-4 ml-auto">
          
          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center md:hidden">
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
                        "transition-colors hover:text-primary text-lg flex items-center gap-3",
                        pathname === link.href
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.icon && <link.icon className="h-5 w-5" />}
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
      </div>
    </header>
  );
}
