/* global React, Icon, Sidebar, Topbar */

function OCRReviewScreen() {
  // simulate extracted rows
  const rows = [
    { name: 'Гемоглобин',            v: '124',   unit: 'г/л',     ref: '120 – 150', code: 'HGB',  conf: 0.99, status: 'mint',  flag: false },
    { name: 'Эритроциты',            v: '4.15',  unit: '×10¹²/л', ref: '3.9 – 4.7', code: 'RBC',  conf: 0.98, status: 'mint',  flag: false },
    { name: 'Гематокрит',            v: '38.2',  unit: '%',       ref: '36 – 46',   code: 'HCT',  conf: 0.97, status: 'mint',  flag: false },
    { name: 'Средний объём эритр.',  v: '86',    unit: 'фл',      ref: '80 – 100',  code: 'MCV',  conf: 0.96, status: 'mint',  flag: false },
    { name: 'Среднее содерж. Hb',    v: '29.4',  unit: 'пг',      ref: '27 – 34',   code: 'MCH',  conf: 0.95, status: 'mint',  flag: false },
    { name: 'Лейкоциты',             v: '6.0',   unit: '×10⁹/л',  ref: '4.0 – 9.0', code: 'WBC',  conf: 0.99, status: 'mint',  flag: false },
    { name: 'Тромбоциты',            v: '248',   unit: '×10⁹/л',  ref: '180 – 320', code: 'PLT',  conf: 0.99, status: 'mint',  flag: false },
    { name: 'Нейтрофилы',            v: '58.2',  unit: '%',       ref: '47 – 72',   code: 'NEU',  conf: 0.94, status: 'mint',  flag: false },
    { name: 'Лимфоциты',             v: '32.4',  unit: '%',       ref: '19 – 37',   code: 'LYM',  conf: 0.93, status: 'mint',  flag: false },
    { name: 'СОЭ',                   v: '8',     unit: 'мм/ч',    ref: '2 – 15',    code: 'ESR',  conf: 0.91, status: 'mint',  flag: false },
    { name: 'Ферритин',              v: '22',    unit: 'нг/мл',   ref: '30 – 150',  code: 'FER',  conf: 0.99, status: 'amber', flag: false },
    { name: 'Железо сывороточное',   v: '9.6',   unit: 'мкмоль/л', ref: '9 – 30',   code: 'FE',   conf: 0.86, status: 'amber', flag: true },
    { name: 'Витамин B12',           v: '420',   unit: 'пг/мл',   ref: '200 – 900', code: 'B12',  conf: 0.95, status: 'mint',  flag: false },
    { name: 'Витамин D, 25-OH',      v: '36',    unit: 'нг/мл',   ref: '30 – 100',  code: 'VITD', conf: 0.92, status: 'mint',  flag: false },
    { name: 'ТТГ',                   v: '4.2',   unit: 'мЕд/л',   ref: '0.4 – 4.0', code: 'TSH',  conf: 0.78, status: 'amber', flag: true },
    { name: 'Холестерин общий',      v: '5.3',   unit: 'ммоль/л', ref: '3.5 – 5.2', code: 'CHOL', conf: 0.97, status: 'amber', flag: false },
  ];

  return (
    <div className="phos-root" style={{ width: '100%', height: '100%', display: 'flex' }}>
      <Sidebar active="documents" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title="Проверка распознавания"
          breadcrumbs={['Документы', 'krov_invitro_12_09_2025.pdf', 'Проверка']}
          subtitle="16 показателей · 12 сентября 2025"
          right={<>
            <button className="btn"><Icon name="x" size={14} /> Отменить</button>
            <button className="btn"><Icon name="download" size={14} /> Скачать данные</button>
            <button className="btn btn-primary">
              Подтвердить и сохранить <Icon name="check" size={14} />
            </button>
          </>}
        />

        {/* status bar */}
        <div style={{
          padding: '10px 32px',
          display: 'flex', alignItems: 'center', gap: 18, fontSize: 12.5,
          borderBottom: '1px solid var(--mist-border)',
          background: 'var(--mist-surface-2)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--mist-text-muted)' }}>
            <Icon name="sparkles" size={13} style={{ color: 'var(--mist-accent-strong)' }} />
            Извлечено за <span className="mono" style={{ color: 'var(--mist-text)' }}>0.41 с</span>
          </span>
          <span style={{ width: 1, height: 14, background: 'var(--mist-border)' }} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--mist-text-muted)' }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--status-mint)' }} />
            14 уверенных
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--mist-text-muted)' }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--status-amber)' }} />
            2 требуют проверки
          </span>
          <span style={{ flex: 1 }} />
          <span style={{ color: 'var(--mist-text-faint)' }}>
            Среднее доверие <span className="mono" style={{ color: 'var(--mist-text)' }}>94%</span>
          </span>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.1fr', minHeight: 0 }}>
          {/* PDF preview */}
          <div style={{
            borderRight: '1px solid var(--mist-border)',
            background: 'var(--mist-surface-2)',
            display: 'flex', flexDirection: 'column', minHeight: 0,
          }}>
            <div style={{
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: '1px solid var(--mist-border)', background: 'var(--mist-surface)',
            }}>
              <button className="btn btn-sm btn-ghost"><Icon name="chevronLeft" size={13} /></button>
              <span className="mono" style={{ fontSize: 12, color: 'var(--mist-text-muted)' }}>1 / 2</span>
              <button className="btn btn-sm btn-ghost"><Icon name="chevronRight" size={13} /></button>
              <span style={{ width: 1, height: 16, background: 'var(--mist-border)' }} />
              <button className="btn btn-sm btn-ghost">100%</button>
              <span style={{ flex: 1 }} />
              <button className="btn btn-sm btn-ghost"><Icon name="download" size={13} /></button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 24, display: 'flex', justifyContent: 'center' }}>
              <PdfMock />
            </div>
          </div>

          {/* extracted table */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, background: 'var(--mist-surface)' }}>
            <div style={{
              padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10,
              borderBottom: '1px solid var(--mist-border)',
            }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Icon name="search" size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mist-text-faint)' }} />
                <input className="input" placeholder="Найти показатель…" style={{ height: 32, fontSize: 13, paddingLeft: 32 }} />
              </div>
              <button className="btn btn-sm">
                <Icon name="filter" size={12} /> Только требующие проверки
                <span className="badge badge-amber" style={{ height: 18, padding: '0 6px', fontSize: 10.5 }}>2</span>
              </button>
              <button className="btn btn-sm"><Icon name="plus" size={12} /> Добавить строку</button>
            </div>

            <div style={{ flex: 1, overflow: 'auto' }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: 18, width: '28%' }}>показатель</th>
                    <th style={{ width: 90 }}>значение</th>
                    <th>единицы</th>
                    <th>норма</th>
                    <th style={{ width: 86 }}>статус</th>
                    <th style={{ width: 70, textAlign: 'right', paddingRight: 18 }}>точность</th>
                    <th style={{ width: 42 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => <OcrRow key={r.code} r={r} />)}
                </tbody>
              </table>
            </div>

            {/* footer summary */}
            <div style={{
              padding: '14px 18px',
              borderTop: '1px solid var(--mist-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--mist-surface-2)',
            }}>
              <span style={{ fontSize: 12.5, color: 'var(--mist-text-muted)' }}>
                Подтверждая, вы соглашаетесь с тем, что значения верны.
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-sm">Пропустить flagged</button>
                <button className="btn btn-sm btn-primary">
                  Подтвердить все 16 <Icon name="check" size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function OcrRow({ r }) {
  const statusBadge = {
    mint: { cls: 'badge-mint', txt: 'в норме' },
    amber: { cls: 'badge-amber', txt: 'на границе' },
    coral: { cls: 'badge-coral', txt: 'отклонение' },
  }[r.status];
  const lowConf = r.conf < 0.9;
  return (
    <tr style={{ background: r.flag ? 'color-mix(in oklch, var(--status-amber-bg) 50%, transparent)' : 'transparent' }}>
      <td style={{ paddingLeft: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {r.flag && <Icon name="info" size={13} style={{ color: 'var(--status-amber)' }} />}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13.5, fontWeight: 500 }}>{r.name}</span>
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--mist-text-faint)' }}>{r.code}</span>
          </div>
        </div>
      </td>
      <td>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 10px', borderRadius: 8,
          background: lowConf ? 'var(--status-amber-bg)' : 'var(--mist-surface-2)',
          border: lowConf ? '1px solid color-mix(in oklch, var(--status-amber) 30%, transparent)' : '1px solid var(--mist-border)',
          width: 'fit-content',
        }}>
          <span className="num" style={{ fontSize: 14, fontWeight: 500 }}>{r.v}</span>
          <Icon name="edit" size={11} style={{ color: 'var(--mist-text-faint)' }} />
        </div>
      </td>
      <td><span className="mono" style={{ fontSize: 12, color: 'var(--mist-text-muted)' }}>{r.unit}</span></td>
      <td><span className="mono" style={{ fontSize: 12, color: 'var(--mist-text-faint)' }}>{r.ref}</span></td>
      <td>
        <span className={`badge ${statusBadge.cls}`}><span className="dot" />{statusBadge.txt}</span>
      </td>
      <td style={{ textAlign: 'right', paddingRight: 18 }}>
        <ConfChip conf={r.conf} />
      </td>
      <td>
        <button className="btn btn-sm btn-ghost" aria-label="Удалить строку" style={{ width: 28, padding: 0 }}>
          <Icon name="trash" size={12} />
        </button>
      </td>
    </tr>
  );
}

function ConfChip({ conf }) {
  const pct = Math.round(conf * 100);
  const color = conf >= 0.95 ? 'var(--status-mint)' : conf >= 0.85 ? 'var(--status-sky)' : 'var(--status-amber)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 11.5, color,
    }}>
      <span style={{
        width: 28, height: 4, borderRadius: 999,
        background: 'var(--mist-surface-3)', overflow: 'hidden',
        display: 'inline-block', position: 'relative',
      }}>
        <span style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: color, borderRadius: 999 }} />
      </span>
      <span className="mono">{pct}%</span>
    </span>
  );
}

function PdfMock() {
  // A faux lab report page
  return (
    <div style={{
      width: 460, minHeight: 600,
      background: 'white', borderRadius: 4,
      border: '1px solid var(--mist-border)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
      padding: '36px 36px',
      fontFamily: 'Geist Mono', fontSize: 10.5, color: '#1a1a1a',
      lineHeight: 1.5,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: 14, marginBottom: 14 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>ИНВИТРО</div>
          <div style={{ fontSize: 9, color: '#888' }}>Медицинская компания</div>
        </div>
        <div style={{ fontSize: 9, color: '#666', textAlign: 'right' }}>
          № заказа 9418-2025-09<br/>
          12.09.2025 09:42
        </div>
      </div>

      <div style={{ marginBottom: 14, fontSize: 10 }}>
        <div><b>Пациент:</b> Соколова Анна А.</div>
        <div><b>Дата рождения:</b> 14.04.1994</div>
        <div><b>Биоматериал:</b> Венозная кровь</div>
      </div>

      <div style={{ fontWeight: 700, fontSize: 11, marginBottom: 8 }}>ОБЩИЙ АНАЛИЗ КРОВИ</div>

      {/* highlighted detection bands */}
      <div style={{ position: 'relative' }}>
        {[
          ['Гемоглобин (HGB)', '124', 'г/л', '120–150'],
          ['Эритроциты (RBC)', '4.15', '×10¹²/л', '3.9–4.7'],
          ['Гематокрит (HCT)', '38.2', '%', '36–46'],
          ['MCV', '86', 'фл', '80–100'],
          ['MCH', '29.4', 'пг', '27–34'],
          ['Лейкоциты (WBC)', '6.0', '×10⁹/л', '4.0–9.0'],
          ['Тромбоциты (PLT)', '248', '×10⁹/л', '180–320'],
          ['Нейтрофилы', '58.2', '%', '47–72'],
          ['Лимфоциты', '32.4', '%', '19–37'],
          ['СОЭ', '8', 'мм/ч', '2–15'],
        ].map((row, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1.6fr 0.6fr 0.7fr 0.8fr',
            padding: '5px 6px', borderBottom: '1px dashed #e8e8e8',
            background: i === 0 || i === 5 ? 'rgba(135, 200, 180, 0.13)' : 'transparent',
            borderRadius: 2, position: 'relative',
          }}>
            <span>{row[0]}</span>
            <span style={{ fontWeight: 600 }}>{row[1]}</span>
            <span style={{ color: '#666' }}>{row[2]}</span>
            <span style={{ color: '#666' }}>{row[3]}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, fontWeight: 700, fontSize: 11, marginBottom: 8 }}>МИКРОЭЛЕМЕНТЫ И ВИТАМИНЫ</div>
      <div style={{ position: 'relative' }}>
        {[
          ['Ферритин', '22', 'нг/мл', '30–150', true],
          ['Железо сывороточное', '9.6', 'мкмоль/л', '9–30', true],
          ['Витамин B12', '420', 'пг/мл', '200–900', false],
          ['Витамин D, 25-OH', '36', 'нг/мл', '30–100', false],
          ['ТТГ', '4.2', 'мЕд/л', '0.4–4.0', true],
        ].map((row, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1.6fr 0.6fr 0.7fr 0.8fr',
            padding: '5px 6px',
            background: row[4] ? 'rgba(220, 170, 90, 0.18)' : 'transparent',
            borderRadius: 2, borderBottom: '1px dashed #e8e8e8',
          }}>
            <span>{row[0]}</span>
            <span style={{ fontWeight: 600 }}>{row[1]}{row[4] && ' ↓'}</span>
            <span style={{ color: '#666' }}>{row[2]}</span>
            <span style={{ color: '#666' }}>{row[3]}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, fontSize: 9, color: '#888', borderTop: '1px solid #ddd', paddingTop: 10 }}>
        Лаборатория Инвитро · Москва, ул. Нагатинская, 1 · лиц. ЛО-77-01-019283
      </div>
    </div>
  );
}

window.OCRReviewScreen = OCRReviewScreen;
