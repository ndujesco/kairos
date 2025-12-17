import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceInputProps {
  onTranscription: (text: string) => void;
}

const mockTranscriptions = [
  "I have a fever and cough for the past two days",
  "I need to see a doctor for chest pain",
  "Looking for a hospital near me for a general checkup",
  "I have a headache and feel dizzy",
  "My child has a high fever and rash"
];

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscription }) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recordingTimeoutRef = useRef<NodeJS.Timeout>();

  const startRecording = async () => {
    try {
      // Request microphone access for realistic UX
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsRecording(true);
      toast({
        title: "Recording...",
        description: "Speak now to describe your symptoms",
      });

      // Auto-stop after 5 seconds
      recordingTimeoutRef.current = setTimeout(() => {
        stopRecording();
      }, 5000);
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use voice input",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
    }
    
    setIsRecording(false);
    setIsProcessing(true);

    // Mock transcription delay
    setTimeout(() => {
      const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      onTranscription(randomTranscription);
      setIsProcessing(false);
      
      toast({
        title: "Transcription Complete",
        description: randomTranscription,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        size="lg"
        variant={isRecording ? "destructive" : "default"}
        className="rounded-full w-16 h-16 p-0"
      >
        {isProcessing ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : isRecording ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
      
      {isRecording && (
        <div className="flex gap-1 items-center">
          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Recording...</span>
        </div>
      )}
      
      {isProcessing && (
        <span className="text-sm text-muted-foreground">Processing...</span>
      )}
    </div>
  );
};

export default VoiceInput;
