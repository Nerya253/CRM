import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClient, useDeleteClient, useUpdateClient } from '../API/useClients.js';
import { Button } from '../components/button.js';
import LabelField from '../components/labelField.js';
import styles from '../style/viewClient.module.css';

export function ViewClient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: client, isPending, error } = useClient(id);
  const updateClient = useUpdateClient();
  const removeClient = useDeleteClient();

  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    if (client) {
      setEditName(client.name || '');
      setEditPhone(client.phone || '');
      setEditEmail(client.email || '');
      setEditDescription(client.description || '');
    }
  }, [client]);

  if (isPending) {
    return (
      <div className={styles.ViewClient}>
        <h1 className={styles.ViewClientHeader}>View Client</h1>
        <p>Loading client…</p>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className={styles.ViewClient}>
        <h1 className={styles.ViewClientHeader}>View Client</h1>
        <p>Error / client not found</p>
      </div>
    );
  }

  async function handleSave() {
    if (!editName || !editEmail || !editPhone) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await updateClient.mutateAsync({
        id,
        patch: {
          name: editName,
          phone: String(editPhone),
          email: editEmail,
          description: editDescription,
        },
      });
      setEdit(false);
    } catch (e) {
      console.error('PUT client failed:', e);
      alert(e.message);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete the customer?')) return;
    try {
      await removeClient.mutateAsync(id);
      navigate('/clients');
    } catch (e) {
      console.error('DELETE client failed:', e);
      alert('Delete failed');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    edit ? handleSave() : setEdit(true);
  }

  return (
    <div className={styles.ViewClient}>
      <div>
        <h1>Client ID {client.id}</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <LabelField
          className="ViewLabel"
          label="name:"
          value={client.name}
          editValue={editName}
          setEditValue={setEditName}
          editMode={edit}
          inputType="text"
        />

        <LabelField
          className="ViewLabel"
          label="phone:"
          value={client.phone}
          editValue={editPhone}
          setEditValue={setEditPhone}
          editMode={edit}
          inputType="tel"
        />

        <LabelField
          className="ViewLabel"
          label="email:"
          value={client.email}
          editValue={editEmail}
          setEditValue={setEditEmail}
          editMode={edit}
          inputType="email"
        />

        <LabelField
          className="ViewLabel"
          label="description:"
          value={client.description}
          editValue={editDescription}
          setEditValue={setEditDescription}
          editMode={edit}
          inputType="text"
        />
      </form>

      <div className={styles.viewBtns}>
        <Button
          className="backBtn"
          onClick={() => navigate('/clients')}
          disabled={updateClient.isPending || removeClient.isPending}
        >
          back
        </Button>

        <Button
          className="updateBtn"
          onClick={() => (edit ? handleSave() : setEdit(true))}
          disabled={updateClient.isPending || removeClient.isPending}
        >
          {updateClient.isPending ? 'Saving…' : edit ? 'Save' : 'Edit'}
        </Button>

        <Button
          className="deleteBtn"
          onClick={handleDelete}
          disabled={updateClient.isPending || removeClient.isPending}
        >
          {removeClient.isPending ? 'Deleting…' : 'delete'}
        </Button>
      </div>
    </div>
  );
}
