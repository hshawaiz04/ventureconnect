"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Handshake, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase/auth/use-user";
import { getAuth, signOut } from "firebase/auth";

const navLinks = [
  { href: "/proposals", label: "Business Ideas" },
  { href: "/investors", label: "Investors" },
  { href: "/loans", label: "Loans" },
  { href: "/advice", label: "Advice" },
  { href: "/pricing", label: "Pricing" },
];

export function Header() {
  const pathname = usePathname();
  const { user, userData, loading } = useUser();
  const router = useRouter();
  const auth = getAuth();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "";
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full grid grid-cols-[auto_1fr_auto] items-center h-16 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Handshake className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">VentureConnect</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 whitespace-nowrap justify-self-center">
          {userData?.role === "business owner" && (
            <Link
              href="/dashboard"
              className={cn(
                "transition-colors hover:text-primary text-sm font-medium",
                pathname === "/dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
          )}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary text-sm font-medium",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          {loading ? (
             <div className="hidden md:flex items-center gap-4">
              <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
              <div className="h-10 w-24 bg-muted rounded-md animate-pulse" />
            </div>
          ) : user ? (
            <div className="hidden md:flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL ?? undefined} alt={userData?.name} />
                      <AvatarFallback>{getInitials(userData?.name)}</AvatarFallback>
                    </Avatar>
                    <span>{userData?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userData?.role === 'business owner' && (
                     <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}

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
                  {userData?.role === "business owner" && (
                     <Link href="/dashboard" className={cn("transition-colors hover:text-primary text-lg", pathname === "/dashboard" ? "text-primary font-semibold" : "text-muted-foreground")}>
                      Dashboard
                    </Link>
                  )}
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "transition-colors hover:text-primary text-lg",
                        pathname === link.href
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                   {user ? (
                     <Button onClick={handleSignOut}>Logout</Button>
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
