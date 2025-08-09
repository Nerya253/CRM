// ViewClient.jsx
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { useState, useEffect } from "react";
import styles from "./ViewClient.module.css";
import LabelField from "../components/LabelField";

export default function ViewClient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editMail, setEditMail] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:4371/clients/${id}`);
        if (!res.ok) throw new Error(`GET ${res.status}`);
        const c = await res.json();
        setClient(c);
        setEditName(c?.name ?? "");
        setEditPhone(c?.phone ?? "");
        setEditMail(c?.mail ?? "");
      } catch (e) {
        console.error("GET client failed:", e);
        setClient(null);
      }
    })();
  }, [id]);

  async function handleSave() {
    try {
      const res = await fetch(
        `http://localhost:4371/clients/updateClient/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editName,
            phone: editPhone,
            mail: editMail,
          }),
        }
      );
      if (!res.ok) throw new Error(`PUT ${res.status}`);
      const updated = await res.json();
      setClient(updated);
      setEdit(false);
      navigate("/clients");
    } catch (e) {
      console.error("PUT client failed:", e);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete the customer?")) return;
    try {
      const res = await fetch(
        `http://localhost:4371/clients/deleteClient/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error(`DELETE ${res.status}`);
      const text = await res.text();
      const data = text ? JSON.parse(text) : null;
      if (!data || data.success) navigate("/clients");
      else navigate("/clients");
    } catch (e) {
      console.error("DELETE client failed:", e);
      alert("מחיקה נכשלה");
    }
  }

  if (!client) return <div style={{ margin: 30 }}>Loading…</div>;

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
        </Button>{" "}
        <Button className="deleteBtn" onClick={handleDelete}>
          delete
        </Button>
      </div>
    </>
  );
}
