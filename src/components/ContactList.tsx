import { useState } from "react";
import type { Contact } from "../types/Contact";

const contactTypes = ["mobile", "landline", "email", "social"] as const;

interface Props {
  contacts: Contact[];
  setContacts: (c: Contact[]) => void;
  canDelete: boolean;
}

const ContactList = ({ contacts, setContacts, canDelete }: Props) => {
  const [newType, setNewType] = useState<(typeof contactTypes)[number]>("mobile");
  const [newValue, setNewValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const add = () => {
    const value = newValue.trim();
    if (!value) {
      setErrorMessage("Please enter a valid contact.");
      return;
    }
    setErrorMessage("");
    setContacts([
      ...contacts,
      {
        id: Date.now(),
        type: newType,
        value,
        isPrimary: contacts.length === 0,
        isVerified: false,
      },
    ]);
    setNewValue("");
  };

  const remove = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const makePrimary = (id: number) => {
    setContacts(
      contacts.map((c) => ({
        ...c,
        isPrimary: c.id === id,
      }))
    );
  };

  const toggleVerify = (id: number) => {
    setContacts(
      contacts.map((c) =>
        c.id === id ? { ...c, isVerified: !c.isVerified } : c
      )
    );
  };

  const editValue = (id: number, value: string) => {
    setContacts(
      contacts.map((c) => (c.id === id ? { ...c, value } : c))
    );
  };

  const editType = (id: number, type: (typeof contactTypes)[number]) => {
    setContacts(
      contacts.map((c) => (c.id === id ? { ...c, type } : c))
    );
  };

  return (
    <div className="card">
      <h4>Contacts</h4>
      <div className="form-row">
        <select value={newType} onChange={(e) => setNewType(e.target.value as (typeof contactTypes)[number])}>
          {contactTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          placeholder="New contact"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button className="button" onClick={add}>Add Contact</button>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}

      {contacts.length === 0 && <div>No contacts added yet.</div>}

      {contacts.map((c) => (
        <div key={c.id} className="item-row">
          <select value={c.type} onChange={(e) => editType(c.id, e.target.value as (typeof contactTypes)[number])}>
            {contactTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input value={c.value} onChange={(e) => editValue(c.id, e.target.value)} />
          <span>{c.isPrimary ? "[Primary]" : ""}</span>
          <span>{c.isVerified ? "Verified" : "Unverified"}</span>
          <button className="button" onClick={() => makePrimary(c.id)} disabled={c.isPrimary}>
            Set Primary
          </button>
          <button className="button" onClick={() => toggleVerify(c.id)}>
            {c.isVerified ? "Unverify" : "Verify"}
          </button>
          <button className="button" onClick={() => remove(c.id)} disabled={!canDelete} title={!canDelete ? "Only Admin can delete contacts" : ""}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;