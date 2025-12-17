import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Building2, MapPin, Phone, Briefcase, Stethoscope, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HospitalOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    hospitalName: "Lagos General Hospital",
    registrationNumber: "HRN-123456",
    hospitalType: "government",
    primarySpecialty: "general",
    address: "15 Marina Street, Lagos Island",
    city: "Lagos",
    state: "Lagos State",
    zipCode: "100001",
    phone: "+234 800 123 4567",
    email: "info@hospital.com",
    emergencyPhone: "+234 800 911 0000",
    totalBeds: "200",
    icuBeds: "20",
    operatingRooms: "8",
    hasEmergency: true,
    hasAmbulance: true,
    ambulanceCount: "5",
    operatingHours: "24/7",
    specialties: ["General Medicine", "Cardiology", "Pediatrics", "Surgery", "Emergency Medicine"],
    medicalStaff: "50",
    nursingStaff: "100",
    adminName: "Dr. John Doe",
    adminPhone: "+234 800 123 4567",
    adminEmail: "admin@hospital.com",
    licenseDocument: null,
  });

  const specialtiesList = [
    "General Medicine", "Cardiology", "Neurology", "Orthopedics", "Pediatrics",
    "Obstetrics & Gynecology", "Emergency Medicine", "Surgery", "Oncology",
    "Radiology", "Psychiatry", "Dermatology"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      }),
      {
        loading: "Submitting your hospital application...",
        success: "Hospital registered successfully!",
        error: "Something went wrong. Please try again.",
        description: (result) =>
          result ? "Your application is under review. You'll receive confirmation within 24-48 hours." : "",
      }
    );

    // Simulate API call / processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSubmitting(false);
    await new Promise(resolve => setTimeout(resolve, 3000));

    
    navigate("/hospital");
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building2 className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold">Basic Hospital Information</h2>
        <p className="text-muted-foreground">Let's start with the essential details</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hospitalName">Hospital Name *</Label>
          <Input
            id="hospitalName"
            placeholder="Lagos General Hospital"
            value={formData.hospitalName}
            onChange={(e) => handleInputChange("hospitalName", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="registrationNumber">Registration Number *</Label>
          <Input
            id="registrationNumber"
            placeholder="HRN-123456"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="hospitalType">Hospital Type *</Label>
          <Select value={formData.hospitalType} onValueChange={(value) => handleInputChange("hospitalType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="teaching">Teaching Hospital</SelectItem>
              <SelectItem value="specialty">Specialty Hospital</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="primarySpecialty">Primary Specialty *</Label>
          <Select value={formData.primarySpecialty} onValueChange={(value) => handleInputChange("primarySpecialty", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Care</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="neurology">Neurology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold">Location & Contact Details</h2>
        <p className="text-muted-foreground">Help patients find and reach you</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="address">Street Address *</Label>
          <Textarea
            id="address"
            placeholder="15 Marina Street, Lagos Island"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="Lagos"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              placeholder="Lagos State"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              placeholder="100001"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="phone">Main Phone *</Label>
            <Input
              id="phone"
              placeholder="+234 800 123 4567"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
            <Input
              id="emergencyPhone"
              placeholder="+234 800 911 0000"
              value={formData.emergencyPhone}
              onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="info@hospital.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Stethoscope className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold">Facilities & Capabilities</h2>
        <p className="text-muted-foreground">Tell us about your hospital's capacity</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="totalBeds">Total Beds *</Label>
          <Input
            id="totalBeds"
            type="number"
            placeholder="200"
            value={formData.totalBeds}
            onChange={(e) => handleInputChange("totalBeds", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="icuBeds">ICU Beds *</Label>
          <Input
            id="icuBeds"
            type="number"
            placeholder="20"
            value={formData.icuBeds}
            onChange={(e) => handleInputChange("icuBeds", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="operatingRooms">Operating Rooms *</Label>
          <Input
            id="operatingRooms"
            type="number"
            placeholder="8"
            value={formData.operatingRooms}
            onChange={(e) => handleInputChange("operatingRooms", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasEmergency"
            checked={formData.hasEmergency}
            onCheckedChange={(checked) => handleInputChange("hasEmergency", checked)}
          />
          <Label htmlFor="hasEmergency">24/7 Emergency Services Available</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasAmbulance"
            checked={formData.hasAmbulance}
            onCheckedChange={(checked) => handleInputChange("hasAmbulance", checked)}
          />
          <Label htmlFor="hasAmbulance">Ambulance Services Available</Label>
        </div>
      </div>
      {formData.hasAmbulance && (
        <div>
          <Label htmlFor="ambulanceCount">Number of Ambulances</Label>
          <Input
            id="ambulanceCount"
            type="number"
            placeholder="5"
            value={formData.ambulanceCount}
            onChange={(e) => handleInputChange("ambulanceCount", e.target.value)}
          />
        </div>
      )}
      <div>
        <Label htmlFor="operatingHours">Operating Hours *</Label>
        <Select value={formData.operatingHours} onValueChange={(value) => handleInputChange("operatingHours", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select hours" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24/7">24/7 - Round the Clock</SelectItem>
            <SelectItem value="business">Business Hours (8 AM - 6 PM)</SelectItem>
            <SelectItem value="extended">Extended Hours (6 AM - 10 PM)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Available Specialties *</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {specialtiesList.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={formData.specialties.includes(specialty)}
                onCheckedChange={() => handleSpecialtyToggle(specialty)}
              />
              <Label htmlFor={specialty} className="text-sm font-normal cursor-pointer">
                {specialty}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Briefcase className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold">Staffing & Administration</h2>
        <p className="text-muted-foreground">Information about your team</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="medicalStaff">Number of Medical Staff *</Label>
          <Input
            id="medicalStaff"
            type="number"
            placeholder="50"
            value={formData.medicalStaff}
            onChange={(e) => handleInputChange("medicalStaff", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="nursingStaff">Number of Nursing Staff *</Label>
          <Input
            id="nursingStaff"
            type="number"
            placeholder="100"
            value={formData.nursingStaff}
            onChange={(e) => handleInputChange("nursingStaff", e.target.value)}
          />
        </div>
      </div>
      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Primary Administrator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="adminName">Full Name *</Label>
            <Input
              id="adminName"
              placeholder="Dr. John Doe"
              value={formData.adminName}
              onChange={(e) => handleInputChange("adminName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="adminPhone">Phone Number *</Label>
            <Input
              id="adminPhone"
              placeholder="+234 800 123 4567"
              value={formData.adminPhone}
              onChange={(e) => handleInputChange("adminPhone", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="adminEmail">Email Address *</Label>
            <Input
              id="adminEmail"
              type="email"
              placeholder="admin@hospital.com"
              value={formData.adminEmail}
              onChange={(e) => handleInputChange("adminEmail", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-600" />
        <h2 className="text-2xl font-bold">Review & Submit</h2>
        <p className="text-muted-foreground">Please review your information before submitting</p>
      </div>
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div><p className="text-muted-foreground">Hospital Name</p><p className="font-medium">{formData.hospitalName}</p></div>
          <div><p className="text-muted-foreground">Registration Number</p><p className="font-medium">{formData.registrationNumber}</p></div>
          <div><p className="text-muted-foreground">Hospital Type</p><p className="font-medium capitalize">{formData.hospitalType}</p></div>
          <div><p className="text-muted-foreground">Primary Specialty</p><p className="font-medium capitalize">{formData.primarySpecialty}</p></div>
          <div className="col-span-1 md:col-span-2">
            <p className="text-muted-foreground">Address</p>
            <p className="font-medium">{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
          </div>
          <div><p className="text-muted-foreground">Main Phone</p><p className="font-medium">{formData.phone}</p></div>
          <div><p className="text-muted-foreground">Emergency Phone</p><p className="font-medium">{formData.emergencyPhone}</p></div>
          <div><p className="text-muted-foreground">Email</p><p className="font-medium">{formData.email}</p></div>
          <div><p className="text-muted-foreground">Total Beds</p><p className="font-medium">{formData.totalBeds}</p></div>
          <div><p className="text-muted-foreground">ICU Beds</p><p className="font-medium">{formData.icuBeds}</p></div>
          <div><p className="text-muted-foreground">Operating Rooms</p><p className="font-medium">{formData.operatingRooms}</p></div>
          <div><p className="text-muted-foreground">Operating Hours</p><p className="font-medium">
            {formData.operatingHours === "24/7" ? "24/7 - Round the Clock" :
             formData.operatingHours === "business" ? "Business Hours (8 AM - 6 PM)" :
             formData.operatingHours === "extended" ? "Extended Hours (6 AM - 10 PM)" : "Not set"}
          </p></div>
          <div><p className="text-muted-foreground">Emergency Services</p><p className="font-medium">{formData.hasEmergency ? "Yes" : "No"}</p></div>
          <div><p className="text-muted-foreground">Ambulance Services</p><p className="font-medium">
            {formData.hasAmbulance ? `Yes (${formData.ambulanceCount} units)` : "No"}
          </p></div>
          <div className="col-span-1 md:col-span-2">
            <p className="text-muted-foreground">Available Specialties</p>
            <p className="font-medium">{formData.specialties.join(", ")}</p>
          </div>
          <div><p className="text-muted-foreground">Medical Staff</p><p className="font-medium">{formData.medicalStaff}</p></div>
          <div><p className="text-muted-foreground">Nursing Staff</p><p className="font-medium">{formData.nursingStaff}</p></div>
          <div><p className="text-muted-foreground">Admin Name</p><p className="font-medium">{formData.adminName}</p></div>
          <div><p className="text-muted-foreground">Admin Phone</p><p className="font-medium">{formData.adminPhone}</p></div>
          <div className="md:col-span-2"><p className="text-muted-foreground">Admin Email</p><p className="font-medium">{formData.adminEmail}</p></div>
        </div>
      </Card>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          By submitting this form, you confirm that all information provided is accurate and you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );

 return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-all ${
                step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {s}
              </div>
              {s < 5 && (
                <div className={`w-6 sm:w-12 md:w-24 h-1 transition-all ${step > s ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <Card className="p-4 sm:p-6 md:p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 sm:mt-8 pt-6 border-t">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isSubmitting} size="sm" className="sm:h-10">
                Previous
              </Button>
            )}

            <div className="ml-auto">
              {step < 5 ? (
                <Button onClick={() => setStep(step + 1)} disabled={isSubmitting} size="sm" className="sm:h-10">
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="min-w-[140px] sm:min-w-[180px]"
                  size="sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HospitalOnboarding;