import { useEffect, useRef, useState } from "react";
import { X, BarChart3 } from "lucide-react";
import type { CompanionType } from "../types/companion";
import { useEmotionalHistory } from "../context/EmotionalHistoryContext";
import { useEmotionModel } from "../hooks/useEmotionModel";

interface ReflectionPageProps {
  companion: CompanionType;
  onBack: () => void;
  onNavigateToNearby?: () => void;
}

export default function ReflectionPage({ companion, onBack, onNavigateToNearby }: ReflectionPageProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [recognitionStatus, setRecognitionStatus] = useState("Listo para iniciar reconocimiento");
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognizedEmotion, setRecognizedEmotion] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(0 | 1 | 2 | 3 | null)[]>(Array(21).fill(null));
  const [currentPage, setCurrentPage] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { predecir } = useEmotionModel();
  const pageSize = 3;
  const questions = [
    "Me ha costado descargar la tensión.",
    "Reaccioné exageradamente en ciertas situaciones.",
    "He sentido que estaba gastando una gran cantidad de energía.",
    "Me he sentido inquieto.",
    "Se me hizo difícil relajarme.",
    "No toleré interrupciones que no me permitieran continuar con lo que estaba haciendo.",
    "He tendido a sentirme enfadado con facilidad.",
    "Me di cuenta de que tenía la boca seca.",
    "Se me hizo difícil respirar.",
    "Sentí que mis manos temblaban.",
    "Estaba preocupado por situaciones en las que podía entrar en pánico o hacer el ridículo.",
    "Sentí que estaba al punto de pánico.",
    "Sentí los latidos de mi corazón sin haber realizado esfuerzo físico.",
    "Tuve miedo sin razón aparente.",
    "No podía sentir ningún sentimiento positivo.",
    "Se me hizo difícil tomar la iniciativa para hacer cosas.",
    "He sentido que no había nada que me ilusionara.",
    "Me sentí triste y deprimido.",
    "No me pude entusiasmar por nada.",
    "Sentí que valía muy poco como persona.",
    "Sentí que la vida no tenía sentido.",
  ];
  const pageCount = Math.ceil(questions.length / pageSize);
  const currentPageIndices = Array.from({ length: pageSize }, (_, index) => currentPage * pageSize + index).filter((index) => index < questions.length);
  const currentQuestions = currentPageIndices.map((index) => ({ index, text: questions[index] }));
  const videoRef = useRef<HTMLVideoElement>(null);
  const companionName = companion === "kael" ? "Kael" : "Amaris";
  const { addEntry } = useEmotionalHistory();

  const stressIndices = [0, 5, 7, 10, 11, 13, 17];
  const anxietyIndices = [1, 3, 6, 8, 14, 18, 19];
  const depressionIndices = [2, 4, 9, 12, 15, 16, 20];

  const getSeverity = (score: number, category: "depression" | "anxiety" | "stress") => {
    if (category === "depression") {
      if (score >= 28) return { label: "Extremadamente grave", color: "bg-slate-950 text-white" };
      if (score >= 21) return { label: "Grave", color: "bg-red-600 text-white" };
      if (score >= 14) return { label: "Moderado", color: "bg-orange-500 text-white" };
      if (score >= 10) return { label: "Leve", color: "bg-yellow-400 text-slate-900" };
      return { label: "Normal", color: "bg-emerald-500 text-white" };
    }
    if (category === "anxiety") {
      if (score >= 20) return { label: "Extremadamente grave", color: "bg-slate-950 text-white" };
      if (score >= 15) return { label: "Grave", color: "bg-red-600 text-white" };
      if (score >= 10) return { label: "Moderado", color: "bg-orange-500 text-white" };
      if (score >= 8) return { label: "Leve", color: "bg-yellow-400 text-slate-900" };
      return { label: "Normal", color: "bg-emerald-500 text-white" };
    }
    if (score >= 34) return { label: "Extremadamente grave", color: "bg-slate-950 text-white" };
    if (score >= 26) return { label: "Grave", color: "bg-red-600 text-white" };
    if (score >= 19) return { label: "Moderado", color: "bg-orange-500 text-white" };
    if (score >= 15) return { label: "Leve", color: "bg-yellow-400 text-slate-900" };
    return { label: "Normal", color: "bg-emerald-500 text-white" };
  };

  const subtotal = (indices: number[]) => indices.reduce((sum, index) => sum + (answers[index] ?? 0), 0);
  const depressionScore = subtotal(depressionIndices) * 2;
  const anxietyScore = subtotal(anxietyIndices) * 2;
  const stressScore = subtotal(stressIndices) * 2;
  const allAnswered = answers.every((value) => value !== null);

  const depressionSeverity = getSeverity(depressionScore, "depression");
  const anxietySeverity = getSeverity(anxietyScore, "anxiety");
  const stressSeverity = getSeverity(stressScore, "stress");

  const scoreCards = [
    {
      title: "Depresión",
      score: depressionScore,
      severity: depressionSeverity,
    },
    {
      title: "Ansiedad",
      score: anxietyScore,
      severity: anxietySeverity,
    },
    {
      title: "Estrés",
      score: stressScore,
      severity: stressSeverity,
    },
  ];

  const highSeverityCategories = scoreCards.filter((card) =>
    card.severity.label === "Grave" || card.severity.label === "Extremadamente grave"
  );

  const hasSevereAlert = highSeverityCategories.length > 0;

  const handleFinishAssessment = () => {
    if (!allAnswered) return;
    if (!showResults) {
      addEntry({
        companion: companionName,
        recognizedEmotion,
        depressionScore,
        anxietyScore,
        stressScore,
        depressionSeverity: depressionSeverity.label,
        anxietySeverity: anxietySeverity.label,
        stressSeverity: stressSeverity.label,
      });
    }
    setShowResults(true);
  };

  const handleAnswer = (questionIndex: number, value: 0 | 1 | 2 | 3) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = value;
      return next;
    });
  };

  useEffect(() => {
    if (!cameraActive) {
      return;
    }

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error(error);
        setRecognitionStatus("No se pudo activar la cámara. Revisa permisos.");
      }
    };

    startCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream | null;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  const captureFrame = (): string | null => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.8);
  };

  const handleActivateCamera = () => {
    setCameraActive(true);
    setRecognitionStatus("Cámara activa. Listo para reconocer emociones.");
  };

  const handleRecognizeEmotion = async () => {
    if (!cameraActive) {
      setRecognitionStatus("Activa la cámara antes de reconocer emociones.");
      return;
    }

    setIsRecognizing(true);
    setRecognitionStatus("Reconociendo emociones...");
    setRecognizedEmotion(null);

    const imageData = captureFrame();
    if (imageData) {
      const emocion = await predecir(imageData);
      setRecognizedEmotion(emocion);
      setRecognitionStatus("Emoción detectada. Revisa el resultado.");
    } else {
      setRecognitionStatus("No se pudo capturar la imagen. Intenta de nuevo.");
    }

    setIsRecognizing(false);

    // setTimeout(() => {
    //   setIsRecognizing(false);
    //   setRecognizedEmotion("Sereno");
    //   setRecognitionStatus("Emoción detectada. Revisa el resultado.");
    // }, 2400);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-transparent text-slate-900 font-sans flex flex-col overflow-y-auto min-h-dvh select-none animate-fadeIn">
      <div className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none px-4">
        <div className="absolute w-[320px] h-[320px] md:w-[520px] md:h-[520px] bg-[var(--theme-glow)] blur-[140px] rounded-full top-10 left-1/2 -translate-x-1/2 opacity-90" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-slate-700 shadow-sm border border-[var(--theme-border)] backdrop-blur-md transition-all active:scale-95"
          >
            <X size={18} />
          </button>

          <div className="space-y-1 text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 font-semibold">Auto-Reconocimiento</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Reconocer tus emociones</h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              Con {companionName}, usa la cámara para capturar tu expresión y completa el autoreporte DASS-21 al lado derecho.
            </p>
          </div>
        </header>

        {showResults ? (
          <div className="rounded-[32px] border border-[var(--theme-border)] bg-white/95 shadow-[0_25px_70px_rgba(15,23,42,0.14)] p-6 mb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-semibold">Resultados del DASS-21</p>
                <h2 className="text-2xl font-black text-slate-900">Tus resultados están listos</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowResults(false)}
                className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Volver a respuestas
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {scoreCards.map((card) => (
                <div key={card.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500 font-semibold">{card.title}</p>
                  <p className="mt-3 text-4xl font-black text-slate-900">{card.score}</p>
                  <p className="mt-2 text-sm text-slate-700">{card.severity.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-700">Interpretación general</p>
                <p className="mt-3 text-sm text-slate-700 leading-7">
                  {hasSevereAlert
                    ? "Hay al menos una categoría con puntaje alto. Se sugiere acompañar este registro con ayuda profesional."
                    : "Tus puntajes están dentro de rangos menos críticos. Mantener el registro te ayuda a monitorear tu evolución emocional."}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-700">Próximo paso</p>
                <p className="mt-3 text-sm text-slate-700 leading-7">
                  Puedes seguir usando la cámara y ajustar tus respuestas si deseas refinar tu autoreporte al instante.
                </p>
              </div>
            </div>

            {hasSevereAlert ? (
              <div className="mt-6 rounded-3xl border border-red-200 bg-red-50/90 p-5 text-slate-900 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-600">Recomendación</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Tu evaluación muestra resultados graves. Te recomendamos hablar con un especialista para recibir apoyo cercano y seguro.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={onNavigateToNearby}
                    disabled={!onNavigateToNearby}
                    className="inline-flex items-center justify-center rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Ir a psicólogos cercanos
                  </button>
                  <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    Seguir en ejercicios
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <main className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.95fr] gap-6">
          <section className="space-y-6">
            <div className="rounded-[36px] border border-[var(--theme-border)] bg-white/95 shadow-[0_26px_80px_rgba(15,23,42,0.12)] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-semibold">Reconocimiento facial</p>
                  <h2 className="text-2xl font-black text-slate-900">Captura tu estado emocional</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  IA + Detección visual
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-600 leading-7">
                Con {companionName}, complementa tu autoreporte DASS-21 con una lectura en tiempo real de tu expresión facial. Todo se integra de forma segura y silenciosa en la sesión.
              </p>

              <div className="mt-6 overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950/95 shadow-[0_20px_45px_rgba(15,23,42,0.16)]">
                <div className="relative aspect-video bg-slate-900">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                  <div className="absolute left-4 top-4 rounded-3xl bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                    {cameraActive ? "Cámara activa" : "Cámara inactiva"}
                  </div>
                  {recognizedEmotion ? (
                    <div className="absolute right-4 bottom-4 rounded-3xl bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                      Emoción detectada: {recognizedEmotion}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-3 mt-5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleActivateCamera}
                  className="rounded-3xl bg-[var(--theme-button)] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-all"
                >
                  Activar cámara
                </button>
                <button
                  type="button"
                  onClick={handleRecognizeEmotion}
                  disabled={!cameraActive || isRecognizing}
                  className="rounded-3xl border border-[var(--theme-border)] bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isRecognizing ? "Reconociendo..." : "Iniciar reconocimiento"}
                </button>
              </div>

              <div className="grid gap-3 mt-5">
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400 font-semibold">Estado del reconocimiento</p>
                  <p className="mt-2 text-sm text-slate-700 min-h-[28px]">{recognitionStatus}</p>
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 font-semibold">Tu acompañante IA</p>
                  <p className="mt-2 text-sm text-slate-700">{companionName} está acompañándote en este proceso con recomendaciones diseñadas para tu bienestar.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-[36px] border border-[var(--theme-border)] bg-white/95 shadow-[0_26px_80px_rgba(15,23,42,0.12)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-3xl bg-slate-800 text-white grid place-items-center shadow-lg">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-semibold">Autorreporte DASS-21</p>
                  <h2 className="text-xl font-bold text-slate-900">Evaluación emocional</h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-7">
                Responde cada afirmación según cómo te has sentido en las últimas semanas. Tus respuestas se guardan automáticamente para que puedas comparar tu evolución.
              </p>

              <div className="mt-5 space-y-5">
                {!showResults ? (
                  <>
                    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-[1fr_auto]">
                      <span className="font-medium">Página {currentPage + 1} de {pageCount}</span>
                      <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end">
                        <button
                          type="button"
                          onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
                          disabled={currentPage === 0}
                          className="rounded-3xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Anterior
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentPage((page) => Math.min(pageCount - 1, page + 1))}
                          disabled={currentPage === pageCount - 1}
                          className="rounded-3xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {currentQuestions.map(({ index, text }) => (
                        <div key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                          <p className="text-sm font-semibold text-slate-800">{index + 1}. {text}</p>
                          <div className="mt-4 grid gap-2 sm:grid-cols-4">
                            {[0, 1, 2, 3].map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => handleAnswer(index, value as 0 | 1 | 2 | 3)}
                                className={`rounded-3xl border px-3 py-2 text-sm font-semibold transition ${
                                  answers[index] === value
                                    ? "border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                {value}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={handleFinishAssessment}
                          disabled={!allAnswered}
                          className="rounded-3xl bg-[var(--theme-button)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Ver resultados
                        </button>
                      </div>
                      {!allAnswered ? (
                        <p className="text-xs text-slate-500">Completa todas las preguntas para habilitar el botón de resultados.</p>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 font-semibold">Resultados guardados</p>
                        <h3 className="text-lg font-bold text-slate-900">Tu autoreporte se guardó en el historial</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowResults(false)}
                        className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        Volver a editar
                      </button>
                    </div>
                    <p className="mt-4 text-sm text-slate-700">
                      Ahora puedes revisar este resultado en tu Historial Emocional o explorar recomendaciones personalizadas.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
