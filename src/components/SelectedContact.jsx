import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function SelectedContact({
  selectedContactId,
  setSelectedContactId,
}) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        const result = await response.json();

        setContact(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    if (selectedContactId) {
      fetchContact();
    }
  }, [selectedContactId]);

  return (
    <div>
      {contact ? (
        <div>
          <p>Name: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
        </div>
      ) : (
        <p>Navigating...</p>
      )}
      <button onClick={() => setSelectedContactId(null)}>
        Back to Contact List
      </button>
    </div>
  );
}
SelectedContact.propTypes = {
  selectedContactId: PropTypes.number.isRequired,
  setSelectedContactId: PropTypes.func.isRequired,
};
