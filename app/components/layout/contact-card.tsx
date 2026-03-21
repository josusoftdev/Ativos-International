type ContactItemProps = {
  label: string;
  value: string;
};

function ContactItem({ label, value }: ContactItemProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-100">{value}</p>
    </div>
  );
}

export function ContactCard() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <ContactItem label="Email de contato" value="contato@cryptoboard.com" />
      <ContactItem label="Telefone" value="(11) 99999-9999" />
    </section>
  );
}