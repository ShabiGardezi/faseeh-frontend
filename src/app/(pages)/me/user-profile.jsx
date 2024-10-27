"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "@/hooks/use-toast";
import { FileDown, Trash2, Eye } from "lucide-react";
import useDownloadPdf from "@/hooks/useDownloadPdf";
import jsPDF from "jspdf";
import arabicFont from "@/app/fonts/arabicFont";

// Mock user data
const user = {
  name: "جون دو",
  email: "john.doe@example.com",
  profilePic: "/placeholder.svg?height=100&width=100",
};

// Mock activity log data
const initialActivityLog = [
  {
    id: 1,
    service: "مولد النص التسويقي",
    date: "2023-05-01",
    content: "تم إنشاء نص تسويقي للمنتج X",
  },
  {
    id: 2,
    service: "تدقيق القواعد",
    date: "2023-05-03",
    content: "تم تدقيق القواعد لمقال حول تغير المناخ",
  },
  {
    id: 3,
    service: "إعراب الجملة",
    date: "2023-05-05",
    content: "تم إعراب الجملة العربية: الْعِلْمُ نُورٌ",
  },
];

export default function UserProfile() {
  const [activityLog, setActivityLog] = useState(initialActivityLog);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { downloadPdf } = useDownloadPdf();

  const handleDownload = (id) => {

    console.log('download filename', id)
    
    const selectedActivity = initialActivityLog.find(activity => activity.id == id)
    
    console.log('download content', selectedActivity?.content)
    if (selectedActivity) {
      downloadPdf(selectedActivity?.content, selectedActivity?.service);
    }

    // const doc = new jsPDF();
    // doc.addFileToVFS("ArabicFont.ttf", arabicFont);
    // doc.addFont("ArabicFont.ttf", "ArabicFont", "normal");
    // doc.setFont("ArabicFont");

    // doc.text("مرحبا بك في ملف PDF", 10, 10, { align: "right" });
    // doc.save("arabic-text.pdf");
  };

  const handleDelete = (id) => {
    setActivityLog(activityLog.filter((activity) => activity.id !== id));
    toast({
      title: "تم حذف النشاط",
      description: `تمت إزالة النشاط ${id} من سجلك.`,
      variant: "error",
    });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto mb-8" dir="rtl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#20b1c9]">
            الملف الشخصي للمستخدم
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profilePic} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="pr-3">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-4xl mx-auto" dir="rtl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#20b1c9]">
            سجل الأنشطة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الخدمة</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.service}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Sheet>
                        <SheetTrigger asChild dir="rtl">
                          <Button
                            variant="outline"
                            size="icon"
                            className="ml-2"
                            onClick={() => setSelectedActivity(activity)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader className="mt-5">
                            <SheetTitle className="text-right text-[#20b1c9]">
                              {selectedActivity?.service}
                            </SheetTitle>
                            <SheetDescription className="text-right">
                              {selectedActivity?.date}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-8 text-right">
                            <p>{selectedActivity?.content}</p>
                          </div>
                        </SheetContent>
                      </Sheet>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownload(activity.id)}
                      >
                        <FileDown className="h-4 w-4 " />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(activity.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
