
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Navigation, 
  MapPin,
  Car,
  Footprints,
  Ship,
  Clock,
  Route,
  AlertTriangle
} from 'lucide-react';

const SafeRoutePage = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [transportMode, setTransportMode] = useState('walking');

  const transportModes = [
    { id: 'walking', icon: Footprints, label: 'Walking', time: '25 min' },
    { id: 'car', icon: Car, label: 'Car', time: '8 min' },
    { id: 'boat', icon: Ship, label: 'Boat', time: '15 min' }
  ];

  const safeRoutes = [
    {
      id: 1,
      name: 'Main Street Route',
      distance: '2.1 km',
      time: '25 min',
      safety: 'High',
      warnings: ['Avoid River Bridge - Flooded'],
      landmarks: ['Community Center', 'High School', 'Police Station']
    },
    {
      id: 2,
      name: 'Hill Path Route',
      distance: '3.2 km',
      time: '35 min',
      safety: 'Very High',
      warnings: [],
      landmarks: ['Hill View Park', 'Water Tower', 'Fire Station']
    }
  ];

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'Very High': return 'text-green-600 bg-green-100';
      case 'High': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-amber-600 bg-amber-100';
      default: return 'text-gray-600 bg-gray-100';
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
        <h1 className="text-2xl font-bold">Safe Routes</h1>
        <div className="w-20" />
      </div>

      {/* Destination Input */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Where do you want to go?</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter destination or select shelter..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Destinations */}
            <div className="flex flex-wrap gap-2">
              {['Community Center', 'Hospital', 'School', 'Police Station'].map((place) => (
                <Button
                  key={place}
                  variant="outline"
                  size="sm"
                  onClick={() => setDestination(place)}
                >
                  {place}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transport Mode Selection */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Choose Transport Mode</h3>
          <div className="grid grid-cols-3 gap-3">
            {transportModes.map((mode) => (
              <Button
                key={mode.id}
                variant={transportMode === mode.id ? "default" : "outline"}
                className="h-16 flex flex-col space-y-1"
                onClick={() => setTransportMode(mode.id)}
              >
                <mode.icon className="h-6 w-6" />
                <span className="text-xs">{mode.label}</span>
                <span className="text-xs text-muted-foreground">{mode.time}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Route Map */}
      <Card className="mb-6 h-48">
        <CardContent className="p-0 h-full">
          <div className="h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white">
            <div className="text-center">
              <Route className="h-16 w-16 mx-auto mb-4 animate-pulse" />
              <p className="font-bold text-xl">Interactive Route Map</p>
              <p className="text-sm">Showing safest path to {destination || 'destination'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safe Routes */}
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Navigation className="h-6 w-6 mr-2 text-green-500" />
          Recommended Safe Routes
        </h2>
        
        {safeRoutes.map((route) => (
          <Card key={route.id} className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{route.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {route.distance}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {route.time}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(route.safety)}`}>
                  {route.safety} Safety
                </span>
              </div>

              {/* Warnings */}
              {route.warnings.length > 0 && (
                <div className="mb-3">
                  {route.warnings.map((warning, index) => (
                    <div key={index} className="flex items-center text-amber-600 bg-amber-50 p-2 rounded text-sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {warning}
                    </div>
                  ))}
                </div>
              )}

              {/* Landmarks */}
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Key Landmarks:</p>
                <div className="flex flex-wrap gap-1">
                  {route.landmarks.map((landmark, index) => (
                    <span key={index} className="bg-muted px-2 py-1 rounded text-xs">
                      {landmark}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full gradient-safe text-white border-0">
                Start Navigation
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Notice */}
      <Card className="bg-red-50 border-red-200 mb-20">
        <CardContent className="p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800 text-sm font-medium">
              Always check current conditions before traveling. Turn back if water is rising.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeRoutePage;
