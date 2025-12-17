import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Hospital } from "@/data/hospitals";
import { Calendar, Clock, User, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingDialogProps {
  hospital: Hospital | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingDialog = ({ hospital, open, onOpenChange }: BookingDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [bookingData, setBookingData] = useState({
    patientName: "John Doe",
    phone: "",
    date: "",
    time: "",
    doctor: "",
    symptoms: ""
  });
  const [queueNumber] = useState(
    `${String.fromCharCode(65 + Math.floor(Math.random() * 3))}-${Math.floor(Math.random() * 50) + 1}`
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock booking process
    setStep("confirmation");
    
    toast({
      title: "Appointment Booked!",
      description: `Your appointment at ${hospital?.name} has been confirmed.`,
    });
  };

  const handleClose = () => {
    setStep("form");
    setBookingData({
      patientName: "John Doe",
      phone: "",
      date: "",
      time: "",
      doctor: "",
      symptoms: ""
    });
    onOpenChange(false);
  };

  if (!hospital) return null;

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 17) slots.push(`${hour}:30`);
    }
    return slots;
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };



  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
              <DialogDescription className="text-base">
                Schedule your visit to {hospital.name}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      <User className="h-4 w-4 inline mr-2" />
                      Patient Name
                    </Label>
                    <Input
                      id="name"
                      value={bookingData.patientName}
                      onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 XXX XXX XXXX"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Preferred Date
                    </Label>
                    <Select
                      value={bookingData.date}
                      onValueChange={(value) => setBookingData({ ...bookingData, date: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateDates().map((date) => (
                          <SelectItem key={date} value={date}>
                            {new Date(date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">
                      <Clock className="h-4 w-4 inline mr-2" />
                      Preferred Time
                    </Label>
                    <Select
                      value={bookingData.time}
                      onValueChange={(value) => setBookingData({ ...bookingData, time: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeSlots().map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor">Preferred Doctor</Label>
                  <Select
                    value={bookingData.doctor}
                    onValueChange={(value) => setBookingData({ ...bookingData, doctor: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospital.doctors.map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>
                          {doctor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">
                    <FileText className="h-4 w-4 inline mr-2" />
                    Symptoms / Reason for Visit
                  </Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe your symptoms or reason for appointment..."
                    value={bookingData.symptoms}
                    onChange={(e) => setBookingData({ ...bookingData, symptoms: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Confirm Booking
                </Button>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <CheckCircle className="h-16 w-16 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-2xl text-center">Appointment Confirmed!</DialogTitle>
              <DialogDescription className="text-center text-base">
                Your appointment has been successfully booked
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="bg-muted rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hospital</p>
                  <p className="font-semibold text-lg">{hospital.name}</p>
                  <p className="text-sm text-muted-foreground">{hospital.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                    <p className="font-semibold">
                      {new Date(bookingData.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm">{bookingData.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Queue Number</p>
                    <p className="font-bold text-2xl text-primary">{queueNumber}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Doctor</p>
                  <p className="font-semibold">{bookingData.doctor}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Patient</p>
                  <p className="font-semibold">{bookingData.patientName}</p>
                  <p className="text-sm text-muted-foreground">{bookingData.phone}</p>
                </div>
              </div>

              <div className="bg-accent/20 border border-accent rounded-lg p-4">
                <p className="text-sm font-medium mb-2">Important Reminders:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Arrive 15 minutes before your appointment</li>
                  <li>Bring your ID and insurance card (if applicable)</li>
                  <li>Current wait time: {hospital.waitTime}</li>
                </ul>
              </div>

              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
