import { Info } from "lucide-react";

export default function UpdateFrequencyInfo() {
  return (
    <div className="bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] p-4">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-white mb-1">Campaign Update Frequencies</h4>
          <div className="space-y-2 text-sm text-[#A1A1AA]">
            <p>• Connection requests are checked every 2 hours</p>
            <p>• Response tracking updates every 4 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
} 