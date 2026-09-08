
export default function LoginBackground({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white">

      {/* Background glow - top left */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px]" />

      {/* Background glow - bottom right */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* Decorative radial glow */}
      <div className="pointer-events-none absolute left-[25%] top-[45%] h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/10" />

      <div className="pointer-events-none absolute left-[25%] top-[45%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/10" />

      <div className="pointer-events-none absolute left-[25%] top-[45%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/10" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>

    </div>
  );
}

