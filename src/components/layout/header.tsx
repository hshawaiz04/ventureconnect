"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Handshake, Menu, LayoutDashboard, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase/auth/use-user";
import { getAuth, signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


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
  const { user, userData, loading } = useUser();
  const auth = getAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: "Signed out successfully." });
      router.push('/');
    } catch (error) {
      toast({ variant: 'destructive', title: "Error signing out.", description: (error as Error).message });
    }
  }

  const navLinks = userData?.role === 'business owner' ? businessNavLinks : defaultNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-16">

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Handshake className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">VentureConnect</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8 mx-auto whitespace-nowrap">
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

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
             {loading ? (
              <div className="w-24 h-8 bg-muted rounded-md animate-pulse" />
            ) : user ? (
              <>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ""} />
                  <AvatarFallback>{user.displayName?.charAt(0) ?? user.email?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

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
                  {user ? (
                     <Button onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                  ) : (
                    <>
                      <Button variant="ghost" asChild>
                        <Link href="/sign-in">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/sign-up">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}
