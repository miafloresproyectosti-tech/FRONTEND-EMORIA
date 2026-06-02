import {
  MessageSquare,
  Image,
  FileText,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Chats hoy",
    value: "24",
    icon: MessageSquare,
    color: "from-violet-500 to-purple-600",
    growth: "+12%",
  },
  {
    title: "Imágenes generadas",
    value: "18",
    icon: Image,
    color: "from-green-500 to-emerald-600",
    growth: "+8%",
  },
  {
    title: "Documentos procesados",
    value: "7",
    icon: FileText,
    color: "from-yellow-500 to-orange-600",
    growth: "+3%",
  },
  {
    title: "Tiempo ahorrado",
    value: "5.4 h",
    icon: Clock,
    color: "from-blue-500 to-cyan-600",
    growth: "+15%",
  },
];

export default function StatsCards() {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
    >
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="
              bg-black/35
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-6
              shadow-2xl
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            <div className="flex items-start justify-between">

              <div>

                <p className="text-white/60 text-sm">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold text-white mt-2">
                  {item.value}
                </h2>

                <p className="text-green-400 text-sm mt-4">
                  {item.growth} vs ayer
                </p>

              </div>

              <div
                className={`
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-br
                  ${item.color}
                  flex items-center justify-center
                  shadow-xl
                `}
              >
                <Icon className="text-white" />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}