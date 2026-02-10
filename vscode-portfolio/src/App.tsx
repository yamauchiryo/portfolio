import { useEffect, useMemo, useState } from "react";
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
  "rounded-xl border border-slate-200 bg-white p-5 shadow-[0_6px_24px_rgba(15,23,42,0.08)]";
const hoverLift =
  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]";

export default function App() {
  const [active, setActive] = useState<FileId>("README.md");
  const [tabs, setTabs] = useState<FileId[]>(["README.md"]);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

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

  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, [showIntro]);

  return (
    <div className="h-screen w-screen bg-slate-50 text-slate-900">
      {showIntro ? (
        <div className="intro-overlay">
          <div className="intro-card">
            <div className="intro-icon">
              <img src="assets/vscode.svg" alt="VS Code" className="intro-logo" />
              <div className="intro-cursor" />
              <span className="intro-click" />
            </div>
            <div className="intro-text">Welcome to my portfolio</div>
          </div>
        </div>
      ) : null}
      <div className="h-10 bg-white border-b border-slate-200 flex items-center px-3 text-lg">
        <button
          className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded md:hidden hover:bg-slate-100"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Explorer"
        >
          ☰
        </button>
        <div className="flex items-center gap-2 text-slate-700">
          <span className="inline-flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </span>
          <span className="ml-3 text-slate-600">VSCode Portfolio</span>
        </div>
        <div className="ml-auto text-slate-500 hidden sm:block">⌘/Ctrl + P to search</div>
      </div>

      <div className="h-[calc(100vh-40px)] flex">
        <div className="hidden w-72 bg-white border-r border-slate-200 p-3 md:block">
          <div className="text-lg tracking-widest text-slate-500 mb-3">EXPLORER</div>
          <div className="text-lg text-slate-500 mb-2">PORTFOLIO</div>
          <div className="space-y-1">
            {FILES.map((f) => (
              <button
                key={f.id}
                className={cx(
                  "w-full text-left px-2 py-1.5 rounded flex items-center gap-2",
                  active === f.id ? "bg-slate-100" : "hover:bg-slate-50"
                )}
                onClick={() => openFile(f.id)}
              >
                <span className="text-[#4fc1ff]">📄</span>
                <span className="text-lg text-slate-700">{f.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 text-lg text-slate-500">
            Tip: Open files with Explorer or ⌘/Ctrl+P
          </div>
        </div>

        {sidebarOpen ? (
          <div
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="h-full w-72 bg-white border-r border-slate-200 p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-lg tracking-widest text-slate-500">EXPLORER</div>
                <button
                  className="rounded px-2 py-1 text-lg text-slate-500 hover:text-slate-900"
                  onClick={() => setSidebarOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="text-lg text-slate-500 mb-2">PORTFOLIO</div>
              <div className="space-y-1">
                {FILES.map((f) => (
                  <button
                    key={f.id}
                    className={cx(
                      "w-full text-left px-2 py-1.5 rounded flex items-center gap-2",
                      active === f.id ? "bg-slate-100" : "hover:bg-slate-50"
                    )}
                    onClick={() => {
                      openFile(f.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="text-[#4fc1ff]">📄</span>
                    <span className="text-lg text-slate-700">{f.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 text-lg text-slate-500">
                Tip: Open files with Explorer or ⌘/Ctrl+P
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center overflow-x-auto">
            {tabs.map((t) => (
              <div
                key={t}
                className={cx(
                  "h-10 px-3 flex items-center gap-2 border-r border-slate-200 cursor-pointer select-none",
                  active === t ? "bg-white" : "bg-slate-100 hover:bg-slate-50"
                )}
                onClick={() => setActive(t)}
              >
                <span className="text-[#4fc1ff]">📄</span>
                <span className="text-lg text-slate-700">{t}</span>
                {t !== "README.md" && (
                  <button
                    className="ml-1 text-slate-400 hover:text-slate-700"
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

          <div className="flex-1 overflow-auto p-6 bg-gradient-to-b from-slate-50 via-white to-slate-50">
            <div className="mx-auto w-full max-w-6xl text-[20px]">
              {active === "README.md" && <ReadmeView onOpen={openFile} />}
              {active === "projects.md" && <ProjectsView />}
              {active === "research.md" && <ResearchView />}
              {active === "intern.md" && <InternView />}
            </div>
          </div>

          <div className="h-7 bg-slate-200 text-slate-700 text-lg flex items-center px-3">
            <div className="flex items-center gap-3">
              <span>Portfolio</span>
              <span className="opacity-60">•</span>
              <span>{active}</span>
            </div>
            <div className="ml-auto flex items-center gap-4 opacity-80">
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
            <div className="h-32 w-32 rounded-3xl border border-slate-200 bg-white overflow-hidden">
              <img
                src="assets/face.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-lg text-slate-500">Profile</div>
              <div className="text-2xl font-semibold tracking-tight">{PROFILE.name}</div>
              <div className="text-slate-600">{PROFILE.title}</div>
              <div className="text-lg text-slate-500">{PROFILE.location}</div>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {PROFILE.intro.map((line) => (
              <div key={line} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-lg text-slate-800">
                {line}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              className={cx(
                "inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-lg",
                hoverLift
              )}
              href={PROFILE.links.lab}
              target="_blank"
              rel="noreferrer"
            >
              <img src="assets/si-logo.png" alt="社会知能研究室" className="h-4 w-4" />
              社会知能研究室
            </a>
            <a
              className={cx(
                "inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-lg",
                hoverLift
              )}
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <img src="assets/github.png" alt="GitHub" className="h-4 w-4" />
              GitHub Portfolio
            </a>
            <a
              className={cx(
                "inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-lg",
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
          <div className="text-lg text-slate-500">Quick Start</div>
          <div className="mt-2 space-y-2">
            <button className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-left text-lg hover:bg-slate-50" onClick={() => onOpen("projects.md")}>
              → Open projects.md
            </button>
            <button className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-left text-lg hover:bg-slate-50" onClick={() => onOpen("research.md")}>
              → Open research.md
            </button>
            <button className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-left text-lg hover:bg-slate-50" onClick={() => onOpen("intern.md")}>
              → Open intern.md
            </button>
          </div>

          <div className="mt-5 grid gap-2">
          </div>
        </div>
      </div>

      <div className={cx(cardBase, hoverLift)}>
        <div className="text-lg text-slate-500">Skills</div>
        <div className="mt-3 flex flex-wrap gap-3">
          {PROFILE.skills.map((i) => (
            <span
              key={i.name}
              className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-200 px-3 py-2 text-lg text-slate-800"
            >
              <span className="grid h-7 w-7 place-items-center rounded bg-slate-50">
                <img src={i.image} alt={i.name} className="h-5 w-5" />
              </span>
              {i.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className={cx(cardBase, hoverLift)}>
          <div className="text-lg text-slate-500">Certifications</div>
          <div className="mt-3 grid gap-2">
            {PROFILE.certifications.map((c) => (
              <div key={c} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-lg text-slate-800">
                {c}
              </div>
            ))}
          </div>
        </div>
        <div className={cx(cardBase, hoverLift)}>
          <div className="text-lg text-slate-500">Hobbies</div>
          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1.2fr]">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <ul className="space-y-2 text-lg text-slate-800">
                {PROFILE.hobbies.map((h) => (
                  <li key={h.name} className="rounded-md border border-slate-200 bg-white px-3 py-2">
                    {h.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              {golfImage ? (
                <img
                  src={golfImage}
                  alt="Golf"
                  className="h-44 w-full rounded-md border border-slate-200 object-cover"
                />
              ) : (
                <div className="h-44 w-full rounded-md border border-slate-200 bg-slate-50 grid place-items-center text-lg text-slate-500">
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
          <div className="flex flex-wrap items-center gap-2 text-lg text-slate-500">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-2 text-2xl font-semibold">{p.title}</div>
          {p.org ? <div className="mt-1 text-lg text-slate-600">{p.org}</div> : null}

        

          <div className="mt-4 grid gap-3 text-lg text-slate-700">
            {p.paragraphs.map((para) => (
              <p key={para} className="leading-7">
                {para}
              </p>
            ))}
          </div>

          {p.image ? (
            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
              <img
                src={p.image}
                alt={`${p.title} figure`}
                className="w-full rounded-md border border-slate-200 object-cover"
              />
            </div>
          ) : null}

          {p.summary ? (
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-lg text-slate-800">
              {p.summary}
            </div>
          ) : null}

          <div className="mt-5">
            <div className="text-lg text-slate-500">こだわった点</div>
            <ul className="mt-2 space-y-2 text-lg text-slate-800">
              {p.highlights.map((h) => (
                <li key={h} className="rounded-lg border border-slate-200 bg-slate-50 p-3 leading-6">
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
        <div className="text-lg text-slate-500">Research</div>
        <div className="mt-1 text-lg font-semibold">{RESEARCH.title}</div>
        {RESEARCH.summary ? (
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-lg text-slate-800 leading-6">
            {RESEARCH.summary}
          </div>
        ) : null}
      </div>

      <div className={cx(cardBase, hoverLift)}>
        <div className="text-lg text-slate-500">Approach</div>
        <div className="mt-3 grid gap-2 text-lg text-slate-800">
          {RESEARCH.approach?.map((line) => (
            <div key={line} className="rounded-lg border border-slate-200 bg-slate-50 p-3 leading-6">
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className={cx(cardBase, hoverLift)}>
        <div className="text-lg text-slate-500">Diagram</div>
        <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
          <img
            src="assets/sharedplans.png"
            alt="Shared Plans diagram"
            className="w-full max-h-[360px] rounded-md border border-slate-200 object-contain"
          />
        </div>
        <div className="mt-2 text-lg text-slate-500">研究の全体像を図で示しています。</div>
      </div>
    </div>
  );
}

function InternView() {
  return (
    <div className="space-y-4">
      <div className={cx(cardBase, hoverLift)}>
        <div className="text-lg text-slate-500">Work</div>
        <div className="mt-1 text-2xl font-semibold">{INTERN.title}</div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-lg text-slate-700">
          <a
            href={INTERN.link}
            target="_blank"
            rel="noreferrer"
            className={cx(
              "rounded-full border border-slate-200 bg-white px-3 py-1 text-lg text-slate-700",
              hoverLift
            )}
          >
            markdoor.net
          </a>
        </div>
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-lg text-slate-800 leading-6">
          {INTERN.description}
        </div>
      </div>

      <div className={cx(cardBase, hoverLift)}>
        <div className="text-lg text-slate-500">開発実績</div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {INTERN.achievements.map((a) => (
            <div key={a.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl">{a.icon}</div>
              <div className="mt-2 text-lg font-semibold text-slate-900">{a.title}</div>
              <div className="mt-1 text-lg text-slate-600">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
