import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const sections = [
  "home",
  "about",
  "services",
//  "stats",
  "projects",
  "tech",
  "testimonials",
  "process",
  "contact",
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const headerHeightRef = useRef<number>(0);

  useEffect(() => setMounted(true), []);

  /** Measure exact header height and cache it */
  const measureHeader = () => {
    const el = headerRef.current;
    if (!el) return;
    const h = Math.ceil(el.getBoundingClientRect().height);
    headerHeightRef.current = h;
    document.documentElement.style.setProperty("--nav-offset", `${h}px`); // harmless if you kept CSS from earlier
  };

  /** Programmatic smooth scroll with offset so content never sits under the navbar */
  const scrollToId = (id: string) => {
    // Special case for home - scroll to top
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    // Re-measure in case layout changed
    measureHeader();
    const headerH = headerHeightRef.current || 0;

    const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    // +1 keeps the single border seam visible instead of double-thick
    const finalTop = Math.max(0, targetTop - headerH + 1);

    window.scrollTo({ top: finalTop, behavior: "smooth" });
  };

  /** Setup measurements + hash handling */
  useEffect(() => {
    measureHeader();

    const onResize = () => measureHeader();
    const onOrientation = () => measureHeader();

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientation);

    // Recalculate when web fonts settle (can change header height)
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(measureHeader).catch(() => {});
    }

    // Handle initial load with #hash
    if (location.hash && location.hash.length > 1) {
      const id = decodeURIComponent(location.hash.slice(1));
      // wait a tick so layout is ready
      requestAnimationFrame(() => scrollToId(id));
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Shadow + active link on scroll (kept from your version) */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);

      // If at the top of the page, set activeSection to "home"
      if (y < 100) {
        setActiveSection("home");
        return;
      }

      const offsets = sections
        .filter(id => id !== "home") // Exclude home from normal section calculations
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop - 120 } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const current = offsets.reverse().find((s) => y >= s.top);
      if (current?.id !== activeSection) setActiveSection(current?.id || "home");
    };

    // Set initial active section
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  /** Click handler that overrides default anchor jump */
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    // Only handle in-page anchors
    if (id && id.startsWith("#")) {
      e.preventDefault();
      const clean = id.replace(/^#/, "");
      scrollToId(clean);
      // also update the URL hash for accessibility/back button
      history.pushState(null, "", `#${clean}`);
    }
  };

  return (
    <div 
      className="fixed top-0 left-0 right-0 w-full z-[99999]"
      style={{ 
        backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF'
      }}
    >
      <header
        ref={headerRef}
        className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-6 lg:pt-8"
        style={{ 
          backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF'
        }}
      >
        {/* Bordered panel */}
        <div
          className={`border ${scrolled ? "shadow-sm" : ""}`}
          style={{ 
            backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
            borderColor: theme === 'dark' ? '#FFFFFF' : '#575757'
          }}
        >
        <nav 
          className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"
          style={{ 
            backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF'
          }}>
          {/* Left - Logo */}
          <div 
            className="font-bold w-[200px]"
            style={{ 
              color: theme === 'dark' ? '#FFFFFF' : '#000000'
            }}
          >
            Emmi Yeo
          </div>

          {/* Center - Navigation */}
          <div className="flex items-center justify-center gap-6">
            {sections.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => onNavClick(e, `#${id}`)}
                className="text-sm font-medium transition-all hover:text-[#FBD144] active:scale-95"
                style={{ 
                  color: activeSection === id ? '#FBD144' : theme === 'dark' ? '#FFFFFF' : '#000000',
                  fontWeight: activeSection === id ? '600' : '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FBD144';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = activeSection === id ? '#FBD144' : theme === 'dark' ? '#FFFFFF' : '#000000';
                }}
              >
                {id === "tech" ? "Stack" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          {/* Right - Dark Mode Toggle */}
          <div className="w-[200px] flex justify-end">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle Dark Mode"
                className="text-sm px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
                style={{
                  backgroundColor: theme === 'dark' ? '#FFFFFF' : '#000000',
                  color: theme === 'dark' ? '#000000' : '#FFFFFF',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: theme === 'dark' ? '#FFFFFF' : '#000000'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FBD144';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.borderColor = '#FBD144';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? '#FFFFFF' : '#000000';
                  e.currentTarget.style.color = theme === 'dark' ? '#000000' : '#FFFFFF';
                  e.currentTarget.style.borderColor = theme === 'dark' ? '#FFFFFF' : '#000000';
                }}
              >
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
              </button>
            )}
          </div>
        </nav>
        </div>
      </header>
    </div>
  );
}
