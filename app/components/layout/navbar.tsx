import { NavItem } from '../ui/nav-item';

export function Navbar() {
  const navItems = [
    { href: '/', label: 'Mercado' },
    { href: './wallets', label: 'Carteiras' },
    { href: './about', label: 'Sobre' },
    { href: './plans', label: 'Planos' },
  ];

  return (
    <nav className='bg-[#021030] px-4 py-2 text-slate-200 md:px-6'>
      <ul className='mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 md:gap-3'>
        {navItems.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <NavItem href={item.href}>{item.label}</NavItem>
          </li>
        ))}
      </ul>
    </nav>
  );
}
