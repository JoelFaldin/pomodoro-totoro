'use client'

import { useState } from "react"

import { signUp } from "../../actions"

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (password !== repeatPassword) {
      setError('Passwords do not match!')
      return
    }

    const form = new FormData()
    form.append('email', email)
    form.append('username', username)
    form.append('password', password)

    await signUp(form)
  }
  
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            onChange={event => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="username"
            autoComplete="username"
            required
            className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Type your username!"
            onChange={event => setUsername(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            onChange={event => setPassword(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Repeat password
          </label>
          <input
            id="repeat-password"
            name="repeat-password"
            type="password"
            autoComplete="repeat-password"
            required
            className="appearance-none bg-transparent rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Repeat your password"
            onChange={event => setRepeatPassword(event.target.value)}
          />
        </div>

        {/* <PasswordsComp setPassword={setPassword} setRepeatPassword={setRepeatPassword} /> */}
        {error ?? <p className="text-sm">{error}</p>}
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