import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentUser, useDeleteUser, useUpdateUser, useUser } from '../API/useUsers.js';
import { Button } from '../components/button.js';
import LabelField from '../components/labelField.js';
import styles from '../style/viewUser.module.css';

export function ViewUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: selectedUser, isPending, error } = useUser(id);

  const currentUser = useCurrentUser();
  const currUser = currentUser?.data?.user;

  const isSelf = !!(currUser && selectedUser && currUser.id === selectedUser.id);

  const updateUser = useUpdateUser();
  const removeUser = useDeleteUser();

  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setEditName(selectedUser.name || '');
      setEditPhone(selectedUser.phone || '');
      setEditEmail(selectedUser.email || '');
      setEditRole(selectedUser.role || '');
    }
  }, [selectedUser]);

  if (isPending) {
    return (
      <div className={styles.ViewClient}>
        <h1 className={styles.ViewUserHeader}>View User</h1>
        <p>Loading user</p>
      </div>
    );
  }

  if (error || !selectedUser) {
    return (
      <div className={styles.ViewClient}>
        <h1 className={styles.ViewUserHeader}>View User</h1>
        <p>Error / User not found</p>
      </div>
    );
  }

  async function handleSave() {
    if (!editName || !editEmail || !editPhone) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await updateUser.mutateAsync({
        id,
        patch: {
          name: editName,
          phone: editPhone,
          email: editEmail,
          ...(isSelf ? {} : { role: editRole }),
        },
      });
      setEdit(false);
      alert('User updated successfully');
    } catch (e) {
      console.error('PUT user failed:', e);
      alert(e.message);
    }
  }

  async function handleDelete() {
    if (isSelf) {
      alert('cant delete yourself');
      return;
    }

    if (!window.confirm('Delete the user?')) return;
    try {
      await removeUser.mutateAsync(id);
      navigate('/users');
    } catch (e) {
      console.error('DELETE user failed:', e);
      alert('Delete failed');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    edit ? handleSave() : setEdit(true);
  }

  return (
    <div className={styles.ViewUser}>
      <div>
        <h1>User ID {selectedUser.id}</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <LabelField
          className="ViewLabel"
          label="name:"
          value={selectedUser.name}
          editValue={editName}
          setEditValue={setEditName}
          editMode={edit}
          inputType="text"
        />

        <LabelField
          className="ViewLabel"
          label="phone:"
          value={selectedUser.phone}
          editValue={editPhone}
          setEditValue={setEditPhone}
          editMode={edit}
          inputType="tel"
        />

        <LabelField
          className="ViewLabel"
          label="email:"
          value={selectedUser.email}
          editValue={editEmail}
          setEditValue={setEditEmail}
          editMode={edit}
          inputType="email"
        />
        <LabelField
          className="ViewLabel"
          label="role:"
          value={selectedUser.role}
          editValue={editRole}
          setEditValue={setEditRole}
          editMode={edit}
          inputType="select"
          disabled={isSelf}
          options={[
            { value: 'user', label: 'user' },
            { value: 'admin', label: 'admin' },
          ]}
        />
      </form>

      <div>
        <Button className="backBtn" onClick={() => navigate('/users')} disabled={updateUser.isPending || removeUser.isPending}>
          back
        </Button>
        <Button className="updateBtn" onClick={() => (edit ? handleSave() : setEdit(true))} disabled={updateUser.isPending || removeUser.isPending}>
          {updateUser.isPending ? 'Saving…' : edit ? 'Save' : 'Edit'}
        </Button>
        {isSelf ? null : (
          <Button className="deleteBtn" onClick={handleDelete} disabled={updateUser.isPending || removeUser.isPending}>
            {removeUser.isPending ? 'Deleting…' : 'delete'}
          </Button>
        )}
      </div>
    </div>
  );
}
