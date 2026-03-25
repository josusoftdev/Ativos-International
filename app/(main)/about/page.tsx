import { Card } from "@/app/components/ui/card";

const faqs = [
  {
    q: "O sistema faz compra ou venda de criptomoedas?",
    a: "Não. A plataforma é focada em visualização de dados, acompanhamento do mercado e organização de carteiras. Não realizamos operações financeiras.",
  },
  {
    q: "Posso cadastrar várias carteiras?",
    a: "Sim. No plano Básico você tem até 3 carteiras. No Premium e Pro, as carteiras são ilimitadas.",
  },
  {
    q: "Os dados do mercado são em tempo real?",
    a: "No plano gratuito os dados têm delay de 15 minutos. No Premium e Pro, os dados são atualizados em tempo real via WebSocket.",
  },
  {
    q: "Como funciona o período de teste do Premium?",
    a: "Você tem 14 dias de teste grátis do plano Premium. Não é necessário cartão de crédito para começar.",
  },
];

export default function AboutPage() {
  return (
    <div className="page-enter space-y-10">
      {/* Hero */}
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-600/5 p-8">
        <span className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-300">
          Sobre o sistema
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-100 md:text-4xl">
          Acompanhe o mercado cripto e organize suas carteiras em um só lugar
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">
          O Ativos International foi criado para centralizar informações
          importantes do universo de criptomoedas. Visualize dados de mercado,
          acompanhe notícias relevantes e gerencie suas carteiras com uma
          interface limpa e intuitiva.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Criptomoedas monitoradas", value: "500+" },
            { label: "Usuários ativos", value: "12k+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Atualizações/dia", value: "96x" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-indigo-400">{stat.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-100">Contato</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Email", value: "contato@ativosinternational.com" },
            { label: "Suporte", value: "suporte@ativosinternational.com" },
            { label: "Telefone", value: "+55 (11) 99999-9999" },
            { label: "Horário", value: "Seg–Sex, 8h às 18h (BRT)" },
          ].map((item) => (
            <Card key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 font-medium text-slate-200">{item.value}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-100">
          Perguntas Frequentes
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <Card key={faq.q} as="article">
              <h3 className="font-semibold text-slate-100">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {faq.a}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
