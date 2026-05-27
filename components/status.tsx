import { documentStatusMeta } from "@/lib/mock-data";
import type { DocumentStatus, Status } from "@/lib/types";

export function MarkerBadge({ status }: { status: Status }) {
  const meta = {
    mint: ["badge-mint", "в норме"],
    amber: ["badge-amber", "на границе"],
    coral: ["badge-coral", "отклонение"]
  }[status];

  return <span className={`badge ${meta[0]}`}>{meta[1]}</span>;
}

export function DocumentBadge({ status }: { status: DocumentStatus }) {
  const meta = documentStatusMeta[status];
  return <span className={`badge ${meta.badge}`}>{meta.label}</span>;
}
