import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-black text-white min-h-screen noise relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 max-w-2xl text-center">
        {/* 404 number */}
        <div className="relative mb-6 select-none">
          <span
            className="text-[160px] md:text-[220px] font-black leading-none tracking-tighter"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}
            aria-hidden="true"
          >
            404
          </span>
          {/* Overlay visible number */}
          <span
            className="absolute inset-0 flex items-center justify-center text-[160px] md:text-[220px] font-black leading-none tracking-tighter text-glow"
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, rgba(139,92,246,0.6) 50%, rgba(255,255,255,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </span>
        </div>

        {/* Divider line */}
        <div className="section-divider w-32 mx-auto mb-8" />

        <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          A página que procura não existe ou foi movida. Verifique o endereço ou
          regresse ao início.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pt"
            className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-100 shadow-2xl shadow-white/10"
          >
            Voltar ao Início
          </Link>
          <Link
            href="/pt#contact"
            className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-white/5 transition-all duration-200 backdrop-blur-sm"
          >
            Falar Connosco
          </Link>
        </div>

        {/* Brand badge */}
        <div className="mt-16 inline-flex items-center gap-2 text-white/20 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 inline-block" />
          Velvet Neuron · Digital Product Engineering
        </div>
      </div>
    </main>
  );
}
