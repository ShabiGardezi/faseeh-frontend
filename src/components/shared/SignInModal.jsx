// 'use client'
// import React, { useState, useEffect } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// const SignInModal = ({ onSignIn }) => {
//   const [open, setOpen] = useState(true);

//   useEffect(() => {
//     setOpen(true);
//   }, []);

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Sign in Required</AlertDialogTitle>
//         </AlertDialogHeader>
//         <AlertDialogDescription>
//           Please sign in to download this response. This helps us keep track of
//           usage and improve our services.
//         </AlertDialogDescription>
//         <AlertDialogFooter>
//           <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={onSignIn}>Sign In</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };







import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";

const SignInModal = ({ open, onSignIn, onClose }) => {
  
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign in Required</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Please sign in to download this response. This helps us keep track of
          usage and improve our services.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSignIn}>Sign In</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignInModal;
