"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CutomInputField from "../CustomFields/CutomInputField";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const loginFromSchema = z.object({
  email: z.string().email({ message: "Email address is required" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." }),
});

export default function LoginForm() {
  const router = useRouter();
const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginFromSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const { email, password } = data;

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
        {error && (
          <div className="mb-4 rounded-[10px] bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLoginSubmit)}
          className="w-full"
        >
          <CutomInputField
            form={form}
            label={"Email address"}
            placeholder={"Enter your email"}
            name={"email"}
            required
            type={"email"} disabled={isLoading}
          />
          <CutomInputField
            form={form}
            label={"Password"}
            placeholder={"Enter your password"}
            isPassword
            name={"password"}
            required
            type={"password"} disabled={isLoading}
          />

          <Button
            type="submit"
            className="w-full rounded-[5px] bg-[#006988] hover:bg-[#0C4C60]"
          >
            <p className="text-[12px] font-medium leading-4.25 text-white">
              Login
            </p>
          </Button>

          <p
            onClick={() => router.push("/auth/forget-password")}
            className="mt-3.5 cursor-pointer text-center text-[12px] font-normal leading-[14.52px] text-[#007AFF] underline"
          >
            Forgot Password?
          </p>
        </form>
      </Form>
    </div>
  );
}