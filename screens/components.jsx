/* global React */
// Shared primitives for Personal Health OS

const { useState, useMemo, useEffect, useRef } = React;

// ===== Icons (minimal stroke set, 16px) =====
const Icon = ({ name, size = 16, stroke = 1.5, className = '', style = {} }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
    className, style,
  };
  const P = {
    home: <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />,
    chart: <><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></>,
    flask: <><path d="M9 3h6" /><path d="M10 3v6L4 19a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 19l-6-10V3" /><path d="M7 14h10" /></>,
    upload: <><path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M5 20h14" /></>,
    file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></>,
    scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2M3 17v2a2 2 0 0 0 2 2h2M21 7V5a2 2 0 0 0-2-2h-2M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 12h10" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    bell: <><path d="M18 16v-5a6 6 0 1 0-12 0v5l-1.5 2h15z" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
    sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrowUp: <path d="M7 17L17 7M9 7h8v8" />,
    arrowDown: <path d="M17 17H9v-8M7 7l10 10" />,
    arrowRight: <path d="M5 12h14M13 5l7 7-7 7" />,
    check: <path d="M5 12l5 5L20 7" />,
    x: <path d="M6 6l12 12M18 6L6 18" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 8v.5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
    cog: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
    drop: <path d="M12 3s7 7.5 7 12a7 7 0 1 1-14 0c0-4.5 7-12 7-12z" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />,
    pulse: <path d="M3 12h4l2-7 4 14 2-7h6" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>,
    folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    filter: <path d="M3 5h18l-7 9v6l-4-2v-4z" />,
    sort: <><path d="M7 4v16M4 8l3-4 3 4" /><path d="M17 20V4M14 16l3 4 3-4" /></>,
    more: <><circle cx="5" cy="12" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="19" cy="12" r="1.2" /></>,
    trash: <><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 14h10l1-14" /><path d="M9 7V4h6v3" /></>,
    download: <><path d="M12 4v12" /><path d="M7 11l5 5 5-5" /><path d="M5 20h14" /></>,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    chevronRight: <path d="M9 6l6 6-6 6" />,
    chevronLeft: <path d="M15 6l-6 6 6 6" />,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    edit: <><path d="M4 20h4l10-10-4-4L4 16z" /><path d="M14 6l4 4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    activity: <path d="M3 12h4l3-8 4 16 3-8h4" />,
    layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /><path d="M3 17l9 5 9-5" /></>,
    play: <path d="M7 4v16l13-8z" />,
  };
  return <svg {...props}>{P[name]}</svg>;
};

// ===== Sidebar =====
function Sidebar({ active = 'dashboard', userName = 'Анна Соколова', userMeta = '32 г · Москва', compact = false }) {
  const nav = [
    { id: 'dashboard', label: 'Обзор', icon: 'home' },
    { id: 'indicators', label: 'Показатели', icon: 'chart', count: 47 },
    { id: 'analyses', label: 'Анализы', icon: 'flask', count: 18 },
    { id: 'ultrasound', label: 'УЗИ и снимки', icon: 'layers', count: 6 },
    { id: 'documents', label: 'Документы', icon: 'folder', count: 32 },
    { id: 'pregnancy', label: 'Беременность', icon: 'heart' },
    { id: 'upload', label: 'Загрузить', icon: 'upload' },
  ];
  const aux = [
    { id: 'timeline', label: 'Хронология', icon: 'calendar' },
    { id: 'ai', label: 'Ассистент', icon: 'sparkles' },
    { id: 'settings', label: 'Настройки', icon: 'cog' },
  ];
  return (
    <aside style={{
      width: compact ? 200 : 240, flex: '0 0 auto',
      borderRight: '1px solid var(--mist-border)',
      background: 'var(--mist-surface)',
      display: 'flex', flexDirection: 'column',
      padding: '20px 14px 16px',
    }}>
      {/* brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 6px 18px' }}>
        <div style={{
          width: 26, height: 26, borderRadius: 8,
          background: 'var(--mist-text)', color: 'var(--mist-surface)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'Geist Mono', fontSize: 13, fontWeight: 500,
        }}>h</div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{ fontSize: 13.5, fontWeight: 500, letterSpacing: '-0.01em' }}>health.os</span>
          <span style={{ fontSize: 10.5, color: 'var(--mist-text-faint)', letterSpacing: '0.04em' }}>персональный профиль</span>
        </div>
      </div>

      {/* search */}
      <button className="btn" style={{
        height: 32, padding: '0 10px', justifyContent: 'space-between',
        background: 'var(--mist-surface-2)', borderColor: 'var(--mist-border)',
        color: 'var(--mist-text-muted)', fontSize: 12.5, marginBottom: 18,
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="search" size={14} /> Поиск</span>
        <span style={{ display: 'flex', gap: 2 }}><span className="kbd">⌘</span><span className="kbd">K</span></span>
      </button>

      <div className="t-eyebrow" style={{ padding: '0 6px 8px' }}>Профиль</div>
      <NavList items={nav} active={active} />

      <div className="t-eyebrow" style={{ padding: '20px 6px 8px' }}>Инструменты</div>
      <NavList items={aux} active={active} />

      <div style={{ flex: 1 }} />

      {/* user */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 8px', borderRadius: 10,
        background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 999,
          background: 'var(--mist-accent-soft)', color: 'var(--mist-accent-strong)',
          display: 'grid', placeItems: 'center', fontWeight: 500, fontSize: 13,
        }}>АС</div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>{userName}</span>
          <span style={{ fontSize: 11, color: 'var(--mist-text-faint)' }}>{userMeta}</span>
        </div>
        <Icon name="chevronDown" size={14} style={{ color: 'var(--mist-text-faint)' }} />
      </div>
    </aside>
  );
}

function NavList({ items, active }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {items.map(it => {
        const isActive = it.id === active;
        return (
          <div key={it.id} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '7px 10px', borderRadius: 8,
            background: isActive ? 'var(--mist-surface-2)' : 'transparent',
            color: isActive ? 'var(--mist-text)' : 'var(--mist-text-muted)',
            fontSize: 13.5, cursor: 'default',
            border: isActive ? '1px solid var(--mist-border)' : '1px solid transparent',
          }}>
            <Icon name={it.icon} size={15} stroke={isActive ? 1.6 : 1.4} />
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.count !== undefined && (
              <span className="mono" style={{ fontSize: 11, color: 'var(--mist-text-faint)' }}>{it.count}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ===== Topbar =====
function Topbar({ title, subtitle, breadcrumbs = [], right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: '18px 32px 18px',
      borderBottom: '1px solid var(--mist-border)',
      background: 'var(--mist-surface)',
      minHeight: 72,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {breadcrumbs.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Icon name="chevronRight" size={11} style={{ color: 'var(--mist-text-faint)' }} />}
                <span style={{
                  fontSize: 12, color: i === breadcrumbs.length - 1 ? 'var(--mist-text)' : 'var(--mist-text-faint)',
                }}>{b}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 className="t-h1" style={{ margin: 0 }}>{title}</h1>
          {subtitle && <span style={{ fontSize: 13.5, color: 'var(--mist-text-faint)' }}>{subtitle}</span>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {right}
      </div>
    </div>
  );
}

// ===== Line chart with reference range =====
// data: [{ x: 0..n, y: number }, ...], range: [low, high], absMin/absMax for axis
function LineChart({
  data, range = [12, 16], yMin = 10, yMax = 18, w = 640, h = 220,
  unit = '', accent, showDots = true, padding = { l: 38, r: 16, t: 14, b: 28 },
  xLabels, currentIdx,
}) {
  const accentColor = accent || 'var(--mist-accent-strong)';
  const px = (i) => padding.l + (i / (data.length - 1)) * (w - padding.l - padding.r);
  const py = (y) => padding.t + (1 - (y - yMin) / (yMax - yMin)) * (h - padding.t - padding.b);
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${px(i).toFixed(1)} ${py(d.y).toFixed(1)}`).join(' ');
  const area = `${path} L ${px(data.length - 1).toFixed(1)} ${(h - padding.b).toFixed(1)} L ${px(0).toFixed(1)} ${(h - padding.b).toFixed(1)} Z`;

  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => yMin + (i / ticks) * (yMax - yMin));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="lc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* y grid */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={padding.l} y1={py(t)} x2={w - padding.r} y2={py(t)}
            stroke="var(--mist-border)" strokeWidth="1" strokeDasharray={i === 0 ? '0' : '2 3'} />
          <text x={padding.l - 8} y={py(t) + 3} textAnchor="end"
            fontSize="10" fontFamily="Geist Mono" fill="var(--mist-text-faint)">
            {Number.isInteger(t) ? t : t.toFixed(1)}
          </text>
        </g>
      ))}
      {/* reference range */}
      <rect x={padding.l} y={py(range[1])} width={w - padding.l - padding.r} height={py(range[0]) - py(range[1])}
        fill={accentColor} opacity="0.06" />
      <line x1={padding.l} y1={py(range[0])} x2={w - padding.r} y2={py(range[0])}
        stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <line x1={padding.l} y1={py(range[1])} x2={w - padding.r} y2={py(range[1])}
        stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <text x={w - padding.r - 4} y={py(range[1]) - 4} textAnchor="end"
        fontSize="9.5" fontFamily="Geist Mono" fill={accentColor} opacity="0.8">норма {range[0]}–{range[1]}{unit}</text>
      {/* area */}
      <path d={area} fill="url(#lc-fill)" />
      {/* line */}
      <path d={path} fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      {/* dots */}
      {showDots && data.map((d, i) => {
        const out = d.y < range[0] || d.y > range[1];
        const isCurrent = i === (currentIdx ?? data.length - 1);
        return (
          <g key={i}>
            {isCurrent && <circle cx={px(i)} cy={py(d.y)} r="9" fill={accentColor} opacity="0.1" />}
            <circle cx={px(i)} cy={py(d.y)} r={isCurrent ? 4 : 2.5}
              fill={out ? 'var(--status-amber)' : 'var(--mist-surface)'}
              stroke={out ? 'var(--status-amber)' : accentColor} strokeWidth="1.5" />
          </g>
        );
      })}
      {/* x labels */}
      {xLabels && xLabels.map((lbl, i) => (
        <text key={i} x={px(i)} y={h - 8} textAnchor="middle"
          fontSize="10" fontFamily="Geist Mono"
          fill={i === (currentIdx ?? data.length - 1) ? 'var(--mist-text)' : 'var(--mist-text-faint)'}>
          {lbl}
        </text>
      ))}
    </svg>
  );
}

// Tiny sparkline
function Sparkline({ data, w = 80, h = 28, color, range }) {
  const c = color || 'var(--mist-text-muted)';
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const path = data.map((y, i) => {
    const x = (i / (data.length - 1)) * (w - 2) + 1;
    const yy = h - 2 - ((y - min) / span) * (h - 4);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${yy.toFixed(1)}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ display: 'block' }}>
      {range && (
        <rect x="0" y={h * 0.3} width={w} height={h * 0.4}
          fill={c} opacity="0.08" />
      )}
      <path d={path} fill="none" stroke={c} strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={(w - 1)} cy={h - 2 - ((data[data.length - 1] - min) / span) * (h - 4)} r="2" fill={c} />
    </svg>
  );
}

// Status helpers
const statusOf = (value, [lo, hi]) => {
  if (value < lo * 0.85 || value > hi * 1.15) return 'coral';
  if (value < lo || value > hi) return 'amber';
  return 'mint';
};
const statusLabel = (s) => ({ mint: 'в норме', amber: 'на границе', coral: 'отклонение' })[s];

// Export
Object.assign(window, { Icon, Sidebar, Topbar, LineChart, Sparkline, statusOf, statusLabel });
