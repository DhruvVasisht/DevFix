import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "Introducing DevFix: The Future of Developer Collaboration",
      excerpt: "We're excited to announce the launch of DevFix, a revolutionary platform designed specifically for developer teams to collaborate more effectively.",
      author: "Dhruv Vasisht",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Announcement",
    },
    {
      title: "5 Ways to Improve Your Team's Code Review Process",
      excerpt: "Learn how structured communication and proper tools can transform your code review process and boost team productivity.",
      author: "Tanay Das",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Best Practices",
    },
    {
      title: "The Psychology of Remote Developer Collaboration",
      excerpt: "Understanding the unique challenges remote developers face and how to build stronger connections in distributed teams.",
      author: "Sarah Chen",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Remote Work",
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

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">DevFix Blog</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Insights, tips, and stories from the world of developer collaboration and software engineering.
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="mb-4">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-2xl font-semibold mb-4 group-hover:text-emerald-500 transition-colors">
                  <Link href="#">{post.title}</Link>
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold mb-4">Want to contribute?</h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re always looking for guest writers and community contributors to share their expertise.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
            >
              Become a Contributor
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 