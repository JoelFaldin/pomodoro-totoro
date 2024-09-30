'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
// import Github from "@/app/icons/Github"
import Google from "@/app/icons/Google"
import Return from "@/app/icons/Return"
import AuthButton from "@/app/components/AuthButton"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const handleCredentials = (field: keyof typeof credentials, value: string) => {
    setCredentials({
      ...credentials,
      [field]: value
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-700 px-4 sm:px-6 lg:px-8">
      <div>
        <Link href="/" className="flex flex-row items-center gap-x-2">
          <Return />
          <p className="text-xl underline font-bold">Return</p>
        </Link>
      </div>

      <section className="flex flex-col justify-center items-center">
        <div className="max-w-2xl w-full space-y-8 bg-black p-8 rounded-xl shadow-2xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
              Sign in with your account
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={event => handleCredentials("email", event.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={event => handleCredentials("password", event.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {/* {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )} */}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-orange-400 hover:text-orange-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-300">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-zinc-900 text-sm font-medium text-gray-500 hover:bg-gray-950">
                <AuthButton />
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-zinc-900 text-sm font-medium text-gray-500 hover:bg-gray-950"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <Google />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              No account?{' '}
              <Link href="/signup" className="font-medium text-orange-600 hover:text-orange-500">
                Sign up now
              </Link>
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Image src="/totoro_wallpaper.webp" alt="Totoro image with a leaf!" width="300" height="40" className="w-auto rounded-xl" priority />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login