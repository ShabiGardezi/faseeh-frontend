"use client";

import { useEffect, useState } from "react";
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
import { useUser } from "@/contexts/UserContext";
import { useActivityLog } from "@/contexts/ActivityLogContext";

const serviceTypeArabicMap = {
  TASHKEEL: "التشكيل",
  PROFESSIONAL_EMAIL: "البريد الإلكتروني المهني",
  PROOF_READ: "التدقيق اللغوي",
  CHILDREN_STORY: "قصة للأطفال",
  GRAMMAR_ANALYSIS: "تحليل النحو",
  MARKETING_TEXT: "النص التسويقي",
};

export default function UserProfile() {
  const { user } = useUser();
  const { fetchActivityLogs, activityLogs, removeActivityLog } = useActivityLog();
  // const [activityLog, setActivityLog] = useState(activityLogs);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { downloadPdf } = useDownloadPdf();

  useEffect(()=>{
    fetchActivityLogs()
  },[])

  const handleDownload = (id) => {
    console.log("download filename", id);

    const selectedActivity = activityLogs.find(
      (activity) => activity._id == id
    );

    console.log("download content", selectedActivity?.output);
    if (selectedActivity) {
      downloadPdf(selectedActivity?.output, serviceTypeArabicMap[selectedActivity?.serviceType]);
    }
  };

  const handleDelete = (id) => {
    removeActivityLog(id);
    toast({
      title: "تم حذف النشاط",
      description: `تم حذف السجل بنجاح`,
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="max-w-7xl mx-auto mb-8" dir="rtl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#20b1c9]">
            الملف الشخصي للمستخدم
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.profilePic} alt={user?.name} />
            <AvatarFallback>
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="pr-3">
            <h2 className="text-2xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-7xl mx-auto" dir="rtl">
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
                <TableHead className="text-right">المدخلات</TableHead>
                <TableHead className="text-right">المخرجات</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.map((activity) => (
                <TableRow key={activity._id}>
                  <TableCell>
                    {serviceTypeArabicMap[activity.serviceType]}
                  </TableCell>
                  <TableCell>
                    {new Date(activity.createdAt).toLocaleDateString("ar-EG")}
                  </TableCell>
                  <TableCell>
                    {activity?.input?.length > 20
                      ? `${activity?.input?.substring(0, 20)}...`
                      : activity?.input}
                  </TableCell>
                  <TableCell>
                    {activity?.output?.length > 20
                      ? `${activity?.output?.substring(0, 20)}...`
                      : activity?.output}
                  </TableCell>
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
                              {
                                serviceTypeArabicMap[
                                  selectedActivity?.serviceType
                                ]
                              }
                            </SheetTitle>
                            <SheetDescription className="text-right">
                              {new Date(
                                selectedActivity?.createdAt
                              ).toLocaleDateString("ar-EG")}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-8 text-justify">
                            <p>
                              <strong>المدخلات:</strong>{" "}
                              {selectedActivity?.input}
                            </p>
                            <p className="mt-5">
                              <strong>المخرجات:</strong>{" "}
                              {selectedActivity?.output}
                            </p>
                          </div>
                        </SheetContent>
                      </Sheet>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownload(activity._id)}
                      >
                        <FileDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(activity._id)}
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
