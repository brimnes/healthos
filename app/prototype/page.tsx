import Link from "next/link";
import { AppShell, PageHeader } from "@/components/app-shell";

export default function PrototypePage() {
  return (
    <AppShell active="/prototype">
      <PageHeader title="Дизайн-canvas" subtitle="Старый HTML-прототип сохранён как визуальный референс" />
      <div className="p-8">
        <div className="surface max-w-2xl p-6">
          <p className="text-sm leading-6 text-muted">
            Исходный canvas всё ещё лежит в корне проекта: <span className="mono">Personal Health OS.html</span>.
            Новое приложение уже работает через Next.js routes, а canvas используем как дизайн-справочник.
          </p>
          <Link className="btn mt-5" href="/">Вернуться в приложение</Link>
        </div>
      </div>
    </AppShell>
  );
}
