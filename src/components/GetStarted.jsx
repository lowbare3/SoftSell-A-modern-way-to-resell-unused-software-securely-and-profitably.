// src/components/GetStarted.jsx
import React, { useState } from "react";
import styles from "../style";
import { arrowUp } from "../assets";
import ContactLeadForm from "./ContactLeadForm";

const GetStarted = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div
        className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
        onClick={() => setShowForm(true)}
      >
        <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
          <div className={`${styles.flexStart} flex-row`}>
            <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
              <span className="text-gradient">Get</span>
            </p>
            <img
              src={arrowUp}
              alt="arrow-up"
              className="w-[23px] h-[23px] object-contain"
            />
          </div>
          <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
            <span className="text-gradient">Started</span>
          </p>
        </div>
      </div>

      {showForm && <ContactLeadForm onClose={() => setShowForm(false)} />}
    </>
  );
};

export default GetStarted;
