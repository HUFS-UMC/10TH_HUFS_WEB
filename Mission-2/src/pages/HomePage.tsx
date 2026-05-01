const HomePage = () => {

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(128,123,255,0.18),_transparent_45%),linear-gradient(180deg,_#0b0b12_0%,_#08080d_100%)] px-4 py-10">
      <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center shadow-2xl shadow-black/40 backdrop-blur-md">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/45">Mission 3</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Home Page</h1>
        <p className="mt-3 text-sm leading-6 text-white/65">
          Welcome to the Home Page!
        </p>
      </div>
    </div>
  )
}

export default HomePage
