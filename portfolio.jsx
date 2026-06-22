import { useState, useEffect, useRef } from "react";

// ── Palette ──────────────────────────────────────────────
// #2B0D05  bg-chocolate
// #F8F4EF  cream
// #C9A96E  gold accent
// #1A0803  deep bg
// #3D1810  card-dark
// ─────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Work", "Services", "Contact"];

const SKILLS = [
  "React", "Next.js", "TypeScript", "Python",
  "Machine Learning", "AI / LLMs", "Node.js",
  "MongoDB", "TailwindCSS", "Framer Motion",
];

const PROJECTS = [
  {
    id: 1, num: "01",
    title: "AI Study Partner",
    desc: "AI-powered study assistant that generates personalised notes, quizzes and study plans from any learning material.",
    tech: ["Python", "OpenAI", "React", "MongoDB"],
    color: "#C9A96E",
  },
  {
    id: 2, num: "02",
    title: "Student Grade Analyser",
    desc: "Analyses student performance trends and surfaces actionable improvement recommendations using ML models.",
    tech: ["Python", "Pandas", "Scikit-learn"],
    color: "#8FBCBB",
  },
  {
    id: 3, num: "03",
    title: "Portfolio Website",
    desc: "Premium developer portfolio with scroll-driven animations, dark luxury aesthetic, and editorial layout.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    color: "#A3BE8C",
  },
  {
    id: 4, num: "04",
    title: "AI Résumé Builder",
    desc: "Generates ATS-optimised résumés tailored to job descriptions using GPT-4 with one-click PDF export.",
    tech: ["React", "Node.js", "OpenAI API"],
    color: "#B48EAD",
  },
];

const TIMELINE = [
  {
    year: "2022–26",
    title: "B.Tech CSE (AI & ML)",
    org: "VIT Bhopal",
    desc: "Specialising in Artificial Intelligence and Machine Learning with a focus on applied deep learning.",
  },
  {
    year: "2023",
    title: "PR Team Member",
    org: "Pahadi Club",
    desc: "Managed outreach, events communications and social media strategy for the cultural society.",
  },
  {
    year: "2023–24",
    title: "Hackathon Competitor",
    org: "Multiple Venues",
    desc: "Built and shipped AI and frontend prototypes under 24-hour constraints across inter-college hackathons.",
  },
];

const SERVICES = [
  { icon: "🤖", title: "AI Development", desc: "Custom LLM integrations, RAG pipelines, and intelligent agents tailored to your workflow." },
  { icon: "🌐", title: "Web Development", desc: "Full-stack applications with Next.js, performant APIs, and polished user interfaces." },
  { icon: "✦", title: "UI / UX Design", desc: "Clean, accessible, and brand-consistent interfaces that convert and delight." },
  { icon: "⚙️", title: "Automation", desc: "Python scripts and workflow automations that eliminate repetitive manual work." },
];

// ── Utility ──────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Typing Effect ─────────────────────────────────────────
function Typing({ words }) {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx];
    const speed = del ? 60 : 120;
    const timer = setTimeout(() => {
      if (!del) {
        if (txt.length < word.length) setTxt(word.slice(0, txt.length + 1));
        else setTimeout(() => setDel(true), 1800);
      } else {
        if (txt.length > 0) setTxt(word.slice(0, txt.length - 1));
        else { setDel(false); setIdx((idx + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [txt, del, idx, words]);
  return (
    <span style={{ color: "#C9A96E" }}>
      {txt}<span style={{ opacity: Math.sin(Date.now() / 500) > 0 ? 1 : 0 }}>|</span>
    </span>
  );
}

// ── Scroll Progress ───────────────────────────────────────
function ScrollBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const h = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, height: 3, zIndex: 9999,
      width: `${pct}%`, background: "linear-gradient(90deg,#C9A96E,#E8C98A)",
      transition: "width 0.1s linear",
    }} />
  );
}

// ── Back to Top ───────────────────────────────────────────
function BackTop() {
  const y = useScrollY();
  if (y < 400) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 999,
        width: 44, height: 44, borderRadius: "50%",
        background: "#C9A96E", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, color: "#2B0D05", boxShadow: "0 4px 20px rgba(201,169,110,0.4)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >↑</button>
  );
}

// ── Navbar ────────────────────────────────────────────────
function Navbar() {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const scrolled = y > 40;

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 5vw",
      background: scrolled ? "rgba(27,8,3,0.82)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "none",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
    }}>
      {/* Logo */}
      <span style={{ fontFamily: "Georgia, serif", color: "#F8F4EF", fontSize: 17, letterSpacing: "0.02em", fontStyle: "italic" }}>
        The Developer's Desk
      </span>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 36 }} className="nav-desktop">
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => go(l)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(248,244,239,0.75)", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#C9A96E"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(248,244,239,0.75)"}
          >{l}</button>
        ))}
      </div>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 4 }}
        className="nav-ham"
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: "block", width: 22, height: 2, background: "#F8F4EF",
            transition: "all 0.3s",
            transform: open && i === 0 ? "rotate(45deg) translate(5px,5px)"
              : open && i === 2 ? "rotate(-45deg) translate(5px,-5px)"
              : open && i === 1 ? "scaleX(0)" : "none",
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0,
          background: "rgba(27,8,3,0.96)", backdropFilter: "blur(16px)",
          padding: "20px 5vw", display: "flex", flexDirection: "column", gap: 16,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#F8F4EF", fontSize: 18, textAlign: "left" }}
            >{l}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-ham { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────
function Hero() {
  const [hover, setHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [heroPhoto, setHeroPhoto] = useState(null);
  const heroFileRef = useRef(null);
  const handleHeroPhoto = (e) => {
    const file = e.target.files[0];
    if (file) setHeroPhoto(URL.createObjectURL(file));
  };

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width - 0.5) * 16,
      y: ((e.clientY - r.top) / r.height - 0.5) * 16,
    });
  };

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "80px 5vw 60px",
      background: "radial-gradient(ellipse at 50% 40%, #3D1810 0%, #2B0D05 60%, #1A0803 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* ambient glow */}
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
      }} />

      {/* Floating card */}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setMouse({ x: 0, y: 0 }); }}
        onMouseMove={onMove}
        style={{
          background: "linear-gradient(145deg, #F8F4EF 0%, #EDE8E0 100%)",
          borderRadius: 24,
          padding: "52px 48px",
          maxWidth: 540,
          width: "100%",
          textAlign: "center",
          boxShadow: hover
            ? "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(201,169,110,0.25)"
            : "0 24px 60px rgba(0,0,0,0.5)",
          transform: `perspective(800px) rotateX(${-mouse.y * 0.5}deg) rotateY(${mouse.x * 0.5}deg) translateY(${hover ? -8 : 0}px)`,
          transition: hover
            ? "box-shadow 0.3s ease, transform 0.1s ease"
            : "box-shadow 0.5s ease, transform 0.6s ease",
          animation: "floatCard 5s ease-in-out infinite",
          position: "relative", zIndex: 2,
        }}
      >
        {/* Avatar */}
        <div
          onClick={() => heroFileRef.current.click()}
          title="Click to upload photo"
          style={{
            width: 96, height: 96, borderRadius: "50%", margin: "0 auto 20px",
            background: heroPhoto ? "transparent" : "linear-gradient(135deg, #C9A96E, #8B5E3C)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 38, boxShadow: "0 8px 24px rgba(201,169,110,0.4)",
            cursor: "pointer", overflow: "hidden", position: "relative",
          }}
          onMouseEnter={e => { e.currentTarget.querySelector(".avatar-overlay").style.opacity = 1; }}
          onMouseLeave={e => { e.currentTarget.querySelector(".avatar-overlay").style.opacity = 0; }}
        >
          {heroPhoto
            ? <img src={heroPhoto} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span>🧑‍💻</span>
          }
          <div className="avatar-overlay" style={{
            position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0, transition: "opacity 0.2s", borderRadius: "50%",
            color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "0.03em",
          }}>📷 Upload</div>
          <input ref={heroFileRef} type="file" accept="image/*" onChange={handleHeroPhoto} style={{ display: "none" }} />
        </div>

        <p style={{ color: "#8B5E3C", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>
          Portfolio
        </p>
        <h1 style={{ color: "#2B0D05", fontSize: "clamp(28px, 5vw, 40px)", fontFamily: "Georgia, serif", margin: "0 0 6px" }}>
          Yug Jain
        </h1>
        <p style={{ color: "#5C3418", fontSize: 16, marginBottom: 16, minHeight: 26 }}>
          <Typing words={["AI Developer", "Full Stack Engineer", "ML Enthusiast", "Problem Solver"]} />
        </p>
        <p style={{ color: "#6B4226", fontSize: 15, lineHeight: 1.7, marginBottom: 28, maxWidth: 380, margin: "0 auto 28px" }}>
          Building intelligent web experiences through AI, machine learning and modern web technologies.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={btnPrimary} onMouseEnter={btnPrimaryHover} onMouseLeave={btnPrimaryLeave}>
            View Résumé
          </button>
          <button
            style={btnSecondary}
            onMouseEnter={e => { e.currentTarget.style.background = "#2B0D05"; e.currentTarget.style.color = "#F8F4EF"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2B0D05"; }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </button>
        </div>
      </div>

      <style>{`
        @keyframes floatCard {
          0%,100%  { margin-top: 0px; }
          50%      { margin-top: -14px; }
        }
      `}</style>
    </section>
  );
}

const btnPrimary = {
  background: "linear-gradient(135deg,#C9A96E,#A67C45)",
  color: "#2B0D05", border: "none", borderRadius: 10,
  padding: "12px 28px", fontSize: 14, fontWeight: 700,
  cursor: "pointer", letterSpacing: "0.04em",
  transition: "transform 0.2s, box-shadow 0.2s",
};
const btnPrimaryHover = (e) => {
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow = "0 8px 24px rgba(201,169,110,0.4)";
};
const btnPrimaryLeave = (e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "none";
};
const btnSecondary = {
  background: "transparent", color: "#2B0D05",
  border: "2px solid #2B0D05", borderRadius: 10,
  padding: "12px 28px", fontSize: 14, fontWeight: 700,
  cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.2s",
};

// ── About ─────────────────────────────────────────────────
function About() {
  const [aboutPhoto, setAboutPhoto] = useState(null);
  const aboutFileRef = useRef(null);
  const handleAboutPhoto = (e) => {
    const file = e.target.files[0];
    if (file) setAboutPhoto(URL.createObjectURL(file));
  };

  return (
    <section id="about" style={{ background: "#1A0803", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", gap: 64, flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* Polaroid */}
        <FadeUp delay={0} className="about-img-wrap">
          <div style={{
            background: "#F8F4EF", padding: "16px 16px 48px", borderRadius: 4,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.2)",
            transform: "rotate(-2deg)", maxWidth: 280, flexShrink: 0,
            transition: "transform 0.3s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "rotate(0deg) scale(1.03)"}
            onMouseLeave={e => e.currentTarget.style.transform = "rotate(-2deg)"}
          >
            <div
              onClick={() => aboutFileRef.current.click()}
              title="Click to upload photo"
              style={{
                width: "100%", paddingBottom: "100%",
                background: aboutPhoto ? "#000" : "linear-gradient(135deg,#C9A96E 0%,#8B5E3C 50%,#2B0D05 100%)",
                borderRadius: 2, position: "relative", marginBottom: 12,
                cursor: "pointer", overflow: "hidden",
              }}
              onMouseEnter={e => { e.currentTarget.querySelector(".polaroid-overlay").style.opacity = 1; }}
              onMouseLeave={e => { e.currentTarget.querySelector(".polaroid-overlay").style.opacity = 0; }}
            >
              {aboutPhoto
                ? <img src={aboutPhoto} alt="About" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 64 }}>🧑‍💻</span>
              }
              <div className="polaroid-overlay" style={{
                position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                opacity: 0, transition: "opacity 0.2s",
                color: "#fff", fontSize: 14, fontWeight: 600, gap: 6,
              }}>
                <span style={{ fontSize: 28 }}>📷</span>
                <span>{aboutPhoto ? "Change Photo" : "Upload Photo"}</span>
              </div>
              <input ref={aboutFileRef} type="file" accept="image/*" onChange={handleAboutPhoto} style={{ display: "none" }} />
            </div>
            <p style={{ textAlign: "center", color: "#8B5E3C", fontFamily: "Georgia, serif", fontSize: 14 }}>Yug Jain — 2024</p>
          </div>
        </FadeUp>

        {/* Text */}
        <FadeUp delay={0.15} style={{ flex: 1, minWidth: 260 }}>
          <p style={{ color: "#C9A96E", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>About Me</p>
          <h2 style={{ color: "#F8F4EF", fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 20, lineHeight: 1.2 }}>
            Crafting the future,<br />one model at a time.
          </h2>
          <p style={{ color: "rgba(248,244,239,0.65)", lineHeight: 1.8, fontSize: 15, marginBottom: 20, maxWidth: 520 }}>
            I'm a third-year B.Tech student at VIT Bhopal specialising in AI & ML. I sit at the intersection of machine learning and product engineering — I love taking a fuzzy idea, training a model, wrapping it in a polished UI, and shipping it to real users.
          </p>
          <p style={{ color: "rgba(248,244,239,0.65)", lineHeight: 1.8, fontSize: 15, marginBottom: 32, maxWidth: 520 }}>
            Outside the code editor you'll find me hiking, competing in hackathons, or deep in a research paper. I believe great software is invisible — it just works.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {SKILLS.map((s, i) => (
              <FadeUp key={s} delay={0.1 + i * 0.05}>
                <span style={{
                  background: "rgba(201,169,110,0.1)", color: "#C9A96E",
                  border: "1px solid rgba(201,169,110,0.3)", borderRadius: 8,
                  padding: "6px 14px", fontSize: 13, cursor: "default",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,169,110,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(201,169,110,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >{s}</span>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      </div>
      <style>{`.about-img-wrap { flex-shrink: 0; }`}</style>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────
function Projects() {
  const [filter, setFilter] = useState("All");
  const allTech = ["All", "React", "Python", "Next.js", "AI / LLMs"];

  const shown = filter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.tech.some(t => t.toLowerCase().includes(filter.toLowerCase())));

  return (
    <section id="work" style={{ background: "#2B0D05", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeUp>
          <p style={{ color: "#C9A96E", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Portfolio</p>
          <h2 style={{ color: "#F8F4EF", fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 32 }}>Selected Works</h2>
        </FadeUp>

        {/* Filter pills */}
        <FadeUp delay={0.1}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
            {allTech.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                background: filter === t ? "#C9A96E" : "transparent",
                color: filter === t ? "#2B0D05" : "rgba(248,244,239,0.6)",
                border: "1px solid " + (filter === t ? "#C9A96E" : "rgba(201,169,110,0.3)"),
                borderRadius: 20, padding: "7px 18px", fontSize: 13, cursor: "pointer",
                transition: "all 0.2s",
              }}>
                {t}
              </button>
            ))}
          </div>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {shown.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.08}>
              <ProjectCard p={p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "#3D1810" : "rgba(61,24,16,0.6)",
        border: "1px solid " + (hover ? p.color : "rgba(201,169,110,0.15)"),
        borderRadius: 16, padding: 28,
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${p.color}22` : "none",
        transition: "all 0.3s ease", cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ color: p.color, fontFamily: "Georgia, serif", fontSize: 36, lineHeight: 1, opacity: 0.5 }}>{p.num}</span>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: `${p.color}22`, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>💡</div>
      </div>
      <h3 style={{ color: "#F8F4EF", fontSize: 18, marginBottom: 10, fontFamily: "Georgia, serif" }}>{p.title}</h3>
      <p style={{ color: "rgba(248,244,239,0.6)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {p.tech.map(t => (
          <span key={t} style={{
            background: `${p.color}18`, color: p.color,
            border: `1px solid ${p.color}44`, borderRadius: 6,
            padding: "3px 10px", fontSize: 11, letterSpacing: "0.04em",
          }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <a href="https://github.com/yug0939" target="_blank" rel="noopener noreferrer"
          style={{ ...btnGhost, flex: 1, textDecoration: "none", textAlign: "center" }}>GitHub</a>
        <button style={{ ...btnGhost, flex: 1, borderColor: p.color, color: p.color }}>Live Demo</button>
      </div>
    </div>
  );
}
const btnGhost = {
  background: "transparent", border: "1px solid rgba(248,244,239,0.2)",
  color: "rgba(248,244,239,0.7)", borderRadius: 8, padding: "8px 14px",
  fontSize: 13, cursor: "pointer", transition: "all 0.2s",
};

// ── Timeline ──────────────────────────────────────────────
function Timeline() {
  return (
    <section id="experience" style={{ background: "#1A0803", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FadeUp>
          <p style={{ color: "#C9A96E", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Journey</p>
          <h2 style={{ color: "#F8F4EF", fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 56 }}>Experience</h2>
        </FadeUp>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          {/* line */}
          <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 1, background: "rgba(201,169,110,0.2)" }} />

          {TIMELINE.map((t, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div style={{ position: "relative", marginBottom: 48 }}>
                {/* dot */}
                <div style={{
                  position: "absolute", left: -28, top: 6,
                  width: 14, height: 14, borderRadius: "50%",
                  background: "#C9A96E", boxShadow: "0 0 0 4px rgba(201,169,110,0.15)",
                }} />
                <p style={{ color: "#C9A96E", fontSize: 12, letterSpacing: "0.1em", marginBottom: 4 }}>{t.year}</p>
                <h3 style={{ color: "#F8F4EF", fontSize: 18, fontFamily: "Georgia, serif", marginBottom: 2 }}>{t.title}</h3>
                <p style={{ color: "rgba(201,169,110,0.7)", fontSize: 13, marginBottom: 8, fontStyle: "italic" }}>{t.org}</p>
                <p style={{ color: "rgba(248,244,239,0.6)", fontSize: 14, lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ background: "#2B0D05", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeUp>
          <p style={{ color: "#C9A96E", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>What I offer</p>
          <h2 style={{ color: "#F8F4EF", fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 56 }}>Services</h2>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.1}>
              <ServiceCard s={s} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? "rgba(61,24,16,0.9)" : "rgba(61,24,16,0.4)",
      border: "1px solid " + (h ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.15)"),
      borderRadius: 16, padding: "32px 24px",
      transform: h ? "translateY(-6px)" : "translateY(0)",
      boxShadow: h ? "0 20px 50px rgba(0,0,0,0.3)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
      <h3 style={{ color: "#F8F4EF", fontFamily: "Georgia, serif", fontSize: 18, marginBottom: 10 }}>{s.title}</h3>
      <p style={{ color: "rgba(248,244,239,0.6)", fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (form.message.trim().length < 10) e.message = "Message too short";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 4000);
  };

  const inp = {
    background: "rgba(61,24,16,0.6)", border: "1px solid rgba(201,169,110,0.25)",
    borderRadius: 10, padding: "14px 16px", color: "#F8F4EF",
    fontSize: 14, width: "100%", boxSizing: "border-box",
    outline: "none", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ background: "#1A0803", padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeUp>
          <p style={{ color: "#C9A96E", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Get in Touch</p>
          <h2 style={{ color: "#F8F4EF", fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", marginBottom: 56 }}>Contact</h2>
        </FadeUp>

        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          {/* Form */}
          <FadeUp delay={0.1} style={{ flex: 1, minWidth: 260 }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              {sent ? (
                <div style={{
                  background: "rgba(163,190,140,0.1)", border: "1px solid rgba(163,190,140,0.4)",
                  borderRadius: 16, padding: 32, textAlign: "center",
                }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✉️</div>
                  <p style={{ color: "#A3BE8C", fontSize: 18, fontFamily: "Georgia, serif" }}>Message sent!</p>
                  <p style={{ color: "rgba(248,244,239,0.6)", marginTop: 8 }}>I'll get back to you soon.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { key: "name", label: "Name", type: "text", ph: "Your name" },
                    { key: "email", label: "Email", type: "email", ph: "you@example.com" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ color: "rgba(248,244,239,0.6)", fontSize: 13, display: "block", marginBottom: 6 }}>{f.label}</label>
                      <input
                        type={f.type} placeholder={f.ph} value={form[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={{ ...inp, borderColor: errors[f.key] ? "#BF616A" : undefined }}
                        onFocus={e => e.target.style.borderColor = "#C9A96E"}
                        onBlur={e => e.target.style.borderColor = errors[f.key] ? "#BF616A" : "rgba(201,169,110,0.25)"}
                      />
                      {errors[f.key] && <p style={{ color: "#BF616A", fontSize: 12, marginTop: 4 }}>{errors[f.key]}</p>}
                    </div>
                  ))}
                  <div>
                    <label style={{ color: "rgba(248,244,239,0.6)", fontSize: 13, display: "block", marginBottom: 6 }}>Message</label>
                    <textarea
                      rows={5} placeholder="Tell me about your project…"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ ...inp, resize: "vertical", borderColor: errors.message ? "#BF616A" : undefined }}
                      onFocus={e => e.target.style.borderColor = "#C9A96E"}
                      onBlur={e => e.target.style.borderColor = errors.message ? "#BF616A" : "rgba(201,169,110,0.25)"}
                    />
                    {errors.message && <p style={{ color: "#BF616A", fontSize: 12, marginTop: 4 }}>{errors.message}</p>}
                  </div>
                  <button onClick={submit} style={{
                    ...btnPrimary, width: "100%", padding: "16px",
                    fontSize: 15, borderRadius: 12,
                  }}
                    onMouseEnter={btnPrimaryHover} onMouseLeave={btnPrimaryLeave}
                  >
                    Send Message →
                  </button>
                </div>
              )}
            </div>
          </FadeUp>

          {/* Phone mockup / Social */}
          <FadeUp delay={0.2}>
            <div style={{
              background: "linear-gradient(145deg, #3D1810, #2B0D05)",
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: 32, padding: "40px 32px",
              width: 260, flexShrink: 0,
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
            }}>
              <p style={{ color: "rgba(248,244,239,0.5)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 28 }}>Find me on</p>
              {[
                { icon: "💼", label: "LinkedIn", sub: "/in/yugjain" },
                { icon: "🐙", label: "GitHub", sub: "/yug0939", href: "https://github.com/yug0939" },
                { icon: "✉️", label: "Email", sub: "yug@example.com" },
                { icon: "📄", label: "Résumé", sub: "Download PDF" },
              ].map((l, i) => {
                const inner = (
                  <>
                    <span style={{ fontSize: 22 }}>{l.icon}</span>
                    <div>
                      <p style={{ color: "#F8F4EF", fontSize: 14, fontWeight: 600 }}>{l.label}</p>
                      <p style={{ color: "#C9A96E", fontSize: 12 }}>{l.sub}</p>
                    </div>
                  </>
                );
                const sharedStyle = {
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 0",
                  borderBottom: i < 3 ? "1px solid rgba(201,169,110,0.1)" : "none",
                  cursor: "pointer", transition: "transform 0.2s",
                  textDecoration: "none",
                };
                return l.href ? (
                  <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                    style={sharedStyle}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateX(6px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
                  >{inner}</a>
                ) : (
                  <div key={i} style={sharedStyle}
                    onMouseEnter={e => e.currentTarget.style.transform = "translateX(6px)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
                  >{inner}</div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: "#1A0803", borderTop: "1px solid rgba(201,169,110,0.1)",
      padding: "32px 5vw", display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 12,
    }}>
      <span style={{ color: "rgba(248,244,239,0.4)", fontSize: 13, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
        The Developer's Desk
      </span>
      <span style={{ color: "rgba(248,244,239,0.3)", fontSize: 12 }}>
        © 2024 Yug Jain · Built with ♥
      </span>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: "#2B0D05", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <ScrollBar />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Timeline />
      <Services />
      <Contact />
      <Footer />
      <BackTop />
    </div>
  );
}
