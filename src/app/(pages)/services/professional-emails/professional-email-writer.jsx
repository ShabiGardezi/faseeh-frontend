"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { FileText, Trash2, Eye, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { jsPDF } from "jspdf";
import axiosInstance from "@/lib/axios";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import useDownloadPdf from "@/hooks/useDownloadPdf";

const formSchema = z.object({
  purpose: z
    .string()
    .min(1, "الغرض مطلوب")
    .max(100, "يجب أن يكون الغرض 100 حرف أو أقل"),
  recipient: z
    .string()
    .min(1, "المستلم مطلوب")
    .max(50, "يجب أن يكون المستلم 50 حرفًا أو أقل"),
  tone: z
    .string({
      required_error: "يرجى اختيار نبرة",
    })
    .nonempty("يرجى اختيار نبرة"),
  mainDetails: z
    .string()
    .min(10, "يجب أن تكون التفاصيل الرئيسية على الأقل 10 أحرف")
    .max(500, "يجب أن تكون التفاصيل الرئيسية 500 حرف أو أقل"),
  cta: z
    .string()
    .min(1, "دعوة للعمل مطلوبة")
    .max(100, "يجب أن تكون دعوة للعمل 100 حرف أو أقل"),
});

export function ProfessionalEmailWriterComponent() {
  const { toast } = useToast();
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [activityLog, setActivityLog] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEmailSaved, setIsEmailSaved] = useState(false);
  const { downloadPdf } = useDownloadPdf();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: "",
      recipient: "",
      tone: undefined,
      mainDetails: "",
      cta: "",
    },
  });

  const handleGenerateEmail = async (values) => {
    setIsGenerating(true);

    try {
      // Make the API request with axiosInstance
      const response = await axiosInstance.post("/professional-email", {
        purpose: values.purpose,
        recipient: values.recipient,
        tone: values.tone,
        mainDetails: values.mainDetails,
        cta: values.cta,
      });

      // Get the generated text from the response
      const generatedText = response?.data?.generated_text;

      // Set the generated email in state
      setGeneratedEmail(generatedText);
    } catch (error) {
      console.error("Error generating email:", error);
      toast({
        title: "Error",
        description: "Failed to generate email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveEmail = () => {
    if (generatedEmail) {
      const newLogEntry = {
        id: Date.now(),
        recipient: form.getValues("recipient"),
        purpose: form.getValues("purpose"),
        content: generatedEmail,
        tone: form.getValues("tone"),
      };
      setActivityLog((prevLog) => [newLogEntry, ...prevLog]);
      setIsEmailSaved(true); // Disable the button after saving once
      toast({
        title: "Email Saved",
        description: "Email saved successfully in your activity log.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please generate an email before saving.",
        variant: "destructive",
      });
    }
  };

  const handleExportEmail = (email) => {
    if (generatedEmail) {
      downloadPdf(generatedEmail, "email.pdf");
      // Show toast notification
      toast({
        title: "Email Exported",
        description: `Email to ${email.recipient} exported successfully as PDF.`,
      });
    }
  };

  const handleDeleteEmail = (id) => {
    setActivityLog((prevLog) => prevLog.filter((entry) => entry.id !== id));
    toast({
      title: "Email Deleted",
      description: "Email removed from activity log.",
    });
  };

  const resetForm = () => {
    form.reset({
      purpose: "",
      recipient: "",
      tone: "",
      mainDetails: "",
      cta: "",
    });
    setGeneratedEmail("");
    setIsEmailSaved(false);
  };

  return (
    <>
      <LoadingOverlay isLoading={isGenerating} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 max-w-4xl bg-[#ffffff] overflow-hidden"
        dir="rtl"
      >
        {/* main title  */}
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-3xl font-bold mb-6 text-center text-[#20b1c9]"
        >
          كاتب بريد إلكتروني محترف
        </motion.h1>

        {/* form  section*/}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleGenerateEmail)}
              className="space-y-6"
            >
              {/* purpose field  */}
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>غرض</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="أدخل غرض البريد الإلكتروني"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* recipient field  */}
              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المستلم</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم المستلم" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tone field */}
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نبرة</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value); // Update form value
                      }}
                      value={field.value} // Bind the select value to the form value
                      dir="rtl"
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نبرة البريد الإلكتروني" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="formal">رسمي</SelectItem>
                        <SelectItem value="friendly">ودود</SelectItem>
                        <SelectItem value="informal">غير رسمي</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* mainDetails field  */}
              <FormField
                control={form.control}
                name="mainDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التفاصيل الرئيسية</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="أدخل التفاصيل الرئيسية"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* cta field  */}
              <FormField
                control={form.control}
                name="cta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>دعوة للعمل</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل دعوة للعمل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* submit  and reset buttons  */}
              <div className="flex gap-4">
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري التوليد...
                    </>
                  ) : (
                    "توليد بريد إلكتروني"
                  )}
                </Button>
                <Button type="reset" variant="outline" onClick={resetForm}>
                  إعادة تعيين
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>

        {/* generated email section  */}
        <AnimatePresence>
          {generatedEmail && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>البريد الإلكتروني المُولد</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap">{generatedEmail}</pre>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button onClick={handleSaveEmail} disabled={isEmailSaved}>
                    {isEmailSaved
                      ? "تم حفظ البريد الإلكتروني"
                      : "احفظ في سجل النشاط"}
                  </Button>
                  <Button
                    onClick={() =>
                      handleExportEmail({
                        recipient: form.getValues("recipient"),
                        content: generatedEmail,
                      })
                    }
                  >
                    تصدير البريد الإلكتروني
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* activity log section  */}
        {!generatedEmail && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>سجل النشاط</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>المستلم</TableHead>
                      <TableHead>الغرض</TableHead>
                      <TableHead>النبرة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLog.map((entry) => (
                      <motion.tr
                        key={entry.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        dir="ltr"
                      >
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
                                <SheetHeader dir="rtl">
                                  <SheetTitle>
                                    تفاصيل البريد الإلكتروني
                                  </SheetTitle>
                                  <SheetDescription>
                                    البريد الإلكتروني إلى {entry.recipient}
                                  </SheetDescription>
                                </SheetHeader>
                                <div className="mt-4" dir="rtl">
                                  <pre className="whitespace-pre-wrap">
                                    {entry.content}
                                  </pre>
                                </div>
                              </SheetContent>
                            </Sheet>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleExportEmail(entry)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteEmail(entry.id)}
                            >
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
        )}
      </motion.div>
    </>
  );
}
