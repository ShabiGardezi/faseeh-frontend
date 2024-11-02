"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import GoogleLoginButton from "@/components/core/GoogleLoginButton";

// Validation schema
const schema = yup
  .object({
    name: yup
      .string()
      .required("الاسم مطلوب")
      .min(3, "يجب أن يتكون الاسم من 3 أحرف على الأقل"),
    username: yup
      .string()
      .required("اسم المستخدم مطلوب")
      .min(3, "يجب أن يتكون اسم المستخدم من 3 أحرف على الأقل"),
    email: yup.string().email("البريد الإلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
    password: yup
      .string()
      .required("كلمة المرور مطلوبة")
      .min(6, "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "يجب أن تتطابق كلمات المرور")
      .required("تأكيد كلمة المرور مطلوب"),
  })
  .required();

export function SignupPageComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    const { name, username, email, password } = data;

    try {
      const response = await axiosInstance.post("/auth/signup", {
        name,
        username,
        email,
        password,
      });

      if (response.status !== 200) {
        console.log("error: " + response.data.message);

        toast({
          title: response?.data?.message,
          description: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
          variant: "error",
        });
        return;
      }

      toast({
        title: "نجاح",
        description: "تم التسجيل بنجاح",
        variant: "success",
      });

      router.push("/login");
    } catch (error) {
      console.error("Error while signup:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#20b1c9] bg-opacity-10 py-10">
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              الاسم
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
              placeholder="أدخل اسمك"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              اسم المستخدم
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
              placeholder="أدخل اسم المستخدم"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              البريد الإلكتروني
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
              placeholder="أدخل بريدك الإلكتروني"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
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
                placeholder="أدخل كلمة المرور"
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

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
                placeholder="أكد كلمة المرور الخاصة بك"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 left-0 pl-3 flex items-center text-sm leading-5"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#20b1c9] hover:bg-[#1C9AAF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20b1c9]"
            >
              تسجيل
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
                أو تابع باستخدام
              </span>
            </div>
          </div>

          <div className="mt-6 mx-auto">
            <GoogleLoginButton />
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-600">
          لديك حساب بالفعل؟{" "}
          <Link
            href="/login"
            className="font-medium text-[#20b1c9] hover:text-[#1C9AAF]"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
