"use client";

import PackageList from "../components/User/Homepage/PackageList";
import DoctorList from "../components/User/Homepage/DoctorList";
import Hospitaltap from "../components/User/Homepage/Hospitaltap";
import Footer from "../components/User/Main/Footer";
import AuthenticatedNavbar from "../components/User/Main/AuthenticatedNavbar";
import { useSearchParams } from 'next/navigation';
import "./globals.css";
import { useEffect, useState } from 'react';
import MedicalList from "@/components/User/Homepage/MedicalList";
import { 
  UserCheck, 
  Globe, 
  Shield, 
  Heart, 
  MapPin, 
  Calendar,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle
} from 'lucide-react';

interface HomePageProps {
  children: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const [emailFromQuery, setEmailFromQuery] = useState<string>('');
  
  useEffect(() => {
    const email = searchParams?.get('email');
    if (email) {
      setEmailFromQuery(email);
    }
  }, [searchParams]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AuthenticatedNavbar initialEmail={emailFromQuery} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Your Trusted
              <span className="block text-blue-600">Medical Journey</span>
              <span className="block text-slate-700">Partner in Thailand</span>
          </h1>
          
            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience world-class healthcare with our free medical coordinators, 
              multi-language guides, and seamless end-to-end support. 
              Your health, our priority.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={() => scrollToSection('packages-section')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Explore Medical Packages
                <ArrowRight className="inline-block w-5 h-5 ml-2" />
              </button>
              <button 
                onClick={() => scrollToSection('features-section')}
                className="border-2 border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                Learn More
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-slate-600 font-medium">Successful Treatments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-slate-600 font-medium">Partner Hospitals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">4</div>
                <div className="text-slate-600 font-medium">Languages Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-slate-600 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features-section" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We provide comprehensive support throughout your entire medical journey, 
                making healthcare accessible and stress-free.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Free Medical Coordinator */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <UserCheck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Free Medical Coordinator</h3>
                <p className="text-slate-600 mb-4">
                  Your personal coordinator handles all hospital communications, 
                  appointment scheduling, and ensures your needs are met.
                </p>
                <div className="flex items-center text-green-600 font-semibold">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Included with every booking
                </div>
              </div>

              {/* Multi-language Guides */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Multi-language Local Guides</h3>
                <p className="text-slate-600 mb-4">
                  Professional guides fluent in English, Arabic, Myanmar, and Chinese 
                  to make your stay comfortable and enjoyable.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['English', 'Arabic', 'Myanmar', 'Chinese'].map((lang) => (
                    <span key={lang} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Hospital Network */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Direct Hospital Network</h3>
                <p className="text-slate-600 mb-4">
                  Direct partnerships with JCI-accredited hospitals ensuring 
                  quality care and transparent pricing.
                </p>
                <div className="flex items-center text-purple-600 font-semibold">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  JCI Accredited Partners
                </div>
              </div>

              {/* Comprehensive Medical Services */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Comprehensive Medical Services</h3>
                <p className="text-slate-600 mb-4">
                  From cardiac surgery to dental care, we cover all major medical 
                  specialties with world-class facilities.
                </p>
                <div className="text-sm text-slate-500">
                  Heart • Cancer • Brain • Dental • Eye & ENT • And more
                </div>
              </div>

              {/* Tourism Integration */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-orange-600" />
            </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Tourism Integration</h3>
                <p className="text-slate-600 mb-4">
                  Explore Thailand's beauty while receiving treatment. 
                  Customized tourism packages for a complete experience.
                </p>
                <div className="flex items-center text-orange-600 font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  Flexible scheduling
          </div>
        </div>
        
              {/* End-to-End Support */}
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">End-to-End Support</h3>
                <p className="text-slate-600 mb-4">
                  From initial consultation to post-treatment follow-up, 
                  we're with you every step of the way.
                </p>
                <div className="flex items-center text-cyan-600 font-semibold">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  24/7 Support Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Simple, transparent process designed to make your medical journey stress-free
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Choose Your Package</h3>
                <p className="text-slate-600">
                  Browse our medical packages or create a custom one based on your needs
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Get Assigned Coordinator</h3>
                <p className="text-slate-600">
                  Your personal coordinator contacts the hospital and schedules your appointment
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Travel & Treatment</h3>
                <p className="text-slate-600">
                  Arrive in Thailand, meet your guide, and receive world-class medical care
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  4
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Recovery & Tourism</h3>
                <p className="text-slate-600">
                  Enjoy Thailand while recovering, with ongoing support from our team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Medical Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a free consultation and let us help you plan your perfect medical tourism experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('packages-section')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all duration-300 shadow-lg"
              >
                Browse Packages
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                <Phone className="inline-block w-5 h-5 mr-2" />
                Call Us Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                <MessageCircle className="inline-block w-5 h-5 mr-2" />
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <MedicalList />
      <PackageList /> 
      <DoctorList />
      <Hospitaltap />
      <Footer />
      {children}
    </div>
  );
};

export default HomePage;
