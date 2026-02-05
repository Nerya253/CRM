import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddUser } from '../API/useUsers.js';
import { Button } from '../components/button.js';
import LabelField from '../components/labelField.js';
import styles from '../style/register.module.css';

export function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  });

  const addUser = useAddUser();

  function onSubmit(e) {
    e.preventDefault();
    if (!form.role) return alert('Choose a role (user/admin)');

    addUser.mutate(form, {
      onSuccess: () => {
        alert('User created successfully');
        navigate('/users');
      },
      onError: (err) => {
        alert(err.message);
      },
    });
  }

  function onCancel() {
    setForm({
      id: '',
      name: '',
      email: '',
      phone: '',
      password: '',
      role: '',
    });
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.title}>create New User</h2>

      <div className={styles.fields}>
        <LabelField
          placeholder="ID"
          editMode={true}
          inputType="text"
          editValue={form.id}
          setEditValue={(val) => setForm((form) => ({ ...form, id: val }))}
          className="ViewLabel"
        />

        <LabelField
          placeholder="Name"
          editMode={true}
          inputType="text"
          editValue={form.name}
          setEditValue={(val) => setForm((form) => ({ ...form, name: val }))}
          className="ViewLabel"
        />

        <LabelField
          placeholder="Email"
          editMode={true}
          inputType="email"
          editValue={form.email}
          setEditValue={(val) => setForm((form) => ({ ...form, email: val }))}
          className="ViewLabel"
        />

        <LabelField
          placeholder="Phone"
          editMode={true}
          inputType="tel"
          editValue={form.phone}
          setEditValue={(val) => setForm((form) => ({ ...form, phone: val }))}
          className="ViewLabel"
        />

        <LabelField
          placeholder="Password"
          editMode={true}
          inputType="password"
          editValue={form.password}
          setEditValue={(val) => setForm((form) => ({ ...form, password: val }))}
          className="ViewLabel"
        />

        <LabelField
          className="ViewLabel"
          value={form.role}
          editValue={form.role}
          setEditValue={(v) => setForm((f) => ({ ...f, role: v }))}
          placeholder="Choose a role…"
          editMode={true}
          inputType="select"
          options={[
            { value: 'user', label: 'user' },
            { value: 'admin', label: 'admin' },
          ]}
        />
      </div>

      <div>
        <Button type="submit" disabled={addUser.isPending}>
          {addUser.isPending ? 'Saving…' : 'Add'}
        </Button>
        <Button type="button" onClick={onCancel}>
          Clear
        </Button>
      </div>
    </form>
  );
}

export default Register;
