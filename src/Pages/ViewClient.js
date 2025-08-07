import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { useState, useEffect } from "react";
import { useClients } from "../contexts/ClientsContext";

export default function ViewClient() {
  const { id } = useParams();
  const { clients, updateClient } = useClients();

  const client = clients.find((item) => item.id === parseInt(id, 10));

  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(client.name);
  const [editPhone, setEditPhone] = useState(client.phone);
  const [editMail, setEditMail] = useState(client.mail);

  useEffect(() => {
    setEditName(client.name);
    setEditPhone(client.phone);
    setEditMail(client.mail);
  }, [client]);

  function handleSave() {
    updateClient({
      id: client.id,
      name: editName,
      phone: editPhone,
      mail: editMail,
    });
    setEdit(false);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "30px",
          fontSize: "30px",
          fontFamily: "fantasy",
        }}
      >
        <h1>View Client</h1>
        <Button
          onClick={() => {
            if (edit) handleSave();
            else setEdit(true);
          }}
        >
          {edit ? "שמור" : "ערוך"}
        </Button>
      </div>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "30px",
          fontSize: "20px",
          fontFamily: "Arial, sans-serif",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (edit) handleSave();
        }}
      >
        <label>
          <strong>id: </strong>
          <span style={{ marginRight: 10 }}>{id}</span>
        </label>
        <label>
          <strong>name: </strong>
          {edit ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          ) : (
            <span style={{ marginRight: 10 }}>{editName}</span>
          )}
        </label>
        <label>
          <strong>phone: </strong>
          {edit ? (
            <input
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          ) : (
            <span style={{ marginRight: 10 }}>{editPhone}</span>
          )}
        </label>
        <label>
          <strong>mail: </strong>
          {edit ? (
            <input
              type="text"
              value={editMail}
              onChange={(e) => setEditMail(e.target.value)}
            />
          ) : (
            <span style={{ marginRight: 10 }}>{editMail}</span>
          )}
        </label>
      </form>
    </>
  );
}
