import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileCheck,
  Newspaper,
  Search,
  Book,
  Archive,
} from "lucide-react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import StatsSection from "@/components/StatsSection";
import UploadModal from "@/components/UploadModal";
import VerifyModal from "@/components/VerifyModal";
import { HowItWorks } from "@/components/HowItWorks";
import { CardanoWallet } from "@meshsdk/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Index = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [comingSoonModalOpen, setComingSoonModalOpen] = useState(false);

  const features = [
    {
      icon: Upload,
      title: "Upload & Issue",
      description:
        "Securely upload and issue certificates, news articles, and official documents with blockchain verification.",
      action: () => setUploadModalOpen(true),
      buttonText: "Upload Document",
      implemented: true,
    },
    {
      icon: FileCheck,
      title: "Verify Documents",
      description:
        "Instantly verify the authenticity and integrity of any document in our system.",
      action: () => setVerifyModalOpen(true),
      buttonText: "Verify Now",
      implemented: true,
    },
    {
      icon: Newspaper,
      title: "News Management",
      description:
        "Publish and manage verified news articles with timestamp and authenticity guarantees.",

      buttonText: "Manage News",
      action: () => setComingSoonModalOpen(true),
      implemented: false,
    },
    {
      icon: Book,
      title: "Certificate Registry",
      description:
        "Browse and search through all issued certificates with advanced filtering options.",
      action: () => setComingSoonModalOpen(true),
      implemented: false,
      buttonText: "View Registry",
    },
    {
      icon: Archive,
      title: "Document Archive",
      description:
        "Access historical documents and certificates with full audit trail and version history.",
      action: () => setComingSoonModalOpen(true),
      implemented: false,
      buttonText: "Browse Archive",
    },
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Powerful search capabilities to find documents by type, date, issuer, or content.",
      action: () => setComingSoonModalOpen(true),
      implemented: false,
      buttonText: "Search Documents",
    },
  ];

  // Add this scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCheck className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                VerifyChain
              </span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Pro
              </Badge>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => scrollToSection("dashboard")}
              >
                Dashboard
              </Button>

              <Button
                variant="ghost"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => scrollToSection("howitworks")}
              >
                How it works
              </Button>

              <Button
                variant="ghost"
                className="text-gray-600 hover:text-blue-600"
                onClick={() => scrollToSection("features")}
              >
                Features
              </Button>
              <CardanoWallet />
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section id="dashboard">
        <Hero />
      </section>

      {/* HowItWorks - Add ID (assuming it's a component) */}
      <section id="howitworks">
        <HowItWorks />
      </section>
      {/* Stats Section */}
      <StatsSection />

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Document Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From issuance to verification, manage all your documents with
              enterprise-grade security and blockchain-powered authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <p className="text-xl text-gray-600">
              Latest documents and verifications in the system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: "Certificate",
                title: "Software Engineering Diploma",
                issuer: "Tech University",
                time: "2 hours ago",
              },
              {
                type: "News",
                title: "New Verification Standards Released",
                issuer: "DocVerify Team",
                time: "5 hours ago",
              },
              {
                type: "Document",
                title: "Annual Security Report 2024",
                issuer: "Security Dept",
                time: "1 day ago",
              },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-blue-600 border-blue-200"
                    >
                      {item.type}
                    </Badge>
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>Issued by {item.issuer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={comingSoonModalOpen} onOpenChange={setComingSoonModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Feature Coming Soon!</DialogTitle>
            <DialogDescription>
              We're working hard to bring you this feature in a future update.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <FileCheck className="h-12 w-12 text-blue-500" />
          </div>
          <DialogFooter>
            <Button onClick={() => setComingSoonModalOpen(false)}>
              Got it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileCheck className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">VerifyChain</span>
              </div>
              <p className="text-gray-400">
                Secure document verification and management powered by
                blockchain technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Upload Documents</li>
                <li>Verify Certificates</li>
                <li>News Management</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Support Center</li>
                <li>Status Page</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VerifyChain. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
      <VerifyModal open={verifyModalOpen} onOpenChange={setVerifyModalOpen} />
    </div>
  );
};

export default Index;
