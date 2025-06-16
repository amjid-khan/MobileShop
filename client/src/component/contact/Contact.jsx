import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/product/contact", formData);
      toast.success("Message Sent Successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Error sending message");
      console.error(error);
    }
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center Heading">You can contact at any time</h3>
      <form onSubmit={handleMessage}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            className="form-control"
            id="message"
            rows="5"
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
