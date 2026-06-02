import {
  MessageCircle,
  Image,
  FileText,
  Code2,
  Mic,
} from "lucide-react";

const actions = [
  {
    title: "Chat IA",
    subtitle: "Conversar con IA",
    icon: MessageCircle,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Generar imagen",
    subtitle: "Crear con IA",
    icon: Image,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Resumir documento",
    subtitle: "Extraer lo importante",
    icon: FileText,
    color: "from-yellow-500 to-orange-600",
  },
  {
    title: "Código IA",
    subtitle: "Asistencia de código",
    icon: Code2,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "Voz a Texto",
    subtitle: "Transcribir audio",
    icon: Mic,
    color: "from-pink-500 to-rose-600",
  },
];

export default function QuickActions() {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold text-white mb-5">
        Accesos rápidos
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-5
        "
      >
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              className="
                bg-black/35
                backdrop-blur-xl
                border border-white/10
                rounded-3xl
                p-5
                text-left
                hover:scale-[1.02]
                transition-all
                duration-300
                shadow-2xl
              "
            >
              <div
                className={`
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-br
                  ${item.color}
                  flex items-center justify-center
                  mb-4
                `}
              >
                <Icon className="text-white" />
              </div>

              <h3 className="text-white font-semibold text-lg">
                {item.title}
              </h3>

              <p className="text-white/60 text-sm mt-1">
                {item.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}