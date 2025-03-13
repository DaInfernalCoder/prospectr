"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SetSequencePage() {
  const router = useRouter();
  const [connectionMessage, setConnectionMessage] = useState("Looks like we have similar connections, let's connect :)");
  const [followUpMessage, setFollowUpMessage] = useState("Thanks for connecting with me.");
  const [autoFollowUp, setAutoFollowUp] = useState(true);
  const [characterCount, setCharacterCount] = useState(0);
  const [followUpCharacterCount, setFollowUpCharacterCount] = useState(0);
  const [activeTab, setActiveTab] = useState("templates");

  // Update character count when message changes
  useEffect(() => {
    setCharacterCount(connectionMessage.length);
  }, [connectionMessage]);

  // Update follow-up character count when message changes
  useEffect(() => {
    setFollowUpCharacterCount(followUpMessage.length);
  }, [followUpMessage]);

  // Navigate to previous step
  const goToPreviousStep = () => {
    router.push('/dashboard/campaigns/new/leads');
  };

  // Navigate to next step
  const goToNextStep = () => {
    router.push('/dashboard/campaigns/new/review');
  };

  return (
    <div className="space-y-6 p-6 bg-black">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A3A3A3] flex items-center justify-center font-bold">
              1
            </div>
            <span className="ml-2 text-[#A3A3A3] font-medium">Add Leads</span>
          </div>
          <div className="w-8 h-0.5 bg-[#2A2A2A]"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
              2
            </div>
            <span className="ml-2 text-white font-medium">Set Sequence</span>
          </div>
          <div className="w-8 h-0.5 bg-[#2A2A2A]"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-[#A3A3A3] flex items-center justify-center font-bold">
              3
            </div>
            <span className="ml-2 text-[#A3A3A3] font-medium">Review And Publish</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
            className="border-[#2A2A2A] text-white hover:bg-[#2A2A2A]"
          >
            Back
          </Button>
          <Button 
            onClick={goToNextStep} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* LinkedIn Icon and Step Title */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#0077B5] rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </div>
          <h2 className="text-white text-lg font-medium">Step 1 - Send a connection request</h2>
          <button className="ml-auto text-[#A3A3A3]">×</button>
        </div>

        {/* Connection Request Message */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Connection Request Message</h3>
            <div className="flex space-x-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList className="bg-[#0C0C0C] border border-[#2A2A2A]">
                  <TabsTrigger 
                    value="templates" 
                    className={`${activeTab === 'templates' ? 'bg-[#2A2A2A] text-white' : 'text-[#A3A3A3]'}`}
                  >
                    Templates
                  </TabsTrigger>
                  <TabsTrigger 
                    value="personalize" 
                    className={`${activeTab === 'personalize' ? 'bg-[#2A2A2A] text-white' : 'text-[#A3A3A3]'}`}
                  >
                    Personalize
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <textarea
            value={connectionMessage}
            onChange={(e) => setConnectionMessage(e.target.value)}
            className="w-full h-24 p-3 bg-black border border-[#2A2A2A] rounded-md text-white resize-none focus:outline-none focus:ring-1 focus:ring-blue-600"
            maxLength={300}
          />
          <div className="flex justify-between text-xs text-[#A3A3A3]">
            <p>Please note that if your message exceeds 300 characters, we will automatically trim it.</p>
            <p>{characterCount}/300</p>
          </div>
          <p className="text-xs text-[#A3A3A3]">If we identify a limit on connection request messages, we'll automatically send the connection request without including a message.</p>
        </div>

        {/* Auto Follow-up Toggle */}
        <div className="flex items-center space-x-3 py-2">
          <div className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={autoFollowUp}
              onChange={() => setAutoFollowUp(!autoFollowUp)}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full peer ${autoFollowUp ? 'bg-blue-600' : 'bg-[#2A2A2A]'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
          </div>
          <span className="text-white">Auto follow-up with message once connected</span>
        </div>

        {/* Follow Up Message (only shown if auto follow-up is enabled) */}
        {autoFollowUp && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Follow Up Message</h3>
              <div className="flex space-x-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList className="bg-[#0C0C0C] border border-[#2A2A2A]">
                    <TabsTrigger 
                      value="templates" 
                      className={`${activeTab === 'templates' ? 'bg-[#2A2A2A] text-white' : 'text-[#A3A3A3]'}`}
                    >
                      Templates
                    </TabsTrigger>
                    <TabsTrigger 
                      value="personalize" 
                      className={`${activeTab === 'personalize' ? 'bg-[#2A2A2A] text-white' : 'text-[#A3A3A3]'}`}
                    >
                      Personalize
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <textarea
              value={followUpMessage}
              onChange={(e) => setFollowUpMessage(e.target.value)}
              className="w-full h-24 p-3 bg-black border border-[#2A2A2A] rounded-md text-white resize-none focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <div className="flex justify-end text-xs text-[#A3A3A3]">
              <p>{followUpCharacterCount}/8000</p>
            </div>
          </div>
        )}

        {/* Add Tags (disabled for now) */}
        <div className="flex items-center space-x-3 py-2">
          <div className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              disabled
            />
            <div className="w-11 h-6 rounded-full bg-[#2A2A2A] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#A3A3A3] after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </div>
          <span className="text-[#A3A3A3]">Add tags</span>
        </div>
      </div>

      {/* Add Campaign Step */}
      <div className="mt-8">
        <h3 className="text-white font-medium mb-4">Add campaign step:</h3>
        <div className="flex space-x-3">
          <button className="w-12 h-12 bg-[#0077B5] rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </button>
          <button className="w-12 h-12 bg-[#2A2A2A] rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A3A3A3]">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </button>
          <button className="w-12 h-12 bg-[#2A2A2A] rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#A3A3A3]">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
