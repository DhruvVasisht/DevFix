import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using DevFix, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                DevFix is a developer collaboration platform that provides real-time communication, 
                structured channels, and problem-solving tools for development teams.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Real-time messaging and communication</li>
                <li>File sharing and code collaboration</li>
                <li>Voice and video calling</li>
                <li>Server and channel management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                To access certain features of DevFix, you must create an account:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must be at least 13 years old to create an account</li>
                <li>One person may not maintain multiple accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to use DevFix for any unlawful purpose or any prohibited activity including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Harassment, abuse, or harm to other users</li>
                <li>Sharing illegal, harmful, or inappropriate content</li>
                <li>Spam, phishing, or fraudulent activities</li>
                <li>Violating intellectual property rights</li>
                <li>Attempting to hack, disrupt, or damage our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Content and Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                You retain ownership of content you create and share on DevFix. However, by posting content, 
                you grant us a license to use, display, and distribute that content on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                use of the service, to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your account and access to DevFix immediately, without prior notice, 
                for any reason, including violation of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                DevFix is provided "as is" without any representations or warranties. We do not guarantee 
                that the service will be uninterrupted or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. We will notify users of any material 
                changes via email or through the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <Link href="mailto:legal@devfix.com" className="text-emerald-500 hover:text-emerald-600">
                  legal@devfix.com
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 