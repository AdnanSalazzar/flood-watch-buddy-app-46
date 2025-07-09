
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Clock,
  Share2,
  Navigation,
  Phone,
  MapPin,
  Users
} from 'lucide-react';

const FloodAlertPage = () => {
  const navigate = useNavigate();

  const alertData = {
    level: 'HIGH',
    title: '⚠️ High Flood Risk in Your Area!',
    time: new Date().toLocaleString(),
    location: 'Downtown District',
    affectedPeople: '2,500+',
    instructions: [
      'Move to higher ground immediately',
      'Avoid walking or driving through flood water',
      'Keep important documents in waterproof containers',
      'Stay tuned to emergency broadcasts',
      'Contact family members to inform your safety'
    ],
    shelters: [
      { name: 'Community Center', distance: '0.5 km', status: 'Open' },
      { name: 'High School Building', distance: '1.2 km', status: 'Open' },
      { name: 'Hospital Safe Zone', distance: '2.1 km', status: 'Open' }
    ]
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Flood Alert',
        text: `${alertData.title} - ${alertData.location}. Stay safe!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${alertData.title} - ${alertData.location}. Stay safe! ${window.location.href}`);
      alert('Alert details copied to clipboard!');
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'bg-red-500';
      case 'MODERATE': return 'bg-amber-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-red-600">Flood Alert</h1>
        <Button variant="ghost" onClick={handleShare}>
          <Share2 className="h-6 w-6" />
        </Button>
      </div>

      {/* Alert Status */}
      <Card className="mb-6 border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div className={`inline-block px-4 py-2 rounded-full text-white font-bold text-lg ${getLevelColor(alertData.level)} animate-pulse-slow`}>
              {alertData.level} RISK
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-4 text-red-800">
            {alertData.title}
          </h2>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-red-700">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {alertData.time}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {alertData.location}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {alertData.affectedPeople} affected
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Instructions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-amber-500" />
            Immediate Safety Instructions
          </h3>
          
          <div className="space-y-3">
            {alertData.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-amber-800 font-medium">{instruction}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Shelters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Navigation className="h-6 w-6 mr-2 text-green-500" />
            Nearby Emergency Shelters
          </h3>
          
          <div className="space-y-3">
            {alertData.shelters.map((shelter, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-semibold">{shelter.name}</p>
                  <p className="text-sm text-muted-foreground">{shelter.distance} away</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                    {shelter.status}
                  </span>
                  <Button 
                    size="sm" 
                    onClick={() => navigate('/safe-route')}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4 mb-6">
        <Button 
          className="w-full h-14 text-lg font-semibold gradient-safe text-white border-0"
          onClick={() => navigate('/safe-route')}
        >
          <Navigation className="h-6 w-6 mr-2" />
          Find Safe Route to Shelter
        </Button>
        
        <Button 
          className="w-full h-14 text-lg font-semibold gradient-water text-white border-0"
          onClick={() => navigate('/chat')}
        >
          <Phone className="h-6 w-6 mr-2" />
          Get Emergency Help
        </Button>
      </div>

      {/* Share Alert */}
      <Card className="mb-20">
        <CardContent className="p-4">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Help Others Stay Safe</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share this alert with family and friends in the area
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share Alert
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Banner */}
      <Card className="bg-red-100 border-red-200 mb-4">
        <CardContent className="p-4">
          <p className="text-red-800 text-sm font-medium text-center">
            🚨 If you are in immediate danger, call emergency services: 999
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloodAlertPage;
