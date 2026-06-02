export default function TopBar() {
  return (
    <div className="flex items-center justify-between">

      {/* SEARCH */}
      <div
        className="
          w-[600px]
          h-[58px]
          rounded-full
          bg-black/30
          backdrop-blur-xl
          border border-white/10
          flex items-center
          px-6
        "
      >
        <input
          placeholder="Buscar herramientas, modelos, chats..."
          className="
            bg-transparent
            outline-none
            text-white
            w-full
            placeholder:text-white/40
          "
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <div
          className="
            px-5 py-3
            rounded-full
            bg-black/30
            border border-orange-400/20
            text-orange-300
            font-semibold
          "
        >
          Pro
        </div>

        <div
          className="
            w-12 h-12
            rounded-full
            bg-black/30
            border border-white/10
          "
        />

      </div>

    </div>
  );
}