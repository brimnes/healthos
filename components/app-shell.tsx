import Link from "next/link";
import {
  Activity,
  BarChart3,
  Bot,
  FileText,
  FlaskConical,
  Heart,
  Home,
  Layers,
  Search,
  Settings,
  Upload
} from "lucide-react";
import { profile } from "@/lib/mock-data";

const nav = [
  { href: "/", label: "Обзор", icon: Home },
  { href: "/markers", label: "Показатели", icon: BarChart3 },
  { href: "/analyses", label: "Анализы", icon: FlaskConical },
  { href: "/documents", label: "Документы", icon: FileText },
  { href: "/ultrasound", label: "УЗИ", icon: Layers },
  { href: "/pregnancy", label: "Беременность", icon: Heart },
  { href: "/upload", label: "Загрузить", icon: Upload },
  { href: "/ai-summary", label: "AI-сводка", icon: Bot }
];

export function AppShell({ children, active }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="flex min-h-screen bg-bg text-text">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface px-4 py-5">
        <Link href="/" className="mb-5 flex items-center gap-3 px-2">
          <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-text font-mono text-sm font-semibold text-white">h</span>
          <span>
            <span className="block text-sm font-semibold">health.os</span>
            <span className="block text-[11px] text-faint">личный кабинет</span>
          </span>
        </Link>

        <button className="btn mb-5 justify-between bg-[var(--surface-2)] text-muted">
          <span className="flex items-center gap-2"><Search size={14} /> Поиск</span>
          <span className="mono text-[11px] text-faint">⌘K</span>
        </button>

        <div className="eyebrow mb-2 px-2">Профиль</div>
        <nav className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.href || (active === "dashboard" && item.href === "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-[10px] border px-3 py-2 text-[13.5px] ${
                  isActive ? "border-border bg-[var(--surface-2)] text-text" : "border-transparent text-muted"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 space-y-1">
          <div className="eyebrow mb-2 px-2">Система</div>
          <Link href="/prototype" className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13.5px] text-muted">
            <Activity size={16} /> Дизайн-canvas
          </Link>
          <Link href="/settings" className="flex items-center gap-3 rounded-[10px] px-3 py-2 text-[13.5px] text-muted">
            <Settings size={16} /> Настройки
          </Link>
        </div>

        <div className="mt-auto rounded-2xl border border-border bg-[var(--surface-2)] p-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">{profile.initials}</span>
            <span>
              <span className="block text-sm font-semibold">{profile.name}</span>
              <span className="block text-xs text-faint">{profile.meta}</span>
            </span>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex min-h-[72px] items-center gap-5 border-b border-border bg-surface px-8 py-4">
      <div className="min-w-0 flex-1">
        <h1 className="m-0 text-[32px] font-semibold leading-tight tracking-[-0.028em]">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-faint">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </header>
  );
}
