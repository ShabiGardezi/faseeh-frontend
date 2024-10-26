"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Save, FileDown, RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const proverbs = [
  "الوقت كالسيف إن لم تقطعه قطعك",
  "العلم في الصغر كالنقش على الحجر",
  "من جد وجد ومن زرع حصد",
  "الصديق وقت الضيق",
  "العقل السليم في الجسم السليم",
];

export function ArabicProverbStoriesComponent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [proverb, setProverb] = useState("");
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateStory = async () => {
    setIsLoading(true);
    // Placeholder for API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStory(
      `Once upon a time, there was a ${age}-year-old child named ${name}. ${name} learned an important lesson from the proverb: "${proverb}". [Rest of the story would be generated here]`
    );
    setIsLoading(false);
  };

  const handleSaveStory = () => {
    // Placeholder for saving functionality
    toast({
      title: "Story Saved",
      description:
        "Your story has been successfully saved in your activity log.",
    });
  };

  const handleExportStory = () => {
    // Placeholder for export functionality
    toast({
      title: "Story Exported",
      description: "Your story has been exported as a PDF document.",
    });
  };

  const handleReset = () => {
    setName("");
    setAge("");
    setProverb("");
    setStory("");
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#20b1c9]">
            Childrens Stories Based on Arabic Proverbs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Child Name</Label>
            <Input
              id="name"
              placeholder="Enter the child's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[#1C9AAF] focus:ring-[#20b1c9]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Child Age</Label>
            <Input
              id="age"
              placeholder="Enter the child's age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border-[#1C9AAF] focus:ring-[#20b1c9]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proverb">Select an Arabic Proverb</Label>
            <Select value={proverb} onValueChange={setProverb}>
              <SelectTrigger className="border-[#1C9AAF] focus:ring-[#20b1c9]">
                <SelectValue placeholder="Select an Arabic proverb" />
              </SelectTrigger>
              <SelectContent>
                {proverbs.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleGenerateStory}
            disabled={isLoading || !name || !age || !proverb}
            className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating
                Story...
              </>
            ) : (
              "Generate Story"
            )}
          </Button>
          <p className="text-sm text-gray-600">
            Click to generate the story based on the entered details.
          </p>

          {story && (
            <div className="p-4 border-2 border-[#1C9AAF] rounded-md bg-[#f0f9fa]">
              <h2 className="text-xl font-semibold mb-2 text-[#20b1c9]">
                Generated Story:
              </h2>
              <p className="text-lg font-comic-sans">{story}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleSaveStory}
            disabled={!story}
            className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
          >
            <Save className="mr-2 h-4 w-4" /> Save Story
          </Button>
          <Button
            onClick={handleExportStory}
            disabled={!story}
            className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white"
          >
            <FileDown className="mr-2 h-4 w-4" /> Export Story
          </Button>
          <Button
            onClick={handleReset}
            className="bg-white text-[#20b1c9] border-2 border-[#20b1c9] hover:bg-[#20b1c9] hover:text-white"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
