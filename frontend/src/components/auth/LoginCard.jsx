
import { Lock, Mail, Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[560px]">

      {/* Login Card */}
      <div className="relative overflow-hidden rounded-[32px] border border-slate-700/70 bg-slate-900/75 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">

        {/* Top glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green-500/10 blur-[80px]" />

        {/* Content */}
        <div className="relative z-10">

          {/* Heading */}
          <div className="mb-9 text-center">

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome Back!
            </h1>

            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Login to your ScamRadar AI account
            </p>

          </div>


          {/* Email */}
          <div className="mb-6">

            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Email Address
            </label>

            <div className="relative">

              <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-green-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="h-[68px] w-full rounded-2xl border border-slate-700 bg-slate-950/60 pl-14 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-green-400/70 focus:ring-2 focus:ring-green-400/10"
              />

            </div>

          </div>


          {/* Password */}
          <div className="mb-3">

            <label className="mb-2 block text-sm font-semibold text-slate-200">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-green-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-[68px] w-full rounded-2xl border border-slate-700 bg-slate-950/60 pl-14 pr-14 text-white outline-none transition placeholder:text-slate-500 focus:border-green-400/70 focus:ring-2 focus:ring-green-400/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-green-400"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

          </div>


          {/* Forgot password */}
          <div className="mb-7 flex justify-end">

            <button
              type="button"
              className="text-sm font-medium text-green-400 transition hover:text-green-300"
            >
              Forgot Password?
            </button>

          </div>


          {/* Login button */}
          <button
            type="button"
            className="flex h-[68px] w-full items-center justify-center gap-3 rounded-2xl bg-green-500 text-lg font-semibold text-slate-950 shadow-[0_10px_30px_rgba(34,197,94,0.25)] transition duration-200 hover:bg-green-400 hover:shadow-[0_12px_35px_rgba(34,197,94,0.35)] active:scale-[0.99]"
          >

            <LogIn className="h-6 w-6" />

            Login

          </button>


          {/* Divider */}
          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-slate-700" />

            <span className="text-sm text-slate-500">
              or
            </span>

            <div className="h-px flex-1 bg-slate-700" />

          </div>


          {/* Google button */}
          <button
            type="button"
            className="flex h-[64px] w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/40 text-base font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800/50"
          >

            {/* Google G */}
            <span className="text-xl font-bold text-white">
              G
            </span>

            Continue with Google

          </button>


          {/* Create account */}
          <div className="mt-8 text-center text-sm text-slate-400">

            Don't have an account?

            <button
              type="button"
              className="ml-2 font-semibold text-green-400 transition hover:text-green-300"
            >
              Create Account
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

