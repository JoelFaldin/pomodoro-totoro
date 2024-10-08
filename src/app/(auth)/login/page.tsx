import Image from "next/image"
import Link from "next/link"

import AuthButtonGoogle from "@/app/components/GoogleButton"
import AuthButtonGH from "@/app/components/GithubButton"
import LoginForm from "./components/LoginForm"
import Return from "@/app/icons/Return"

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-700 px-4 sm:px-6 lg:px-8 pb-7">
      <Link href="/" className="flex flex-row items-center gap-x-2">
        <Return />
        <p className="text-xl underline font-bold">Return</p>
      </Link>

      <section className="flex flex-col justify-center items-center">
        <div className="max-w-2xl w-full space-y-8 bg-black p-8 rounded-xl shadow-2xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
            Sign in with your account
          </h2>
          
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-300">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-zinc-900 text-sm font-medium text-gray-500 hover:bg-gray-950">
                <AuthButtonGH />
              </div>

              <div className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-zinc-900 text-sm font-medium text-gray-500 hover:bg-gray-950">
                <AuthButtonGoogle />
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