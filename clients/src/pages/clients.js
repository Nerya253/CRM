import { useState } from 'react';
import { FaTable, FaThLarge } from 'react-icons/fa';
import { useAddClient } from '../API/useClients.js';
import { useClientsByUserId, useCurrentUser } from '../API/useUsers.js';
import { Button } from '../components/button.js';
import LabelField from '../components/labelField.js';
import { ViewModeChooser } from '../components/viewModeChooser.js';
import { useView } from '../context/viewContext.js';
import styles from '../style/clients.module.css';

export function Clients() {
  const { data: meData } = useCurrentUser();
  const me = meData?.user;

  const { data } = useClientsByUserId();

  const addClient = useAddClient();

  const { isCard, toggleView } = useView();

  const [searchValue, setSearchValue] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [newClient, setNewClient] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const clients = Array.isArray(data) ? data : data?.clients ?? [];

  const filteredClients = clients.filter((client) => {
    const value = searchValue.trim().toLowerCase();
    return (
      String(client?.id ?? '')
        .toLowerCase()
        .includes(value) ||
      String(client?.name ?? '')
        .toLowerCase()
        .includes(value) ||
      String(client?.email ?? '')
        .toLowerCase()
        .includes(value) ||
      String(client?.phone ?? '')
        .toLowerCase()
        .includes(value) ||
      String(client?.description ?? '')
        .toLowerCase()
        .includes(value)
    );
  });

  function handleAddSubmit(e) {
    e.preventDefault();

    if (!me?.id) {
      alert('No logged in user detected. Try logging in again.');
      return;
    }

    const id = newClient.id.trim();
    const name = newClient.name.trim();
    const email = newClient.email.trim().toLowerCase();
    const phone = newClient.phone.trim();
    const description = newClient.description?.trim() || '';

    if (!id || !name || !email || !phone) {
      alert('Please fill in: ID, Name, Email, Phone');
      return;
    }

    const payload = {
      id,
      name,
      email,
      phone,
      description,
      userId: me.id,
    };

    addClient.mutate(payload, {
      onSuccess: () => {
        setShowAddForm(false);
        setNewClient({
          id: '',
          name: '',
          email: '',
          phone: '',
          description: '',
        });
        alert('create client success');
      },
      onError: (e) => {
        alert(e.message || 'Request failed.');
      },
    });
  }

  return (
    <div className={styles.conteiner}>
      <h1>Search Customer</h1>

      <div className={styles.searchConteiner}>
        <LabelField
          editMode={true}
          inputType="text"
          placeholder="Search…"
          editValue={searchValue}
          setEditValue={setSearchValue}
        />
      </div>
      <div>
        <Button onClick={() => setSearchValue('')}>Clear</Button>

        <Button onClick={() => setShowAddForm(true)}>Add Client</Button>

        <Button onClick={toggleView}>
          {isCard ? (
            <>
              change view <FaTable />
            </>
          ) : (
            <>
              change view <FaThLarge />
            </>
          )}
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className={styles.form}>
          <h2>Add New Client</h2>

          <LabelField
            placeholder="ID"
            editMode={true}
            inputType="text"
            editValue={newClient.id}
            setEditValue={(val) => setNewClient((newClient) => ({ ...newClient, id: val }))}
          />

          <LabelField
            placeholder="Name"
            editMode={true}
            inputType="text"
            editValue={newClient.name}
            setEditValue={(val) => setNewClient((newClient) => ({ ...newClient, name: val }))}
          />

          <LabelField
            placeholder="Email"
            editMode={true}
            inputType="email"
            editValue={newClient.email}
            setEditValue={(val) => setNewClient((newClient) => ({ ...newClient, email: val }))}
          />

          <LabelField
            placeholder="Phone"
            editMode={true}
            inputType="tel"
            editValue={newClient.phone}
            setEditValue={(val) => setNewClient((newClient) => ({ ...newClient, phone: val }))}
          />

          <LabelField
            placeholder="Description"
            editMode={true}
            inputType="text"
            editValue={newClient.description}
            setEditValue={(val) =>
              setNewClient((newClient) => ({ ...newClient, description: val }))
            }
          />

          <div>
            <Button type="submit" disabled={addClient.isPending}>
              {addClient.isPending ? 'Saving…' : 'Save'}
            </Button>
            <Button type="button" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div>
        {filteredClients.length > 0 ? (
          <>
            <p>
              <strong>{filteredClients.length}</strong> customer(s) found.
            </p>
            <ViewModeChooser items={filteredClients} type={'client'} />
          </>
        ) : searchValue ? (
          <p>No customers found matching your search.</p>
        ) : (
          <p>No customers yet.</p>
        )}
      </div>
    </div>
  );
}
