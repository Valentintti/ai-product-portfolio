export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "demo" | "case";
};

export type ProjectCase = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  period: string;
  status: string;
  cover: string;
  links: ProjectLink[];
  productFlow: string[];
  boundaries: string[];
  outcomes: string[];
};

export const projects: ProjectCase[] = [
  {
    slug: "logistics-agent",
    title: "查件小助",
    subtitle: "物流 AI 客服",
    summary:
      "把模糊咨询收敛为可执行的查件流程，让模型负责理解和候选生成，让规则负责订单、状态与工单边界。",
    role: "AI 产品设计 / 独立开发",
    period: "2026",
    status: "本地端到端 Demo",
    cover: "system-map",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Valentintti/logistics-ai-customer-service",
        kind: "github",
      },
    ],
    productFlow: ["订单核验", "轨迹判断", "用户确认", "Mock 工单"],
    boundaries: ["模型不直接修改订单状态", "关键动作由确定性流程控制"],
    outcomes: ["完成端到端客服流程", "保留引用与操作轨迹"],
  },
  {
    slug: "medask",
    title: "MedAsk",
    subtitle: "医疗问诊 / 信息整理助手",
    summary:
      "在最多 7 轮对话中整理就诊信息，以规则状态机控制流程，以安全中断和评测门禁守住非诊断边界。",
    role: "AI 产品设计 / 独立开发",
    period: "2026",
    status: "在线规则版 Demo",
    cover: "medask-screen.webp",
    links: [
      {
        label: "在线 Demo",
        href: "https://valentintti.github.io/medask-mvp/",
        kind: "demo",
      },
      {
        label: "GitHub",
        href: "https://github.com/Valentintti/medask-mvp",
        kind: "github",
      },
    ],
    productFlow: ["信息收集", "候选字段", "规则校验", "就诊摘要"],
    boundaries: ["不提供诊断结论", "出现风险信号时立即中断"],
    outcomes: ["完成可控的多轮整理流程", "建立基础评测门禁"],
  },
];
