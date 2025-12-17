import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, MapPin, Users, Calendar, Activity, FileText, Search, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import VoiceInput from "@/components/VoiceInput";
import BookingDialog from "@/components/BookingDialog";
import EmergencyDialog from "@/components/EmergencyDialog";
import { hospitals, Hospital } from "@/data/hospitals";

const PatientPortal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  // Simulate dynamic capacity updates
  useEffect(() => {
    const updateCapacities = () => {
      return hospitals.map(hospital => ({
        ...hospital,
        available: Math.max(
          5, 
          Math.min(
            hospital.capacity - 5,
            hospital.available + Math.floor(Math.random() * 7) - 3
          )
        )
      }));
    };

    // Initial load
    setFilteredHospitals(updateCapacities().slice(0, 7));

    // Update capacities every 3 seconds when searching
    const interval = setInterval(() => {
      if (searchQuery) {
        setFilteredHospitals(prev => prev.map(hospital => ({
          ...hospital,
          available: Math.max(
            5, 
            Math.min(
              hospital.capacity - 5,
              hospital.available + Math.floor(Math.random() * 7) - 3
            )
          )
        })));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [searchQuery]);

  // Search functionality with keyword matching
  useEffect(() => {
    if (!searchQuery.trim()) {
      const sorted = [...hospitals].sort((a, b) => 
        parseInt(a.waitTime) - parseInt(b.waitTime)
      );
      setFilteredHospitals(sorted.slice(0, 7).map(h => ({
        ...h,
        available: Math.max(
          5, 
          Math.min(
            h.capacity - 5,
            h.available + Math.floor(Math.random() * 7) - 3
          )
        )
      })));
      return;
    }

    const query = searchQuery.toLowerCase();
    const scored = hospitals.map(hospital => {
      const keywords = hospital.keywords.toLowerCase();
      const name = hospital.name.toLowerCase();
      const specialty = hospital.specialty.toLowerCase();
      const location = hospital.location.toLowerCase();
      
      let score = 0;
      
      // Split both query and keywords into words for flexible matching
      const queryWords = query.split(' ').filter(w => w.length > 0);
      const keywordWords = keywords.split(' ').filter(w => w.length > 0);
      
      // Check if any query word contains or is contained in any keyword
      queryWords.forEach(queryWord => {
        keywordWords.forEach(keywordWord => {
          if (queryWord.includes(keywordWord) || keywordWord.includes(queryWord)) {
            score += 10;
          }
        });
        
        // Also check name, specialty, location
        if (name.includes(queryWord)) score += 8;
        if (specialty.includes(queryWord)) score += 6;
        if (location.includes(queryWord)) score += 4;
      });
      
      return { hospital, score };
    });

    let results = scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7)
      .map(item => ({
        ...item.hospital,
        available: Math.max(
          5, 
          Math.min(
            item.hospital.capacity - 5,
            item.hospital.available + Math.floor(Math.random() * 7) - 3
          )
        )
      }));

    // If no matches, return general care hospitals
    if (results.length === 0) {
      results = hospitals
        .filter(h => h.specialty.toLowerCase().includes('general'))
        .slice(0, 7)
        .map(h => ({
          ...h,
          available: Math.max(
            5, 
            Math.min(
              h.capacity - 5,
              h.available + Math.floor(Math.random() * 7) - 3
            )
          )
        }));
    }

    setFilteredHospitals(results);
  }, [searchQuery]);

  const upcomingAppointments = [
    {
      id: 1,
      hospital: "Sunrise Medical Center",
      date: "Today",
      time: "2:30 PM",
      doctor: "Dr. Adebayo Johnson",
      queueNumber: "A-15"
    }
  ];

  const handleBookAppointment = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setBookingOpen(true);
  };

  const getWaitTimeColor = (waitTime: string) => {
    const minutes = parseInt(waitTime);
    if (minutes <= 15) return "secondary";
    if (minutes <= 45) return "default";
    return "destructive";
  };

  const getCapacityPercentage = (available: number, capacity: number) => {
    return Math.round((available / capacity) * 100);
  };

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
              <Link to="/patient" className="text-foreground font-medium">Dashboard</Link>
              <Link to="/hospital" className="text-muted-foreground hover:text-foreground transition-colors">Hospital</Link>
              <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">Analytics</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">My Records</span>
              <span className="sm:hidden">Records</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Find the best healthcare near you with minimal wait times</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Upcoming Appointments</p>
                <p className="text-3xl font-bold">1</p>
              </div>
              <Calendar className="h-10 w-10 text-primary opacity-20" />
            </div>
          </Card>
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Medical Records</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <FileText className="h-10 w-10 text-secondary opacity-20" />
            </div>
          </Card>
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nearby Facilities</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <MapPin className="h-10 w-10 text-accent opacity-20" />
            </div>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-6 border-l-4 border-l-primary">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{appointment.hospital}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {appointment.date} at {appointment.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {appointment.doctor}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Queue Number</p>
                      <Badge variant="outline" className="text-lg font-bold px-4 py-2">
                        {appointment.queueNumber}
                      </Badge>
                    </div>
                    <Button>View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Search Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Find Healthcare Near You</h2>
            <Button 
              variant="destructive" 
              size="default"
              onClick={() => setEmergencyOpen(true)}
              className="gap-2 w-full sm:w-auto"
            >
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Emergency
            </Button>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>
            <VoiceInput onTranscription={(text) => setSearchQuery(text)} />
          </div>
        </div>

        {/* Nearby Hospitals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {searchQuery ? `Search Results (${filteredHospitals.length})` : 'Nearby Hospitals'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'Ranked by relevance' : 'Sorted by wait time'}
            </p>
          </div>
          {filteredHospitals.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No hospitals found matching your search.</p>
              <p className="text-sm text-muted-foreground mt-2">Try different keywords or clear your search.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{hospital.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hospital.location} • {hospital.distance}
                      </div>
                      <Badge variant="secondary">{hospital.specialty}</Badge>
                    </div>
                    <Badge variant={getWaitTimeColor(hospital.waitTime)} className="ml-2">
                      <Clock className="h-3 w-3 mr-1" />
                      {hospital.waitTime}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Available Capacity</span>
                      <span className="font-semibold">
                        {hospital.available}/{hospital.capacity} ({getCapacityPercentage(hospital.available, hospital.capacity)}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                        style={{ width: `${getCapacityPercentage(hospital.available, hospital.capacity)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button className="flex-1" onClick={() => handleBookAppointment(hospital)}>
                      Book Appointment
                    </Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <BookingDialog 
        hospital={selectedHospital}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
      
      <EmergencyDialog 
        open={emergencyOpen}
        onOpenChange={setEmergencyOpen}
      />
    </div>
  );
};

export default PatientPortal;
