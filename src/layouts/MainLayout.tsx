interface MainLayoutProps {
  children: React.ReactNode;
  background: string;
}

export function MainLayout({
  children,
  background,
}: MainLayoutProps) {
  return (
    <div
      className="
        w-screen
        h-screen
        overflow-hidden
        relative
        bg-cover
        bg-center
      "
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.35),
            rgba(0,0,0,0.65)
          ),
          url(${background})
        `,
      }}
    >
      {/* BLUR SUAVE */}
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}