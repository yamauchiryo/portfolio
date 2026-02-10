import React, { useEffect, useMemo, useState } from "react";
import {
  FILES,
  type FileId,
  type Project,
  PROFILE,
  PROJECTS,
  RESEARCH,
  INTERN,
} from "./content";
import { CommandPalette } from "./components/CommandPalette";

function cx(...s: Array<string | false | undefined>) {
  return s.filter(Boolean).join(" ");
}

const cardBase =
  "rounded-xl border border-white/10 bg-[#252526] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]";
const hoverLift =
  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]";

export default function App() {
  const [active, setActive] = useState<FileId>("README.md");
  const [tabs, setTabs] = useState<FileId[]>(["README.md"]);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const fileList = useMemo(
    () => FILES.map((f) => ({ id: f.id, label: f.label })),
    []
  );

  function openFile(id: FileId) {
    setActive(id);
    setTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function closeTab(id: FileId) {
    setTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      const safe = next.length ? next : (["README.md"] as FileId[]);
      if (active === id) setActive(safe[safe.length - 1]);
      return safe;
    });
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#1e1e1e] text-white">
      <div className="h-10 bg-[#3c3c3c] border-b border-white/10 flex items-center px-3 text-sm">
        <div className="flex items-center gap-2 text-white/80">
          <span className="inline-flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </span>
          <span className="ml-3 text-white/70">VSCode Portfolio</span>
        </div>
        <div className="ml-auto text-white/50 hidden sm:block">⌘/Ctrl + P to search</div>
      </div>

      <div className="h-[calc(100vh-40px)] flex">
        <div className="w-72 bg-[#252526] border-r border-white/10 p-3">
          <div className="text-xs tracking-widest text-white/60 mb-3">EXPLORER</div>
          <div className="text-xs text-white/60 mb-2">PORTFOLIO</div>
          <div className="space-y-1">
            {FILES.map((f) => (
              <button
                key={f.id}
                className={cx(
                  "w-full text-left px-2 py-1.5 rounded flex items-center gap-2",
                  active === f.id ? "bg-white/10" : "hover:bg-white/5"
                )}
                onClick={() => openFile(f.id)}
              >
                <span className="text-[#4fc1ff]">📄</span>
                <span className="text-sm text-white/85">{f.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 text-xs text-white/50">
            Tip: Open files with Explorer or ⌘/Ctrl+P
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-10 bg-[#2d2d2d] border-b border-white/10 flex items-center overflow-x-auto">
            {tabs.map((t) => (
              <div
                key={t}
                className={cx(
                  "h-10 px-3 flex items-center gap-2 border-r border-white/10 cursor-pointer select-none",
                  active === t ? "bg-[#1e1e1e]" : "bg-[#2d2d2d] hover:bg-white/5"
                )}
                onClick={() => setActive(t)}
              >
                <span className="text-[#4fc1ff]">📄</span>
                <span className="text-sm text-white/80">{t}</span>
                {t !== "README.md" && (
                  <button
                    className="ml-1 text-white/40 hover:text-white/80"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(t);
                    }}
                    aria-label="Close tab"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-auto p-6 bg-gradient-to-b from-[#1e1e1e] via-[#1d1f24] to-[#1b1c20]">
            <div className="mx-auto w-full max-w-6xl text-[15px]">
              {active === "README.md" && <ReadmeView onOpen={openFile} />}
              {active === "projects.md" && <ProjectsView />}
              {active === "research.md" && <ResearchView />}
              {active === "intern.md" && <InternView />}
            </div>
          </div>

          <div className="h-7 bg-[#007acc] text-white/90 text-xs flex items-center px-3">
            <div className="flex items-center gap-3">
              <span>Portfolio</span>
              <span className="opacity-80">•</span>
              <span>{active}</span>
            </div>
            <div className="ml-auto flex items-center gap-4 opacity-90">
              <span>TypeScript</span>
              <span>UTF-8</span>
              <span>LF</span>
              <span>Shiga</span>
            </div>
          </div>
        </div>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        files={fileList}
        onPick={(id) => openFile(id)}
      />
    </div>
  );
}

function ReadmeView({ onOpen }: { onOpen: (id: FileId) => void }) {
  const golfImage = PROFILE.hobbies.find((h) => h.image)?.image;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className={cx(cardBase, hoverLift)}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-20 w-20 rounded-2xl border border-white/10 bg-[#1e1e1e] overflow-hidden">
              <img
                src="/assets/face.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs text-white/60">Profile</div>
              <div className="text-2xl font-semibold tracking-tight">{PROFILE.name}</div>
              <div className="text-white/70">{PROFILE.title}</div>
              <div className="text-xs text-white/50">{PROFILE.location}</div>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {PROFILE.intro.map((line) => (
              <div key={line} className="rounded-lg border border-white/10 bg-white/5 p-4 text-base text-white/85">
                {line}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              className={cx(
                "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm",
                hoverLift
              )}
              href={PROFILE.links.lab}
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/si-logo.png" alt="SI Lab" className="h-4 w-4" />
              SI Lab
            </a>
            <a
              className={cx(
                "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm",
                hoverLift
              )}
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/github.png" alt="GitHub" className="h-4 w-4" />
              GitHub Portfolio
            </a>
            <a
              className={cx(
                "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm",
                hoverLift
              )}
              href={`mailto:${PROFILE.links.email}`}
            >
              <span className="text-[#4fc1ff]">✉</span>
              {PROFILE.links.email}
            </a>
          </div>
        </div>

        <div className={cx(cardBase, hoverLift)}>
          <div className="text-xs text-white/60">Quick Start</div>
          <div className="mt-2 space-y-2">
            <button className="w-full rounded-lg bg-[#1e1e1e] border border-white/10 px-3 py-2 text-left text-sm hover:bg-white/5" onClick={() => onOpen("projects.md")}>
              → Open projects.md
            </button>
            <button className="w-full rounded-lg bg-[#1e1e1e] border border-white/10 px-3 py-2 text-left text-sm hover:bg-white/5" onClick={() => onOpen("research.md")}>
              → Open research.md
            </button>
            <button className="w-full rounded-lg bg-[#1e1e1e] border border-white/10 px-3 py-2 text-left text-sm hover:bg-white/5" onClick={() => onOpen("intern.md")}>
              → Open intern.md
            </button>
          </div>

          <div className="mt-5 grid gap-2">
          </div>
        </div>
      </div>

      <div className={cx(cardBase, hoverLift)}>
        <div className="text-xs text-white/60">Skills</div>
        <div className="mt-3 flex flex-wrap gap-3">
          {PROFILE.skills.map((i) => (
            <span
              key={i.name}
              className="inline-flex items-center gap-2 rounded-md bg-[#1e1e1e] border border-white/10 px-3 py-2 text-sm text-white/85"
            >
              <span className="grid h-7 w-7 place-items-center rounded bg-white/5">
                <img src={i.image} alt={i.name} className="h-5 w-5" />
              </span>
              {i.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className={cx(cardBase, hoverLift)}>
          <div className="text-xs text-white/60">Certifications</div>
          <div className="mt-3 grid gap-2">
            {PROFILE.certifications.map((c) => (
              <div key={c} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/85">
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className={cx(cardBase, hoverLift)}>
          <div className="text-xs text-white/60">Hobbies</div>
          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1.2fr]">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <ul className="space-y-2 text-sm text-white/85">
                {PROFILE.hobbies.map((h) => (
                  <li key={h.name} className="rounded-md border border-white/10 bg-[#1e1e1e] px-3 py-2">
                    {h.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#1e1e1e] p-3">
              {golfImage ? (
                <img
                  src={golfImage}
                  alt="Golf"
                  className="h-44 w-full rounded-md border border-white/10 object-cover"
                />
              ) : (
                <div className="h-44 w-full rounded-md border border-white/10 bg-[#15171b] grid place-items-center text-xs text-white/50">
                  Golf photo
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {PROJECTS.map((p: Project) => (
        <div key={p.title} className={cx(cardBase, hoverLift)}>
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-2 text-2xl font-semibold">{p.title}</div>
          {p.org ? <div className="mt-1 text-sm text-white/70">{p.org}</div> : null}

        

          <div className="mt-4 grid gap-3 text-sm text-white/80">
            {p.paragraphs.map((para) => (
              <p key={para} className="leading-7">
                {para}
              </p>
            ))}
          </div>

          {p.image ? (
            <div className="mt-4 rounded-lg border border-white/10 bg-[#1e1e1e] p-3">
              <img
                src={p.image}
                alt={`${p.title} figure`}
                className="w-full rounded-md border border-white/10 object-cover"
              />
            </div>
          ) : null}

          {p.summary ? (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/85">
              {p.summary}
            </div>
          ) : null}

          <div className="mt-5">
            <div className="text-xs text-white/50">こだわった点</div>
            <ul className="mt-2 space-y-2 text-sm text-white/85">
              {p.highlights.map((h) => (
                <li key={h} className="rounded-lg border border-white/10 bg-white/5 p-3 leading-6">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResearchView() {
  return (
    <div className="grid gap-3 md:grid-rows-[auto_1fr] md:grid-cols-2">
      <div className={cx(cardBase, hoverLift, "md:col-span-2")}>
        <div className="text-xs text-white/60">Research</div>
        <div className="mt-1 text-lg font-semibold">{RESEARCH.title}</div>
        {RESEARCH.summary ? (
          <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/85 leading-6">
            {RESEARCH.summary}
          </div>
        ) : null}
      </div>

      <div className={cx(cardBase, hoverLift)}>
        <div className="text-xs text-white/60">Approach</div>
        <div className="mt-3 grid gap-2">
          <DiagramCard title="α / Recipe" desc="共有計画の設計と外在化" />
          <DiagramCard title="Context" desc="根拠の接続と更新" />
          <DiagramCard title="Intentions" desc="合意→修正→実行" />
        </div>
      </div>

      <div className={cx(cardBase, hoverLift)}>
        <div className="text-xs text-white/60">Diagram</div>
        <div className="mt-3 rounded-lg border border-white/10 bg-[#1e1e1e] p-3">
          <img
            src="/assets/sharedplans.png"
            alt="Shared Plans diagram"
            className="w-full max-h-[360px] rounded-md border border-white/10 object-contain"
          />
        </div>
        <div className="mt-2 text-xs text-white/60">研究の全体像を図で示しています。</div>
      </div>
    </div>
  );
}

function DiagramCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className={cx("rounded-lg border border-white/10 bg-white/5 p-3", hoverLift)}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-xs text-white/70">{desc}</div>
    </div>
  );
}

function InternView() {
  return (
    <div className="space-y-4">
      <div className={cx(cardBase, hoverLift)}>
        <div className="text-xs text-white/60">Intern / Work</div>
        <div className="mt-1 text-xl font-semibold">{INTERN.title}</div>
        <div className="mt-3 grid gap-2">
          {INTERN.summary.map((s) => (
            <div key={s} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80">
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className={cx(cardBase, hoverLift)}>
          <div className="text-xs text-white/60">Outcomes</div>
          <div className="mt-3 space-y-2">
            {INTERN.outcomes.map((o) => (
              <div key={o} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                {o}
              </div>
            ))}
          </div>
        </div>
        <div className={cx(cardBase, hoverLift)}>
          <div className="text-xs text-white/60">Approach</div>
          <div className="mt-3 rounded-lg border border-white/10 bg-[#1e1e1e] p-4 text-sm text-white/80">
            {INTERN.approach}
          </div>
        </div>
      </div>
    </div>
  );
}
