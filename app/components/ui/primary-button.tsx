import Link from 'next/link';

type PrimaryButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const baseStyles = 'rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 inline-block';

export function PrimaryButton({ children, href, onClick, type = 'button', className }: PrimaryButtonProps) {
  const combinedClassName = `${baseStyles} ${className || ''}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
