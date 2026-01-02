"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/atoms/Button";
import CustomInput from "../atoms/CustomInput";
import Icon from "../atoms/Icon";

import { useLoginMutation } from "@/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials } from "@/features/auth/authSlice";

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((s) => s.auth.user);
  const rehydrated = useAppSelector((s) => s.auth.rehydrated);

  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  /**
   * Wait for Redux Persist to hydrate before redirecting
   */
  // useEffect(() => {
  //   console.log("Rehydrated:", rehydrated);
  //   if (!rehydrated) return; // do nothing until hydration finishes
  //   console.log("Rehydrated:", rehydrated, "Userrrr:", user);

  //   if (user) {
  //     console.log("Before redirect");
  //     router.replace("/");
  //     console.log("After redirect");
  //   }
  // }, [rehydrated, user, router]);

  useEffect(() => {
    if (!rehydrated) return;
    if (!user) return;

    // Ensure browser is fully hydrated
    const id = setTimeout(() => {
      console.log("Hydration settled → redirecting...");
      // router.replace("/");
      window.location.replace("/");

    }, 150);

    return () => clearTimeout(id);
  }, [rehydrated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ username, password }).unwrap();

      // Save user into redux + persist
      dispatch(setCredentials(response));

      // Redirect immediately — hydration already complete
      // router.replace("/");
    } catch (err: any) {
      setError(err?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <h1 className="text-xl font-semibold mb-4">Epic Sugar - Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="relative">
            <CustomInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[42px] cursor-pointer"
            >
              {showPassword ? (
                <Icon name="EyeIcon" />
              ) : (
                <Icon name="EyeCloseIcon" />
              )}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <p>version 1.0.4</p>
      </div>
    </div>
  );
}
