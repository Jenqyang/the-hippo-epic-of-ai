<div align="center">

<img src=".github/assets/masthead.png" alt="AI河马史诗 · The Hippo Epic of AI" width="632">

<p>
  <img src="https://img.shields.io/badge/%E6%A1%88%E4%BE%8B-136-111111?style=flat-square" alt="案例 136">
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/%E6%8A%95%E7%A8%BF-%E6%AC%A2%E8%BF%8E-8b1a1a?style=flat-square" alt="欢迎投稿"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/code-MIT-555555?style=flat-square" alt="MIT"></a>
</p>

一份记录 AI 时代造富传说的报纸。

**[在线阅读 hema.42x.xyz](https://hema.42x.xyz)**

13岁三天赚1.8万，14岁辍学月营收5000万，一个 HTML 文件17天进账100万美元。

<br>

“我瘫坐在原子弹上，仿佛看到了椅子爆炸。”<br>
<sub><i>I slumped back onto the atom bomb, and seemed to see the chair go off.</i></sub>

</div>

<br>

## 头版

| 标题 | 出处 | 原文 |
| --- | --- | --- |
| [14岁中专辍学，曾睡天桥、贴膜送外卖，靠AI漫剧最高月营收5000万](content/stories/003.json) | 今日头条 | “没有学历，没有背景，连一台自己的电脑都没有。” |
| [13岁女孩靠AI三天赚了1.8万元](content/stories/112.json) | 地方媒体，搜狐转载 | “我不喜欢打小报告，所以希望它温柔一点，也给孩子留一点空间。” |
| [藤校拒了又怎样？18岁天才少年打造爆款AI年入2亿](content/stories/046.json) | 新智元，澎湃新闻转载 | “13 岁时，我有一个游戏网站，每年能赚6万美元” |
| [3小时做出一款游戏，17天赚到100万美元](content/stories/059.json) | 腾讯新闻 | “失败项目清单又+1，这是好事！” |
| [用AI“复活”亲人：95后小伙淘宝创业，年入超50万](content/stories/084.json) | 今日头条（正解局） | “这位客户一直在王涛店里下单‘孙子’的视频，直到奶奶去世，到天堂和真正的孙子相聚。” |
| [OnlyFans女神竟是男儿身，男大学生借AI变身，每月狂赚4.3万美元](content/stories/107.json) | 网易 | “其中的瓶颈并非算力或图形处理器（GPU），而是知道陌生人会相信哪种谎言。” |
| [花光积蓄飞去迪拜，靠金枪鱼罐头活下来，月入10万美元](content/stories/172.json) | Indie Hackers Stories | “我每天吃一到两罐金枪鱼罐头，瘦了22磅。” |
| [五个产品，一共赚了0美元；第六个半年做到月入2.3万美元](content/stories/200.json) | Indie Hackers Stories | “五个产品，五次尝试，一共给我赚了0美元。” |
| [47岁日本男人每月花20美元订Claude，造了个不存在的女孩，第一个月赚1.3万美元](content/stories/205.json) | IBTimes UK | “成本：Claude，每月20美元。” |
| [AI鲸吞网文流量，底层作者遭“无声清退”](content/stories/039.json) | 36氪 · 深氪lite | “我都不想当医生了。” |

## 版块

| 版块 | 收录什么 | 条数 |
| --- | --- | ---: |
| 新手村 | 未成年人、学生、刚入行的人 | 21 |
| 单人速通 | 一个人做完一整个产品或公司 | 62 |
| 支线任务 | 有本职工作，用 AI 做副业 | 30 |
| 皮套人 | 数字人、AI 模特、虚拟主播 | 15 |
| 开新番 | AI 短剧、网文、音乐等内容工业 | 8 |

## 为什么做这个

这类标题这两年很常见：某某几岁，用 AI 几天赚了多少钱。感觉很有必要记录这类别有用意的报道/文章，方便大家了解 AI 时代的造富传说。

## 投稿

最方便的方式就是把这个仓库链接贴给你的 Agent，把你想投稿的内容发给它，它会帮你生成一个 Issue。

一条案例就是 `content/stories/` 下的一个 JSON 文件，加一张可选的配图，不需要懂 Next.js。

- 只有线索：[提名一条案例](https://github.com/Jenqyang/the-hippo-epic-of-ai/issues/new?template=new-story.yml)，填原文链接和几句话，剩下的由维护者整理。
- 想自己写：看 [CONTRIBUTING.md](CONTRIBUTING.md)，里面有字段说明、完整示例和自检命令。
- 发现写错、重复、链接失效，或者你是当事人想撤下：[开一个纠错 Issue](https://github.com/Jenqyang/the-hippo-epic-of-ai/issues/new?template=fix-story.yml)。

库里已有的案例如果还被别的媒体报道过，把链接补进它的 `coverage` 也很有用。英文报道同样收，标题和引语译成中文，原句放进 `quoteOriginal`。

## 收录标准

| 收 | 不收 |
| --- | --- |
| 有可追溯的原始报道 | 只有朋友圈截图、短视频口述或卖课广告 |
| 数字标明了来源，哪怕只是当事人自述 | 品牌通稿、课程推广、厂商 case study |
| 被质疑或明显夸大的案例 | 纯融资新闻，融资额不是收入 |

同一件事只建一条，选最完整的报道做主条，其余放进 `coverage`。案例里的当事人多数是普通人，请不要在 Issue 或 PR 里贴他们的私人信息。

## 本地运行

网站是 Next.js 写的，全站静态生成，没有数据库。

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm check    # 校验全部案例
```

改版式或代码之前，请先看 [CONTRIBUTING.md](CONTRIBUTING.md#代码贡献)。

## 授权

代码以 [MIT](LICENSE) 授权。全站字体为汇文明朝体，授权见 [LICENSE-Huiwen-Mincho.md](app/fonts/LICENSE-Huiwen-Mincho.md)。

案例中摘录的原文、标题与配图，版权归原作者与原媒体所有，本仓库仅作评述与索引之用，每条案例都保留原文链接。如果你是权利人并希望撤下某条内容，[开一个 Issue](https://github.com/Jenqyang/the-hippo-epic-of-ai/issues/new?template=fix-story.yml) 即可。

## Star History

<a href="https://star-history.com/#Jenqyang/the-hippo-epic-of-ai&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Jenqyang/the-hippo-epic-of-ai&type=Date&theme=dark">
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Jenqyang/the-hippo-epic-of-ai&type=Date">
  </picture>
</a>
