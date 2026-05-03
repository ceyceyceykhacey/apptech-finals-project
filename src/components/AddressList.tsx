import { useState } from "react";
import type { Address } from "../types/Address";

const addressTypes = ["home", "office", "billing", "shipping"] as const;

interface Props {
  addresses: Address[];
  setAddresses: (a: Address[]) => void;
  canDelete: boolean;
}

const AddressList = ({ addresses, setAddresses, canDelete }: Props) => {
  const [newType, setNewType] = useState<(typeof addressTypes)[number]>("home");
  const [newValue, setNewValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const add = () => {
    const value = newValue.trim();
    if (!value) {
      setErrorMessage("Please enter a valid address.");
      return;
    }
    setErrorMessage("");
    setAddresses([
      ...addresses,
      {
        id: Date.now(),
        type: newType,
        value,
        isDefault: addresses.length === 0,
        isVerified: false,
      },
    ]);
    setNewValue("");
  };

  const remove = (id: number) => {
    if (addresses.length <= 1) {
      alert("Keep at least one address per customer.");
      return;
    }
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const makeDefault = (id: number) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const toggleVerify = (id: number) => {
    setAddresses(
      addresses.map((a) =>
        a.id === id ? { ...a, isVerified: !a.isVerified } : a
      )
    );
  };

  const editValue = (id: number, value: string) => {
    setAddresses(
      addresses.map((a) => (a.id === id ? { ...a, value } : a))
    );
  };

  const editType = (id: number, type: (typeof addressTypes)[number]) => {
    setAddresses(
      addresses.map((a) => (a.id === id ? { ...a, type } : a))
    );
  };

  return (
    <div className="card">
      <h4>Addresses</h4>
      <div className="form-row">
        <select value={newType} onChange={(e) => setNewType(e.target.value as (typeof addressTypes)[number])}>
          {addressTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          placeholder="New address"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button className="button" onClick={add}>Add Address</button>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}

      {addresses.length === 0 && <div>No addresses added yet.</div>}

      {addresses.map((a) => (
        <div key={a.id} className="item-row">
          <select value={a.type} onChange={(e) => editType(a.id, e.target.value as (typeof addressTypes)[number])}>
            {addressTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input value={a.value} onChange={(e) => editValue(a.id, e.target.value)} />
          <span>{a.isDefault ? "[Default]" : ""}</span>
          <span>{a.isVerified ? "Verified" : "Unverified"}</span>
          <button className="button" onClick={() => makeDefault(a.id)} disabled={a.isDefault}>
            Set Default
          </button>
          <button className="button" onClick={() => toggleVerify(a.id)}>
            {a.isVerified ? "Unverify" : "Verify"}
          </button>
          <button
            className="button"
            onClick={() => remove(a.id)}
            disabled={!canDelete || addresses.length <= 1}
            title={!canDelete ? "Only Admin can delete addresses" : addresses.length <= 1 ? "At least one address is required" : ""}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddressList;