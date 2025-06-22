import Link from "next/link"
import { ArrowLeft, Book, Code, Settings, Users } from "lucide-react"

export default function DocsPage() {
  const docSections = [
    {
      title: "Getting Started",
      icon: <Book className="h-6 w-6" />,
      description: "Quick start guide to set up your first DevFix server",
      links: [
        "Creating your first server",
        "Setting up channels",
        "Inviting team members",
        "Basic configuration",
      ],
    },
    {
      title: "API Reference",
      icon: <Code className="h-6 w-6" />,
      description: "Complete API documentation for integrations",
      links: [
        "Authentication",
        "REST API endpoints", 
        "WebSocket events",
        "Rate limiting",
      ],
    },
    {
      title: "Server Management",
      icon: <Settings className="h-6 w-6" />,
      description: "Advanced server configuration and management",
      links: [
        "Roles and permissions",
        "Channel management",
        "Moderation tools",
        "Server settings",
      ],
    },
    {
      title: "Collaboration Features",
      icon: <Users className="h-6 w-6" />,
      description: "Make the most of DevFix's collaboration tools",
      links: [
        "Voice and video calls",
        "Screen sharing",
        "File sharing",
        "Code collaboration",
      ],
    },
  ]

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

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about using DevFix effectively with your development team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {docSections.map((section, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                    <p className="text-muted-foreground text-sm">{section.description}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href="#"
                        className="text-muted-foreground hover:text-emerald-500 transition-colors flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-muted/20 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Popular Guides</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-emerald-500/10 rounded-full flex items-center justify-center">
                  <Book className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">
                  <Link href="#" className="hover:text-emerald-500 transition-colors">
                    Setting up your first server
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm">
                  Learn how to create and configure your development team's server
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">
                  <Link href="#" className="hover:text-emerald-500 transition-colors">
                    API Integration Guide
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm">
                  Integrate DevFix with your existing development tools
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">
                  <Link href="#" className="hover:text-emerald-500 transition-colors">
                    Team Collaboration Best Practices
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm">
                  Tips for effective communication and collaboration
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Need help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
              >
                Contact Support
              </Link>
              <Link 
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-background border border-input rounded-md hover:bg-accent transition"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 