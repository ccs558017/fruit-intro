"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const DURATION = 15;
const BEST_KEY = "mango-game-best";

type Kind = "mango" | "gold" | "bug";
type Item = {
  x: number;
  y: number;
  vy: number;
  r: number;
  kind: Kind;
  spin: number;
};
type Pop = { x: number; y: number; text: string; life: number; color: string };
type Phase = "idle" | "playing" | "over";

const POINTS: Record<Kind, number> = { mango: 1, gold: 5, bug: -2 };

type GameState = {
  items: Item[];
  pops: Pop[];
  basketX: number;
  keys: { left: boolean; right: boolean };
  score: number;
  timeLeft: number;
  spawnIn: number;
  w: number;
  h: number;
  playing: boolean;
};

const bestListeners = new Set<() => void>();
const subscribeBest = (cb: () => void) => {
  bestListeners.add(cb);
  return () => {
    bestListeners.delete(cb);
  };
};
const readBest = () => {
  try {
    return localStorage.getItem(BEST_KEY) ?? "0";
  } catch {
    return "0";
  }
};

function draw(ctx: CanvasRenderingContext2D, g: GameState) {
  const { w, h } = g;
  ctx.clearRect(0, 0, w, h);

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#fbe9c6");
  sky.addColorStop(1, "#f3ebdd");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const it of g.items) {
    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.rotate(it.spin);
    if (it.kind === "gold") {
      ctx.shadowColor = "#ffb800";
      ctx.shadowBlur = 22;
    }
    ctx.font = `${it.r * 2}px serif`;
    ctx.fillText(it.kind === "bug" ? "🐛" : "🥭", 0, 0);
    ctx.restore();
  }

  const bw = basketSize(w);
  ctx.font = `${bw}px serif`;
  ctx.fillText("🧺", g.basketX, h - bw * 0.55);

  for (const p of g.pops) {
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.font = "700 22px sans-serif";
    ctx.fillText(p.text, p.x, p.y);
  }
  ctx.globalAlpha = 1;
}

function step(g: GameState, dt: number) {
  const { w, h } = g;
  const bw = basketSize(w);
  const basketY = h - bw * 0.55;
  const scale = h / 520;

  const speed = 520 * (w / 360 > 1.6 ? 1.2 : 1);
  if (g.keys.left) g.basketX -= speed * dt;
  if (g.keys.right) g.basketX += speed * dt;
  g.basketX = Math.min(w - bw / 2, Math.max(bw / 2, g.basketX));

  g.timeLeft = Math.max(0, g.timeLeft - dt);

  // 越接近結束，掉得越快越密
  const progress = 1 - g.timeLeft / DURATION;
  g.spawnIn -= dt;
  if (g.spawnIn <= 0) {
    g.spawnIn = 0.55 - progress * 0.3 + Math.random() * 0.15;
    const roll = Math.random();
    const kind: Kind = roll < 0.12 ? "gold" : roll < 0.3 ? "bug" : "mango";
    const r =
      (kind === "gold" ? 20 : 17) * Math.min(1.4, Math.max(0.9, w / 360));
    g.items.push({
      x: r + Math.random() * (w - r * 2),
      y: -r,
      vy: (170 + progress * 150 + Math.random() * 80) * scale,
      r,
      kind,
      spin: (Math.random() - 0.5) * 0.6,
    });
  }

  const rest: Item[] = [];
  for (const it of g.items) {
    it.y += it.vy * dt;
    const caught =
      it.y + it.r * 0.6 >= basketY - bw * 0.3 &&
      it.y - it.r <= basketY + bw * 0.2 &&
      Math.abs(it.x - g.basketX) < bw * 0.45 + it.r * 0.3;
    if (caught) {
      const pts = POINTS[it.kind];
      g.score = Math.max(0, g.score + pts);
      g.pops.push({
        x: it.x,
        y: basketY - bw * 0.4,
        text: pts > 0 ? `+${pts}` : `${pts}`,
        life: 1,
        color:
          pts > 0 ? (it.kind === "gold" ? "#c98600" : "#d9432b") : "#4a4a4a",
      });
    } else if (it.y - it.r < h) {
      rest.push(it);
    }
  }
  g.items = rest;

  for (const p of g.pops) {
    p.y -= 40 * dt;
    p.life -= dt * 1.6;
  }
  g.pops = g.pops.filter((p) => p.life > 0);
}

export default function MangoGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 遊戲內部狀態放在 ref，避免每一幀都觸發 React 重新渲染
  const game = useRef<GameState>({
    items: [],
    pops: [],
    basketX: 0,
    keys: { left: false, right: false },
    score: 0,
    timeLeft: DURATION,
    spawnIn: 0,
    w: 360,
    h: 480,
    playing: false,
  });

  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isNew, setIsNew] = useState(false);
  const best =
    Number(useSyncExternalStore(subscribeBest, readBest, () => "0")) || 0;

  // 畫布尺寸（含高解析螢幕）與遊戲迴圈
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;
    const g = game.current;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = Math.round(Math.min(560, Math.max(380, w * 1.15)));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.w = w;
      g.h = h;
      g.basketX = g.basketX ? Math.min(w, g.basketX) : w / 2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const finish = () => {
      g.playing = false;
      setScore(g.score);
      setTimeLeft(0);
      setPhase("over");
      try {
        const prev = Number(localStorage.getItem(BEST_KEY)) || 0;
        if (g.score > prev) {
          localStorage.setItem(BEST_KEY, String(g.score));
          bestListeners.forEach((l) => l());
          setIsNew(true);
        }
      } catch {}
    };

    let raf = 0;
    let last = 0;
    let shownScore = -1;
    let shownTime = -1;
    const frame = (now: number) => {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0);
      last = now;

      if (g.playing) {
        step(g, dt);
        if (g.score !== shownScore) {
          shownScore = g.score;
          setScore(g.score);
        }
        const t = Math.ceil(g.timeLeft);
        if (t !== shownTime) {
          shownTime = t;
          setTimeLeft(t);
        }
      } else {
        shownScore = -1;
        shownTime = -1;
      }
      draw(ctx, g);

      if (g.playing && g.timeLeft <= 0) finish();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // 鍵盤
  useEffect(() => {
    const set = (e: KeyboardEvent, down: boolean) => {
      const k = game.current.keys;
      if (e.key === "ArrowLeft" || e.key === "a") k.left = down;
      else if (e.key === "ArrowRight" || e.key === "d") k.right = down;
      else return;
      if (game.current.playing) e.preventDefault();
    };
    const down = (e: KeyboardEvent) => set(e, true);
    const up = (e: KeyboardEvent) => set(e, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const start = () => {
    const g = game.current;
    g.items = [];
    g.pops = [];
    g.score = 0;
    g.timeLeft = DURATION;
    g.spawnIn = 0.2;
    g.basketX = g.w / 2;
    g.playing = true;
    setScore(0);
    setTimeLeft(DURATION);
    setIsNew(false);
    setPhase("playing");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const g = game.current;
    const bw = basketSize(g.w);
    g.basketX = Math.min(g.w - bw / 2, Math.max(bw / 2, e.clientX - rect.left));
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-3 grid grid-cols-3 divide-x divide-ink/15 border-y border-ink/15 text-center">
        <Stat label="得分" value={score} accent />
        <Stat label="剩餘秒數" value={timeLeft} />
        <Stat label="最高分" value={best} />
      </div>

      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-[2px] border border-ink/15"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerMove}
          className="block w-full touch-none select-none"
          style={{ height: 480 }}
          aria-label="接芒果遊戲畫面"
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/85 p-6 text-center backdrop-blur-[2px]">
            {phase === "idle" ? (
              <>
                <p className="font-serif text-3xl font-black sm:text-4xl">
                  接芒果
                </p>
                <p className="mt-3 max-w-xs text-sm leading-loose text-ink/70">
                  {DURATION} 秒內接住掉下來的芒果。
                  <br />
                  🥭 +1　🥭✨ 金芒果 +5　🐛 蟲蟲 −2
                </p>
                <p className="mt-2 text-xs text-ink/50">
                  滑鼠、手指拖曳，或用 ← → 鍵移動籃子
                </p>
              </>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/50">
                  Time&apos;s up
                </p>
                <p className="mt-2 font-serif text-3xl font-black">時間到！</p>
                <p className="mt-3 font-serif text-6xl font-black text-vermilion">
                  {score}
                </p>
                <p className="mt-1 text-sm text-ink/60">
                  {isNew ? "🎉 新紀錄！" : `最高分 ${best}`}
                </p>
              </>
            )}
            <button
              type="button"
              onClick={start}
              className="mt-6 rounded-full border border-ink/80 bg-ink px-8 py-3 text-sm font-medium text-paper transition hover:bg-vermilion"
            >
              {phase === "idle" ? "開始遊戲" : "再玩一次"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function basketSize(w: number) {
  return Math.min(96, Math.max(60, w * 0.2));
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="py-3">
      <p className="text-xs text-ink/50">{label}</p>
      <p
        className={`font-serif text-3xl font-black tabular-nums ${accent ? "text-vermilion" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
