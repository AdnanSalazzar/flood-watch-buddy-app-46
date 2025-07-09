
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BookOpen, 
  AlertTriangle,
  Shield,
  Package,
  Users,
  Home,
  Phone,
  Droplets,
  Car
} from 'lucide-react';

const FloodGuidePage = () => {
  const navigate = useNavigate();

  const guideData = {
    beforeFlood: [
      {
        icon: Package,
        title: 'Emergency Kit',
        items: [
          'Water (1 gallon per person per day for 3 days)',
          'Non-perishable food for 3 days',
          'Battery-powered radio',
          'Flashlight and extra batteries',
          'First aid kit',
          'Medications (7-day supply)',
          'Important documents (waterproof container)',
          'Cash and credit cards',
          'Emergency contact information'
        ]
      },
      {
        icon: Home,
        title: 'Prepare Your Home',
        items: [
          'Know your evacuation routes',
          'Clear storm drains and gutters',
          'Install sump pumps and backup power',
          'Waterproof basement walls',
          'Keep sandbags on hand',
          'Elevate utilities above potential flood levels',
          'Create a family communication plan',
          'Practice your evacuation plan'
        ]
      }
    ],
    duringFlood: [
      {
        icon: AlertTriangle,
        title: 'Safety First',
        items: [
          'Move to higher ground immediately',
          'Never walk through flowing water',
          'Avoid driving through flooded roads',
          'Stay away from downed power lines',
          'Listen to emergency broadcasts',
          'Turn off utilities if instructed',
          'Do not drink flood water',
          'Signal for help if trapped'
        ]
      },
      {
        icon: Car,
        title: 'If Driving',
        items: [
          'Turn around - Don\'t drown',
          '6 inches of water can stall your car',
          '12 inches can carry away your vehicle',
          'If trapped, abandon your car and move to higher ground',
          'Call for help and wait for rescue',
          'Stay with your vehicle if safe'
        ]
      }
    ],
    afterFlood: [
      {
        icon: Shield,
        title: 'Stay Safe',
        items: [
          'Wait for authorities to say it\'s safe to return',
          'Avoid flood water - it may be contaminated',
          'Check for structural damage before entering',
          'Document damage with photos',
          'Contact your insurance company',
          'Throw away contaminated food',
          'Clean and disinfect everything',
          'Watch for signs of stress and trauma'
        ]
      },
      {
        icon: Phone,
        title: 'Recovery',
        items: [
          'Contact family and let them know you\'re safe',
          'Apply for disaster assistance if needed',
          'Keep receipts for cleanup costs',
          'Beware of contractor fraud',
          'Take care of your mental health',
          'Help neighbors who need assistance',
          'Learn from the experience',
          'Update your emergency plan'
        ]
      }
    ]
  };

  const warningTips = [
    {
      icon: Droplets,
      title: 'Water Safety',
      description: 'Just 6 inches of moving water can knock you down. 12 inches can carry away a vehicle.'
    },
    {
      icon: AlertTriangle,
      title: 'Never Drive Through Floods',
      description: 'Most flood deaths occur in vehicles. Turn around, don\'t drown!'
    },
    {
      icon: Phone,
      title: 'Emergency Contacts',
      description: 'Keep emergency numbers accessible. Cell towers may be down during floods.'
    }
  ];

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <BookOpen className="h-7 w-7 mr-2 text-primary" />
          Flood Safety Guide
        </h1>
        <div className="w-20" />
      </div>

      {/* Warning Tips */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {warningTips.map((tip, index) => (
          <Card key={index} className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <tip.icon className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800">{tip.title}</h3>
                  <p className="text-sm text-amber-700">{tip.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="before" className="mb-20">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="before" className="text-sm">Before Flood</TabsTrigger>
          <TabsTrigger value="during" className="text-sm">During Flood</TabsTrigger>
          <TabsTrigger value="after" className="text-sm">After Flood</TabsTrigger>
        </TabsList>

        <TabsContent value="before" className="space-y-6">
          {guideData.beforeFlood.map((section, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <section.icon className="h-6 w-6 mr-2 text-blue-500" />
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="during" className="space-y-6">
          {guideData.duringFlood.map((section, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <section.icon className="h-6 w-6 mr-2 text-red-500" />
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="after" className="space-y-6">
          {guideData.afterFlood.map((section, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <section.icon className="h-6 w-6 mr-2 text-green-500" />
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Emergency Action */}
      <Card className="bg-red-50 border-red-200 mb-4">
        <CardContent className="p-4">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-red-800 font-semibold mb-2">Emergency Situation?</p>
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => navigate('/chat')}
            >
              Get Immediate Help
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloodGuidePage;
