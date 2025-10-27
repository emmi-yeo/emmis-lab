import { useState, FormEvent } from "react";
import { FaLinkedinIn, FaGithub, FaYoutube } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function Contact() {
  const { theme } = useTheme();
  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/minyiyeo/", icon: <FaLinkedinIn /> },
    { name: "GitHub", href: "https://github.com/emmi-yeo?tab=repositories", icon: <FaGithub /> },
    { name: "YouTube", href: "https://www.youtube.com/@emmi-lab", icon: <FaYoutube /> },
  ];

  const resumeUrl = "/resume.pdf"; // place resume in /public

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xgvzorzg", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setShowPopup(true);
        form.reset();
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="inbox me"
      className="relative z-0 bg-lightsecondary dark:bg-darksecondary px-3 sm:px-4 md:px-6 lg:px-8"
    >
      {/* Popup Message */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[2000]">
          <div className="bg-lightbox dark:bg-darkbox border border-lightborder dark:border-darkborder rounded-xl px-6 py-4 shadow-xl text-center animate-fade-in">
            <p className="text-lg font-medium mb-2">✅ Message sent!</p>
            <p className="text-sm text-lighttextsecondary dark:text-darktextsecondary">
              Thanks for reaching out. I’ll get back to you soon.
            </p>
          </div>
        </div>
      )}

      <div className="border border-lightborder dark:border-darkborder -mt-px">
        <div className="max-w-5xl mx-auto px-6 py-10 md:py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-14 md:mb-16">
            Slide Into My Inbox
          </h2>

          {/* Two-column form */}
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6 items-stretch"
          >
            {/* Left column */}
            <div className="space-y-4 h-full">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full p-3 border border-lightborder dark:border-darkborder bg-transparent rounded-xl focus:outline-none focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 border border-lightborder dark:border-darkborder bg-transparent rounded-xl focus:outline-none focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  name="subject"
                  type="text"
                  className="w-full p-3 border border-lightborder dark:border-darkborder bg-transparent rounded-xl focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col h-full">
              <label className="block text-sm font-medium mb-1">Message</label>
              <div className="relative flex-1 min-h-[200px] md:min-h-0">
                <textarea
                  name="message"
                  className="w-full h-full resize-none p-3 pr-12 border border-lightborder dark:border-darkborder bg-transparent rounded-xl focus:outline-none focus:ring-0"
                  required
                />

                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={loading}
                  className="absolute bottom-3 right-3 h-9 w-9 flex items-center justify-center rounded-full border active:scale-95 transition-all duration-200 disabled:opacity-50"
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
                  {loading ? (
                    <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Stalk Me (Professionally) */}
          <div className="mt-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-14 md:mb-16">
              Stalk Me (Professionally)
            </h3>

            <div className="flex items-center justify-center gap-3 md:gap-4">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md hover:opacity-85 transition text-[18px] font-semibold"
                  style={{
                    backgroundColor: theme === 'dark' ? '#FFFFFF' : '#000000',
                    color: theme === 'dark' ? '#000000' : '#FFFFFF',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: theme === 'dark' ? '#FFFFFF' : '#000000'
                  }}
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <button
              onClick={() =>
                window.open(resumeUrl, "_blank", "noopener,noreferrer")
              }
              className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full active:scale-95 transition-all duration-200"
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
              Hire Me Starter Kit [PDF]
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
