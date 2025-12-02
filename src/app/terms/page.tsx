import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-4xl mx-auto bg-card">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-center">Terms of Service</CardTitle>
                    <p className="text-center text-muted-foreground pt-2">Last updated: {lastUpdated}</p>
                </CardHeader>
                <CardContent className="prose-sm md:prose-base max-w-none text-card-foreground prose-headings:text-primary prose-headings:font-headline prose-headings:font-bold prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-p:text-muted-foreground prose-strong:text-card-foreground prose-ul:list-disc prose-ul:ml-6 prose-li:text-muted-foreground prose-p:mb-4 prose-ul:mb-4">
                    <p>Welcome to VentureConnect (“the Platform”). These Terms of Service (“Terms”) govern your access to and use of our website, mobile app, and related services (“Services”). By creating an account, accessing, or using the Platform, you agree to be bound by these Terms.</p>
                    <p>If you do not agree, do not use the Platform.</p>
                    
                    <h2>1. Eligibility</h2>
                    <p>You must:</p>
                    <ul>
                        <li>Be at least 18 years old.</li>
                        <li>Have the legal capacity to enter into contracts.</li>
                        <li>Use the Platform only for lawful business purposes.</li>
                    </ul>
                    <p>We may refuse, suspend, or terminate accounts that violate these requirements.</p>

                    <h2>2. Purpose of the Platform</h2>
                    <p>VentureConnect acts as a digital networking and information platform that:</p>
                    <ul>
                        <li>Allows entrepreneurs to post business proposals,</li>
                        <li>Allows investors to explore potential opportunities,</li>
                        <li>Allows banking professionals and advisors to offer guidance.</li>
                    </ul>
                    <p><strong>VentureConnect is not an investment advisor, broker, financial institution, or funding provider.</strong> We do not verify claims, guarantee outcomes, or participate in negotiations.</p>
                    <p>All investment and business decisions made through the Platform are your sole responsibility.</p>

                    <h2>3. Account Registration</h2>
                    <p>When creating an account:</p>
                    <ul>
                        <li>You must provide accurate and complete information.</li>
                        <li>You are responsible for maintaining the confidentiality of your login details.</li>
                        <li>You agree not to impersonate another person or use fake information.</li>
                    </ul>
                    <p>We may suspend or delete accounts at our discretion.</p>

                    <h2>4. Roles &amp; Permissions</h2>
                    <p>Users may register under roles such as:</p>
                    <ul>
                        <li>Investor</li>
                        <li>Entrepreneur</li>
                        <li>Banker</li>
                        <li>Advisor</li>
                        <li>Admin (internal use only)</li>
                    </ul>
                    <p>Certain features depend on your assigned role. Admin capabilities are strictly reserved for authorized personnel only.</p>

                    <h2>5. User Content</h2>
                    <p>You may upload: Business proposals, Documents, Messages, Profile information. By uploading content, you grant VentureConnect a non-exclusive, worldwide, royalty-free license to: Display, Store, Process, Transmit your content solely for providing the Platform’s Services.</p>
                    <p>You represent and warrant that:</p>
                    <ul>
                        <li>You own or have permission to upload your content.</li>
                        <li>Your content does not infringe any intellectual property, privacy, or legal rights.</li>
                    </ul>
                    <p>We may remove content that violates these Terms.</p>

                    <h2>6. No Financial, Legal, or Investment Advice</h2>
                    <p>VentureConnect does not: Provide investment recommendations, Verify the accuracy of proposals, Guarantee the success of any deal, Endorse any user or business opportunity. All interactions, communications, and agreements between users are independent. VentureConnect is not a party to any investment agreement or transaction.</p>
                    <p>You should consult your own financial, legal, or tax professionals.</p>

                    <h2>7. Interactions Between Users</h2>
                    <p>Users communicate and share information at their own risk. VentureConnect is not responsible for: Misrepresentation, Fraud, Losses due to user decisions, Failed deals, Disputes between users. We may—but are not obligated to—intervene in disputes.</p>

                    <h2>8. Payments, Fees &amp; Premium Features</h2>
                    <p>VentureConnect may offer paid features such as: Proposal boosting, Subscription plans, Enhanced visibility, Additional roles/tools. All fees are displayed before purchase. Purchases are non-refundable unless stated otherwise. Payment processing is handled by third-party providers (e.g., Stripe, Razorpay). VentureConnect does not store card or banking details.</p>

                    <h2>9. Prohibited Activities</h2>
                    <p>You agree not to:</p>
                    <ul>
                        <li>Use the Platform for illegal, fraudulent, or harmful purposes.</li>
                        <li>Post misleading or false information.</li>
                        <li>Solicit users outside of the Platform using harvested data.</li>
                        <li>Upload viruses, malware, or attempt to hack the Platform.</li>
                        <li>Impersonate another person or misrepresent your identity.</li>
                        <li>Attempt to access admin-only areas or restricted systems.</li>
                    </ul>
                    <p>Violation may lead to immediate account termination and legal action.</p>

                    <h2>10. Intellectual Property</h2>
                    <p>All Platform content—including logos, UI, code, designs, and branding—is the property of VentureConnect. You may not copy, modify, distribute, or reverse-engineer any part of the Platform without permission.</p>

                    <h2>11. Disclaimers</h2>
                    <p>The Platform is provided “AS IS” and “AS AVAILABLE” with no warranties. We do not guarantee: Continuous uptime, Accuracy of user-generated content, Security from all cyber threats, Availability of investment opportunities. Use the Platform at your own risk.</p>

                    <h2>12. Limitation of Liability</h2>
                    <p>To the maximum extent permitted by law: VentureConnect and its team are not liable for: Lost investments or financial loss, Lost data, Business interruption, Indirect, incidental, or consequential damages. Our total liability shall not exceed the amount you paid to VentureConnect in the last 6 months.</p>
                    
                    <h2>13. Termination</h2>
                    <p>We may suspend or terminate your account if: You violate these Terms, You abuse or misuse the Platform, You post harmful or illegal content, Required by law or regulatory request. Upon termination: Your access will be revoked, Your content may be deleted.</p>

                    <h2>14. Privacy</h2>
                    <p>Your use of the Platform is also governed by our Privacy Policy, which explains: What data we collect, How it is used, How it is stored. You must agree to the Privacy Policy to use VentureConnect.</p>

                    <h2>15. Changes to the Terms</h2>
                    <p>We may update these Terms at any time. We will notify users by email or by posting a notice on the Platform. Continued use means you accept the new Terms.</p>

                    <h2>16. Governing Law</h2>
                    <p>These Terms are governed by the laws of India. Any disputes shall be resolved in the courts of Mumbai.</p>
                </CardContent>
            </Card>
        </div>
    );
}