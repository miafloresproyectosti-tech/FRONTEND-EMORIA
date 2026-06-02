const models = [
  {
    name: "GPT-4o",
    desc: "El modelo más avanzado de OpenAI.",
    badge: "CHAT",
  },
  {
    name: "Claude 3.5 Sonnet",
    desc: "Excelente para análisis y escritura.",
    badge: "TEXTO",
  },
  {
    name: "Gemini 1.5 Pro",
    desc: "Ideal para razonamiento complejo.",
    badge: "CHAT",
  },
  {
    name: "DALL·E 3",
    desc: "Generación de imágenes de alta calidad.",
    badge: "IMAGEN",
  },
];

export default function RecentModels() {
  return (
    <div
      className="
        bg-black/35
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-6
        shadow-2xl
      "
    >
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-white">
          Modelos recientes
        </h2>

        <button className="text-white/60">
          Ver todos
        </button>

      </div>

      <div className="space-y-5">
        {models.map((item, index) => (
          <div
            key={index}
            className="
              flex items-center justify-between
              border-b border-white/5
              pb-4
            "
          >
            <div>
              <h3 className="text-white font-semibold">
                {item.name}
              </h3>

              <p className="text-white/60 text-sm">
                {item.desc}
              </p>
            </div>

            <div
              className="
                px-3 py-1
                rounded-full
                bg-black/40
                border border-white/10
                text-xs
                text-white/70
              "
            >
              {item.badge}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}