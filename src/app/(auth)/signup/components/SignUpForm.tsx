'use client'

import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"

interface RegisterFormInput {
  email: string,
  username: string,
  password: string,
  repeatPassword: string
}

const SignUpForm = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<RegisterFormInput>()
  const [error, setError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    console.log(data)

    if (data.password !== data.repeatPassword) {
      setError('Passwords do not match!')
      return
    }

    const res = await axios.post('/api/users', {
      email: data.email,
      username: data.username,
      password: data.password
    })

    console.log(res)
  }
  
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            {...register("email", { required: "Please enter your email address!" })}
          />
          {errors.email && <p className="text-sm mb-2 text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Username
          </label>
          <input
            id="username"
            type="username"
            autoComplete="username"
            className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Type your username!"
            {...register("username", { required: "You should enter a username" })}
          />
          {errors.username && <p className="text-sm mb-2 text-red-500">{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="password"
            className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            {...register("password", { required: "Please enter your password." })}
          />
          {errors.password && <p className="text-sm mb-2 text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Repeat password
          </label>
          <input
            id="repeat-password"
            type="password"
            autoComplete="repeat-password"
            className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Repeat your password"
            {...register("repeatPassword", { required: "Please complete this field!" })}
          />
          {errors.repeatPassword && <p className="text-sm mb-2 text-red-500">{errors.repeatPassword.message}</p>}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create account
        </button>
      </div>
    </form>
  )
}

export default SignUpForm