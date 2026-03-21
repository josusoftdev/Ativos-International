export function AboutHero() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20 md:p-8">
      <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
        Sobre o sistema
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-100 md:text-4xl">Acompanhe o mercado cripto e organize suas carteiras em um só lugar</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
        Este sistema foi pensado para centralizar informacoes importantes do universo de criptomoedas. Aqui o usuario consegue visualizar dados do mercado, acompanhar noticias relevantes e gerenciar suas carteiras de forma simples dentro de uma interface unica.
      </p>
    </section>
  );
}