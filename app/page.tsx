'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Users, MessageCircle, Video, BookOpen, Shield, Sparkles, Check, Menu, X, ChevronUp } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 relative overflow-hidden">
      {/* Parallax Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Animated gradient orbs with Rafola colors */}
        <div 
          className="absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400/30 to-emerald-400/30 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div 
          className="absolute top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px)`, animationDelay: '1s' }}
        />
        <div 
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * -0.2}px)`, animationDelay: '2s' }}
        />
        
        {/* Floating shapes with premium feel */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-teal-300/20 rounded-2xl rotate-45 backdrop-blur-sm"
          style={{ transform: `translateY(${scrollY * 0.4}px) rotate(45deg)` }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-emerald-300/20 rounded-full backdrop-blur-sm"
          style={{ transform: `translateY(${scrollY * 0.6}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/3 w-40 h-40 border-2 border-green-300/20 rounded-3xl rotate-12 backdrop-blur-sm"
          style={{ transform: `translateY(${scrollY * -0.3}px) rotate(12deg)` }}
        />
        
        {/* Premium grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
      {/* Crisis Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 text-center text-xs sm:text-sm font-medium shadow-lg">
        🆘 Need help now? Call <strong>0800 567 567</strong> (Suicide Crisis Line) or{' '}
        <Link href="/crisis" className="underline font-semibold hover:text-red-100 transition-colors">
          view all SA resources
        </Link>
      </div>

      {/* Premium Fixed Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-xl border-b border-teal-200/50 shadow-xl translate-y-0' 
          : 'bg-white/80 backdrop-blur-lg border-b border-gray-200/30 shadow-sm'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 p-2">
                  <Image
                    src="/rafola-logo.svg"
                    alt="Rafola Logo"
                    width={32}
                    height={32}
                    className="w-full h-full filter brightness-0 invert"
                  />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur"></div>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="#features" className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/resources" className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group">
                Resources
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/crisis" className="text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium relative group">
                Crisis Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/donate"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-rose-600 hover:to-pink-600"
              >
                <Heart className="w-4 h-4" fill="white" />
                <span className="hidden sm:inline">Donate</span>
              </Link>
              <Link
                href="/login"
                className="px-4 py-2.5 text-gray-700 hover:text-teal-600 font-semibold transition-all duration-300 text-sm rounded-xl hover:bg-teal-50"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm hover:from-teal-700 hover:to-emerald-700"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-teal-50 transition-all duration-300 border border-transparent hover:border-teal-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-teal-200/50 pt-4 bg-white/50 backdrop-blur-sm rounded-b-2xl">
              <Link href="#features" className="block py-3 px-2 text-gray-700 hover:text-teal-600 font-medium transition-colors rounded-lg hover:bg-teal-50">
                Features
              </Link>
              <Link href="#pricing" className="block py-3 px-2 text-gray-700 hover:text-teal-600 font-medium transition-colors rounded-lg hover:bg-teal-50">
                Pricing
              </Link>
              <Link href="/resources" className="block py-3 px-2 text-gray-700 hover:text-teal-600 font-medium transition-colors rounded-lg hover:bg-teal-50">
                Resources
              </Link>
              <Link href="/crisis" className="block py-3 px-2 text-gray-700 hover:text-teal-600 font-medium transition-colors rounded-lg hover:bg-teal-50">
                Crisis Support
              </Link>
              <div className="flex flex-col gap-3 pt-3">
                <Link
                  href="/donate"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Heart className="w-4 h-4" fill="white" />
                  Donate
                </Link>
                <Link
                  href="/login"
                  className="text-center px-4 py-3 text-gray-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-center px-4 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Full Viewport */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700 font-semibold mb-8 text-sm shadow-lg backdrop-blur-sm border border-teal-200/50">
              <Sparkles className="w-4 h-4" />
              <span>Your Safe Space for Healing</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                Rafola
              </span>
              <br />
              <span className="text-gray-800 text-2xl sm:text-4xl md:text-5xl lg:text-6xl">Healing Together</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed px-4 font-light">
              Connect with others who understand your journey. Find support, share experiences, 
              and heal together in a safe, compassionate community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center px-4 mb-12">
              <Link
                href="/signup"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="#pricing"
                className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-700 font-semibold text-lg border-2 border-teal-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 hover:bg-white"
              >
                View Pricing
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base text-gray-600">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-teal-200/50">
                <Shield className="w-5 h-5 text-teal-600" />
                <span className="font-medium">100% Confidential</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-emerald-200/50">
                <Users className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">Safe Community</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-green-200/50">
                <Heart className="w-5 h-5 text-green-600" />
                <span className="font-medium">SA-Based Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Everything You Need to Heal</h2>
            <p className="text-xl sm:text-2xl text-gray-600 font-light max-w-3xl mx-auto">Comprehensive support tools designed for your wellbeing journey</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Support Communities"
              description="Join groups focused on grief, recovery, anxiety, and more"
              gradient="from-teal-500 to-emerald-500"
            />
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8" />}
              title="Find Your Buddy"
              description="Connect 1-on-1 with someone who truly understands"
              gradient="from-emerald-500 to-green-500"
            />
            <FeatureCard
              icon={<Video className="w-8 h-8" />}
              title="Video Sessions"
              description="Join safe, moderated video support groups"
              gradient="from-green-500 to-teal-500"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Resources Library"
              description="Access curated mental health guides and articles"
              gradient="from-cyan-500 to-teal-500"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Anonymous Mode"
              description="Share your story with complete privacy controls"
              gradient="from-rose-500 to-pink-500"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Crisis Support"
              description="Immediate access to helplines and safety contacts"
              gradient="from-red-500 to-rose-500"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-50/50 to-emerald-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Choose Your Plan</h2>
            <p className="text-xl sm:text-2xl text-gray-600 font-light">Flexible pricing to support your healing journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <PricingCard
              name="Free"
              price="R0"
              period="forever"
              description="Start your healing journey"
              features={[
                "Join 2 support communities",
                "Connect with 3 buddies",
                "Basic messaging",
                "Access to resources library",
                "Crisis support access",
                "Anonymous mode"
              ]}
              buttonText="Get Started Free"
              buttonLink="/signup"
              popular={false}
            />

            {/* Supporter Plan */}
            <PricingCard
              name="Supporter"
              price="R300"
              period="per month"
              description="Enhanced support features"
              features={[
                "Join unlimited communities",
                "Connect with unlimited buddies",
                "Priority messaging",
                "Video support sessions",
                "Advanced resources",
                "Profile customization",
                "Email support",
                "Ad-free experience"
              ]}
              buttonText="Become a Supporter"
              buttonLink="/signup?plan=supporter"
              popular={true}
            />

            {/* Premium Plan */}
            <PricingCard
              name="Premium"
              price="R450"
              period="per month"
              description="Complete healing toolkit"
              features={[
                "Everything in Supporter",
                "1-on-1 video sessions",
                "Priority buddy matching",
                "Exclusive premium groups",
                "Personal healing journal",
                "Progress tracking",
                "24/7 priority support",
                "Early access to features",
                "Downloadable resources"
              ]}
              buttonText="Go Premium"
              buttonLink="/signup?plan=premium"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl sm:text-2xl text-teal-100 mb-10 font-light">
            Join thousands of others finding support and connection with Rafola
          </p>
          <Link
            href="/signup"
            className="inline-block px-12 py-5 rounded-2xl bg-white text-teal-600 font-semibold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-gray-50"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center p-2">
                  <Image
                    src="/rafola-logo.svg"
                    alt="Rafola Logo"
                    width={24}
                    height={24}
                    className="w-full h-full filter brightness-0 invert"
                  />
                </div>
                <span className="text-2xl font-bold text-white">Rafola</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your safe space for healing and connection. Growing together, healing together.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/resources" className="hover:text-white transition">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/crisis" className="hover:text-white transition">Crisis Support</Link></li>
                <li><Link href="/volunteer" className="hover:text-white transition">Volunteer</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="text-base">© 2024 Rafola. Built with 💚 for mental wellness in South Africa.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}
      </div>
    </main>
  )
}

function FeatureCard({ icon, title, description, gradient }: any) {
  return (
    <div className="group p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-teal-200 hover:shadow-2xl hover:bg-white transition-all duration-500 hover:-translate-y-2">
      <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 group-hover:text-teal-700 transition-colors">{title}</h3>
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light">{description}</p>
    </div>
  )
}

function PricingCard({ name, price, period, description, features, buttonText, buttonLink, popular }: any) {
  return (
    <div className={`relative p-8 sm:p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
      popular 
        ? 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white scale-105 shadow-2xl hover:shadow-3xl' 
        : 'bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 hover:border-teal-200 hover:shadow-2xl hover:bg-white'
    }`}>
      {popular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-sm font-bold text-gray-900 shadow-lg">
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${popular ? 'text-white' : 'text-gray-800'}`}>{name}</h3>
        <div className="mb-3">
          <span className="text-4xl sm:text-5xl font-bold">{price}</span>
          <span className={`text-base ${popular ? 'text-teal-100' : 'text-gray-600'}`}>/{period}</span>
        </div>
        <p className={`text-base ${popular ? 'text-teal-100' : 'text-gray-600'} font-light`}>{description}</p>
      </div>

      <ul className="space-y-4 mb-10">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${popular ? 'text-green-300' : 'text-teal-600'}`} />
            <span className={`text-base ${popular ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={buttonLink}
        className={`block w-full py-4 rounded-2xl font-semibold text-center transition-all duration-300 ${
          popular
            ? 'bg-white text-teal-600 hover:shadow-xl hover:scale-105 hover:bg-gray-50'
            : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:shadow-xl hover:scale-105 hover:from-teal-700 hover:to-emerald-700'
        }`}
      >
        {buttonText}
      </Link>
    </div>
  )
}
