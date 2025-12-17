import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Mic, Heart, Skull, Activity, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const emergencyTypes = [
  { id: "cardiac", label: "Cardiac Emergency", icon: Heart, color: "bg-red-500" },
  { id: "trauma", label: "Severe Trauma", icon: AlertCircle, color: "bg-orange-500" },
  { id: "unconscious", label: "Unconsciousness", icon: Skull, color: "bg-purple-500" },
  { id: "breathing", label: "Breathing Difficulty", icon: Activity, color: "bg-blue-500" },
  { id: "seizure", label: "Seizure", icon: Zap, color: "bg-yellow-500" },
];

const EmergencyDialog = ({ open, onOpenChange }: EmergencyDialogProps) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setTimeLeft(20);
      setIsRecording(true);
      setSelectedEmergency(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !isRecording) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open, isRecording]);

  const handleQuickAction = (emergencyId: string) => {
    setSelectedEmergency(emergencyId);
    setIsRecording(false);
    
    const emergency = emergencyTypes.find(e => e.id === emergencyId);
    
    toast({
      title: "Emergency Booking Confirmed",
      description: `${emergency?.label} request sent to nearest hospital. Ambulance dispatched. Queue position: A-01 (Priority)`,
    });

    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  };

  const handleAutoSubmit = () => {
    if (selectedEmergency) return;
    
    setIsRecording(false);
    
    toast({
      title: "Emergency Booking Auto-Submitted",
      description: "Voice recording sent to nearest hospital. Ambulance dispatched. Queue position: A-01 (Priority)",
    });

    setTimeout(() => {
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            Emergency Booking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Recording Status */}
          {isRecording && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 animate-ping">
                  <Mic className="h-16 w-16 text-destructive opacity-75" />
                </div>
                <Mic className="h-16 w-16 text-destructive relative" />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Recording voice message...
                </p>
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  {timeLeft}s remaining
                </Badge>
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-center">
              {isRecording ? "Or select emergency type:" : "Emergency type selected:"}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {emergencyTypes.map((emergency) => {
                const Icon = emergency.icon;
                return (
                  <Button
                    key={emergency.id}
                    onClick={() => handleQuickAction(emergency.id)}
                    disabled={!isRecording || selectedEmergency !== null}
                    variant={selectedEmergency === emergency.id ? "default" : "outline"}
                    className="justify-start gap-3 h-auto py-3"
                  >
                    <div className={`p-2 rounded-md ${emergency.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-left">{emergency.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              {isRecording 
                ? "Select an option above or wait for auto-submission. Emergency services will be notified immediately."
                : "Emergency request is being processed..."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyDialog;
