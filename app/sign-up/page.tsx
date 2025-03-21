// import React, { useState } from "react";

// import { useSignUp } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "../_components/ui/button";
// import { Input } from "../_components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../_components/ui/card";

// function SignUp() {
//   const { isLoaded, signUp, setActive } = useSignUp();

//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");
//   const [pendingVerification, setPendingVerification] = useState(false);
//   const [code, setCode] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState("");

//   const router = useRouter();

//   if (!isLoaded) {
//     return null;
//   }

//   async function submit(e: React.FormEvent) {
//     e.preventDefault();

//     if (!isLoaded) {
//       return;
//     }

//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       });

//       await signUp.prepareEmailAddressVerification({
//         strategy: "email_code",
//       });

//       setPendingVerification(true);
//     } catch (error: any) {
//       console.log(JSON.stringify(error, null, 2));
//       setError(error.errors[0].message);
//     }
//   }

//   async function onPressVerify(e: React.FormEvent) {
//     e.preventDefault();

//     if (!isLoaded) {
//       return;
//     }

//     try {
//       const completeSignUp = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       router.push("/");
//     } catch (error: any) {
//       console.log(JSON.stringify(error, null, 2));
//       setError(error.errors[0].message);
//     }
//   }
// }

// export default SignUp;
