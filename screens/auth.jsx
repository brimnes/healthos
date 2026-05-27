/* global React, Icon */

function AuthScreen() {
  return (
    <div className="phos-root" style={{
      width: '100%', height: '100%',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      background: 'var(--mist-bg)',
    }}>
      {/* left visual */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(160deg, var(--mist-accent-tint) 0%, var(--mist-bg) 65%)',
        borderRight: '1px solid var(--mist-border)',
        padding: '48px 56px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: 'var(--mist-text)', color: 'var(--mist-surface)',
            display: 'grid', placeItems: 'center', fontFamily: 'Geist Mono', fontWeight: 500, fontSize: 14,
          }}>h</div>
          <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em' }}>health.os</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 460 }}>
          <div className="t-eyebrow" style={{ marginBottom: 18 }}>Персональный профиль здоровья</div>
          <h1 style={{
            fontSize: 52, fontWeight: 400, lineHeight: 1.08,
            letterSpacing: '-0.035em', margin: 0,
          }}>
            Вся история анализов. <span style={{ color: 'var(--mist-text-faint)' }}>В одном спокойном месте.</span>
          </h1>
          <p style={{
            marginTop: 22, fontSize: 15.5, lineHeight: 1.55, maxWidth: 420,
            color: 'var(--mist-text-muted)',
          }}>
            Загрузите PDF из любой лаборатории — мы распознаем показатели,
            построим динамику и подскажем, на что обратить внимание.
          </p>

          {/* floating proof cards */}
          <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
            <ProofCard icon="scan" k="0.4 с" v="средняя обработка PDF" />
            <ProofCard icon="layers" k="47" v="показателей в системе" />
            <ProofCard icon="drop" k="HIPAA" v="шифрование данных" />
          </div>
        </div>

        <div style={{ fontSize: 12, color: 'var(--mist-text-faint)', display: 'flex', gap: 18 }}>
          <span>© 2026 health.os</span>
          <span>Политика данных</span>
          <span>Поддержка</span>
        </div>
      </div>

      {/* right form */}
      <div style={{ display: 'grid', placeItems: 'center', padding: 48 }}>
        <div style={{ width: 380 }}>
          <h2 className="t-h1" style={{ margin: 0, marginBottom: 6 }}>Войти в health.os</h2>
          <p style={{ margin: 0, marginBottom: 28, color: 'var(--mist-text-muted)', fontSize: 14 }}>
            Используйте email или код из приложения
          </p>

          <label style={{ display: 'block', fontSize: 12.5, color: 'var(--mist-text-muted)', marginBottom: 6 }}>
            Email
          </label>
          <input className="input" defaultValue="anna.sokolova@me.com" style={{ marginBottom: 16 }} />

          <label style={{ display: 'block', fontSize: 12.5, color: 'var(--mist-text-muted)', marginBottom: 6 }}>
            Пароль
          </label>
          <div style={{ position: 'relative' }}>
            <input type="password" className="input" defaultValue="••••••••••••" style={{ paddingRight: 38 }} />
            <button className="btn-ghost btn" style={{
              position: 'absolute', right: 4, top: 4, height: 30, padding: '0 8px', borderRadius: 6,
            }}><Icon name="eye" size={15} /></button>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            margin: '14px 0 22px', fontSize: 13,
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mist-text-muted)' }}>
              <span style={{
                width: 15, height: 15, borderRadius: 4,
                border: '1px solid var(--mist-border-strong)',
                background: 'var(--mist-accent-strong)',
                display: 'grid', placeItems: 'center',
              }}><Icon name="check" size={10} style={{ color: 'white' }} stroke={2.5} /></span>
              Запомнить меня
            </label>
            <a style={{ color: 'var(--mist-accent-strong)', textDecoration: 'none' }}>Забыли пароль?</a>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', height: 42, marginBottom: 12 }}>
            Войти <Icon name="arrowRight" size={14} />
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            color: 'var(--mist-text-faint)', fontSize: 12,
            margin: '20px 0',
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--mist-border)' }} />
            или
            <div style={{ flex: 1, height: 1, background: 'var(--mist-border)' }} />
          </div>

          <button className="btn" style={{ width: '100%', height: 42, marginBottom: 8 }}>
            <span style={{ width: 16, height: 16, display: 'grid', placeItems: 'center' }}>
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M22 11.5h-1v-.04C21 7.34 17.66 4 13.5 4 9.96 4 7 6.46 6.15 9.74A4.5 4.5 0 0 0 6.5 18.5H22a3.5 3.5 0 0 0 0-7z" opacity=".25"/>
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
            Продолжить через Apple
          </button>
          <button className="btn" style={{ width: '100%', height: 42 }}>
            Магическая ссылка на email
          </button>

          <p style={{
            marginTop: 28, fontSize: 12, color: 'var(--mist-text-faint)', textAlign: 'center', lineHeight: 1.6,
          }}>
            Создавая аккаунт, вы соглашаетесь с <u>условиями</u> и <u>политикой обработки данных</u>.
            Медицинские данные шифруются end-to-end.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProofCard({ icon, k, v }) {
  return (
    <div style={{
      flex: 1, background: 'var(--mist-surface)',
      border: '1px solid var(--mist-border)',
      borderRadius: 14, padding: '14px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 8,
        background: 'var(--mist-accent-soft)', color: 'var(--mist-accent-strong)',
        display: 'grid', placeItems: 'center',
      }}><Icon name={icon} size={14} /></div>
      <div className="num" style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{k}</div>
      <div style={{ fontSize: 11.5, color: 'var(--mist-text-faint)', lineHeight: 1.3 }}>{v}</div>
    </div>
  );
}

window.AuthScreen = AuthScreen;
