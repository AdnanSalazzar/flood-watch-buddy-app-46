
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { 
  ArrowLeft, 
  Camera, 
  MapPin,
  Upload,
  Droplets,
  AlertTriangle,
  Clock,
  CheckCircle
} from 'lucide-react';

const ReportFloodPage = () => {
  const navigate = useNavigate();
  const [waterDepth, setWaterDepth] = useState([50]);
  const [severity, setSeverity] = useState('moderate');
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const severityLevels = [
    { id: 'low', label: 'Minor Flooding', color: 'bg-green-500', icon: '💧' },
    { id: 'moderate', label: 'Moderate Flooding', color: 'bg-amber-500', icon: '🌊' },
    { id: 'high', label: 'Severe Flooding', color: 'bg-red-500', icon: '⚠️' }
  ];

  const handlePhotoUpload = () => {
    // Simulate photo upload
    setHasPhoto(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Auto-navigate back after success
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Report Submitted!</h2>
            <p className="text-muted-foreground mb-4">
              Thank you for helping your community stay safe. Your report has been verified and added to the flood map.
            </p>
            <p className="text-sm text-green-600 font-medium">
              Redirecting to home...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Report Flooding</h1>
        <div className="w-20" />
      </div>

      {/* Current Location */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="bg-primary p-2 rounded-full mr-3">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold">Current Location</p>
              <p className="text-sm text-muted-foreground">Downtown District • GPS: 23.7465, 90.3763</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            Add Photo (Optional)
          </h3>
          
          {!hasPhoto ? (
            <Button
              variant="outline"
              className="w-full h-32 border-dashed border-2 flex flex-col items-center justify-center space-y-2"
              onClick={handlePhotoUpload}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <span className="text-muted-foreground">Tap to upload photo</span>
            </Button>
          ) : (
            <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <span className="text-sm">Photo uploaded</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Water Depth */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <Droplets className="h-5 w-5 mr-2" />
            Estimated Water Depth
          </h3>
          
          <div className="space-y-4">
            <Slider
              value={waterDepth}
              onValueChange={setWaterDepth}
              max={200}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0 cm</span>
              <span className="font-semibold text-primary">{waterDepth[0]} cm</span>
              <span>200+ cm</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Severity Level */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Severity Level
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {severityLevels.map((level) => (
              <Button
                key={level.id}
                variant={severity === level.id ? "default" : "outline"}
                className={`h-14 justify-start ${
                  severity === level.id ? level.color : ''
                }`}
                onClick={() => setSeverity(level.id)}
              >
                <span className="text-2xl mr-3">{level.icon}</span>
                <div className="text-left">
                  <p className="font-semibold">{level.label}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Additional Details (Optional)</h3>
          <Textarea
            placeholder="Describe what you see... (e.g., roads blocked, people affected, rescue needed)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-20"
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="mb-20">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-14 text-lg font-semibold gradient-alert text-white border-0"
        >
          {isSubmitting ? (
            <>
              <Clock className="h-5 w-5 mr-2 animate-spin" />
              Submitting Report...
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 mr-2" />
              Submit Flood Report
            </>
          )}
        </Button>
      </div>

      {/* Info Notice */}
      <Card className="bg-blue-50 border-blue-200 mb-4">
        <CardContent className="p-4">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Your report will be automatically verified using AI and added to the live flood map to help others in your community stay safe.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportFloodPage;
