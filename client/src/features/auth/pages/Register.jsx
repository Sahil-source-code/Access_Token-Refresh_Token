
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import {useApi} from "../../shared/api"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const api=useApi()
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Register Data:", data);
    const response= await api.post("/auth/register", data)
    console.log(response.data)

    // Backend API yahan call kar sakte ho
    // await axios.post("/api/auth/register", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-green-100 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-purple-100 bg-white p-8 shadow-2xl shadow-purple-200/50 sm:p-10">

        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-xl font-bold text-white shadow-lg shadow-purple-300">
            C
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              CreateSpace
            </h2>
            <p className="text-sm text-green-600">
              Your journey starts here
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Join us and get started today.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full name
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">
              <User size={19} className="text-purple-500" />

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
            </div>

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email address
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">
              <Mail size={19} className="text-purple-500" />

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">
              <Lock size={19} className="text-purple-500" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 transition hover:text-purple-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-purple-200 transition duration-200 hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </form>

        {/* Footer */}
        <p className="mt-7 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-green-600 transition hover:text-green-700"
          >
            Sign in
          </a>
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Secure registration
        </div>
      </div>
    </div>
  );
}
