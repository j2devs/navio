import React from "react";

type Props = {};

const Sidebar: React.FC<Props> = () => {
  return (
    <aside className="w-72 bg-white p-6 border-r border-slate-200 shadow-sm fixed left-0 top-0 h-full z-10">
      <div className="flex items-center mb-8">
        <span
          className="text-3xl font-bold bg-gradient-to-tr from-violet-500 to-cyan-400 bg-clip-text text-transparent">
          Navio
        </span>
      </div>

      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center text-3xl text-white mb-4 shadow-[0_4px_20px_rgba(139,92,246,0.3)]">
          TU
        </div>
        <div className="text-2xl font-bold text-slate-800">Tester User</div>
        <div className="text-slate-500 text-sm">@tester</div>
        <div className="flex gap-3 my-5">
          {["Followers", "Following", "Countries", "Posts"].map((label) => (
            <div className="text-center flex-1" key={label}>
              <div className="text-base font-bold text-slate-800">0</div>
              <div className="text-[10px] uppercase tracking-wide text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mb-8 transition-transform duration-300" id="search-box">
        <input
          className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl text-sm bg-slate-50 focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-200 transition-all duration-300"
          placeholder="Search..."
          type="text"
          onFocus={(e) => (e.currentTarget.parentElement!.style.transform = "scale(1.02)")}
          onBlur={(e) => (e.currentTarget.parentElement!.style.transform = "scale(1)")}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
      </div>

      <ul className="space-y-2">
        {[
          { label: "✈️ Trips", count: 0, active: true },
          { label: "🌍 Countries", count: 0 },
          { label: "📝 My Posts", count: 0 },
          { label: "📤 Share Profile" },
          { label: "⚙️ Settings" },
        ].map((item) => (
          <li key={item.label}>
            <a
              className={`nav-link flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${item.active
                ? "text-violet-500 bg-gradient-to-tr from-violet-500/10 to-cyan-400/10"
                : "text-slate-500 hover:text-violet-500 hover:bg-gradient-to-tr hover:from-violet-500/10 hover:to-cyan-400/10"
                }`}
              href="#"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
            >
              {item.label}
              {"count" in item && (
                <span className="ml-auto text-xs bg-cyan-500 text-white px-2 py-1 rounded-full">
                  {item.count}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
