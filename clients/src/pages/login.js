import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../API/useUsers.js';
import { hasCookie } from '../Auth/cookies.js';
import { Button } from '../components/button.js';
import LabelField from '../components/labelField.js';
import styles from '../style/login.module.css';

export function Login() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const login = useLogin();

  const [form, setForm] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState(null);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (localError) setLocalError(null);
    if (login.isError) login.reset();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login.isPending) return;

    login.reset();
    setLocalError(null);

    if (!form.email || !form.password) {
      return setLocalError('Please fill in your email and password.');
    }

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    try {
      const res = await login.mutateAsync({ email, password });

      if (res?.user) {
        qc.setQueryData(['user'], res.user);
      } else {
        if (hasCookie('jwt')) {
          await qc.invalidateQueries({ queryKey: ['user'] });
        } else {
          return setLocalError(res?.error || 'Incorrect login details');
        }
      }

      navigate('/clients', { replace: true });
    } catch (err) {
      setLocalError(err?.message || 'General error. Please try again.');
    }
  };

  const finalError = localError ?? (login.isError ? login.error?.message || 'Login error' : null);

  return (
    <main className={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
        <LabelField
          className="ViewLabel"
          placeholder="Email"
          editMode={true}
          inputType="email"
          editValue={form.email}
          setEditValue={(val) => update('email', val)}
        />

        <LabelField
          className="ViewLabel"
          placeholder="Password"
          editMode={true}
          inputType="password"
          editValue={form.password}
          setEditValue={(val) => update('password', val)}
        />

        {finalError && <p style={{ color: 'crimson', margin: 0, fontSize: '14px' }}>{finalError}</p>}

        <Button type="submit" disabled={login.isPending} className="loginBtn">
          {login.isPending ? 'Connecting…' : 'Login'}
        </Button>
      </form>
    </main>
  );
}
