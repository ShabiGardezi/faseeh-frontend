import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axiosInstance from "@/lib/axios"; // Adjust this path if necessar
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
      const res = await axiosInstance.post("/api/auth/google-login", {
        token: idToken,
      });

      if (res.status === 200) {
        console.log("Login/Sign-Up Success:", res.data);

        // Assuming the response contains user data and token
        const { user, token } = res.data; // Adjust this line based on your backend response structure

        // Save user data and token in the context
        saveUserData(user, token);

        // router.push('/')

        toast({
          title: "Success",
          description: "Logged in successfully",
          variant: "success",
        });
      } else {
        console.error("Error:", res.data.message);

        toast({
          title: "Error",
          description:
            res.data.message ||
            "There was an error during sign-in. Please try again.",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);

      toast({
        title: "Error",
        description: "There was an error during sign-in. Please try again.",
        variant: "error",
      });
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);

    toast({
      title: "Error",
      description: "There was an error during sign-in. Please try again.",
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
