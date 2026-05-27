import { AppShell, PageHeader } from "@/components/app-shell";

export default function SettingsPage() {
  return (
    <AppShell active="/settings">
      <PageHeader title="Настройки" subtitle="Supabase Auth, приватность и экспорт будут подключены следующим шагом" />
      <div className="p-8">
        <div className="surface max-w-2xl p-6 text-sm leading-6 text-muted">
          Следующий слой реализации: подключение Supabase, RLS-политики, приватный storage и реальные профили.
        </div>
      </div>
    </AppShell>
  );
}
