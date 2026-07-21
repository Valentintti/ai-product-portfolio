import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDownIcon, ArrowUpRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react";

const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export default function HeroExperience() {
  const reduceMotion = useReducedMotion();
  const [introVisible, setIntroVisible] = useState(!reduceMotion);
  const [heroRevealed, setHeroRevealed] = useState(Boolean(reduceMotion));
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 22 });
  const avatarX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const avatarY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);
  const collageX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const collageY = useTransform(smoothY, [-0.5, 0.5], [7, -7]);

  const revealNow = useCallback(() => {
    setHeroRevealed(true);
    setIntroVisible(false);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      revealNow();
      return;
    }
    const revealTimeout = window.setTimeout(() => setHeroRevealed(true), 720);
    const introTimeout = window.setTimeout(() => setIntroVisible(false), 1420);
    const skip = (event: KeyboardEvent) => {
      if (["Enter", "Escape", " "].includes(event.key)) revealNow();
    };
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(revealTimeout);
      window.clearTimeout(introTimeout);
      window.removeEventListener("keydown", skip);
    };
  }, [reduceMotion, revealNow]);

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = sceneRef.current?.getBoundingClientRect();
    if (!bounds) return;
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <>
      <AnimatePresence>
        {introVisible && (
          <motion.button
            className="intro"
            type="button"
            aria-label="跳过开场动画"
            onClick={revealNow}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.span
              className="intro__panel intro__panel--left"
              initial={{ x: 0 }}
              animate={{ x: "-101%" }}
              transition={{ duration: 0.92, delay: 0.38, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.span
              className="intro__panel intro__panel--right"
              initial={{ x: 0 }}
              animate={{ x: "101%" }}
              transition={{ duration: 0.92, delay: 0.38, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.span
              className="intro__name"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -10] }}
              transition={{ duration: 1.18, times: [0, 0.2, 0.62, 1] }}
            >
              <strong>高靖翔</strong>
              <small>AI PRODUCT MANAGER</small>
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <header className="site-header">
        <a className="wordmark" href={`${base}`} aria-label="返回首页">
          GJX<span>.</span>
        </a>
        <nav aria-label="主导航">
          <a href="#work">作品</a>
          <a href="#method">方法</a>
          <a href="#about">关于</a>
          <a className="nav-resume" href={`${base}resume/高靖翔_AI产品经理.pdf`} download>
            简历 <DownloadSimpleIcon weight="bold" aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section
        className="hero"
        ref={sceneRef}
        onPointerMove={handlePointer}
        onPointerLeave={resetPointer}
      >
        <div className="hero__copy">
          <motion.p
            className="hero__role"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: heroRevealed ? 0 : 0, duration: 0.48 }}
          >
            AI PRODUCT MANAGER · 2026
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: heroRevealed ? 0.08 : 0, duration: 0.58 }}
          >
            把模糊的 AI 想法，<br />做成可以验证的产品。
          </motion.h1>
          <motion.p
            className="hero__summary"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: heroRevealed ? 0.16 : 0, duration: 0.52 }}
          >
            关注 Agent、对话产品与受控 AI 工作流，让模型能力真正进入业务流程。
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ delay: heroRevealed ? 0.24 : 0, duration: 0.48 }}
          >
            <a className="button button--primary" href="#work">
              查看作品 <ArrowDownIcon weight="bold" aria-hidden="true" />
            </a>
            <a className="button button--quiet" href={`${base}resume/高靖翔_AI产品经理.pdf`} download>
              下载简历 <DownloadSimpleIcon weight="bold" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={heroRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.7 }}
        >
          <span className="hero__mint-field" aria-hidden="true" />
          <motion.img
            className="hero__avatar"
            src={`${base}assets/avatar-transparent.webp`}
            alt="戴圆框眼镜、伸手邀请的卡通数字人"
            style={{ x: avatarX, y: avatarY }}
          />
          <motion.a
            className="hero-fragment hero-fragment--logistics"
            href="https://github.com/Valentintti/logistics-ai-customer-service"
            target="_blank"
            rel="noreferrer"
            aria-label="查看查件小助 GitHub"
            style={{ x: collageX, y: collageY }}
            initial={reduceMotion ? false : { opacity: 0, x: 24, rotate: 5 }}
            animate={heroRevealed ? { opacity: 1, x: 0, rotate: -3 } : { opacity: 0, x: 24, rotate: 5 }}
            transition={{ delay: heroRevealed ? 0.15 : 0, duration: 0.6 }}
          >
            <small>LOGISTICS AGENT</small>
            <strong>查件小助</strong>
            <span>订单核验 → 轨迹判断</span>
            <ArrowUpRightIcon weight="bold" aria-hidden="true" />
          </motion.a>
          <motion.a
            className="hero-fragment hero-fragment--medask"
            href="https://valentintti.github.io/medask-mvp/"
            target="_blank"
            rel="noreferrer"
            aria-label="打开 MedAsk 在线 Demo"
            style={{ x: collageX, y: collageY }}
            initial={reduceMotion ? false : { opacity: 0, x: -24, rotate: -4 }}
            animate={heroRevealed ? { opacity: 1, x: 0, rotate: 2.5 } : { opacity: 0, x: -24, rotate: -4 }}
            transition={{ delay: heroRevealed ? 0.25 : 0, duration: 0.6 }}
          >
            <img src={`${base}assets/medask-screen.webp`} alt="MedAsk 真实运行界面" />
            <span><strong>MedAsk</strong> · 信息整理助手</span>
          </motion.a>
        </motion.div>
      </section>
    </>
  );
}
