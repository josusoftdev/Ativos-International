'use client';

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { PrimaryButton } from '../ui/primary-button';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  return (
    <div className="mx-auto max-w-xl rounded-lg bg-slate-900 p-10 shadow-lg">
      <h2 className="mb-8 text-2xl font-bold text-slate-100">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300">
            Senha
          </label>
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <PrimaryButton type="submit" href='/'>Entrar</PrimaryButton>
      </form>
    </div>
  );
}