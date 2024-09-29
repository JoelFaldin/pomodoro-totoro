import Link from "next/link"
import Home from "../icons/Home"
import About from "../icons/About"
import User from "../icons/User"

const Navbar = () => {
  return (
    <header className="absolute left-0 right-0 mx-auto flex flex-row justify-center items-center gap-x-10 my-4">
      <Link href="/" className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
        <Home width="24" height="24" />
        Home
      </Link>
      <Link href="/about" className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
        <About />
        About
      </Link>
      <Link href="/login" className="flex flex-row items-center gap-x-1 p-2 hover:rounded hover:bg-slate-600">
        <User />
        Log in
      </Link>
    </header>
  )
}

export default Navbar