import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Heart,
  Music,
  Volume2,
  VolumeX,
  ArrowUp,
  Sparkles,
  Calendar,
  X,
  ChevronRight,
  Menu,
  Edit3,
  Check,
  Clock,
  Camera
} from 'lucide-react';
import './App.css';

// ============================================================================
// CUSTOMIZATION SECTION - EDIT YOUR PERSONAL DETAILS, DATES, IMAGES & TEXT HERE
// ============================================================================

const CONFIG = {
  partnerName: 'Reign',
  senderName: 'Lley',
  // Format: YYYY-MM-DDTHH:mm:ss (Default set to August 1, 2025)
  defaultStartDate: '2025-08-01T18:30:00',
  // Replace with your local audio file in the /public folder (e.g., '/our-song.mp3')
  musicUrl: '/our-song.mp3',
  musicTitle: 'Our Little Universe — Acoustic Theme',
};

interface TimelineMemory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const TIMELINE_MEMORIES: TimelineMemory[] = [
{
  id: 1,
  date: 'September 19, 2025',
  title: 'First Picture after 4 years :p',
  description:
    'After four years, here we are, finally sharing our first picture together babyyyy<3, well medj epic pa and shy pa us noon HAHAHAHHA',
  image: '/images/1.jpg',
  tag: 'Chapter 01',
},
  {
     id: 2,
  date: 'October 3, 2025',
  title: 'first ever picture natin together tapos bday ko pa, grabe talaga HAHAHHAHAHA hehe mwa',
  description:
    'wala lang,, eto yung pinangarap ko noon e hahahhaha yung kasama ka sa bday ko<3',
  image: '/images/2.jpg',
  tag: 'Chapter 02',
},
   {
     id: 3,
  date: 'December 11, 2025',
  title: 'go outside kasama si mama with u bago kami pumunta ng aus',
  description:
    'di ko ba alam, kahit anong pose mo ang ganda mo HAHHAHAHA mwa',
  image: '/images/3.jpg',
  tag: 'Chapter 03',
},
    {
     id: 4,
  date: 'January 22, 2026',
  title: 'oh eto naman bday mo,, kasama mo ako, pinangarap ko din to HAHAHAHHA',
  description:
    '🧡',
  image: '/images/4.jpg',
  tag: 'Chapter 04',
},
    {
     id: 5,
  date: 'February 13, 2026',
  title: 'oh syempre di mawawala yung before valientine natin HAHAHAHHA',
  description:
    '🧡',
  image: '/images/5.jpg',
  tag: 'Chapter 05',
},
    {
     id: 6,
  date: 'May 24, 2026',
  title: 'the day my lola passed away or burol no lola, but you were there to comfort me and support me',
  description:
    'this will be my favorite picture of us baby, no matter kung ano pinag awayan natin noon, u still showed up and comforted me',
  image: '/images/6.jpg',
  tag: 'Chapter 06',
},
    {
     id: 7,
  date: 'July 24, 2026',
  title: 'syempre clark',
  description:
    'dito may freedom tayo HAHAHAH malayo tayo sa mga parents natin',
  image: '/images/7.jpg',
  tag: 'Chapter 07',
},
    {
     id: 8,
  date: 'October 4, 2026',
  title: 'birthday ko last month, nag seafoods tayo tapos nag libot dbaaa<3',
  description:
    '2nd bday ko na kasama kita grabe🧡🧡',
  image: '/images/8.jpg',
  tag: 'Chapter 08',
},
    {
     id: 9,
  date: 'November 14, 2026',
  title: 'syempre di mawawala yung kanina',
  description:
    'matcha e, ang sarap grabe HAHAHAHHAHA',
  image: '/images/9.jpg',
  tag: 'Chapter 09',
},
];

interface GalleryPhoto {
  id: number;
  url: string;
  caption: string;
  location: string;
  date: string;
  aspect: 'tall' | 'wide' | 'square';
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
  id: 1,
  url: '/images/10.jpg',
  caption: 'ORAORA',
  location: 'Green Fields',
  date: '',
  aspect: 'tall',
},
   {
  id: 2,
  url: '/images/11.jpg',
  caption: 'Valentines Day',
  location: 'Megaworld Capital Town',
  date: '',
  aspect: 'tall',
},
   {
  id: 3,
  url: '/images/12.jpg',
  caption: 'wala lang hehe ganda mo dito',
  location: 'N-Woods',
  date: '',
  aspect: 'tall',
},
     {
  id: 4,
  url: '/images/13.jpg',
  caption: 'huy ganda graduation mo dito',
  location: 'Sindalan sa ICT HAHAHAHA',
  date: '',
  aspect: 'tall',
},
     {
  id: 5,
  url: '/images/14.jpg',
  caption: 'eto yung time na lumabas kayo noon tapos nilamig ka',
  location: 'N-Woods',
  date: '',
  aspect: 'tall',
},
    {
  id: 6,
  url: '/images/15.jpg',
  caption: 'ganda mo talaga baby hahshhahah nalulusaw ako palagi sa kagandahan mo',
  location: 'N-Woods',
  date: '',
  aspect: 'tall',
},
];

// Customize your personal love letter paragraphs here:
const LOVE_LETTER = {
  greeting: `To my favorite person, ${CONFIG.partnerName}.`,
  paragraphs: [
    'minsan nahuhuli ko na lang sarili ko na nakangiti habang iniisip ka, kahit wala namang special na nangyayari,, ang funny lang kasi dati, akala ko kailangan laging may grand moments para maging happy, pero simula nung dumating ka, narealize ko na kahit simpleng usap lang natin, random updates, kulitan, or kahit yung presence mo lang, enough na para gumaan yung araw ko, ou have this way of making my ordinary days feel special without even trying.',
    'you have a way of bringing warmth like soft afternoon sunlight and calm like a deep breath in a quiet forest,, whether we are laughing until we lose track of time or sitting in comfortable silence, being with you always feels like coming home.',
    'thank you for your kindness, your patience, your radiant spirit, and for letting me walk beside you,, no matter how big the world gets, you will always be my favorite little universe babyyy🧡🧡',
  ],
  signOff: 'Forever yours,',
  signature: `${CONFIG.senderName} ♡`,
};

const SURPRISE_MESSAGE = {
  badge: 'A Secret Note For You',
  title: 'you are my favorite notification babyyy, my safest place, and my best decision in my entire life🧡.',
  body: 'whenever you feel tired or overwhelmed, remember that somewhere in this world, someone is endlessly proud of you and grateful just to call you theirs. i love you more than words on a screen could ever hold babyyy haha🧡🧡',
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export function App() {
  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Audio Player State (with Web Audio API gentle ambient fallback if local MP3 isn't added yet)
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioNotice, setAudioNotice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Live Relationship Counter State
  const [startDate, setStartDate] = useState<string>(() => {
    const saved = localStorage.getItem('reign_universe_start_date');
    return saved || CONFIG.defaultStartDate;
  });
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDateInput, setTempDateInput] = useState(startDate.slice(0, 16));
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Lightbox & Surprise Modal State
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);

  // Floating Hearts Burst State
  const [burstHearts, setBurstHearts] = useState<{ id: number; x: number; size: number }[]>([]);

  // Framer Motion Scroll Parallax for Hero
  const { scrollY } = useScroll();
  const heroOrb1Y = useTransform(scrollY, [0, 700], [0, 140]);
  const heroOrb2Y = useTransform(scrollY, [0, 700], [0, -110]);

  // Monitor Scroll Position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowBackToTop(window.scrollY > 550);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Relationship Timer Calculation
  useEffect(() => {
    const updateCounter = () => {
      const start = new Date(startDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = window.setInterval(updateCounter, 1000);
    return () => window.clearInterval(interval);
  }, [startDate]);

  // Save Edited Relationship Start Date
  const handleSaveDate = () => {
    if (tempDateInput) {
      setStartDate(tempDateInput);
      localStorage.setItem('reign_universe_start_date', tempDateInput);
    }
    setIsEditingDate(false);
  };

  // Gentle Warm Piano Chords Fallback if /our-song.mp3 is not yet placed in public/
  const startAmbientFallback = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const chords = [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 392.0],  // Am7
        [174.61, 220.0, 261.63, 349.23], // Fmaj7
        [196.0, 246.94, 293.66, 392.0],  // G6
      ];
      let step = 0;

      const playChord = () => {
        if (!audioCtxRef.current) return;
        const now = ctx.currentTime;
        const notes = chords[step % chords.length];
        step++;

        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.028, now + idx * 0.08 + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 3.6);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 3.8);
        });
      };

      playChord();
      synthIntervalRef.current = window.setInterval(playChord, 3600);
      setAudioNotice('Playing gentle ambient melody (add /our-song.mp3 for custom audio)');
      setTimeout(() => setAudioNotice(null), 4500);
    } catch {
      setAudioNotice('Audio playback blocked by browser');
    }
  };

  const stopAmbientFallback = () => {
    if (synthIntervalRef.current) {
      window.clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  // Music Toggle Handler
  const toggleMusic = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopAmbientFallback();
      setIsPlaying(false);
    } else {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch {
        // Fallback to soothing ambient chords if placeholder file isn't present yet
        startAmbientFallback();
        setIsPlaying(true);
      }
    }
  };

  // Cleanup Audio on Unmount
  useEffect(() => {
    return () => {
      stopAmbientFallback();
    };
  }, []);

  // Trigger Floating Hearts Celebration
  const triggerHeartBurst = () => {
    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      size: Math.random() * 14 + 14,
    }));
    setBurstHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setBurstHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 3200);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="universe-app">
      {/* Hidden Local Audio Element (Place your MP3 in public/our-song.mp3) */}
      <audio ref={audioRef} src={CONFIG.musicUrl} loop preload="none" />

      {/* Subtle Ambient Floating Particles */}
      <div className="ambient-particles" aria-hidden="true">
        <span className="particle p-1" />
        <span className="particle p-2" />
        <span className="particle p-3" />
        <span className="particle p-4" />
        <span className="particle p-5" />
        <span className="particle p-6" />
      </div>

      {/* Interactive Burst Hearts Overlay */}
      <div className="heart-burst-layer" aria-hidden="true">
        <AnimatePresence>
          {burstHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 1, 0], y: -420, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: 'easeOut' }}
              className="burst-heart"
              style={{ left: `${heart.x}%` }}
            >
              <Heart
                size={heart.size}
                fill="#F4A261"
                color="#F4A261"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Audio Toast Notification */}
      <AnimatePresence>
        {audioNotice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="audio-toast"
          >
            <Music size={15} />
            <span>{audioNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          NAVIGATION BAR
      ===================================================================== */}
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          <button
            onClick={scrollToTop}
            className="navbar__brand"
            aria-label="A Little Universe Called Reign Home"
          >
            <span className="brand-dot" />
            <span className="brand-text">Reign’s Universe</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="navbar__links" aria-label="Primary Navigation">
            <button onClick={() => scrollToSection('counter')} className="nav-link">
              Our Time
            </button>
            <button onClick={() => scrollToSection('story')} className="nav-link">
              Our Story
            </button>
            <button onClick={() => scrollToSection('gallery')} className="nav-link">
              Memories
            </button>
            <button onClick={() => scrollToSection('letter')} className="nav-link">
              Love Letter
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="navbar__actions">
            <button
              onClick={toggleMusic}
              className={`music-toggle ${isPlaying ? 'is-playing' : ''}`}
              aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
              title={CONFIG.musicTitle}
            >
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="music-toggle__label">
                {isPlaying ? 'Sound On' : 'Play Music'}
              </span>
              {isPlaying && (
                <span className="equalizer" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-drawer"
            >
              <div className="mobile-drawer__inner">
                <button onClick={() => scrollToSection('counter')} className="mobile-nav-link">
                  Our Time Together
                </button>
                <button onClick={() => scrollToSection('story')} className="mobile-nav-link">
                  Our Story
                </button>
                <button onClick={() => scrollToSection('gallery')} className="mobile-nav-link">
                  Photo Memories
                </button>
                <button onClick={() => scrollToSection('letter')} className="mobile-nav-link">
                  Love Letter
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* =====================================================================
            HERO SECTION
        ===================================================================== */}
        <section className="hero">
          {/* Animated Organic Ambient Orbs */}
          <motion.div style={{ y: heroOrb1Y }} className="hero__orb hero__orb--orange" />
          <motion.div style={{ y: heroOrb2Y }} className="hero__orb hero__orb--matcha" />

          <div className="container hero__grid">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="hero__content"
            >
              <div className="hero__eyebrow">
                <Sparkles size={14} className="eyebrow-icon" />
                <span>A Little Universe Called {CONFIG.partnerName}</span>
              </div>

              <h1 className="hero__title">
                Every little thing leads me <em>back to you.</em>
              </h1>

              <p className="hero__subtitle">
                A little corner of the internet, made especially for my favorite person.
              </p>

              <div className="hero__cta-group">
                <button
                  onClick={() => scrollToSection('story')}
                  className="btn-primary"
                >
                  <span>Explore Our Story</span>
                  <ChevronRight size={18} />
                </button>

                <button
                  onClick={() => {
                    triggerHeartBurst();
                    setIsSurpriseOpen(true);
                  }}
                  className="btn-secondary"
                >
                  <Heart size={16} />
                  <span>Open a Little Secret</span>
                </button>
              </div>
            </motion.div>

            {/* Editorial Visual Composition with Orange & Matcha Accents */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hero__visual"
            >
              <div className="editorial-collage">
                <div className="collage-backdrop-matcha" />
                <div className="collage-backdrop-orange" />

                <div className="collage-frame-main">
                  <img
                    src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=950&q=85"
                    alt="Warm romantic aesthetic moment"
                    className="collage-img"
                  />
                  <div className="collage-badge">
                    <span className="collage-badge__dot" />
                    <span>Dedicated to {CONFIG.partnerName}</span>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="collage-floating-card"
                >
                  <div className="floating-card__icon">
                    <Heart size={16} fill="#F4A261" color="#F4A261" />
                  </div>
                  <div>
                    <p className="floating-card__label">Current Orbit</p>
                    <p className="floating-card__value">
                      {timeElapsed.days} Days of Loving You
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================================
            LIVE RELATIONSHIP COUNTER SECTION
        ===================================================================== */}
        <section id="counter" className="counter-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="counter-card"
            >
              <div className="counter-card__header">
                <div>
                  <span className="section-tag">Every Second Counts</span>
                  <h2 className="counter-card__title">
                    Time Since Our Worlds Collided
                  </h2>
                </div>

                {/* Editable Start Date Control */}
                <div className="date-editor">
                  {!isEditingDate ? (
                    <button
                      onClick={() => {
                        setTempDateInput(startDate.slice(0, 16));
                        setIsEditingDate(true);
                      }}
                      className="date-edit-btn"
                      title="Customize your anniversary date"
                    >
                      <Calendar size={14} />
                      <span>
                        Since{' '}
                        {new Date(startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <Edit3 size={13} />
                    </button>
                  ) : (
                    <div className="date-input-group">
                      <input
                        type="datetime-local"
                        value={tempDateInput}
                        onChange={(e) => setTempDateInput(e.target.value)}
                        className="date-input"
                        aria-label="Edit relationship start date"
                      />
                      <button
                        onClick={handleSaveDate}
                        className="date-save-btn"
                        aria-label="Save date"
                      >
                        <Check size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="counter-grid">
                <div className="counter-unit">
                  <span className="counter-unit__number">
                    {String(timeElapsed.days).padStart(2, '0')}
                  </span>
                  <span className="counter-unit__label">Days</span>
                </div>
                <div className="counter-unit">
                  <span className="counter-unit__number">
                    {String(timeElapsed.hours).padStart(2, '0')}
                  </span>
                  <span className="counter-unit__label">Hours</span>
                </div>
                <div className="counter-unit">
                  <span className="counter-unit__number">
                    {String(timeElapsed.minutes).padStart(2, '0')}
                  </span>
                  <span className="counter-unit__label">Minutes</span>
                </div>
                <div className="counter-unit counter-unit--accent">
                  <span className="counter-unit__number">
                    {String(timeElapsed.seconds).padStart(2, '0')}
                  </span>
                  <span className="counter-unit__label">Seconds</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================================
            OUR STORY TIMELINE SECTION
        ===================================================================== */}
        <section id="story" className="story-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="section-header"
            >
              <span className="section-tag">Chronicles of Us</span>
              <h2 className="section-title">Moments That Shaped Our Story</h2>
              <p className="section-subtitle">
                Not just dates on a calendar, but the quiet milestones that turned ordinary days into my favorite chapters.
              </p>
            </motion.div>

            <div className="timeline">
              <div className="timeline__line" aria-hidden="true" />

              {TIMELINE_MEMORIES.map((memory, index) => {
                const isEven = index % 2 === 1;
                return (
                  <motion.article
                    key={memory.id}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-90px' }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className={`timeline-item ${isEven ? 'timeline-item--reversed' : ''}`}
                  >
                    <div className="timeline-item__marker" aria-hidden="true">
                      <span className="marker-core" />
                    </div>

                    <div className="timeline-item__media">
                      <div className="timeline-img-wrapper">
                        <img
                          src={memory.image}
                          alt={memory.title}
                          loading="lazy"
                          className="timeline-img"
                        />
                        <span className="timeline-chapter-pill">{memory.tag}</span>
                      </div>
                    </div>

                    <div className="timeline-item__content">
                      <div className="timeline-date">
                        <Clock size={14} />
                        <span>{memory.date}</span>
                      </div>
                      <h3 className="timeline-title">{memory.title}</h3>
                      <p className="timeline-desc">{memory.description}</p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            PHOTO MEMORIES GALLERY SECTION (MASONRY + LIGHTBOX)
        ===================================================================== */}
        <section id="gallery" className="gallery-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="section-header"
            >
              <span className="section-tag">Visual Archive</span>
              <h2 className="section-title">Frames of {CONFIG.partnerName}</h2>
              <p className="section-subtitle">
                A curated collection of snapshots, golden afternoons, and little moments I never want to forget. Click any photograph to expand.
              </p>
            </motion.div>

            <div className="masonry-grid">
              {GALLERY_PHOTOS.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  className={`gallery-card gallery-card--${photo.aspect}`}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    loading="lazy"
                    className="gallery-card__img"
                  />
                  <figcaption className="gallery-card__overlay">
                    <div className="gallery-card__meta">
                      <Camera size={14} />
                      <span>{photo.location}</span>
                    </div>
                    <p className="gallery-card__caption">{photo.caption}</p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            LOVE LETTER SECTION
        ===================================================================== */}
        <section id="letter" className="letter-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85 }}
              className="letter-wrapper"
            >
              <div className="letter-accent-border" aria-hidden="true" />

              <div className="letter-header">
                <span className="section-tag">Written From The Heart</span>
                <div className="letter-seal" aria-hidden="true">
                  <Heart size={18} fill="#FFF9F0" color="#FFF9F0" />
                </div>
              </div>

              <h2 className="letter-greeting">{LOVE_LETTER.greeting}</h2>

              <div className="letter-body">
                {LOVE_LETTER.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="letter-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="letter-footer">
                <div>
                  <p className="letter-signoff">{LOVE_LETTER.signOff}</p>
                  <p className="letter-signature">{LOVE_LETTER.signature}</p>
                </div>

                <button
                  onClick={() => {
                    triggerHeartBurst();
                    setIsSurpriseOpen(true);
                  }}
                  className="surprise-trigger-btn"
                >
                  <Sparkles size={16} />
                  <span>Tap for a Hidden Note</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================================
            FINAL EMOTIONAL CLOSING SECTION
        ===================================================================== */}
        <section className="closing-section">
          <div className="closing-glow" aria-hidden="true" />
          <div className="container closing-section__inner">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85 }}
              className="closing-content"
            >
              <span className="closing-eyebrow">Always & In All Ways</span>
              <h2 className="closing-title">
              
              </h2>
              <p className="closing-text">
                thank you for being part of my life babyyy, here's to more memories, more laughter, and more moments together.
              </p>
              <p className="closing-signature">With love, {CONFIG.senderName} ♡</p>

              <div className="closing-actions">
                <button
                  onClick={triggerHeartBurst}
                  className="btn-love-pulse"
                >
                  <Heart size={17} fill="currentColor" />
                  <span>Send Love Across the Universe</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          MINIMAL FOOTER
      ===================================================================== */}
      <footer className="footer">
        <div className="container footer__inner">
          <p className="footer__copy">
            Crafted with endless affection for {CONFIG.partnerName} · A Little Universe
          </p>
          <p className="footer__note">
            Every orbit leads home to you.
          </p>
        </div>
      </footer>

      {/* =====================================================================
          BACK TO TOP BUTTON
      ===================================================================== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="back-to-top"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* =====================================================================
          PHOTO LIGHTBOX MODAL
      ===================================================================== */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.3 }}
              className="lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="modal-close-btn"
                aria-label="Close photo preview"
              >
                <X size={20} />
              </button>

              <div className="lightbox-modal__img-wrap">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="lightbox-modal__img"
                />
              </div>

              <div className="lightbox-modal__info">
                <div className="lightbox-modal__meta">
                  <span>{selectedPhoto.location}</span>
                  <span>•</span>
                  <span>{selectedPhoto.date}</span>
                </div>
                <p className="lightbox-modal__caption">{selectedPhoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          SURPRISE LOVE MESSAGE MODAL
      ===================================================================== */}
      <AnimatePresence>
        {isSurpriseOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-backdrop"
            onClick={() => setIsSurpriseOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              className="surprise-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsSurpriseOpen(false)}
                className="modal-close-btn modal-close-btn--light"
                aria-label="Close secret message"
              >
                <X size={20} />
              </button>

              <div className="surprise-modal__badge">
                <Sparkles size={14} />
                <span>{SURPRISE_MESSAGE.badge}</span>
              </div>

              <h3 className="surprise-modal__title">{SURPRISE_MESSAGE.title}</h3>
              <p className="surprise-modal__body">{SURPRISE_MESSAGE.body}</p>

              <div className="surprise-modal__footer">
                <span className="surprise-modal__sign">— Always, {CONFIG.senderName} ♡</span>
                <button
                  onClick={triggerHeartBurst}
                  className="surprise-modal__heart-btn"
                >
                  <Heart size={16} fill="#F4A261" color="#F4A261" />
                  <span>More Hearts</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;