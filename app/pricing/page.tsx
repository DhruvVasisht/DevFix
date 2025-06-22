import Link from "next/link"
import { ArrowLeft, Check, X } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual developers and small teams",
      features: [
        "Up to 5 team members",
        "10 channels per server",
        "Basic messaging",
        "File sharing (100MB limit)",
        "Community support",
      ],
      limitations: [
        "No voice/video calls",
        "No screen sharing",
        "Limited integrations",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$10",
      period: "per user/month",
      description: "Everything you need for professional development teams",
      features: [
        "Unlimited team members",
        "Unlimited channels",
        "Voice & video calls",
        "Screen sharing",
        "File sharing (1GB limit)",
        "Priority support",
        "Advanced integrations",
        "AI-powered assistance",
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "Advanced features for large organizations",
      features: [
        "Everything in Pro",
        "Single Sign-On (SSO)",
        "Advanced admin controls",
        "Custom integrations",
        "Dedicated support manager",
        "SLA guarantee",
        "On-premise deployment",
        "Advanced analytics",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
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
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the plan that works best for your team. Start free and upgrade as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-background border rounded-xl p-8 ${
                  plan.popular
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/10"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period !== "contact us" && (
                      <span className="text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center gap-3">
                      <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium transition ${
                    plan.popular
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-background border border-input hover:bg-accent"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-muted/20 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer a 14-day free trial for the Pro plan. No credit card required.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Do you offer educational discounts?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer 50% off Pro plans for students and educators. Contact us for details.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Need help choosing?</h2>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you find the perfect plan for your needs.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 