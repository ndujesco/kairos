import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Mail, MessageCircle, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Kairos
              </span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/patient" className="text-muted-foreground hover:text-foreground transition-colors">Patient</Link>
              <Link to="/hospital" className="text-muted-foreground hover:text-foreground transition-colors">Hospital</Link>
              <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">Analytics</Link>
              <Link to="/contact" className="text-foreground font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Reach out through any of the channels below.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* WhatsApp Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">WhatsApp</CardTitle>
                </div>
                <CardDescription>Chat with us directly on WhatsApp for quick responses</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  asChild 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a 
                    href="https://wa.me/2347061217361" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Message on WhatsApp
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  +234 706 121 7361
                </p>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Email</CardTitle>
                </div>
                <CardDescription>Send us an email and we'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  asChild 
                  variant="default"
                  className="w-full"
                >
                  <a 
                    href="mailto:ugopeter26@gmail.com"
                    className="flex items-center justify-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Send Email
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-3 text-center break-all">
                  ugopeter26@gmail.com
                </p>
              </CardContent>
            </Card>
          </div>

          {/* GitHub Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-full bg-foreground/10">
                  <Github className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">GitHub Repository</CardTitle>
              </div>
              <CardDescription>
                Check out the source code, report issues, or contribute to the project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                asChild 
                variant="outline"
                className="w-full"
              >
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              We typically respond within 24 hours during business days
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
