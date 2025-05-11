import React, { useState } from "react";
import ContactLeadForm from "./ContactLeadForm";

const Button = ({ styles }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
      >
        Get Started
      </button>
      {showForm && <ContactLeadForm onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Button;
