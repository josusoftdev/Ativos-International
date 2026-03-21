import { Logo } from '../ui/logo';
import { Navbar } from './navbar';
import { PrimaryButton } from '../ui/primary-button';

export function Header() {
  return (
    <header className='w-full border-b border-slate-800 bg-[#020617] text-slate-200 shadow-md'>
      <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6'>
        <Logo />
        <div className='hidden items-center gap-3 md:flex'>
          <PrimaryButton href='/register'>Inscreva-se</PrimaryButton>
          <PrimaryButton href='/login'>Login</PrimaryButton>
        </div>
      </div>
      <Navbar />
    </header>
  );
}
