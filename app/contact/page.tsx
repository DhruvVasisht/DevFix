import Link from "next/link"
import { ArrowLeft, Mail, MessageSquare, Phone } from "lucide-react"

export default function ContactPage() {
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
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <p className="text-muted-foreground text-lg mb-12">
            Have questions, feedback, or need support? We&apos;d love to hear from you!
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Support</h3>
                    <p className="text-muted-foreground mb-2">For general inquiries and support</p>
                    <Link href="mailto:support@devfix.com" className="text-emerald-500 hover:text-emerald-600">
                      support@devfix.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community Support</h3>
                    <p className="text-muted-foreground mb-2">Join our community server for help</p>
                    <Link href="#" className="text-emerald-500 hover:text-emerald-600">
                      Join DevFix Community
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Inquiries</h3>
                    <p className="text-muted-foreground mb-2">For partnerships and business matters</p>
                    <Link href="mailto:business@devfix.com" className="text-emerald-500 hover:text-emerald-600">
                      business@devfix.com
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-muted/20 rounded-lg">
                <h3 className="font-semibold mb-2">Office Hours</h3>
                <p className="text-muted-foreground">
                  We typically respond to emails within 24 hours during business days (Monday-Friday, 9 AM - 6 PM PST).
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="business">Business Inquiry</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition font-medium"
                >
                  Send Message
                </button>
              </form>

              <p className="text-sm text-muted-foreground mt-4">
                By submitting this form, you agree to our{" "}
                <Link href="/privacy" className="text-emerald-500 hover:text-emerald-600">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-emerald-500 hover:text-emerald-600">
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-6">
              Looking for quick answers? Check out our FAQ section.
            </p>
            <Link 
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-input rounded-md hover:bg-accent transition"
            >
              Visit FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 