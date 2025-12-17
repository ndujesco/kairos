import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Phone, Calendar, Clock, Activity, Stethoscope, AlertCircle, Volume2, Play, Pause } from "lucide-react";
import { useState } from "react";

interface PatientDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: {
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
  };
}

const PatientDetailsDialog = ({ open, onOpenChange, patient }: PatientDetailsDialogProps) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handlePlayVoice = () => {
    setIsPlayingVoice(!isPlayingVoice);
    // Mock voice playback - in real implementation, this would play actual audio
    if (!isPlayingVoice) {
      setTimeout(() => setIsPlayingVoice(false), 5000); // Auto-stop after 5 seconds
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency": return "destructive";
      case "urgent": return "default";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "in-progress": return "text-blue-600";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Details - {patient.queueNumber}
            </span>
            <Badge variant={getPriorityColor(patient.priority)}>
              {patient.priority.toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="h-4 w-4" />
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age / Gender</p>
                <p className="font-medium">{patient.age || 'N/A'} / {patient.gender || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  {patient.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className={`font-medium capitalize ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </p>
              </div>
            </div>
          </Card>

          {/* Appointment Details */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointment Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Arrival Time</p>
                <p className="font-medium flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {patient.arrivalTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{patient.department}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assigned Doctor</p>
                <p className="font-medium flex items-center gap-2">
                  <Stethoscope className="h-3 w-3" />
                  {patient.doctor}
                </p>
              </div>
              {patient.completedAt && (
                <div>
                  <p className="text-sm text-muted-foreground">Completed At</p>
                  <p className="font-medium">{patient.completedAt}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Voice Emergency Section */}
          {patient.isVoiceEmergency && (
            <Card className="p-4 border-destructive/50 bg-destructive/5">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                Voice Emergency Recording
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recording Duration</p>
                  <p className="font-medium">{patient.voiceRecordingDuration || "20s"}</p>
                </div>
                <Button 
                  onClick={handlePlayVoice}
                  variant={isPlayingVoice ? "secondary" : "default"}
                  size="sm"
                  className="gap-2"
                >
                  {isPlayingVoice ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause Recording
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Play Recording
                    </>
                  )}
                </Button>
              </div>
              {isPlayingVoice && (
                <div className="mt-4 flex items-center gap-3 p-3 bg-background rounded-lg">
                  <Volume2 className="h-5 w-5 text-destructive animate-pulse" />
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-destructive animate-pulse" 
                        style={{ width: "60%" }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">0:03 / 0:05</span>
                </div>
              )}
            </Card>
          )}

          {/* Symptoms */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Symptoms & Vital Signs
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Chief Complaint</p>
                <p className="text-sm">{patient.symptoms || "General checkup"}</p>
              </div>
              {patient.vitalSigns && (
                <>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Pressure</p>
                      <p className="font-medium">{patient.vitalSigns.bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Heart Rate</p>
                      <p className="font-medium">{patient.vitalSigns.heartRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-medium">{patient.vitalSigns.temperature}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">O2 Saturation</p>
                      <p className="font-medium">{patient.vitalSigns.oxygenSaturation}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Medical History & Allergies */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Medical History & Allergies</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Medical History</p>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                    patient.medicalHistory.map((condition, idx) => (
                      <Badge key={idx} variant="outline">{condition}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No recorded history</span>
                  )}
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-2">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {patient.allergies && patient.allergies.length > 0 ? (
                    patient.allergies.map((allergy, idx) => (
                      <Badge key={idx} variant="destructive">{allergy}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No known allergies</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsDialog;
