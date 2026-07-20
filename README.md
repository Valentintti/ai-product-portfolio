# AI Product Portfolio

高靖翔的 AI 产品经理个人网站。使用 Astro、TypeScript、React 和 Motion 构建，面向 GitHub Pages 静态部署。

线上地址：<https://valentintti.github.io/ai-product-portfolio/>

## Pages

- 首页：个人定位、精选作品、工作方法、AI 工具、个人介绍与联系方式
- 查件小助：物流 AI 客服的确定性 Harness、Function Calling、RAG 与 Mock 工单案例
- MedAsk：规则状态机、受控 LLM 候选、安全中断与评测门禁案例

## Local development

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
```

推送到 `main` 后，GitHub Actions 会构建静态站点并发布至 GitHub Pages。
