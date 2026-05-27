/* global React, Icon, Sidebar, Topbar, Sparkline, MARKERS, HISTORY_DATES */

function AnalysesTableScreen() {
  // group markers
  const groups = [...new Set(MARKERS.map(m => m.group))];
  const grouped = groups.map(g => ({ name: g, items: MARKERS.filter(m => m.group === g) }));

  return (
    <div className="phos-root" style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar active="indicators" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Все показатели"
          subtitle="47 показателей · 18 анализов · 6 циклов"
          right={<>
            <button className="btn"><Icon name="sort" size={14} /> Группировка</button>
            <button className="btn"><Icon name="filter" size={14} /> Фильтры
              <span className="badge badge-ghost" style={{ height: 18, padding: '0 6px', fontSize: 10.5 }}>2</span>
            </button>
            <button className="btn btn-primary"><Icon name="plus" size={14} /> Сравнить</button>
          </>}
        />

        {/* sub toolbar */}
        <div style={{
          padding: '12px 32px',
          display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: '1px solid var(--mist-border)',
          background: 'var(--mist-surface)',
        }}>
          <div style={{ position: 'relative', width: 320 }}>
            <Icon name="search" size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mist-text-faint)' }} />
            <input className="input" placeholder="Поиск показателя или кода (HGB, ТТГ…)" style={{ height: 34, paddingLeft: 32, fontSize: 13 }} />
            <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 2 }}>
              <span className="kbd">⌘</span><span className="kbd">F</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Все', 'Отклонения', 'Закреплённые', 'Гормоны', 'Витамины'].map((t, i) => (
              <span key={t} style={{
                padding: '6px 12px', fontSize: 12.5, borderRadius: 8,
                background: i === 0 ? 'var(--mist-surface-2)' : 'transparent',
                color: i === 0 ? 'var(--mist-text)' : 'var(--mist-text-muted)',
                border: i === 0 ? '1px solid var(--mist-border)' : '1px solid transparent',
                cursor: 'default', fontWeight: i === 0 ? 500 : 400,
              }}>{t}</span>
            ))}
          </div>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>
            Показано <span className="mono" style={{ color: 'var(--mist-text)' }}>{MARKERS.length}</span> из <span className="mono">47</span>
          </span>
        </div>

        {/* table */}
        <div style={{ flex: 1, overflow: 'auto', background: 'var(--mist-surface)' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ paddingLeft: 32, width: '30%' }}>показатель</th>
                <th style={{ width: 110 }}>значение</th>
                <th style={{ width: 110 }}>норма</th>
                <th>динамика (6 циклов)</th>
                <th style={{ width: 110 }}>Δ за 6 мес</th>
                <th style={{ width: 110 }}>дата</th>
                <th style={{ width: 110 }}>статус</th>
                <th style={{ width: 50, paddingRight: 32 }}></th>
              </tr>
            </thead>
            <tbody>
              {grouped.map(g => (
                <React.Fragment key={g.name}>
                  <tr style={{ background: 'var(--mist-surface-2)' }}>
                    <td colSpan={8} style={{ paddingLeft: 32, padding: '8px 32px', borderBottom: '1px solid var(--mist-border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Icon name="chevronDown" size={12} style={{ color: 'var(--mist-text-faint)' }} />
                        <span className="t-eyebrow">{g.name}</span>
                        <span style={{ fontSize: 11.5, color: 'var(--mist-text-faint)' }}>{g.items.length} показателей</span>
                      </div>
                    </td>
                  </tr>
                  {g.items.map(m => <TableRow key={m.code} m={m} />)}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function TableRow({ m }) {
  const statusBadge = {
    mint: { cls: 'badge-mint', txt: 'в норме' },
    amber: { cls: 'badge-amber', txt: 'на границе' },
    coral: { cls: 'badge-coral', txt: 'отклонение' },
  }[m.status];
  const delta = m.history[m.history.length - 1] - m.history[0];
  const accent = m.status === 'mint' ? 'var(--status-mint)' :
                 m.status === 'amber' ? 'var(--status-amber)' : 'var(--status-coral)';
  return (
    <tr>
      <td style={{ paddingLeft: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>{m.name}</span>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--mist-text-faint)' }}>{m.code}</span>
        </div>
      </td>
      <td>
        <span className="num" style={{ fontSize: 15, fontWeight: 500 }}>{m.value}</span>
        <span style={{ fontSize: 11.5, color: 'var(--mist-text-faint)', marginLeft: 4 }}>{m.unit}</span>
      </td>
      <td><span className="mono" style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>{m.range[0]}–{m.range[1]}</span></td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkline data={m.history} color={accent} w={100} h={26} range />
        </div>
      </td>
      <td>
        <span style={{
          fontSize: 12.5,
          color: delta > 0 ? 'var(--status-mint)' : delta < 0 ? 'var(--status-coral)' : 'var(--mist-text-faint)',
          display: 'flex', alignItems: 'center', gap: 3,
        }} className="num">
          {delta !== 0 && <Icon name={delta > 0 ? 'arrowUp' : 'arrowDown'} size={11} stroke={2} />}
          {delta > 0 ? '+' : ''}{delta.toFixed(Math.abs(delta) < 10 ? 1 : 0)}
        </span>
      </td>
      <td>
        <span className="mono" style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>12.09.25</span>
      </td>
      <td><span className={`badge ${statusBadge.cls}`}><span className="dot" />{statusBadge.txt}</span></td>
      <td style={{ paddingRight: 32, textAlign: 'right' }}>
        <Icon name="chevronRight" size={14} style={{ color: 'var(--mist-text-faint)' }} />
      </td>
    </tr>
  );
}

window.AnalysesTableScreen = AnalysesTableScreen;
