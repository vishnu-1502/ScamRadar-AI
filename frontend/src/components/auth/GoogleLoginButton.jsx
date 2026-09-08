
export default function GoogleLoginButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[64px] w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/40 text-base font-medium text-slate-200 transition duration-200 hover:border-slate-600 hover:bg-slate-800/50 active:scale-[0.99]"
    >
      {/* Google Logo */}
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold">
        <span className="text-blue-500">G</span>
      </span>

      Continue with Google
    </button>
  );
}

