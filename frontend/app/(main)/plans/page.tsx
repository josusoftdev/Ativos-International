import { PlanCard } from "@/app/components/layout/plan-card";
import { Button } from "@/app/components/ui/button";

const plans = [
  {
    name: "Básico",
    price: 0,
    description: "Para quem está começando no mundo cripto",
    benefits: [
      "Até 3 carteiras",
      "Dashboard de mercado",
      "Notícias diárias",
      "Suporte por email",
    ],
    highlighted: false,
    ctaText: "Começar grátis",
  },
  {
    name: "Premium",
    price: 38,
    description: "Para investidores que querem mais controle",
    benefits: [
      "Carteiras ilimitadas",
      "Dashboard em tempo real",
      "Alertas de preço",
      "Análise técnica avançada",
      "Suporte prioritário 24/7",
      "Sem anúncios",
    ],
    highlighted: true,
    tag: "⭐ Mais popular",
    ctaText: "Assinar Premium",
  },
  {
    name: "Pro",
    price: 89,
    description: "Para traders e investidores profissionais",
    benefits: [
      "Tudo do Premium",
      "API de dados exclusiva",
      "Relatórios personalizados",
      "Multi-usuários (até 5)",
      "White-label disponível",
      "Gerente de conta dedicado",
    ],
    highlighted: false,
    ctaText: "Falar com vendas",
  },
];

export default function PlansPage() {
  return (
    <div className="page-enter space-y-12">
      {/* Header */}
      <section className="text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Planos e preços
        </span>
        <h1 className="mt-2 text-4xl font-bold text-slate-100">
          Escolha o plano ideal
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Comece gratuitamente e faça upgrade quando precisar de mais recursos.
          Cancele a qualquer momento.
        </p>
      </section>

      {/* Plans grid */}
      <section className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            description={plan.description}
            benefits={plan.benefits}
            highlighted={plan.highlighted}
            tag={"tag" in plan ? (plan.tag as string) : undefined}
            ctaText={plan.ctaText}
          />
        ))}
      </section>

      {/* FAQ / CTA */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <h2 className="text-xl font-bold text-slate-100">
          Dúvidas sobre os planos?
        </h2>
        <p className="mt-2 text-slate-400">
          Nossa equipe responde em menos de 2 horas nos dias úteis.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" href="/about">
            Falar com a equipe
          </Button>
          <Button variant="secondary" href="/">
            Ver demo gratuita
          </Button>
        </div>
      </section>
    </div>
  );
}
