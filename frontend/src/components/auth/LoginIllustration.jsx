import {
  ShieldCheck,
  Link2,
  MessageSquare,
  Mail,
  FileText,
  Search,
} from "lucide-react";

export default function LoginIllustration() {
  return (
    <div className="relative mx-auto h-[315px] w-full max-w-[710px]">

      {/* ================================================= */}
      {/* RADAR CIRCLES */}
      {/* ================================================= */}

      <div className="absolute left-1/2 top-[53%] h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/[0.12]" />

      <div className="absolute left-1/2 top-[53%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/[0.12]" />

      <div className="absolute left-1/2 top-[53%] h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/[0.14]" />

      <div className="absolute left-1/2 top-[53%] h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-500/[0.20]" />


      {/* ================================================= */}
      {/* RADAR CROSSHAIR */}
      {/* ================================================= */}

      <div className="absolute left-1/2 top-[53%] h-[270px] w-px -translate-x-1/2 -translate-y-1/2 bg-green-500/[0.10]" />

      <div className="absolute left-1/2 top-[53%] h-px w-[270px] -translate-x-1/2 -translate-y-1/2 bg-green-500/[0.10]" />

      <div className="absolute left-1/2 top-[53%] h-[270px] w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-green-500/[0.07]" />


      {/* ================================================= */}
      {/* SHIELD */}
      {/* ================================================= */}

      <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2">

        {/* OUTER SHIELD */}

        <div
          className="
            relative
            flex
            h-[190px]
            w-[166px]
            items-center
            justify-center
            border-[2px]
            border-green-500/45
            bg-[#07101c]
            shadow-[0_0_40px_rgba(34,197,94,0.08)]
          "
          style={{
            clipPath:
              "polygon(50% 0%, 100% 24%, 92% 68%, 75% 86%, 50% 100%, 25% 86%, 8% 68%, 0% 24%)",
          }}
        >

          {/* INNER SHIELD */}

          <div
            className="
              flex
              h-[148px]
              w-[128px]
              items-center
              justify-center
              border
              border-green-500/40
              bg-[#091522]
            "
            style={{
              clipPath:
                "polygon(50% 0%, 100% 24%, 92% 68%, 75% 86%, 50% 100%, 25% 86%, 8% 68%, 0% 24%)",
            }}
          >

            {/* RADAR */}

            <div className="relative flex h-[92px] w-[92px] items-center justify-center rounded-full border border-green-500/75">

              <div className="absolute h-[64px] w-[64px] rounded-full border border-green-500/60" />

              <div className="absolute h-[35px] w-[35px] rounded-full border border-green-500/50" />

              <div className="absolute h-[19px] w-[19px] rounded-full bg-green-400 shadow-[0_0_22px_rgba(34,197,94,0.95)]" />

              <div className="absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-green-500/45" />

              <div className="absolute left-1/2 top-1/2 h-px w-full -translate-y-1/2 bg-green-500/45" />

              <div className="absolute left-1/2 top-1/2 h-[58px] w-px origin-top rotate-45 bg-green-400/60" />

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* SEARCH CIRCLE */}
      {/* ================================================= */}

      <div
        className="
          absolute
          bottom-[16px]
          left-1/2
          flex
          h-[54px]
          w-[54px]
          -translate-x-1/2
          items-center
          justify-center
          rounded-full
          border
          border-green-500/50
          bg-[#071622]
          text-green-400
          shadow-[0_0_22px_rgba(34,197,94,0.12)]
        "
      >
        <Search className="h-6 w-6" strokeWidth={2} />
      </div>


      {/* ================================================= */}
      {/* LEFT SECURITY ICONS */}
      {/* ================================================= */}

      <SecurityIcon
        icon={<ShieldCheck />}
        className="left-[17%] top-[25%]"
      />

      <SecurityIcon
        icon={<MessageSquare />}
        className="left-[5%] top-[51%]"
      />

      <SecurityIcon
        icon={<FileText />}
        className="left-[10%] bottom-[15%]"
      />


      {/* ================================================= */}
      {/* RIGHT SECURITY ICONS */}
      {/* ================================================= */}

      <SecurityIcon
        icon={<Link2 />}
        className="right-[15%] top-[29%]"
      />

      <SecurityIcon
        icon={<Mail />}
        className="right-[9%] top-[65%]"
      />

    </div>
  );
}


/* ================================================= */
/* SECURITY ICON */
/* ================================================= */

function SecurityIcon({ icon, className }) {
  return (
    <div
      className={`
        absolute
        flex
        h-[58px]
        w-[58px]
        items-center
        justify-center
        rounded-[13px]
        border
        border-slate-700
        bg-[#081421]/95
        text-green-400
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        backdrop-blur-md
        ${className}
      `}
    >
      {icon}
    </div>
  );
}