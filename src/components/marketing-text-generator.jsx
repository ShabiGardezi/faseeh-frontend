'use client';
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Save, FileDown, RefreshCw, Plus, X } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function MarketingTextGeneratorComponent() {
  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [benefits, setBenefits] = useState([])
  const [currentBenefit, setCurrentBenefit] = useState('')
  const [cta, setCta] = useState('')
  const [marketingText, setMarketingText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddBenefit = () => {
    if (currentBenefit.trim()) {
      setBenefits([...benefits, currentBenefit.trim()])
      setCurrentBenefit('')
    }
  }

  const handleRemoveBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index))
  }

  const handleGenerateText = async () => {
    setIsLoading(true)
    // Placeholder for API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setMarketingText(
      `Attention ${audience}! Discover the amazing ${product} that ${benefits.join(', ')}. Don't miss out - ${cta}!`
    )
    setIsLoading(false)
  }

  const handleSaveText = () => {
    // Placeholder for saving functionality
    toast({
      title: "Marketing Text Saved",
      description: "Your marketing text has been successfully saved in your activity log.",
    })
  }

  const handleExportText = () => {
    // Placeholder for export functionality
    toast({
      title: "Marketing Text Exported",
      description: "Your marketing text has been exported as a PDF document.",
    })
  }

  const handleReset = () => {
    setProduct('')
    setAudience('')
    setBenefits([])
    setCurrentBenefit('')
    setCta('')
    setMarketingText('')
  }

  return (
    (<div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#20b1c9]">Marketing Text Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="product">Product/Service Name</Label>
            <Input
              id="product"
              placeholder="Enter the product or service name"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="border-[#1C9AAF] focus:ring-[#20b1c9]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input
              id="audience"
              placeholder="Describe your target audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="border-[#1C9AAF] focus:ring-[#20b1c9]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="benefits">Key Benefits/Features</Label>
            <div className="flex space-x-2">
              <Input
                id="benefits"
                placeholder="Enter a key feature or benefit"
                value={currentBenefit}
                onChange={(e) => setCurrentBenefit(e.target.value)}
                className="border-[#1C9AAF] focus:ring-[#20b1c9]" />
              <Button
                onClick={handleAddBenefit}
                className="bg-[#20b1c9] hover:bg-[#1C9AAF] text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-[#f0f9fa] text-[#1C9AAF] px-3 py-1 rounded-full flex items-center">
                  <span>{benefit}</span>
                  <button
                    onClick={() => handleRemoveBenefit(index)}
                    className="ml-2 text-[#1C9AAF] hover:text-[#20b1c9]">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta">Call to Action (CTA)</Label>
            <Input
              id="cta"
              placeholder="Enter your desired CTA (e.g., 'Buy now', 'Learn more')"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              className="border-[#1C9AAF] focus:ring-[#20b1c9]" />
          </div>
          <Button
            onClick={handleGenerateText}
            disabled={isLoading || !product || !audience || benefits.length === 0 || !cta}
            className="w-full bg-[#20b1c9] hover:bg-[#1C9AAF] text-white">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Text...
              </>
            ) : (
              'Generate Marketing Text'
            )}
          </Button>
          
          {marketingText && (
            <div className="p-4 border-2 border-[#1C9AAF] rounded-md bg-[#f0f9fa]">
              <h2 className="text-xl font-semibold mb-2 text-[#20b1c9]">Generated Marketing Text:</h2>
              <p className="text-lg">{marketingText}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleSaveText}
            disabled={!marketingText}
            className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white">
            <Save className="mr-2 h-4 w-4" /> Save Text
          </Button>
          <Button
            onClick={handleExportText}
            disabled={!marketingText}
            className="bg-[#1C9AAF] hover:bg-[#20b1c9] text-white">
            <FileDown className="mr-2 h-4 w-4" /> Export Text
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