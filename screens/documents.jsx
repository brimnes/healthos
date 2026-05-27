/* global React, Icon, Sidebar, Topbar, DOCUMENTS, DOCUMENT_STATUS */

function DocumentsScreen() {
  const totals = [
    ['uploaded', 'Загружены'],
    ['processing', 'В обработке'],
    ['requires_review', 'На проверке'],
    ['completed', 'Готовы'],
    ['error', 'Ошибки'],
  ].map(([status, label]) => ({
    status,
    label,
    count: DOCUMENTS.filter(d => d.status === status).length,
  }));

  return (
    <div className="phos-root" style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar active="documents" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Документы"
          subtitle="32 файла · приватное хранилище"
          right={<>
            <button className="btn"><Icon name="filter" size={14} /> Фильтры</button>
            <button className="btn"><Icon name="sort" size={14} /> По дате</button>
            <button className="btn btn-primary"><Icon name="upload" size={14} /> Загрузить</button>
          </>}
        />

        <div style={{ padding: '18px 32px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, borderBottom: '1px solid var(--mist-border)', background: 'var(--mist-surface)' }}>
          {totals.map(t => (
            <div key={t.status} className="surface-soft" style={{ padding: '12px 14px', borderRadius: 12 }}>
              <div className="t-eyebrow" style={{ marginBottom: 8 }}>{t.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="num" style={{ fontSize: 26, fontWeight: 500 }}>{t.count}</span>
                <span className={`badge ${DOCUMENT_STATUS[t.status].badge}`}><span className="dot" />{t.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, overflow: 'auto', background: 'var(--mist-surface)' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ paddingLeft: 32, width: '28%' }}>файл</th>
                <th>тип</th>
                <th>дата документа</th>
                <th>лаборатория / источник</th>
                <th>показатели</th>
                <th>статус</th>
                <th style={{ width: 210 }}>действия</th>
              </tr>
            </thead>
            <tbody>
              {DOCUMENTS.map(d => <DocumentRow key={d.id} d={d} />)}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function DocumentRow({ d }) {
  const meta = DOCUMENT_STATUS[d.status];
  const ext = d.type === 'img' ? 'IMG' : d.type.toUpperCase();
  return (
    <tr>
      <td style={{ paddingLeft: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34, height: 42, borderRadius: 8,
            background: 'var(--mist-surface-2)', border: '1px solid var(--mist-border)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'Geist Mono', fontSize: 9.5, color: 'var(--mist-text-faint)',
          }}>{ext}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</div>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--mist-text-faint)' }}>{d.size}</div>
          </div>
        </div>
      </td>
      <td><span style={{ fontSize: 12.5, color: 'var(--mist-text-muted)' }}>{d.documentType}</span></td>
      <td><span className="mono" style={{ fontSize: 12, color: 'var(--mist-text-muted)' }}>{d.date}</span></td>
      <td><span style={{ fontSize: 12.5, color: 'var(--mist-text-muted)' }}>{d.lab}</span></td>
      <td><span className="mono" style={{ fontSize: 12 }}>{d.markers}</span></td>
      <td><span className={`badge ${meta.badge}`}><span className="dot" />{meta.label}</span></td>
      <td>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-sm"><Icon name="eye" size={12} /> Открыть</button>
          {d.status === 'requires_review' && <button className="btn btn-sm btn-primary">Проверить</button>}
          {d.status === 'error' && <button className="btn btn-sm"><Icon name="scan" size={12} /> Повторить</button>}
          {d.status !== 'requires_review' && d.status !== 'error' && <button className="btn btn-sm btn-ghost"><Icon name="more" size={12} /></button>}
        </div>
      </td>
    </tr>
  );
}

window.DocumentsScreen = DocumentsScreen;
