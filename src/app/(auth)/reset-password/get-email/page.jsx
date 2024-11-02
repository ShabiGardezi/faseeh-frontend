"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

// Validation schema
const schema = yup
  .object({
    identifier: yup.string().email("البريد الإلكتروني غير صحيح").required("البريد الإلكتروني مطلوب"),
  })
  .required();

function GetEmailForForgetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Send a POST request to the reset-password-request endpoint
      const response = await axiosInstance.post('/auth/reset-password-request', {
        identifier: data.identifier,
      });

      if (response.status === 200) {
        console.log(response.data.message); // e.g., "تم إرسال رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني بنجاح"
        toast({
          title: "تم إرسال رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني بنجاح",
          description: "يرجى التحقق من بريدك الإلكتروني للحصول على مزيد من التعليمات.",
          variant: "success",
        });
        // setIsSubmitted(true);
      } else {
        console.error(response.data.message); // handle unexpected status
        toast({
          title: "خطأ",
          description: "فشل في توليد البريد الإلكتروني. يرجى المحاولة مرة أخرى.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error('خطأ:', error.response ? error.response.data.message : error.message);

      toast({
        title: "خطأ",
        description: "فشل في توليد البريد الإلكتروني. يرجى المحاولة مرة أخرى.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#20b1c9] bg-opacity-10">
      <div className="bg-white ring-1 ring-[#20b1c9] p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href={"/"}>
            <div className="w-32 h-32 bg-[#20b1c9] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            <img
                src="/images/logo.png"
                alt="شعار الشركة"
                className="w-full h-full object-contain rounded-[50%]"
              />
            </div>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          هل نسيت كلمة المرور؟
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                البريد الإلكتروني / اسم المستخدم
              </label>
              <input
                {...register("identifier")}
                type="text"
                id="identifier"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9] bg-white"
                placeholder="أدخل بريدك الإلكتروني أو اسم المستخدم"
              />
              {errors.identifier && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#20b1c9] hover:bg-[#1C9AAF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20b1c9] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                    جاري الإرسال...
                  </>
                ) : (
                  "إعادة تعيين كلمة المرور"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              تم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.
            </p>
            <p className="text-gray-600">
              يرجى التحقق من صندوق الوارد الخاص بك واتباع التعليمات لإعادة تعيين كلمة المرور.
            </p>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          هل تتذكر كلمة المرور الخاصة بك؟{" "}
          <Link
            href="/login"
            className="font-medium text-[#1C9AAF] hover:text-[#20b1c9]"
          >
            سجّل الدخول الآن
          </Link>
        </p>
      </div>
    </div>
  );
}

export default GetEmailForForgetPassword;  
