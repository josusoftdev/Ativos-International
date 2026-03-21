import { PlanCard } from '../components/layout/plan-card';
import { PrimaryButton } from '../components/ui/primary-button';
import { Header } from '../components/layout/header';

const plans = [
  {
    name: 'Básico',
    price: 20,
    description: 'Perfeito para começar',
    benefits: [
      'Até 3 carteiras',
      'Suporte por email',
      'Acesso as notícias diárias',
    ],
  },
  {
    name: 'Premium',
    price: 38,
    description: 'Nossa melhor oferta',
    benefits: [
      'Carteiras ilimitadas',
      'Suporte prioritário',
      'Acesso a todas as notícias',
      'Sem anúncios',
    ],
  },
];

export default function PlansPage() {
  return (
    <div>
        <Header></Header>
    <div className="min-h-screen bg-[#050813] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Nossos Planos</h1>
          <p className="text-xl text-slate-400">
            Escolha o plano perfeito para suas necessidades
          </p>
        </div>

        <div className="grid gap-25 md:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              benefits={plan.benefits}
              ctaText="Começar Agora"
            />
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-slate-900 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Dúvidas sobre nossos planos?</h2>
          <p className="mb-6 text-slate-400">
            Entre em contato conosco e um especialista ajudará você a escolher o melhor plano.
          </p>
          <PrimaryButton href="/about">
            Fale Conosco
          </PrimaryButton>
        </div>
      </div>
    </div>
    </div>
  );
}