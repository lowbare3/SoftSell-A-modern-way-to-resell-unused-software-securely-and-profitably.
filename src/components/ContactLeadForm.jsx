// src/components/ContactLeadForm.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactLeadForm = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.licenseType) newErrors.licenseType = 'Select a license type';
    if (!form.message) newErrors.message = 'Message cannot be empty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#1a1a1a] text-white p-8 rounded-3xl shadow-2xl w-full max-w-xl border border-[#5ce1e6]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#5ce1e6]">Let's Connect</h2>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-white text-3xl font-bold"
            >
              &times;
            </motion.button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#5ce1e6]"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#5ce1e6]"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#5ce1e6]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">License Type</label>
              <select
                name="licenseType"
                value={form.licenseType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#5ce1e6]"
              >
                <option value="">Select</option>
                <option value="Single-user">Single-user</option>
                <option value="Multi-user">Multi-user</option>
                <option value="Enterprise">Enterprise</option>
              </select>
              {errors.licenseType && <p className="text-red-400 text-xs mt-1">{errors.licenseType}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#5ce1e6]"
                rows="4"
              ></textarea>
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#5ce1e6] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[#4bc9d0] transition-all shadow-md"
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactLeadForm;
