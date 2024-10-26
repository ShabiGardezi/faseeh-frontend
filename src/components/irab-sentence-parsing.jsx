'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Save, FileDown, RefreshCw } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function IrabSentenceParsingComponent() {
  const [inputText, setInputText] = useState('')
  const [parsingResult, setParsingResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleParseSentence = async () => {
    setIsLoading(true)
    // Placeholder for API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setParsingResult(`
      Parsing result for: "${inputText}"
      
      1. Word: [First word]
         - Part of Speech: [e.g., Noun, Verb, etc.]
         - Case: [e.g., Nominative, Accusative, etc.]
         - Additional Information: [Any other relevant grammatical details]

      2. Word: [Second word]
         - Part of Speech: [e.g., Noun, Verb, etc.]
         - Case: [e.g., Nominative, Accusative, etc.]
         - Additional Information: [Any other relevant grammatical details]

      ... [Continue for each word in the sentence]
    `)
    setIsLoading(false)
  }

  const handleSaveResult = () => {
    // Placeholder for saving functionality
    toast({
      title: "Parsing Result Saved",
      description: "Your parsing result has been successfully saved in your activity log.",
    })
  }

  const handleExportResult = () => {
    // Placeholder for export functionality
    toast({
      title: "Parsing Result Exported",
      description: "Your parsing result has been exported as a PDF document.",
    })
  }

  const handleReset = () => {
    setInputText('')
    setParsingResult('')
  }

  return (
    (<div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#20b1c9]">Irab (Sentence Parsing)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Textarea
            placeholder="Enter the sentence you want to parse here."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-32 p-4 border-2 border-[#1C9AAF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#20b1c9]" />
          <Button
            onClick={handleParseSentence}
            disabled={isLoading || !inputText}
            className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Parsing Sentence...
              </>
            ) : (
              'Parse Sentence'
            )}
          </Button>
          
          {parsingResult && (
            <div className="p-4 border-2 border-[#1C9AAF] rounded-md bg-[#f0f9fa]">
              <h2 className="text-xl font-semibold mb-2 text-[#20b1c9]">Parsing Result:</h2>
              <pre className="whitespace-pre-wrap text-sm">{parsingResult}</pre>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleSaveResult}
            disabled={!parsingResult}
            className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white">
            <Save className="mr-2 h-4 w-4" /> Save Result
          </Button>
          <Button
            onClick={handleExportResult}
            disabled={!parsingResult}
            className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white">
            <FileDown className="mr-2 h-4 w-4" /> Export Results
          </Button>
          <Button
            onClick={handleReset}
            className="bg-white text-[#20b1c9] border-2 border-[#20b1c9] hover:bg-[#20b1c9] hover:text-white">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </CardFooter>
      </Card>
    </div>)
  );
}