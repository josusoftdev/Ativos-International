const faqs = [
  {
    question: "O sistema faz compra ou venda de criptomoedas?",
    answer:
      "Nao. Atualmente a plataforma e voltada para visualizacao de informacoes, acompanhamento do mercado e organizacao das carteiras.",
  },
  {
    question: "Posso cadastrar varias carteiras?",
    answer:
      "Sim. A area de carteiras permite criar, renomear e remover diferentes carteiras para organizar melhor seus ativos.",
  },
  {
    question: "Os saldos das carteiras ja sao reais?",
    answer:
      "Ainda nao. A exibicao de saldo esta mascarada nesta etapa e a logica completa sera adicionada posteriormente.",
  },
  {
    question: "As noticias e informacoes de mercado sao atualizadas automaticamente?",
    answer:
      "A estrutura da plataforma ja suporta essa visualizacao. A integracao dinamica com dados externos pode ser expandida nas proximas etapas do projeto.",
  },
];

export function FaqSection() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20 md:p-8">
      <h2 className="text-2xl font-bold text-slate-100">Perguntas frequentes</h2>
      <div className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <h3 className="text-lg font-semibold text-slate-100">{faq.question}</h3>
            <p className="mt-2 leading-7 text-slate-300">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}