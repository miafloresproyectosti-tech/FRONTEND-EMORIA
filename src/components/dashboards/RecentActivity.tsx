const activity = [
  {
    title: "Chat sobre estrategias ninja",
    time: "Hoy, 10:30 AM",
  },
  {
    title: "Generación de imagen: Aldea de Konoha",
    time: "Hoy, 09:15 AM",
  },
  {
    title: "Resumen: Historia del Clan Uchiha",
    time: "Ayer, 08:45 PM",
  },
  {
    title: "Código: Sistema de misiones",
    time: "Ayer, 06:20 PM",
  },
];

export default function RecentActivity() {
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
          Actividad reciente
        </h2>

        <button className="text-white/60">
          Ver todo
        </button>

      </div>

      <div className="space-y-5">

        {activity.map((item, index) => (
          <div
            key={index}
            className="
              flex justify-between
              border-b border-white/5
              pb-4
            "
          >
            <p className="text-white">
              {item.title}
            </p>

            <span className="text-white/50 text-sm">
              {item.time}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}