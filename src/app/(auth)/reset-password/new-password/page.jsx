"use client";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import LoadingOverlay from "@/components/shared/LoadingOverlay";

const schema = yup
  .object({
    newPassword: yup
      .string()
      .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
      .required("كلمة المرور الجديدة مطلوبة"),
  })
  .required();

function NewPassword() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  useEffect(() => {
    const tokenFromParams = searchParams.get("token");
    setToken(tokenFromParams);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const { newPassword } = data;

    if (!token) {
      toast({
        title: "خطأ",
        description: "الرمز مفقود. يرجى المحاولة مرة أخرى.",
        variant: "error",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        token: token,
        newPassword: newPassword,
      });

      if (response.status === 200) {
        console.log(response.data.message);
        toast({
          title: "تم تغيير كلمة المرور بنجاح",
          description: "يرجى تسجيل الدخول باستخدام كلمة المرور الجديدة.",
          variant: "success",
        });
        setIsSubmitted(true); // Ensure this is set to true on success
      } else {
        console.error(response.data.message);
        toast({
          title: "خطأ",
          description: "فشل تغيير كلمة المرور. يرجى المحاولة مرة أخرى.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error(
        "خطأ في إعادة تعيين كلمة المرور:",
        error.response ? error.response.data : error.message
      );
      toast({
        title: "خطأ",
        description: "فشل تغيير كلمة المرور. يرجى المحاولة مرة أخرى.",
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
          غيّر كلمة مرورك
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <input
                  {...register("newPassword")}
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
                  placeholder="أدخل كلمة المرور الجديدة"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword.message}
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
                    جاري التغيير...
                  </>
                ) : (
                  "تغيير كلمة المرور"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              تم تغيير كلمة المرور بنجاح.
            </p>
            <p className="text-gray-600">
              يرجى تسجيل الدخول باستخدام كلمة المرور الجديدة.
            </p>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          هل تذكر كلمة مرورك؟{" "}
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


// Wrap your component in a Suspense boundary
function PageWrapper() {
  return (
    <Suspense fallback={<LoadingOverlay/>}>
      <NewPassword />
    </Suspense>
  );
}

export default PageWrapper;
