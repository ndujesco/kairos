import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Users, Clock, TrendingUp, UserCheck, AlertCircle, Search, Phone, Calendar, User, Eye, Ambulance } from "lucide-react";
import { Link } from "react-router-dom";
import PatientDetailsDialog from "@/components/PatientDetailsDialog";

interface Patient {
  id: number;
  queueNumber: string;
  name: string;
  phone: string;
  arrivalTime: string;
  status: "waiting" | "in-progress" | "completed" | "in-transit";
  priority: "normal" | "urgent" | "emergency";
  doctor: string;
  department: string;
  completedAt?: string;
  age?: number;
  gender?: string;
  symptoms?: string;
  vitalSigns?: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenSaturation: string;
  };
  isVoiceEmergency?: boolean;
  voiceRecordingDuration?: string;
  medicalHistory?: string[];
  allergies?: string[];
}

const HospitalDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Extensive mock patient data with additional details
  const [allPatients, setAllPatients]= useState<Patient[]>([
    // Active Queue (waiting & in-progress)
    { id: 1, queueNumber: "A-15", name: "John Okafor", phone: "+234 803 234 5678", arrivalTime: "14:30", status: "in-transit", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", age: 45, gender: "Male", symptoms: "Persistent headache and dizziness for 3 days", vitalSigns: { bloodPressure: "140/90", heartRate: "82 bpm", temperature: "37.2°C", oxygenSaturation: "98%" }, medicalHistory: ["Hypertension", "Diabetes Type 2"], allergies: ["Penicillin"] },
    { id: 2, queueNumber: "A-16", name: "Amara Chibueze", phone: "+234 805 456 7890", arrivalTime: "14:45", status: "in-transit", priority: "urgent", doctor: "Dr. Nwosu", department: "Emergency", age: 28, gender: "Female", symptoms: "Severe abdominal pain, nausea", vitalSigns: { bloodPressure: "130/85", heartRate: "95 bpm", temperature: "38.1°C", oxygenSaturation: "97%" }, medicalHistory: [], allergies: ["Latex"] },
    { id: 3, queueNumber: "A-17", name: "David Mensah", phone: "+234 807 123 4567", arrivalTime: "15:00", status: "waiting", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", age: 62, gender: "Male", symptoms: "Chest tightness, shortness of breath on exertion", vitalSigns: { bloodPressure: "150/95", heartRate: "88 bpm", temperature: "36.9°C", oxygenSaturation: "96%" }, medicalHistory: ["Previous MI (2019)", "High Cholesterol"], allergies: [] },
    { id: 4, queueNumber: "E-01", name: "Sarah Ibrahim", phone: "+234 809 876 5432", arrivalTime: "15:15", status: "in-progress", priority: "emergency", doctor: "Dr. Okonkwo", department: "Emergency", age: 34, gender: "Female", symptoms: "Cardiac emergency - rapid heartbeat, chest pain", vitalSigns: { bloodPressure: "165/100", heartRate: "135 bpm", temperature: "37.8°C", oxygenSaturation: "94%" }, isVoiceEmergency: true, voiceRecordingDuration: "18s", medicalHistory: ["Asthma"], allergies: ["Aspirin", "Sulfa drugs"] },
    { id: 5, queueNumber: "A-18", name: "Emmanuel Adebayo", phone: "+234 811 234 5678", arrivalTime: "15:30", status: "waiting", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", age: 38, gender: "Male", symptoms: "Annual checkup, fatigue", vitalSigns: { bloodPressure: "125/80", heartRate: "72 bpm", temperature: "36.8°C", oxygenSaturation: "99%" }, medicalHistory: [], allergies: [] },
    { id: 6, queueNumber: "A-19", name: "Grace Okoye", phone: "+234 813 345 6789", arrivalTime: "15:45", status: "waiting", priority: "urgent", doctor: "Dr. Balogun", department: "Pediatrics", age: 8, gender: "Female", symptoms: "High fever, difficulty breathing (brought by voice emergency)", vitalSigns: { bloodPressure: "105/65", heartRate: "115 bpm", temperature: "39.4°C", oxygenSaturation: "93%" }, isVoiceEmergency: true, voiceRecordingDuration: "20s", medicalHistory: [], allergies: [] },
    { id: 7, queueNumber: "A-20", name: "Michael Eze", phone: "+234 815 567 8901", arrivalTime: "16:00", status: "in-transit", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", age: 55, gender: "Male", symptoms: "Follow-up consultation for hypertension management", vitalSigns: { bloodPressure: "138/88", heartRate: "78 bpm", temperature: "37.0°C", oxygenSaturation: "98%" }, medicalHistory: ["Hypertension"], allergies: [] },
    { id: 8, queueNumber: "A-21", name: "Blessing Nnamdi", phone: "+234 817 789 0123", arrivalTime: "16:15", status: "waiting", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", age: 42, gender: "Female", symptoms: "Lower back pain for 2 weeks", vitalSigns: { bloodPressure: "120/75", heartRate: "70 bpm", temperature: "36.7°C", oxygenSaturation: "99%" }, medicalHistory: [], allergies: [] },
    
    // Completed patients with full details
    { id: 9, queueNumber: "A-01", name: "Chidi Nwankwo", phone: "+234 801 111 2222", arrivalTime: "08:00", status: "completed", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", completedAt: "09:30", age: 51, gender: "Male", symptoms: "Routine diabetes checkup", vitalSigns: { bloodPressure: "135/85", heartRate: "75 bpm", temperature: "36.9°C", oxygenSaturation: "98%" }, medicalHistory: ["Diabetes Type 2"], allergies: [] },
    { id: 10, queueNumber: "A-02", name: "Fatima Ahmed", phone: "+234 802 222 3333", arrivalTime: "08:15", status: "completed", priority: "urgent", doctor: "Dr. Nwosu", department: "Emergency", completedAt: "09:45", age: 26, gender: "Female", symptoms: "Severe trauma from motorcycle accident (voice emergency)", vitalSigns: { bloodPressure: "110/70", heartRate: "105 bpm", temperature: "37.1°C", oxygenSaturation: "96%" }, isVoiceEmergency: true, voiceRecordingDuration: "15s", medicalHistory: [], allergies: [] },
    { id: 11, queueNumber: "A-03", name: "Peter Okonkwo", phone: "+234 803 333 4444", arrivalTime: "08:30", status: "completed", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", completedAt: "10:00" },
    { id: 12, queueNumber: "A-04", name: "Mary Adekunle", phone: "+234 804 444 5555", arrivalTime: "08:45", status: "completed", priority: "normal", doctor: "Dr. Balogun", department: "Pediatrics", completedAt: "10:15" },
    { id: 13, queueNumber: "A-05", name: "Tunde Bakare", phone: "+234 805 555 6666", arrivalTime: "09:00", status: "completed", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", completedAt: "10:30" },
    { id: 14, queueNumber: "A-06", name: "Zainab Musa", phone: "+234 806 666 7777", arrivalTime: "09:15", status: "completed", priority: "urgent", doctor: "Dr. Okonkwo", department: "Emergency", completedAt: "10:45" },
    { id: 15, queueNumber: "A-07", name: "Kingsley Udoh", phone: "+234 807 777 8888", arrivalTime: "09:30", status: "completed", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", completedAt: "11:00" },
    { id: 16, queueNumber: "A-08", name: "Ngozi Okoro", phone: "+234 808 888 9999", arrivalTime: "10:00", status: "completed", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", completedAt: "11:30" },
    { id: 17, queueNumber: "A-09", name: "Abdul Rahman", phone: "+234 809 999 0000", arrivalTime: "10:15", status: "completed", priority: "normal", doctor: "Dr. Balogun", department: "Pediatrics", completedAt: "11:45" },
    { id: 18, queueNumber: "A-10", name: "Chioma Eze", phone: "+234 810 000 1111", arrivalTime: "10:30", status: "completed", priority: "urgent", doctor: "Dr. Nwosu", department: "Emergency", completedAt: "12:00" },
    { id: 19, queueNumber: "A-11", name: "Ibrahim Lawal", phone: "+234 811 111 2222", arrivalTime: "11:00", status: "completed", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", completedAt: "12:30" },
    { id: 20, queueNumber: "A-12", name: "Victoria Onuoha", phone: "+234 812 222 3333", arrivalTime: "11:30", status: "completed", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", completedAt: "13:00" },
    { id: 21, queueNumber: "A-13", name: "Samuel Adewale", phone: "+234 813 333 4444", arrivalTime: "12:00", status: "completed", priority: "normal", doctor: "Dr. Balogun", department: "Pediatrics", completedAt: "13:30" },
    { id: 22, queueNumber: "A-14", name: "Patience Okpara", phone: "+234 814 444 5555", arrivalTime: "13:00", status: "completed", priority: "urgent", doctor: "Dr. Okonkwo", department: "Emergency", completedAt: "14:15" },
    { id: 23, queueNumber: "E-05", name: "Yusuf Bello", phone: "+234 815 555 6666", arrivalTime: "07:30", status: "completed", priority: "emergency", doctor: "Dr. Nwosu", department: "Emergency", completedAt: "09:00" },
    { id: 24, queueNumber: "A-15-C", name: "Rita Chukwu", phone: "+234 816 666 7777", arrivalTime: "12:30", status: "completed", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", completedAt: "14:00" },
    { id: 25, queueNumber: "A-16-C", name: "Daniel Agbo", phone: "+234 817 777 8888", arrivalTime: "13:15", status: "completed", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", completedAt: "14:30" },
    { id: 26, queueNumber: "A-17-C", name: "Esther Mbah", phone: "+234 818 888 9999", arrivalTime: "11:45", status: "completed", priority: "urgent", doctor: "Dr. Balogun", department: "Pediatrics", completedAt: "13:15" },
    { id: 27, queueNumber: "A-18-C", name: "Hassan Ali", phone: "+234 819 999 0000", arrivalTime: "10:45", status: "completed", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", completedAt: "12:15" },
    { id: 28, queueNumber: "A-19-C", name: "Jennifer Ojo", phone: "+234 820 000 1111", arrivalTime: "09:45", status: "completed", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", completedAt: "11:15" },
    { id: 29, queueNumber: "A-20-C", name: "Mohammed Sani", phone: "+234 821 111 2222", arrivalTime: "08:50", status: "completed", priority: "urgent", doctor: "Dr. Okonkwo", department: "Emergency", completedAt: "10:20" },
    { id: 30, queueNumber: "A-21-C", name: "Chiamaka Nwogu", phone: "+234 822 222 3333", arrivalTime: "10:20", status: "completed", priority: "normal", doctor: "Dr. Balogun", department: "Pediatrics", completedAt: "11:50" },
    { id: 31, queueNumber: "A-22-C", name: "Segun Oladipo", phone: "+234 823 333 4444", arrivalTime: "09:20", status: "completed", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", completedAt: "10:50" },
    { id: 32, queueNumber: "A-23-C", name: "Kemi Adeleke", phone: "+234 824 444 5555", arrivalTime: "11:20", status: "completed", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", completedAt: "12:50" },
    { id: 33, queueNumber: "E-02", name: "Aisha Balarabe", phone: "+234 825 555 6666", arrivalTime: "07:00", status: "completed", priority: "emergency", doctor: "Dr. Nwosu", department: "Emergency", completedAt: "08:30" },
    { id: 34, queueNumber: "A-24-C", name: "Oluwaseun Adeniyi", phone: "+234 826 666 7777", arrivalTime: "12:45", status: "completed", priority: "urgent", doctor: "Dr. Okonkwo", department: "Emergency", completedAt: "14:00" },
    { id: 35, queueNumber: "A-25-C", name: "Nkechi Onyekachi", phone: "+234 827 777 8888", arrivalTime: "08:20", status: "completed", priority: "normal", doctor: "Dr. Balogun", department: "Pediatrics", completedAt: "09:50" },
    { id: 36, queueNumber: "A-26-C", name: "Jubril Yusuf", phone: "+234 828 888 9999", arrivalTime: "13:30", status: "completed", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", completedAt: "14:45" },
    { id: 37, queueNumber: "A-27-C", name: "Blessing Akpan", phone: "+234 829 999 0000", arrivalTime: "07:45", status: "completed", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", completedAt: "09:15" },
    { id: 38, queueNumber: "A-28-C", name: "Ahmed Tijani", phone: "+234 830 000 1111", arrivalTime: "10:50", status: "completed", priority: "urgent", doctor: "Dr. Nwosu", department: "Emergency", completedAt: "12:10" },
    { id: 39, queueNumber: "A-29-C", name: "Funmi Ogunleye", phone: "+234 831 111 2222", arrivalTime: "11:50", status: "completed", priority: "normal", doctor: "Dr. Okeke", department: "Cardiology", completedAt: "13:20" },
    { id: 40, queueNumber: "A-30-C", name: "Emeka Nnaji", phone: "+234 832 222 3333", arrivalTime: "09:50", status: "completed", priority: "normal", doctor: "Dr. Adeyemi", department: "General Medicine", completedAt: "11:20" },
    { id: 41, queueNumber: "E-03", name: "Rashida Musa", phone: "+234 833 333 4444", arrivalTime: "06:30", status: "completed", priority: "emergency", doctor: "Dr. Okonkwo", department: "Emergency", completedAt: "08:00" },
    { id: 42, queueNumber: "A-31-C", name: "Olamide Benson", phone: "+234 834 444 5555", arrivalTime: "13:45", status: "completed", priority: "normal", doctor: "Dr. Balogun", department: "Pediatrics", completedAt: "14:50" },
  ]);

  const activePatients = allPatients.filter(p => p.status === "waiting" || p.status === "in-progress" || p.status === "in-transit");
  const completedPatients = allPatients.filter(p => p.status === "completed");

  const stats = {
    currentQueue: activePatients.length,
    servedToday: completedPatients.length,
    avgWaitTime: "35 min",
    capacity: 65
  };

  // Filter patients based on search
  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsDialogOpen(true);
  };

  const filterPatients = (patients: Patient[]) => {
    if (!searchQuery.trim()) return patients;
    
    const query = searchQuery.toLowerCase();
    return patients.filter(patient => 
      patient.name.toLowerCase().includes(query) ||
      patient.queueNumber.toLowerCase().includes(query) ||
      patient.phone.includes(query) ||
      patient.doctor.toLowerCase().includes(query) ||
      patient.department.toLowerCase().includes(query)
    );
  };

const getStatusColor = (status: Patient["status"]) => {
  switch (status) {
    case "waiting": return "bg-yellow-500";
    case "in-progress": return "bg-blue-500";
    case "completed": return "bg-green-500";
    case "in-transit": return "bg-purple-500";
  }
};


  const getPriorityColor = (priority: Patient["priority"]) => {
    switch (priority) {
      case "emergency": return "destructive";
      case "urgent": return "default";
      case "normal": return "secondary";
    }
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
            <div className="flex items-center gap-2 sm:gap-4">
              <Badge variant="outline" className="text-xs sm:text-sm hidden sm:block">
                General Hospital Lagos
              </Badge>
              <nav className="hidden md:flex space-x-6">
                <Link to="/patient" className="text-muted-foreground hover:text-foreground transition-colors">Patient</Link>
                <Link to="/hospital" className="text-foreground font-medium">Hospital</Link>
                <Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">Analytics</Link>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Hospital Dashboard</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage your patient queue and resources</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="gap-2 w-full sm:w-auto" asChild variant="outline" size="sm">
              <Link to="/ambulance-tracking">
                <Ambulance className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Track Ambulances</span>
              </Link>
            </Button>
            <Button className="gap-2 w-full sm:w-auto" asChild size="sm">
              <Link to="/analytics">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs sm:text-sm">View Analytics</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="p-4 sm:p-6 border-l-4 border-l-primary">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Current Queue</p>
                <p className="text-2xl sm:text-3xl font-bold truncate">{stats.currentQueue}</p>
                <p className="text-xs text-muted-foreground mt-1">patients waiting</p>
              </div>
              <Users className="h-8 w-8 sm:h-10 sm:w-10 text-primary opacity-20 flex-shrink-0" />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Served Today</p>
                <p className="text-2xl sm:text-3xl font-bold truncate">{stats.servedToday}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from yesterday
                </p>
              </div>
              <UserCheck className="h-8 w-8 sm:h-10 sm:w-10 text-green-500 opacity-20 flex-shrink-0" />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Avg. Wait Time</p>
                <p className="text-2xl sm:text-3xl font-bold truncate">{stats.avgWaitTime}</p>
                <p className="text-xs text-muted-foreground mt-1">across all departments</p>
              </div>
              <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500 opacity-20 flex-shrink-0" />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Capacity</p>
                <p className="text-2xl sm:text-3xl font-bold truncate">{stats.capacity}%</p>
                <p className="text-xs text-orange-600 mt-1 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Moderate load
                </p>
              </div>
              <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500 opacity-20 flex-shrink-0" />
            </div>
          </Card>
        </div>

        {/* Patient Queue Management */}
        <Card className="p-4 sm:p-6 overflow-hidden">
          <Tabs defaultValue="active" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="active">Active Queue ({activePatients.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedPatients.length})</TabsTrigger>
                <TabsTrigger value="all">All Patients ({allPatients.length})</TabsTrigger>
              </TabsList>

              <div className="mt-4 md:mt-0 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients, queue number, doctor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full md:w-80"
                />
              </div>
            </div>

            <TabsContent value="active" className="space-y-4">
              {filterPatients(activePatients).map((patient) => (
                <Card key={patient.id} className="p-3 sm:p-4 hover:shadow-md transition-shadow overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary font-bold text-sm sm:text-lg flex-shrink-0">
                        {patient.queueNumber}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-base sm:text-lg truncate">{patient.name}</h3>
                          <Badge variant={getPriorityColor(patient.priority)} className="text-xs">
                            {patient.priority}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(patient.status)}`} />
                            <span className="text-xs text-muted-foreground capitalize">{patient.status}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center gap-2 min-w-0">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{patient.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">Arrived: {patient.arrivalTime}</span>
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <User className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{patient.doctor}</span>
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <Activity className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{patient.department}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      {patient.status === "waiting" && (
                        <Button size="sm" variant="default" onClick={() => {
                          setAllPatients((patients) => [{ id: 1, queueNumber: "A-01", name: "John Doe", phone: "+234 803 234 5678", arrivalTime: "14:30", status: "in-transit", priority: "emergency", doctor: "Assigning...", department: "Cardiac arrest", age: 45, gender: "Male", symptoms: "N/A", vitalSigns: { bloodPressure: "N/A", heartRate: "N/A", temperature: "N/A", oxygenSaturation: "N/A" }, medicalHistory: ["N/A"], allergies: ["N/A"] },...patients])
                        }}>
                          Start Consultation
                        </Button>
                      )}
                      {patient.status === "in-progress" && (
                        <Button size="sm" variant="default">
                          Complete
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(patient)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filterPatients(activePatients).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No active patients found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {filterPatients(completedPatients).map((patient) => (
                <Card key={patient.id} className="p-4 hover:shadow-md transition-shadow bg-muted/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-600 font-bold text-lg">
                        {patient.queueNumber}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{patient.name}</h3>
                          <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                            Completed
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {patient.arrivalTime} - {patient.completedAt}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {patient.doctor}
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            {patient.department}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(patient)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Record
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filterPatients(completedPatients).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No completed patients found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {filterPatients(allPatients).map((patient) => (
                <Card key={patient.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-lg">
                        {patient.queueNumber}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{patient.name}</h3>
                          <Badge variant={getPriorityColor(patient.priority)} className="text-xs">
                            {patient.priority}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(patient.status)}`} />
                            <span className="text-xs text-muted-foreground capitalize">{patient.status}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {patient.arrivalTime} {patient.completedAt && `- ${patient.completedAt}`}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {patient.doctor}
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            {patient.department}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(patient)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              {filterPatients(allPatients).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>No patients found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </main>

      {/* Patient Details Dialog */}
      {selectedPatient && (
        <PatientDetailsDialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
          patient={selectedPatient}
        />
      )}
    </div>
  );
};

export default HospitalDashboard;