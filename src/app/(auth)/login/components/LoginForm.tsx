'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

import { useUser } from "@/app/hooks/userHook"
import Success from "@/app/icons/Success"
import Error from "@/app/icons/Error"
import Eye from "@/app/icons/Eye"
import EyeOff from "@/app/icons/EyeOff"

interface LoginFormInput {
  email: string,
  password: string
}

const LoginForm = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormInput>()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useUser()

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      setIsLoading(true)
      const loading = toast.loading("Logging in...")

      const userData = await axios.post('/api/auth/login', {
        email: data.email,
        password: data.password
      })
  
      setUser(userData.data)
  
      toast.success("Successfully logged in! Redirecting...", {
        duration: 3000,
        icon: <Success />
      })
      
      toast.dismiss(loading)
      router.push("/")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error, {
          duration: 3000,
          icon: <Error />
        })
      } else {
        toast.error("There was a problem. Try again later...", {
          duration: 3000,
          icon: <Error />
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm -space-y-px">

        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="email-address"
          type="email"
          autoComplete="email"
          className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
          placeholder="Email address"
          {...register("email", { required: "Please type your email!" }) }
        />
        {errors.email && <p className="text-sm mb-2 text-red-500">{errors.email.message}</p>}

        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            {...register("password", { required: "Please type your password." })}
          />
          {errors.password && <p className="text-sm mb-2 text-red-500">{errors.password.message}</p>}

          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
            onClick={togglePasswordVisibility}
          >
            {!showPassword ? (
              <Eye className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeOff className="h-5 w-5 text-gray-400" />
            )}
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
          disabled={isLoading}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${isLoading ? "text-gray-500 bg-gray-200 cursor-default" : "text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"} `}
        >
          Log in
        </button>
      </div>
    </form>
  )
}

export default LoginForm