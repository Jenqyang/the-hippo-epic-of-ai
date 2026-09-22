"use client";

import { useEffect, useState } from "react";

const weekdays = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
] as const;

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function formatDateTime(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function LiveDateTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();

    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <time className="flex flex-col gap-0.5" dateTime={now?.toISOString()}>
      <span>{now ? "已对齐神话时间" : "正在对齐神话时间…"}</span>
      {now ? <span>{formatDateTime(now)}</span> : null}
    </time>
  );
}
