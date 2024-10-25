'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, UploadCloud, Download, RefreshCw } from 'lucide-react'

export function TashkeelVowelizationComponent() {
  const [inputText, setInputText] = useState('')
  const [file, setFile] = useState(null)
  const [vowelizedText, setVowelizedText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  const handleStartTashkeel = async () => {
    setIsLoading(true)
    // Placeholder for API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setVowelizedText('هَذَا نَصٌّ مُشَكَّلٌ كَمِثَالٍ')
    setIsLoading(false)
  }

  const handleExportResults = () => {
    // Placeholder for export functionality
    console.log('Exporting results...')
  }

  const handleReset = () => {
    setInputText('')
    setFile(null)
    setVowelizedText('')
  }

  return (
    (<div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-[#20b1c9]">Tashkeel (Vowelization)</h1>
        
        <Textarea
          placeholder="Enter the text you want to vowelize here."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-40 p-4 border-2 border-[#1C9AAF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#20b1c9]" />
        
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => document.getElementById('fileInput')?.click()}
            className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white">
            <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
          </Button>
          <input
            id="fileInput"
            type="file"
            accept=".doc,.docx,.pdf"
            onChange={handleFileUpload}
            className="hidden" />
          <span className="text-sm text-gray-600">
            {file ? file.name : 'Upload your document in Word or PDF format to vowelize its content.'}
          </span>
        </div>
        
        <Button
          onClick={handleStartTashkeel}
          disabled={isLoading || (!inputText && !file)}
          className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            'Start Tashkeel'
          )}
        </Button>
        
        {vowelizedText && (
          <div className="p-4 border-2 border-[#1C9AAF] rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-[#20b1c9]">Vowelized Text:</h2>
            <p className="text-lg" dir="rtl">{vowelizedText}</p>
          </div>
        )}
        
        <div className="flex space-x-4">
          <Button
            onClick={handleExportResults}
            disabled={!vowelizedText}
            className="flex-1 bg-[#1C9AAF] hover:bg-[#20b1c9] text-white">
            <Download className="mr-2 h-4 w-4" /> Export Results
          </Button>
          <Button
            onClick={handleReset}
            className="flex-1 bg-white text-[#20b1c9] border-2 border-[#20b1c9] hover:bg-[#20b1c9] hover:text-white">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
      </div>
    </div>)
  );
}