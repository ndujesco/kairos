import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ambulance, MapPin, Clock, Navigation, Phone, User, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface AmbulanceData {
  id: string;
  vehicleNumber: string;
  driver: string;
  paramedic: string;
  patientName: string;
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  destination: {
    lat: number;
    lng: number;
    hospital: string;
  };
  currentLocation: {
    lat: number;
    lng: number;
  };
  status: "dispatched" | "en-route" | "arrived";
  eta: string;
  distance: string;
  speed: string;
}

const AmbulanceTracking = () => {
  const [ambulances, setAmbulances] = useState<AmbulanceData[]>([
    {
      id: "AMB-001",
      vehicleNumber: "LAG-123-AB",
      driver: "Chidi Okafor",
      paramedic: "Dr. Amara Nwosu",
      patientName: "Sarah Ibrahim",
      pickupLocation: {
        lat: 6.5244,
        lng: 3.3792,
        address: "15 Marina Street, Lagos Island"
      },
      destination: {
        lat: 6.4698,
        lng: 3.5852,
        hospital: "Lagos University Teaching Hospital"
      },
      currentLocation: {
        lat: 6.5100,
        lng: 3.4200
      },
      status: "en-route",
      eta: "8 min",
      distance: "3.2 km",
      speed: "45 km/h"
    },
    {
      id: "AMB-002",
      vehicleNumber: "LAG-456-CD",
      driver: "Emmanuel Eze",
      paramedic: "Dr. Grace Okeke",
      patientName: "John Mensah",
      pickupLocation: {
        lat: 6.4500,
        lng: 3.3900,
        address: "42 Ikeja Road, Surulere"
      },
      destination: {
        lat: 6.4698,
        lng: 3.5852,
        hospital: "General Hospital Ikeja"
      },
      currentLocation: {
        lat: 6.4600,
        lng: 3.4500
      },
      status: "en-route",
      eta: "12 min",
      distance: "5.8 km",
      speed: "52 km/h"
    },
    {
      id: "AMB-003",
      vehicleNumber: "LAG-789-EF",
      driver: "Blessing Adeyemi",
      paramedic: "Dr. Tunde Balogun",
      patientName: "Amara Chibueze",
      pickupLocation: {
        lat: 6.5000,
        lng: 3.3500,
        address: "8 Victoria Island Avenue"
      },
      destination: {
        lat: 6.4698,
        lng: 3.5852,
        hospital: "Lagos State University Teaching Hospital"
      },
      currentLocation: {
        lat: 6.4950,
        lng: 3.4000
      },
      status: "dispatched",
      eta: "15 min",
      distance: "7.1 km",
      speed: "38 km/h"
    }
  ]);

  const [selectedAmbulance, setSelectedAmbulance] = useState<AmbulanceData | null>(null);

  // Mock real-time location update
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulances(prev => prev.map(amb => {
        // Simulate movement towards destination
        const newLat = amb.currentLocation.lat + (Math.random() - 0.5) * 0.001;
        const newLng = amb.currentLocation.lng + (Math.random() - 0.5) * 0.001;
        
        return {
          ...amb,
          currentLocation: { lat: newLat, lng: newLng },
          // Mock decreasing ETA
          eta: `${Math.max(1, parseInt(amb.eta) - 1)} min`
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "dispatched": return "bg-yellow-500";
      case "en-route": return "bg-blue-500";
      case "arrived": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const MockMap = ({ ambulance }: { ambulance: AmbulanceData | null }) => {
    if (!ambulance) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
          <p className="text-muted-foreground">Select an ambulance to view tracking</p>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border-2 border-primary/20">
        {/* Mock Map Grid */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-b border-gray-400" style={{ height: '5%' }} />
          ))}
        </div>
        
        {/* Pickup Location */}
        <div 
          className="absolute w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse"
          style={{ 
            top: `${((ambulance.pickupLocation.lat - 6.4) / 0.15) * 100}%`,
            left: `${((ambulance.pickupLocation.lng - 3.3) / 0.3) * 100}%` 
          }}
        >
          <MapPin className="h-4 w-4 text-white" />
        </div>

        {/* Current Ambulance Location */}
        <div 
          className="absolute w-12 h-12 bg-destructive rounded-full flex items-center justify-center shadow-xl border-4 border-white z-10 animate-bounce"
          style={{ 
            top: `${((ambulance.currentLocation.lat - 6.4) / 0.15) * 100}%`,
            left: `${((ambulance.currentLocation.lng - 3.3) / 0.3) * 100}%` 
          }}
        >
          <Ambulance className="h-6 w-6 text-white" />
        </div>

        {/* Destination */}
        <div 
          className="absolute w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
          style={{ 
            top: `${((ambulance.destination.lat - 6.4) / 0.15) * 100}%`,
            left: `${((ambulance.destination.lng - 3.3) / 0.3) * 100}%` 
          }}
        >
          <div className="text-white text-xs font-bold">H</div>
        </div>

        {/* Mock Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1={`${((ambulance.currentLocation.lng - 3.3) / 0.3) * 100}%`}
            y1={`${((ambulance.currentLocation.lat - 6.4) / 0.15) * 100}%`}
            x2={`${((ambulance.destination.lng - 3.3) / 0.3) * 100}%`}
            y2={`${((ambulance.destination.lat - 6.4) / 0.15) * 100}%`}
            stroke="#3b82f6"
            strokeWidth="3"
            strokeDasharray="10,5"
            className="animate-pulse"
          />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Pickup Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded-full" />
            <span>Ambulance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full" />
            <span>Hospital</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2 sm:gap-3">
              <Ambulance className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-destructive flex-shrink-0" />
              <span>Real-Time Ambulance Tracking</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Monitor active ambulances and their live locations
            </p>
          </div>
          <Link to="/hospital">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Back to Dashboard</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Map View */}
          <Card className="lg:col-span-2 p-4 sm:p-6 h-[400px] sm:h-[500px] md:h-[600px]">
            <div className="h-full">
              <MockMap ambulance={selectedAmbulance} />
            </div>
          </Card>

          {/* Ambulance List & Details */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                Active Ambulances ({ambulances.length})
              </h3>
              <div className="space-y-3">
                {ambulances.map((ambulance) => (
                  <Card
                    key={ambulance.id}
                    className={`p-3 cursor-pointer transition-all hover:shadow-lg ${
                      selectedAmbulance?.id === ambulance.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedAmbulance(ambulance)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{ambulance.id}</span>
                        <Badge className={getStatusColor(ambulance.status)}>
                          {ambulance.status}
                        </Badge>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{ambulance.patientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium text-destructive">ETA: {ambulance.eta}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Selected Ambulance Details */}
            {selectedAmbulance && (
              <Card className="p-4">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Ambulance Details
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Vehicle Number</p>
                    <p className="font-medium">{selectedAmbulance.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Driver</p>
                    <p className="font-medium">{selectedAmbulance.driver}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Paramedic</p>
                    <p className="font-medium">{selectedAmbulance.paramedic}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Patient</p>
                    <p className="font-medium">{selectedAmbulance.patientName}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground">Pickup Location</p>
                    <p className="text-xs">{selectedAmbulance.pickupLocation.address}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Destination</p>
                    <p className="text-xs font-medium">{selectedAmbulance.destination.hospital}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="font-medium">{selectedAmbulance.distance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Speed</p>
                      <p className="font-medium">{selectedAmbulance.speed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ETA</p>
                      <p className="font-medium text-destructive">{selectedAmbulance.eta}</p>
                    </div>
                  </div>
                  <Button className="w-full gap-2" variant="outline">
                    <Phone className="h-4 w-4" />
                    Contact Driver
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceTracking;
