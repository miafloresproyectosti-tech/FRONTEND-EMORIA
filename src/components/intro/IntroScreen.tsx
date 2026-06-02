import { motion } from "framer-motion";
import { ArrowRight, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import emoriaFace from "../../assets/backgrounds/emoria/Emoria.png";

interface Props {
  onStart: () => void;
}

const introSegments = [
  "Hola... soy EMORIA.",
  "Tu inteligencia emocional artificial.",
  "Estoy aquí para conocerte, comprenderte y acompañarte.",
  "Cuando estés lista, comenzaremos esta experiencia juntas.",
];

const fullIntroText = introSegments.join(" ");

const getPreferredSpanishVoice = () => {
  if (!("speechSynthesis" in window)) return undefined;

  const voices = window.speechSynthesis.getVoices();
  const preferredNames = [
    "Google español",
    "Google español de Estados Unidos",
    "Microsoft Helena",
    "Microsoft Sabina",
    "Microsoft Laura",
    "Microsoft Dalia",
    "Paulina",
    "Lucia",
    "Mónica",
    "female",
    "mujer",
  ];

  return (
    voices.find((voice) => {
      const name = voice.name.toLowerCase();

      return (
        voice.lang.toLowerCase().startsWith("es") &&
        preferredNames.some((preferred) =>
          name.includes(preferred.toLowerCase())
        )
      );
    }) ??
    voices.find((voice) => voice.lang === "es-ES") ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith("es"))
  );
};

export default function IntroScreen({ onStart }: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStartedVoice, setHasStartedVoice] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.getVoices();
      }
    };

    loadVoices();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const finishIntro = () => {
    setIsSpeaking(false);
    setDisplayedText(fullIntroText);

    timeoutRef.current = setTimeout(() => {
      onStart();
    }, 900);
  };

  const revealFallback = (text: string, previousText: string) => {
    const words = text.split(" ");
    let currentWord = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayedText(
        `${previousText}${words.slice(0, currentWord).join(" ")}`
      );

      currentWord++;

      if (currentWord > words.length && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 210);
  };

  const speakSegment = (
    index: number,
    previousText: string,
    voice?: SpeechSynthesisVoice
  ) => {
    if (index >= introSegments.length) {
      finishIntro();
      return;
    }

    const segment = introSegments[index];
    const speech = new SpeechSynthesisUtterance(segment);
    const words = segment.split(" ");
    let boundaryTriggered = false;

    speech.lang = voice?.lang ?? "es-ES";
    speech.rate = 0.98;
    speech.pitch = 1.04;
    speech.volume = 1;

    if (voice) speech.voice = voice;

    speech.onboundary = (event) => {
      if (event.name !== "word") return;

      boundaryTriggered = true;

      const spokenText = segment.slice(0, event.charIndex);
      const wordCount =
        spokenText.trim().split(/\s+/).filter(Boolean).length + 1;

      setDisplayedText(
        `${previousText}${words.slice(0, wordCount).join(" ")}`
      );
    };

    timeoutRef.current = setTimeout(() => {
      if (!boundaryTriggered && window.speechSynthesis.speaking) {
        revealFallback(segment, previousText);
      }
    }, 650);

    speech.onend = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      const nextPreviousText = `${previousText}${segment} `;
      const pause = index === 0 ? 520 : 360;

      setDisplayedText(nextPreviousText.trim());

      timeoutRef.current = setTimeout(() => {
        speakSegment(index + 1, nextPreviousText, voice);
      }, pause);
    };

    speech.onerror = finishIntro;

    window.speechSynthesis.speak(speech);
  };

  const handleStart = () => {
    if (hasStartedVoice) return;

    setHasStartedVoice(true);
    setIsSpeaking(true);
    setDisplayedText("");

    if (!("speechSynthesis" in window)) {
      finishIntro();
      return;
    }

    window.speechSynthesis.cancel();

    timeoutRef.current = setTimeout(() => {
      speakSegment(0, "", getPreferredSpanishVoice());
    }, 180);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] overflow-hidden bg-black flex items-end justify-center"
    >
      <motion.img
        src={emoriaFace}
        alt="EMORIA"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{
          opacity: 1,
          scale: isSpeaking ? [1, 1.01, 1] : 1,
          filter: isSpeaking
            ? ["brightness(1)", "brightness(1.08)", "brightness(1)"]
            : "brightness(1)",
        }}
        transition={{
          duration: 2.2,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_62%)]" />

      <motion.div
        animate={{
          opacity: isSpeaking ? [0.15, 0.32, 0.15] : 0.12,
          scale: isSpeaking ? [1, 1.02, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-violet-500/10 mix-blend-screen"
      />

      <motion.div
        animate={{
          scaleY: isSpeaking ? [1, 1.24, 1] : 1,
          opacity: isSpeaking ? [0.08, 0.22, 0.08] : 0.06,
        }}
        transition={{
          duration: 0.34,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[180px] h-[55px] rounded-full bg-violet-400/20 blur-2xl"
      />

      <motion.div
        animate={{
          opacity: isSpeaking ? [0.2, 0.9, 0.2] : [0.15, 0.45, 0.15],
          scaleX: isSpeaking ? [1, 1.08, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-[38%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent"
      />

      <div className="relative z-20 w-full px-4 md:px-10 pb-10 md:pb-16 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative w-full max-w-[950px] rounded-[28px] border border-violet-400/40 bg-[#060312]/78 backdrop-blur-3xl shadow-[0_0_60px_rgba(139,92,246,0.28)] px-6 md:px-12 py-6 md:py-8 overflow-hidden"
        >
          <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(139,92,246,0.08),transparent)]" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-violet-300/80 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              <Volume2 size={16} />
              Voz emocional activa
            </div>

            <p className="whitespace-pre-line text-white/95 text-[18px] sm:text-[22px] md:text-[30px] leading-relaxed font-light min-h-[140px] md:min-h-[180px]">
              {displayedText}
              {hasStartedVoice && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block ml-1 text-violet-400"
                >
                  |
                </motion.span>
              )}
            </p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleStart}
          disabled={hasStartedVoice}
          className="mt-8 relative overflow-hidden px-8 md:px-14 py-4 md:py-5 rounded-[20px] bg-[#14052d] border border-violet-400/50 text-white text-sm sm:text-lg md:text-[22px] tracking-[2px] font-medium shadow-[0_0_45px_rgba(139,92,246,0.55)] transition-all disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/40 to-cyan-400/20 opacity-60" />
          <span className="relative z-10 flex items-center gap-4">
            COMENZAR EXPERIENCIA
            <ArrowRight size={24} />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
