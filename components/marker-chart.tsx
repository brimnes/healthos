"use client";

import { Area, AreaChart, CartesianGrid, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { historyDates } from "@/lib/mock-data";
import type { Marker } from "@/lib/types";

export function MarkerChart({ marker, height = 260 }: { marker: Marker; height?: number }) {
  const data = marker.history.map((value, index) => ({
    date: historyDates[index] ?? String(index + 1),
    value
  }));
  const min = Math.min(...marker.history, marker.range[0]);
  const max = Math.max(...marker.history, marker.range[1]);

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 20, left: -8, bottom: 6 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--faint)" }} />
          <YAxis domain={[Math.floor(min * 0.85), Math.ceil(max * 1.15)]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--faint)" }} />
          <Tooltip
            contentStyle={{ border: "1px solid var(--border)", borderRadius: 12, boxShadow: "0 12px 30px rgba(0,0,0,.08)" }}
            formatter={(value) => [`${value} ${marker.unit}`, marker.name]}
          />
          <ReferenceArea y1={marker.range[0]} y2={marker.range[1]} fill="var(--accent)" fillOpacity={0.08} />
          <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={2} fill="var(--accent)" fillOpacity={0.12} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
