
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  MapPin, 
  Home, 
  Shield, 
  Navigation,
  Layers,
  Satellite
} from 'lucide-react';

const FloodMapPage = () => {
  const navigate = useNavigate();
  const [isSatelliteView, setIsSatelliteView] = useState(false);

  // Mock data for flood zones and shelters
  const floodZones = [
    { id: 1, severity: 'high', area: 'Downtown Area', affected: '2,500 people' },
    { id: 2, severity: 'moderate', area: 'Riverside District', affected: '1,200 people' },
    { id: 3, severity: 'low', area: 'Hill Station', affected: '300 people' }
  ];

  const shelters = [
    { id: 1, name: 'Community Center', distance: '0.5 km', capacity: '500 people' },
    { id: 2, name: 'School Building', distance: '1.2 km', capacity: '300 people' },
    { id: 3, name: 'Hospital', distance: '2.1 km', capacity: '200 people' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'moderate': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
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
        <h1 className="text-2xl font-bold">Live Flood Map</h1>
        <div className="w-20" />
      </div>

      {/* Map View Toggle */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Layers className="h-5 w-5 mr-2" />
              <span className="font-medium">Map View</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Regular</span>
              <Switch 
                checked={isSatelliteView} 
                onCheckedChange={setIsSatelliteView}
              />
              <span className="text-sm">Satellite</span>
              <Satellite className="h-4 w-4 ml-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card className="mb-6 h-80">
        <CardContent className="p-0 h-full">
          <div className={`h-full rounded-lg flex items-center justify-center text-white font-bold text-xl ${
            isSatelliteView ? 'bg-gradient-to-br from-green-800 to-blue-900' : 'bg-gradient-to-br from-blue-400 to-blue-600'
          }`}>
            <div className="text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4 animate-bounce" />
              <p>Interactive Map</p>
              <p className="text-sm font-normal mt-2">
                {isSatelliteView ? 'Satellite View' : 'Regular View'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Location */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-full mr-3">
              <Navigation className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">Your Location</p>
              <p className="text-sm text-muted-foreground">Downtown District, Safe Zone</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flood Zones */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="h-6 w-6 mr-2 text-red-500" />
          Flood Affected Areas
        </h2>
        <div className="space-y-3">
          {floodZones.map((zone) => (
            <Card key={zone.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${getSeverityColor(zone.severity)} mr-3`} />
                    <div>
                      <p className="font-semibold">{zone.area}</p>
                      <p className="text-sm text-muted-foreground">{zone.affected}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-muted rounded capitalize">
                    {zone.severity} Risk
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Nearby Shelters */}
      <div className="mb-20">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Home className="h-6 w-6 mr-2 text-green-500" />
          Nearby Shelters
        </h2>
        <div className="space-y-3">
          {shelters.map((shelter) => (
            <Card key={shelter.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{shelter.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {shelter.distance} • {shelter.capacity}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => navigate('/safe-route')}>
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloodMapPage;
