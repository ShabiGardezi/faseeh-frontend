'use client';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast";
import { FileText, Trash2, Eye, Loader2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  purpose: z.string().min(1, 'Purpose is required').max(100, 'Purpose must be 100 characters or less'),
  recipient: z.string().min(1, 'Recipient is required').max(50, 'Recipient must be 50 characters or less'),
  tone: z.enum(['formal', 'friendly', 'informal'], {
    required_error: 'Please select a tone',
  }),
  mainDetails: z.string().min(10, 'Main details must be at least 10 characters').max(500, 'Main details must be 500 characters or less'),
  cta: z.string().min(1, 'Call to action is required').max(100, 'Call to action must be 100 characters or less'),
})

export function ProfessionalEmailWriterComponent() {
  const { toast } = useToast()
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [activityLog, setActivityLog] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: '',
      recipient: '',
      tone: undefined,
      mainDetails: '',
      cta: '',
    },
  })

  const handleGenerateEmail = async (values) => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    const email = `
Dear ${values.recipient},

I hope this email finds you well. I am writing to ${values.purpose}.

${values.mainDetails}

${values.cta}

Best regards,
[Your Name]
    `
    setGeneratedEmail(email.trim())
    setIsGenerating(false)
  }

  const handleSaveEmail = () => {
    if (generatedEmail) {
      const newLogEntry = {
        id: Date.now(),
        recipient: form.getValues('recipient'),
        purpose: form.getValues('purpose'),
        content: generatedEmail,
        tone: form.getValues('tone'),
      }
      setActivityLog(prevLog => [newLogEntry, ...prevLog])
      toast({
        title: "Email Saved",
        description: "Email saved successfully in your activity log.",
      })
    } else {
      toast({
        title: "Error",
        description: "Please generate an email before saving.",
        variant: "destructive",
      })
    }
  }

  const handleExportEmail = (email) => {
    toast({
      title: "Email Exported",
      description: `Email to ${email.recipient} exported successfully as PDF.`,
    })
  }

  const handleDeleteEmail = (id) => {
    setActivityLog(prevLog => prevLog.filter(entry => entry.id !== id))
    toast({
      title: "Email Deleted",
      description: "Email removed from activity log.",
    })
  }

  return (
    (<motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 max-w-4xl pt-[10%] bg-white">
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-3xl font-bold mb-6 text-center">
        Professional Email Writer
      </motion.h1>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleGenerateEmail)} className="space-y-6">
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the email purpose" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter recipient's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the tone of the email" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="informal">Informal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="mainDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the main details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <FormField
              control={form.control}
              name="cta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call to Action</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the call to action" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            <div className="flex gap-4">
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Email'
                )}
              </Button>
              <Button type="reset" variant="outline" onClick={() => form.reset()}>Reset</Button>
            </div>
          </form>
        </Form>
      </motion.div>
      <AnimatePresence>
        {generatedEmail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Generated Email</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap">{generatedEmail}</pre>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={handleSaveEmail}>Save to Activity Log</Button>
                <Button
                  onClick={() => handleExportEmail({ recipient: form.getValues('recipient'), content: generatedEmail })}>Export Email</Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Tone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityLog.map((entry) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                    <TableCell>{entry.recipient}</TableCell>
                    <TableCell>{entry.purpose}</TableCell>
                    <TableCell>{entry.tone}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Email Details</SheetTitle>
                              <SheetDescription>
                                Email to {entry.recipient}
                              </SheetDescription>
                            </SheetHeader>
                            <div className="mt-4">
                              <pre className="whitespace-pre-wrap">{entry.content}</pre>
                            </div>
                          </SheetContent>
                        </Sheet>
                        <Button variant="outline" size="icon" onClick={() => handleExportEmail(entry)}>
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDeleteEmail(entry.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>)
  );
}