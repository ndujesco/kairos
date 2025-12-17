import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Clock, Shield, TrendingDown, Users, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Clock,
      title: "Reduce Wait Times by 85%",
      description: "AI-driven load balancing cuts average wait time from 4 hours to under 45 minutes",
      metric: "4hrs → 45min"
    },
    {
      icon: Users,
      title: "Eliminate Redundant Paperwork",
      description: "One unified digital record reduces registration time by 90%",
      metric: "20min → 2min"
    },
    {
      icon: TrendingDown,
      title: "Early Outbreak Detection",
      description: "Real-time symptom tracking detects outbreaks in 48 hours instead of 3 weeks",
      metric: "3wks → 48hrs"
    }
  ];

  const stats = [
    { value: "25%", label: "Reduction in Patient Walk-outs", color: "text-success" },
    { value: "90%", label: "Forecast Accuracy", color: "text-primary" },
    { value: "247", label: "Facilities Connected", color: "text-secondary" },
    { value: "12,847", label: "Patients Served Monthly", color: "text-accent" }
  ];

  const solutions = [
    {
      title: "For Patients",
      description: "Find nearby hospitals, book appointments instantly, and track your wait time in real-time",
      icon: Users,
      link: "/patient",
      color: "border-l-primary"
    },
    {
      title: "For Hospitals",
      description: "Manage patient queues efficiently, optimize resource allocation, and reduce operational overhead",
      icon: Activity,
      link: "/hospital",
      color: "border-l-secondary"
    },
    {
      title: "For Public Health",
      description: "Track disease outbreaks in real-time, predict patient traffic, and make data-driven policy decisions",
      icon: BarChart3,
      link: "/analytics",
      color: "border-l-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Kairos
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors">Solutions</a>
              <a href="#impact" className="text-muted-foreground hover:text-foreground transition-colors">Impact</a>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
            <div className="flex gap-2 sm:gap-3">
              <Link to="/patient">
                <Button variant="outline" size="sm" className="sm:h-10 text-xs sm:text-sm">
                  <span className="hidden sm:inline">Patient Portal</span>
                  <span className="sm:hidden">Patient</span>
                </Button>
              </Link>
              <Link to="/hospital">
                <Button size="sm" className="sm:h-10 text-xs sm:text-sm">
                  <span className="hidden sm:inline">Hospital Login</span>
                  <span className="sm:hidden">Hospital</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Transforming African Healthcare</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Healthcare Without
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> The Wait</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI-powered healthcare management platform solving critical patient wait times, data fragmentation, 
              and enabling real-time outbreak detection across Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/patient">
                <Button size="lg" className="text-lg px-8 h-14">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/analytics">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                  View Analytics
                  <BarChart3 className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="impact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Quantifiable Impact</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Not just features — measurable improvements to African healthcare
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all hover:scale-[1.02]">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold">
                  <CheckCircle2 className="h-4 w-4" />
                  {feature.metric}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Three Powerful Interfaces</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed for patients, hospitals, and public health officials
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className={`p-8 hover:shadow-lg transition-all border-l-4 ${solution.color}`}>
                <solution.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                <p className="text-muted-foreground mb-6">{solution.description}</p>
                <Link to={solution.link}>
                  <Button variant="outline" className="w-full group">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary opacity-95" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the Healthcare Revolution
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of the movement transforming healthcare delivery across Africa. 
              Start with our 6-month pilot program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/patient" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14">
                  Register as Patient
                </Button>
              </Link>
              <Link to="/hospital-onboarding" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary">
                  Register Hospital
                </Button>
              </Link>
              <Link to="/hospital" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary">
                  Hospital Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Kairos</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 Kairos Health Systems. Transforming African healthcare.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
