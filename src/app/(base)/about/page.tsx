import Image from "next/image"

const page = () => {
  return (
    <div className="bg-gradient-to-b from-slate-700 to-slate-800 w-full min-h-fit flex flex-col items-center">
      <section className="mt-32 w-1/3 border p-5 rounded-lg flex flex-col gap-y-3">
        <h1 className="text-3xl font-bold underline">The Pomodoro Technique</h1>
        <p className="text-xl">This <span className="text-orange-400">time-management method</span> helps people struggling with procastination to <span className="font-bold">improve</span> their productivity. </p>
        <p className="text-xl">It consists on dividing work time into 25-minute chunks, giving 5 minutes to rest.</p>
      </section>
      <section className="mt-5 w-1/3 border p-5 rounded-lg flex flex-col gap-y-3">
        <h2 className="text-3xl font-bold underline">How to use the timer</h2>
        <p className="text-xl">1. Start the 25 minute timer.</p>
        <p className="text-xl">2. Work on your task until the timer finishes.</p>
        <p className="text-xl">3. Take a 5 minute break.</p>
        <p className="text-xl">4. Every 4 sessions, it is recommended to take a <span className="text-orange-400">longer break</span> (15-30 minutes).</p>
      </section>
      <section className="mt-5 w-1/3 border p-5 rounded-lg flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold underline">Logging in</h3>
        <p className="text-xl">Get access to <span className="text-orange-400">more features</span> by creating an account and logging in!</p>
        <ul>
          <li className="text-xl list-disc ml-5">Customize session time to adjust to your needs</li>
          <li className="text-xl list-disc ml-5">Sync your settings across other devices</li>
          <li className="text-xl list-disc ml-5">Upload custom sounds for the alerts</li>
        </ul>
      </section>
      <section className="mt-5 w-1/3 border p-5 rounded-lg flex flex-col gap-y-3">
        <h4 className="text-3xl font-bold underline">Totoro</h4>
        <a href="https://www.deviantart.com/mfujiart/art/Totoro-Wallpaper-853071023" target="_blank">
          <Image src="/totoro_image.webp" alt="Totoro image!" width="400" height="40" className="mx-auto" priority />
        </a>
      </section>
    </div>
  )
}

export default page