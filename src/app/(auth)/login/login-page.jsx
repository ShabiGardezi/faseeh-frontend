"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/core/GoogleLoginButton";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

// Validation schema
const schema = yup
  .object({
    identifier: yup
      .string()
      .required("اسم المستخدم أو البريد الإلكتروني مطلوب"),
    password: yup
      .string()
      .required("كلمة المرور مطلوبة")
      .min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"),
  })
  .required();

export function LoginPageComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const { saveUserData } = useUser();

  const onSubmit = async (data) => {
    console.log(data);
    const { identifier, password } = data;

    try {
      // إجراء الطلب إلى واجهة برمجة التطبيقات باستخدام axiosInstance
      const response = await axiosInstance.post("/auth/login", {
        identifier,
        password,
      });

      if (response.status !== 200) {
        console.log("خطأ: " + response.data.message);

        toast({
          title: response?.data?.message,
          description: "فشل في تسجيل الدخول. يرجى المحاولة مرة أخرى.",
          variant: "error",
        });
        return;
      }

      toast({
        title: "نجاح",
        description: "تم تسجيل الدخول بنجاح",
        variant: "success",
      });

      console.log("المستخدم", JSON.stringify(response?.data.user));

      saveUserData(response?.data?.user, response?.data?.token);

      router.push("/");
    } catch (error) {
      console.error("خطأ أثناء تسجيل الدخول:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#20b1c9] bg-opacity-10 py-3">
      <div className="bg-white ring-1 ring-[#20b1c9] p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          {/* Replace with your actual logo */}
          <Link href={"/"}>
            <div className="w-32 h-32 bg-[#20b1c9] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              <img
                src="/images/logo.png"
                alt="Company Logo"
                className="w-full h-full object-contain rounded-[50%]"
              />
            </div>
          </Link>
        </div>

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
              className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
              placeholder="أدخل اسم المستخدم أو البريد الإلكتروني الخاص بك"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              كلمة المرور
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
                placeholder="أدخل كلمة المرور الخاصة بك"
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
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="/reset-password/get-email"
                className="font-medium text-[#1C9AAF] hover:text-[#20b1c9]"
              >
                نسيت كلمة المرور؟
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#20b1c9] hover:bg-[#1C9AAF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20b1c9]"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                أو المتابعة باستخدام
              </span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleLoginButton />
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          لست عضوًا؟{" "}
          <a
            href="/signup"
            className="font-medium text-[#1C9AAF] hover:text-[#20b1c9]"
          >
            سجل الآن
          </a>
        </p>
      </div>
    </div>
  );
}
