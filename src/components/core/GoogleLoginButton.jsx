import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axiosInstance from "@/lib/axios"; // Adjust this path if necessary
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

function GoogleLoginButton() {
  const { saveUserData } = useUser(); // Destructure saveUserData from the context
  const router = useRouter();

  const handleLoginSuccess = async (response) => {
    const idToken = response.credential; // Get the ID token from the response

    try {
      // Send the token to the backend for verification
      const res = await axiosInstance.post("/auth/google-login", {
        token: idToken,
      });

      if (res.status === 200) {
        console.log("تسجيل الدخول/التسجيل بنجاح:", res.data);

        // Assuming the response contains user data and token
        const { user, token } = res.data; // Adjust this line based on your backend response structure

        // Save user data and token in the context
        saveUserData(user, token);

        router.push("/");

        toast({
          title: "نجاح",
          description: "تم تسجيل الدخول بنجاح",
          variant: "success",
        });
      } else {
        console.error("خطأ:", res.data.message);

        toast({
          title: "خطأ",
          description:
            res.data.message ||
            "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("خطأ أثناء تسجيل الدخول:", error);

      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
        variant: "error",
      });
    }
  };

  const handleLoginFailure = (error) => {
    console.error("فشل تسجيل الدخول:", error);

    toast({
      title: "خطأ",
      description: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
      variant: "error",
    });
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
