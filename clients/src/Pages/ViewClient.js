import Button from "../components/Button";
import { useClients } from "../contexts/ClientsFetchContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../Styles/ViewClient.module.css";
import LabelField from "../components/LabelField";

export default function ViewClient() {
  const { clients, updateClientFetch, deleteClientFetch, getClientByIdFetch } =
    useClients();
  const navigate = useNavigate();
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [edit, setEdit] = useState(false);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editMail, setEditMail] = useState("");

  useEffect(() => {
    if (!id) return;
    const found = clients.find((c) => String(c.id) === String(id));
    if (found) setClient(found);
    else {
      (async () => {
        try {
          const data = await getClientByIdFetch(id);
          setClient(data || null);
        } catch {
          console.log("client not found");
          setClient(null);
        }
      })();
    }
  }, [clients, id, getClientByIdFetch]);

  useEffect(() => {
    if (client) {
      setEditName(client.name || "");
      setEditPhone(client.phone || "");
      setEditMail(client.mail || "");
    }
  }, [client]);

  if (!client) {
    return (
      <div className={styles.ViewClient}>
        <h1 className={styles.ViewClientHeader}>View Client</h1>
        <p>Loading client…</p>
      </div>
    );
  }

  async function handleSave() {
    try {
      const updated = await updateClientFetch(id, {
        name: editName,
        phone: String(editPhone),
        mail: editMail,
      });
      setClient(updated);
      setEdit(false);
    } catch (e) {
      console.error("PUT client failed:", e);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete the customer?")) return;
    try {
      await deleteClientFetch(id);
      navigate("/clients");
    } catch (e) {
      console.error("DELETE client failed:", e);
      alert("מחיקה נכשלה");
    }
  }

  return (
    <>
      <div className={styles.ViewClient}>
        <h1 className={styles.ViewClientHeader}>View Client</h1>
      </div>

      <form
        className={styles.ViewClientform}
        onSubmit={(e) => {
          e.preventDefault();
          edit ? handleSave() : setEdit(true);
        }}
      >
        <LabelField
          className="ViewLabel"
          label="id"
          value={client.id}
          editMode={false}
        />
        <LabelField
          label="name"
          value={client.name}
          editValue={editName}
          setEditValue={setEditName}
          editMode={edit}
          inputType="text"
          className="ViewLabel"
        />
        <LabelField
          label="phone"
          value={client.phone}
          editValue={editPhone}
          setEditValue={setEditPhone}
          editMode={edit}
          inputType="tel"
          className="ViewLabel"
        />
        <LabelField
          label="mail"
          value={client.mail}
          editValue={editMail}
          setEditValue={setEditMail}
          editMode={edit}
          inputType="email"
          className="ViewLabel"
        />
      </form>

      <div className={styles.viewBtns}>
        <Button
          className="updateBtn"
          onClick={() => (edit ? handleSave() : setEdit(true))}
        >
          {edit ? "Save" : "Edit"}
        </Button>
        <Button className="deleteBtn" onClick={handleDelete}>
          delete
        </Button>
      </div>
    </>
  );
}
