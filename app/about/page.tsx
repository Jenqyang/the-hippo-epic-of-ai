import type { Metadata } from "next";

import { PageShell } from "@/app/_components/page-shell";
import { pageOpenGraph, siteName } from "@/app/_data/site";

const description = `《${siteName}》记下 AI 时代的造富传说：13岁三天赚1.8万，14岁辍学月营收5000万，一个 HTML 文件17天进账100万美元。`;

export const metadata: Metadata = {
  title: "关于本报",
  description,
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph({ title: "关于本报", description, path: "/about" }),
};

export default function About() {
  return (
    <PageShell>
      <article className="mx-auto flex max-w-[720px] flex-col gap-6">
        <h1 className="font-display text-[40px] font-black leading-none text-ink-1">
          关于本报
        </h1>
        <p className="font-serif text-[19px] leading-[1.8]">
          {description}
        </p>
        <p className="font-serif text-[19px] leading-[1.8]">
          “像看到原子弹爆炸一样瘫坐在椅子上，有一种人类黄金时代的错觉。”
        </p>
      </article>
    </PageShell>
  );
}
