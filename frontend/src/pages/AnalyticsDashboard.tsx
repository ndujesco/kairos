import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, TrendingUp, AlertTriangle, Users, MapPin, Calendar, Heart, Stethoscope, Baby } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

const AnalyticsDashboard = () => {
  // Disease Trend Data - Monthly trends for common diseases
  const diseaseTrendData = [
    { month: "Jan", malaria: 245, typhoid: 120, cholera: 15, covid: 89, dengue: 34, tuberculosis: 67 },
    { month: "Feb", malaria: 298, typhoid: 145, cholera: 23, covid: 76, dengue: 45, tuberculosis: 72 },
    { month: "Mar", malaria: 356, typhoid: 167, cholera: 45, covid: 92, dengue: 67, tuberculosis: 78 },
    { month: "Apr", malaria: 412, typhoid: 189, cholera: 78, covid: 65, dengue: 89, tuberculosis: 85 },
    { month: "May", malaria: 389, typhoid: 201, cholera: 156, covid: 54, dengue: 112, tuberculosis: 91 },
    { month: "Jun", malaria: 445, typhoid: 178, cholera: 234, covid: 48, dengue: 145, tuberculosis: 88 },
    { month: "Jul", malaria: 512, typhoid: 165, cholera: 198, covid: 41, dengue: 167, tuberculosis: 82 },
    { month: "Aug", malaria: 478, typhoid: 156, cholera: 176, covid: 38, dengue: 189, tuberculosis: 79 },
    { month: "Sep", malaria: 523, typhoid: 142, cholera: 143, covid: 35, dengue: 201, tuberculosis: 76 },
    { month: "Oct", malaria: 567, typhoid: 138, cholera: 121, covid: 32, dengue: 178, tuberculosis: 73 },
    { month: "Nov", malaria: 489, typhoid: 152, cholera: 98, covid: 29, dengue: 156, tuberculosis: 70 }
  ];

  // Hospital Capacity Data
  const capacityData = [
    { hospital: "General Hospital Lagos", utilized: 85, available: 15, total: 200 },
    { hospital: "Sunrise Medical Center", utilized: 42, available: 58, total: 150 },
    { hospital: "Unity Health Center", utilized: 28, available: 72, total: 100 },
    { hospital: "Central Clinic", utilized: 91, available: 9, total: 180 },
    { hospital: "Metro Hospital", utilized: 67, available: 33, total: 220 },
    { hospital: "Lakeview Medical", utilized: 54, available: 46, total: 130 },
    { hospital: "Greenfield Hospital", utilized: 73, available: 27, total: 170 },
    { hospital: "City General", utilized: 88, available: 12, total: 160 }
  ];

  // Symptom Distribution
  const symptomData = [
    { name: "Fever", value: 1245, color: "hsl(0, 75%, 55%)" },
    { name: "Cough", value: 892, color: "hsl(210, 80%, 48%)" },
    { name: "Headache", value: 756, color: "hsl(152, 60%, 45%)" },
    { name: "Body Pain", value: 634, color: "hsl(38, 92%, 50%)" },
    { name: "Diarrhea", value: 423, color: "hsl(270, 60%, 50%)" },
    { name: "Nausea", value: 312, color: "hsl(320, 65%, 50%)" },
    { name: "Fatigue", value: 589, color: "hsl(45, 70%, 50%)" }
  ];

  // Age Group Distribution
  const ageGroupData = [
    { age: "0-5", male: 234, female: 198, total: 432 },
    { age: "6-12", male: 312, female: 287, total: 599 },
    { age: "13-17", male: 189, female: 176, total: 365 },
    { age: "18-35", male: 456, female: 512, total: 968 },
    { age: "36-50", male: 398, female: 423, total: 821 },
    { age: "51-65", male: 267, female: 289, total: 556 },
    { age: "65+", male: 178, female: 203, total: 381 }
  ];

  // Mortality Rate by Disease
  const mortalityData = [
    { disease: "Malaria", cases: 5234, deaths: 87, rate: 1.66 },
    { disease: "Typhoid", cases: 1856, deaths: 23, rate: 1.24 },
    { disease: "Cholera", cases: 1089, deaths: 45, rate: 4.13 },
    { disease: "COVID-19", cases: 623, deaths: 19, rate: 3.05 },
    { disease: "Tuberculosis", cases: 891, deaths: 34, rate: 3.82 },
    { disease: "Dengue", cases: 1234, deaths: 28, rate: 2.27 }
  ];

  // Vaccination Coverage
  const vaccinationData = [
    { vaccine: "Measles", coverage: 87, target: 95 },
    { vaccine: "Polio", coverage: 92, target: 95 },
    { vaccine: "BCG", coverage: 89, target: 95 },
    { vaccine: "DPT", coverage: 85, target: 95 },
    { vaccine: "Hepatitis B", coverage: 78, target: 90 },
    { vaccine: "Yellow Fever", coverage: 71, target: 90 }
  ];

  // Resource Utilization
  const resourceData = [
    { resource: "ICU Beds", utilized: 45, capacity: 60, percentage: 75 },
    { resource: "Ventilators", utilized: 28, capacity: 40, percentage: 70 },
    { resource: "Oxygen Supply", utilized: 156, capacity: 200, percentage: 78 },
    { resource: "Blood Bank", utilized: 234, capacity: 400, percentage: 58.5 },
    { resource: "Ambulances", utilized: 18, capacity: 25, percentage: 72 },
    { resource: "Surgical Rooms", utilized: 12, capacity: 18, percentage: 66.7 }
  ];

  // Department Performance
  const departmentPerformance = [
    { department: "Emergency", avgWaitTime: 15, satisfaction: 82, patients: 234 },
    { department: "General Medicine", avgWaitTime: 45, satisfaction: 76, patients: 567 },
    { department: "Pediatrics", avgWaitTime: 38, satisfaction: 88, patients: 312 },
    { department: "Cardiology", avgWaitTime: 52, satisfaction: 84, patients: 189 },
    { department: "Orthopedics", avgWaitTime: 41, satisfaction: 79, patients: 145 },
    { department: "Obstetrics", avgWaitTime: 28, satisfaction: 91, patients: 98 }
  ];

  // Outbreak Alerts
  const outbreakAlerts = [
    {
      id: 1,
      disease: "Cholera",
      location: "Yaba District",
      cases: 234,
      trend: "+89%",
      severity: "high",
      detected: "2 days ago",
      deaths: 12
    },
    {
      id: 2,
      disease: "Malaria",
      location: "Marina Area",
      cases: 567,
      trend: "+24%",
      severity: "high",
      detected: "1 week ago",
      deaths: 8
    },
    {
      id: 3,
      disease: "Dengue Fever",
      location: "Surulere",
      cases: 201,
      trend: "+45%",
      severity: "medium",
      detected: "5 days ago",
      deaths: 5
    },
    {
      id: 4,
      disease: "Typhoid",
      location: "Ikeja",
      cases: 178,
      trend: "+12%",
      severity: "medium",
      detected: "2 weeks ago",
      deaths: 3
    },
    {
      id: 5,
      disease: "Measles",
      location: "Ikorodu",
      cases: 89,
      trend: "+67%",
      severity: "medium",
      detected: "1 week ago",
      deaths: 2
    }
  ];

  // Predictive Forecast
  const forecastData = [
    { day: "Mon", predicted: 340, actual: 335, capacity: 400 },
    { day: "Tue", predicted: 385, actual: 392, capacity: 400 },
    { day: "Wed", predicted: 420, actual: 410, capacity: 400 },
    { day: "Thu", predicted: 395, actual: 405, capacity: 400 },
    { day: "Fri", predicted: 410, actual: null, capacity: 400 },
    { day: "Sat", predicted: 450, actual: null, capacity: 400 },
    { day: "Sun", predicted: 380, actual: null, capacity: 400 }
  ];

  // Healthcare Access Metrics
  const accessMetrics = [
    { metric: "Urban Coverage", value: 78, change: "+5%" },
    { metric: "Rural Coverage", value: 45, change: "+12%" },
    { metric: "Insurance Coverage", value: 34, change: "+8%" },
    { metric: "Doctor-Patient Ratio", value: 62, change: "-3%" },
    { metric: "Medicine Availability", value: 71, change: "+7%" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
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
              <Badge variant="outline" className="text-xs sm:text-sm hidden lg:block">
                National Health Dashboard
              </Badge>
              <nav className="hidden md:flex space-x-6">
                <Link to="/patient" className="text-muted-foreground hover:text-foreground transition-colors">Patient</Link>
                <Link to="/hospital" className="text-muted-foreground hover:text-foreground transition-colors">Hospital</Link>
                <Link to="/analytics" className="text-foreground font-medium">Analytics</Link>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Public Health Analytics</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Real-time disease surveillance and healthcare system monitoring</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-l-destructive">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <Badge variant="destructive">+23%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Active Outbreaks</p>
            <p className="text-3xl font-bold">5</p>
            <p className="text-xs text-muted-foreground mt-1">Requiring immediate attention</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-primary">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-primary" />
              <Badge variant="outline">+12%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Total Cases</p>
            <p className="text-3xl font-bold">11,927</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between mb-2">
              <Heart className="h-8 w-8 text-orange-500" />
              <Badge variant="outline" className="border-orange-500">2.4%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Mortality Rate</p>
            <p className="text-3xl font-bold">237</p>
            <p className="text-xs text-muted-foreground mt-1">Deaths this month</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between mb-2">
              <Stethoscope className="h-8 w-8 text-blue-500" />
              <Badge variant="outline" className="border-blue-500">73%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Bed Occupancy</p>
            <p className="text-3xl font-bold">1,534</p>
            <p className="text-xs text-muted-foreground mt-1">Of 2,100 total beds</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between mb-2">
              <Baby className="h-8 w-8 text-green-500" />
              <Badge variant="outline" className="border-green-500">84%</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Vaccination Rate</p>
            <p className="text-3xl font-bold">84%</p>
            <p className="text-xs text-muted-foreground mt-1">Target: 95%</p>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trends">Disease Trends</TabsTrigger>
            <TabsTrigger value="capacity">Hospital Capacity</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            {/* Disease Trends Chart */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Disease Trends Over Time</h2>
              <div className="w-full overflow-x-auto">
                <div className="min-w-[500px]">
                  <ResponsiveContainer width="100%" height={300} className="sm:!h-[400px]">
                    <LineChart data={diseaseTrendData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs sm:text-sm" />
                      <YAxis className="text-xs sm:text-sm" />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Line type="monotone" dataKey="malaria" stroke="hsl(0, 75%, 55%)" strokeWidth={2} name="Malaria" />
                      <Line type="monotone" dataKey="typhoid" stroke="hsl(210, 80%, 48%)" strokeWidth={2} name="Typhoid" />
                      <Line type="monotone" dataKey="cholera" stroke="hsl(152, 60%, 45%)" strokeWidth={2} name="Cholera" />
                      <Line type="monotone" dataKey="dengue" stroke="hsl(38, 92%, 50%)" strokeWidth={2} name="Dengue" />
                      <Line type="monotone" dataKey="tuberculosis" stroke="hsl(270, 60%, 50%)" strokeWidth={2} name="TB" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Mortality Rates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Mortality Statistics</h2>
                <div className="space-y-3 sm:space-y-4">
                  {mortalityData.map((item) => (
                    <div key={item.disease} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm sm:text-base">{item.disease}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.cases} cases, {item.deaths} deaths</p>
                      </div>
                      <Badge variant={item.rate > 3 ? "destructive" : "secondary"} className="text-xs sm:text-sm whitespace-nowrap self-start sm:self-center">
                        {item.rate}% mortality
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Symptom Distribution</h2>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[280px]">
                    <ResponsiveContainer width="100%" height={280} className="sm:!h-[300px]">
                      <PieChart>
                        <Pie
                          data={symptomData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {symptomData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
            </div>

            {/* Outbreak Alerts */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                Active Outbreak Alerts
              </h2>
              <div className="space-y-3 overflow-x-auto">
                {outbreakAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 sm:p-4 rounded-lg border bg-card hover:shadow-md transition-shadow min-w-[280px]">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                            {alert.severity}
                          </Badge>
                          <h3 className="font-semibold text-sm sm:text-base">{alert.disease}</h3>
                        </div>
                        <Badge variant="outline" className="text-destructive text-xs whitespace-nowrap">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {alert.trend}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{alert.location}</span>
                        </span>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <Users className="h-3 w-3 flex-shrink-0" />
                          {alert.cases} cases
                        </span>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <Heart className="h-3 w-3 flex-shrink-0" />
                          {alert.deaths} deaths
                        </span>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <Calendar className="h-3 w-3 flex-shrink-0" />
                          {alert.detected}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="capacity" className="space-y-6">
            {/* Hospital Capacity */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Hospital Capacity Overview</h2>
              <div className="w-full overflow-x-auto">
                <div className="min-w-[500px]">
                  <ResponsiveContainer width="100%" height={350} className="sm:!h-[400px]">
                    <BarChart data={capacityData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" domain={[0, 100]} className="text-xs sm:text-sm" />
                      <YAxis dataKey="hospital" type="category" width={120} className="text-xs sm:text-sm" />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="utilized" stackId="a" fill="hsl(var(--primary))" name="Occupied %" />
                      <Bar dataKey="available" stackId="a" fill="hsl(var(--muted))" name="Available %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Patient Traffic Forecast */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Patient Traffic Forecast (7-Day)</h2>
              <div className="w-full overflow-x-auto">
                <div className="min-w-[400px]">
                  <ResponsiveContainer width="100%" height={250} className="sm:!h-[300px]">
                    <AreaChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs sm:text-sm" />
                      <YAxis className="text-xs sm:text-sm" />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Area type="monotone" dataKey="capacity" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted))" name="Capacity" />
                      <Area type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.3)" name="Predicted" />
                      <Area type="monotone" dataKey="actual" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary) / 0.3)" name="Actual" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Department Performance */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Department Performance</h2>
              <div className="space-y-3 sm:space-y-4">
                {departmentPerformance.map((dept) => (
                  <div key={dept.department} className="p-3 sm:p-4 rounded-lg bg-muted/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm sm:text-base">{dept.department}</h3>
                      <Badge variant="outline" className="text-xs sm:text-sm self-start sm:self-center">{dept.patients} patients</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Avg. Wait Time</p>
                        <p className="font-semibold text-base sm:text-lg">{dept.avgWaitTime} min</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Satisfaction</p>
                        <p className="font-semibold text-base sm:text-lg">{dept.satisfaction}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            {/* Age Group Distribution */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Patient Demographics by Age Group</h2>
              <div className="w-full overflow-x-auto">
                <div className="min-w-[400px]">
                  <ResponsiveContainer width="100%" height={300} className="sm:!h-[400px]">
                    <BarChart data={ageGroupData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="age" className="text-xs sm:text-sm" />
                      <YAxis className="text-xs sm:text-sm" />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="male" fill="hsl(210, 80%, 48%)" name="Male" />
                      <Bar dataKey="female" fill="hsl(320, 65%, 50%)" name="Female" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Vaccination Coverage */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Vaccination Coverage</h2>
              <div className="space-y-3 sm:space-y-4">
                {vaccinationData.map((vaccine) => (
                  <div key={vaccine.vaccine} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-medium text-sm sm:text-base">{vaccine.vaccine}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{vaccine.coverage}% / {vaccine.target}%</span>
                    </div>
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                          vaccine.coverage >= vaccine.target ? 'bg-green-500' : vaccine.coverage >= vaccine.target - 10 ? 'bg-yellow-500' : 'bg-destructive'
                        }`}
                        style={{ width: `${vaccine.coverage}%` }}
                      />
                      <div 
                        className="absolute inset-y-0 border-r-2 border-foreground/20"
                        style={{ left: `${vaccine.target}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Healthcare Access */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Healthcare Access Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {accessMetrics.map((metric) => (
                  <div key={metric.metric} className="p-3 sm:p-4 rounded-lg bg-muted/50">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{metric.metric}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-2xl sm:text-3xl font-bold">{metric.value}%</p>
                      <Badge variant={metric.change.startsWith('+') ? "default" : "destructive"} className="text-xs whitespace-nowrap">
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            {/* Resource Utilization */}
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Critical Resource Utilization</h2>
              <div className="space-y-4 sm:space-y-6">
                {resourceData.map((resource) => (
                  <div key={resource.resource} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-medium text-sm sm:text-base">{resource.resource}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                        {resource.utilized} / {resource.capacity} ({resource.percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                          resource.percentage >= 90 ? 'bg-destructive' : resource.percentage >= 75 ? 'bg-yellow-500' : 'bg-primary'
                        }`}
                        style={{ width: `${resource.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Healthcare Infrastructure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Medical Staff Availability</h2>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { role: "Doctors", available: 245, total: 280, onDuty: 189 },
                    { role: "Nurses", available: 567, total: 620, onDuty: 412 },
                    { role: "Specialists", available: 89, total: 95, onDuty: 67 },
                    { role: "Paramedics", available: 134, total: 150, onDuty: 98 },
                    { role: "Lab Technicians", available: 78, total: 85, onDuty: 56 }
                  ].map((staff) => (
                    <div key={staff.role} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm sm:text-base">{staff.role}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {staff.onDuty} on duty · {staff.available} available
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs sm:text-sm self-start sm:self-center whitespace-nowrap">
                        {((staff.available / staff.total) * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Emergency Response Times</h2>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { type: "Ambulance Dispatch", time: "4.2 min", target: "5 min", status: "good" },
                    { type: "ER Assessment", time: "12 min", target: "15 min", status: "good" },
                    { type: "ICU Transfer", time: "8 min", target: "10 min", status: "good" },
                    { type: "Surgery Prep", time: "28 min", target: "30 min", status: "good" },
                    { type: "Lab Results", time: "45 min", target: "60 min", status: "good" }
                  ].map((item) => (
                    <div key={item.type} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm sm:text-base truncate">{item.type}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Target: {item.target}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-bold text-base sm:text-lg">{item.time}</p>
                        <Badge variant="outline" className="border-green-500 text-green-600 text-xs sm:text-sm">
                          On Target
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;