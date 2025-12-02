

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function PrivacyPolicyPage() {
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const heroImage = PlaceHolderImages.find(img => img.id === 'legal-hero');

    return (
        <div className="flex flex-col min-h-screen">
             <section className="relative w-full h-[40vh] flex items-center justify-center">
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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">Privacy Policy</h1>
                    <p className="text-lg md:text-xl text-gray-200">Last Updated: {currentDate}</p>
                </div>
            </section>
            <div className="container py-12 md:py-16">
                <Card className="max-w-4xl mx-auto bg-card">
                    <CardContent className="prose-sm md:prose-base max-w-none text-card-foreground prose-headings:text-primary prose-headings:font-headline prose-headings:font-bold prose-p:text-muted-foreground prose-strong:text-card-foreground prose-ul:list-disc prose-ul:ml-6 prose-li:text-muted-foreground pt-6">
                        <p>Welcome to VentureConnect (“we,” “us,” “our”). This Privacy Policy explains how we collect, use, store, protect, and share your information when you use our website, mobile application, or related services (“Platform” or “Services”).</p>
                        <p>By accessing or using VentureConnect, you agree to the practices described in this Privacy Policy.</p>

                        <h2 className="text-2xl mt-12 mb-4">1. Information We Collect</h2>
                        
                        <h3 className="text-xl mt-8 mb-3">1.1 Information You Provide Directly</h3>
                        <ul>
                            <li>Name</li>
                            <li>Email address</li>
                            <li>Role (Investor, Entrepreneur, Banker, Advisor, Admin)</li>
                            <li>Password (securely encrypted)</li>
                            <li>Profile details (bio, company name, industry, location, interests)</li>
                            <li>Uploaded documents (business proposals, pitch decks, financial PDFs, etc.)</li>
                            <li>Messages sent through the Platform</li>
                            <li>Payment or subscription information (processed by third-party gateways)</li>
                        </ul>
                        
                        <h3 className="text-xl mt-8 mb-3">1.2 Automatically Collected Information</h3>
                        <p>When you use VentureConnect, we may collect:</p>
                        <ul>
                            <li>IP address</li>
                            <li>Device information</li>
                            <li>Browser type</li>
                            <li>Access times</li>
                            <li>Pages viewed</li>
                            <li>Clickstream data</li>
                            <li>Session logs</li>
                            <li>Usage analytics</li>
                            <li>Cookies & tracking information (see Cookie Policy if applicable)</li>
                        </ul>

                        <h3 className="text-xl mt-8 mb-3">1.3 Third-Party Information Sources</h3>
                        <p>We may receive data from:</p>
                        <ul>
                            <li>Payment processors (Stripe, Razorpay, etc.)</li>
                            <li>KYC/verification partners (if implemented)</li>
                            <li>Analytics tools (Google Analytics, Firebase, etc.)</li>
                        </ul>

                        <h2 className="text-2xl mt-12 mb-4">2. How We Use Your Information</h2>
                        
                        <h3 className="text-xl mt-8 mb-3">2.1 Provide and Improve the Platform</h3>
                        <ul>
                        <li>Create and manage user accounts</li>
                        <li>Enable communication between investors & entrepreneurs</li>
                        <li>Display proposals, offers, and profiles</li>
                        <li>Improve security, features, and user experience</li>
                        </ul>
                        
                        <h3 className="text-xl mt-8 mb-3">2.2 Ensure Safety & Compliance</h3>
                        <ul>
                        <li>Prevent fraud or misuse</li>
                        <li>Verify identity when needed</li>
                        <li>Enforce platform terms</li>
                        <li>Detect suspicious activity</li>
                        <li>Respond to legal obligations</li>
                        </ul>
                        
                        <h3 className="text-xl mt-8 mb-3">2.3 Personalization</h3>
                        <ul>
                        <li>Recommend proposals or investors</li>
                        <li>Customize dashboards</li>
                        <li>Suggest relevant industries or matches</li>
                        </ul>

                        <h3 className="text-xl mt-8 mb-3">2.4 Payments</h3>
                        <ul>
                        <li>Process subscription fees or premium features</li>
                        <li>Handle billing and invoicing</li>
                        </ul>

                        <h3 className="text-xl mt-8 mb-3">2.5 Communication</h3>
                        <ul>
                        <li>Send confirmations, alerts, updates</li>
                        <li>Notify users about changes or new features</li>
                        <li>Provide support and resolve issues</li>
                        </ul>

                        <h2 className="text-2xl mt-12 mb-4">3. Sharing Your Information</h2>
                        <p>We do not sell your personal data.</p>
                        <p>We may share information only with the following:</p>
                        
                        <h3 className="text-xl mt-8 mb-3">3.1 Other Users</h3>
                        <p>Depending on your role and activity:</p>
                        <ul>
                            <li>Entrepreneurs may share proposal details with investors</li>
                            <li>Investors may reveal selected profile information to entrepreneurs</li>
                        </ul>
                        <p>You control what you upload — we only display what you choose to share.</p>

                        <h3 className="text-xl mt-8 mb-3">3.2 Service Providers</h3>
                        <p>Trusted partners may receive only necessary data:</p>
                        <ul>
                            <li>Payment gateways</li>
                            <li>Cloud hosting providers</li>
                            <li>Email services (SendGrid, Mailgun, etc.)</li>
                            <li>Data analytics services</li>
                            <li>Document storage services (AWS S3, Cloudflare R2, etc.)</li>
                        </ul>

                        <h3 className="text-xl mt-8 mb-3">3.3 Legal Requirements</h3>
                        <p>We may disclose information if required by:</p>
                        <ul>
                            <li>Court order</li>
                            <li>Law enforcement</li>
                            <li>Regulatory authorities</li>
                        </ul>

                        <h3 className="text-xl mt-8 mb-3">3.4 Business Transfers</h3>
                        <p>If VentureConnect is merged, acquired, or sold, user data may be transferred as part of that transaction.</p>

                        <h2 className="text-2xl mt-12 mb-4">4. Data Security</h2>
                        <p>We use industry-standard safeguards:</p>
                        <ul>
                            <li>Encrypted passwords (bcrypt or better)</li>
                            <li>JWT-based authentication</li>
                            <li>SSL/TLS encrypted communication</li>
                            <li>Role-based access control</li>
                            <li>Regular security checks</li>
                            <li>Firewall & intrusion monitoring</li>
                        </ul>
                        <p>However, no system is 100% secure. You use the Platform at your own risk.</p>
                        
                        <h2 className="text-2xl mt-12 mb-4">5. Data Retention</h2>
                        <p>We retain your information:</p>
                        <ul>
                            <li>As long as your account is active</li>
                            <li>As long as necessary to provide our Services</li>
                            <li>As required by law (e.g., transaction records)</li>
                        </ul>
                        <p>You may request deletion of your account at any time.</p>

                        <h2 className="text-2xl mt-12 mb-4">6. Your Rights</h2>
                        <p>Depending on your location, you may have rights to:</p>
                        <ul>
                            <li>Access your data</li>
                            <li>Correct inaccurate information</li>
                            <li>Delete your account & data</li>
                            <li>Request export of your data</li>
                            <li>Restrict or object to certain processing</li>
                            <li>Withdraw consent (where applicable)</li>
                        </ul>
                        <p>Contact us at [Insert Contact Email] to make such requests.</p>

                        <h2 className="text-2xl mt-12 mb-4">7. Cookies & Tracking Technologies</h2>
                        <p>We may use:</p>
                        <ul>
                            <li>Essential cookies</li>
                            <li>Analytics cookies</li>
                            <li>Preference cookies</li>
                            <li>Session tracking</li>
                            <li>Device fingerprinting (only for security)</li>
                        </ul>
                        <p>You may disable cookies via your browser, but some features may stop working.</p>

                        <h2 className="text-2xl mt-12 mb-4">8. Children’s Privacy</h2>
                        <p>VentureConnect is not intended for individuals under 18. We do not knowingly collect data from minors. If you believe a minor has used the Platform, contact us and we will remove the data.</p>

                        <h2 className="text-2xl mt-12 mb-4">9. Third-Party Links</h2>
                        <p>The Platform may link to external websites. We are not responsible for the privacy practices of third-party sites.</p>

                        <h2 className="text-2xl mt-12 mb-4">10. International Data Transfers</h2>
                        <p>Your information may be stored or processed in:</p>
                        <ul>
                            <li>India</li>
                            <li>United States</li>
                            <li>Europe</li>
                            <li>Other regions where service providers operate</li>
                        </ul>
                        <p>By using the Platform, you consent to cross-border data transfer.</p>
                        
                        <h2 className="text-2xl mt-12 mb-4">11. Updates to this Privacy Policy</h2>
                        <p>We may modify this policy at any time. If we make significant changes, we will:</p>
                        <ul>
                            <li>Notify users via email, or</li>
                            <li>Display a notice within the app/website</li>
                        </ul>
                        <p>Continued use means you accept the updated policy.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
