import { useState } from 'react';
import { FaTable, FaThLarge } from 'react-icons/fa';
import { useUsers } from '../API/useUsers.js';
import { Button } from '../components/button.js';
import LabelField from '../components/labelField.js';
import { ViewModeChooser } from '../components/viewModeChooser.js';
import { useView } from '../context/viewContext.js';
import styles from '../style/users.module.css';

export function Users() {
  const { data: users } = useUsers();

  const { isCard, toggleView } = useView();
  const [searchValue, setSearchValue] = useState('');

  const filteredUsers = users?.filter((user) => {
    const value = searchValue.trim().toLowerCase();
    if (!user) return null;
    return (
      user?.id.toLowerCase().includes(value) ||
      user?.name.toLowerCase().includes(value) ||
      user?.email.toLowerCase().includes(value) ||
      user?.phone.toLowerCase().includes(value) ||
      user?.id.toLowerCase().includes(value)
    );
  });

  return (
    <div className={styles.conteiner}>
      <h1>Search user</h1>

      <div className={styles.searchConteiner}>
        <LabelField editMode={true} inputType="text" placeholder="Search…" editValue={searchValue} setEditValue={setSearchValue} />
      </div>
      <div>
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

      <div>
        {filteredUsers?.length > 0 ? (
          <>
            <p>
              <strong>{filteredUsers.length}</strong> customer(s) found.
            </p>
            <ViewModeChooser items={filteredUsers} type={'user'} />
          </>
        ) : searchValue ? (
          <p>No users found matching your search.</p>
        ) : (
          <p>No users yet.</p>
        )}
      </div>
    </div>
  );
}
