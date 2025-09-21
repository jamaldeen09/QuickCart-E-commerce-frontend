import { toast } from "sonner";
import { z } from "zod";

// Update your types
export type ValidAuthTypes = "register" | "login" | "password-reset" | "otp-verification" | "change-password";

// Update the return type to include OTP validation
type AuthSchemaReturnType =
  | z.ZodObject<{
    firstname: z.ZodString;
    lastname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
  }>
  | z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
  }>
  | z.ZodObject<{
    email: z.ZodString;
  }>
  | z.ZodObject<{
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
  }>
  | z.ZodObject<{
    otp: z.ZodString;
  }>;

export const authenticationSchemaProvider = (
  authType: ValidAuthTypes
): AuthSchemaReturnType => {
  if (authType === "register") {
    return z.object({
      firstname: z.string().min(2, "Firstname must be at least 2 characters"),
      lastname: z.string().min(2, "Lastname must be at least 2 characters"),
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string()
        .min(5, "Password must be at least 5 characters")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),

    });
  } else if (authType === "login") {
    return z.object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string()
        .min(5, "Password must be at least 5 characters")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    });
  } else if (authType === "password-reset") {
    return z.object({
      email: z.string().email({ message: "Invalid email address" }),
    });
  } else if (authType === "change-password") {
    return z.object({
      newPassword: z.string()
        .min(5, "Password must be at least 5 characters")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),

      confirmPassword: z.string().min(1, "Please confirm your password"),
    }).refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  } else if (authType === "otp-verification") {
    return z.object({
      otp: z.string().min(6, "OTP must be 6 characters").max(6, "OTP must be 6 characters"),
    });
  }

  throw new Error(`Invalid authType: ${authType}`);
};

export const callToast = (
  variant: "success" | "error",
  message: string,
  duration?: number
) => {
  toast[variant](message, { duration: duration || 3000 });
}