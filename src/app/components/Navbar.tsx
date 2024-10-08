import Link from "next/link"

import HeaderAuth from "./HeaderAuth"
import About from "../icons/About"
import Home from "../icons/Home"

const Navbar = () => {
  return (
    <header className="absolute left-0 right-0 mx-auto flex flex-col sm:flex-row justify-center items-center gap-x-10 my-4">
      <Link href="/" className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
        <Home width="24" height="24" />
        Home
      </Link>
      <Link href="/about" className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
        <About width="24" height="24" />
        About
      </Link>
      <HeaderAuth />
    </header>
  )
}

export default Navbar