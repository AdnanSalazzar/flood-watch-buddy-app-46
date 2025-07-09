
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mic, 
  Send,
  Bot,
  User
} from 'lucide-react';

const ChatAssistantPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Flood Emergency Assistant. How can I help you stay safe today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const suggestedPrompts = [
    "Where is the nearest shelter?",
    "How do I stay safe during flooding?",
    "Request emergency rescue",
    "What should I pack for evacuation?",
    "Is my area safe right now?",
    "How to help others in flood?"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    // Mock bot response
    const botResponse = {
      id: messages.length + 2,
      text: getBotResponse(message),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setMessage('');
  };

  const getBotResponse = (userMessage: string) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('shelter') || msg.includes('safe place')) {
      return "The nearest shelter is the Community Center, located 0.5 km from your current location. It has capacity for 500 people and is currently accepting evacuees. Would you like directions?";
    } else if (msg.includes('rescue') || msg.includes('help') || msg.includes('emergency')) {
      return "I've alerted emergency services to your location. Please stay where you are if it's safe, or move to higher ground if possible. Keep your phone charged and stay on the line. Help is on the way!";
    } else if (msg.includes('safe') || msg.includes('danger')) {
      return "Your current area shows MODERATE flood risk. I recommend monitoring the situation closely and being prepared to evacuate if conditions worsen. Stay away from flooded roads and moving water.";
    } else if (msg.includes('pack') || msg.includes('evacuate')) {
      return "For evacuation, pack: Important documents, medications, water (1 gallon per person per day), non-perishable food, flashlight, batteries, first aid kit, and warm clothes. Keep everything in a waterproof bag.";
    } else {
      return "I understand your concern. For immediate emergencies, please call local emergency services. I'm here to provide flood safety information and help you find resources. What specific help do you need?";
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, this would use speech recognition API
    setTimeout(() => {
      setIsListening(false);
      setMessage("Where is the nearest shelter?");
    }, 2000);
  };

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="h-6 w-6 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <Bot className="h-7 w-7 mr-2 text-primary" />
          AI Assistant
        </h1>
        <div className="w-20" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 mb-4 space-y-4 max-h-96 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            <Card className={`max-w-xs ${msg.isBot ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  {msg.isBot ? (
                    <Bot className="h-5 w-5 mt-1 text-primary" />
                  ) : (
                    <User className="h-5 w-5 mt-1" />
                  )}
                  <div>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Quick Help:</h3>
        <div className="grid grid-cols-2 gap-2">
          {suggestedPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-auto py-2 px-3 text-left"
              onClick={() => handlePromptClick(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="flex-1 flex items-center space-x-2">
          <Input
            placeholder="Ask me anything about flood safety..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="text-base"
          />
          <Button
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            onClick={handleVoiceInput}
            className={isListening ? "animate-pulse" : ""}
          >
            <Mic className="h-5 w-5" />
          </Button>
        </div>
        <Button onClick={handleSendMessage} disabled={!message.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </div>

      {/* Emergency Banner */}
      <Card className="bg-red-50 border-red-200 mb-4">
        <CardContent className="p-4">
          <p className="text-red-800 text-sm font-medium text-center">
            🚨 For immediate life-threatening emergencies, call local emergency services directly
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAssistantPage;
