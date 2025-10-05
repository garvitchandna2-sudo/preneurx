import React, { useState } from "react";
import wing from '../assets/whatsapp.png';
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name || !email || !message) {
      alert("Please fill in all fields before sending.");
      return;
    }

    const subject = encodeURIComponent("New Inquiry Form");
    const body = encodeURIComponent(
     ` Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    );

    const gmailURL =` https://mail.google.com/mail/?view=cm&fs=1&to=info.preneurx@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailURL, "_blank");
    alert("Gmail window opened. Please complete your message in the Gmail tab.");
    setForm({ name: "", email: "", message: "" }); // reset form
  };

  return (
    <>
    <Navbar/>




    <div className="bg-gray-100 text-gray-800 font-['Plus Jakarta Sans']">
      {/* Header */}
      <header className="text-white py-3 text-center bg-gradient-to-r from-[#083ca0] to-black">
        <div className=" mx-auto px-3">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-sm">We’d love to hear from you!</p>
        </div>
      </header>

      {/* Main Section */}
      <section className="py-12">
        <div className=" mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-blue-900">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-all"
                >
                  Send via Gmail
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-blue-900">Our Office</h3>
              <p className="mt-2 text-sm text-[#333] leading-relaxed">
                PreneurX <br />
                Jaipur, Rajasthan, 303007 , India
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-blue-900">Contact Info</h3>
              <p className="mt-2 text-sm text-[#333] leading-relaxed">
                Phone: +91-8684076253<br />
                Email: garvitchandna2@gmail.com<br />
              </p>
              <a
                href="/contact"
                title="Chat on WhatsApp"
                rel="noopener noreferrer"
              >
                <img
                  src={wing} // Update path if different
                  alt="WhatsApp"
                  className="h-8 w-8 hover:scale-105 transition-transform mt-2"
                />
              </a>
              <p className="mt-2 text-sm text-[#333] leading-relaxed"><strong>WhatsApp Support:</strong>
We typically respond within 2 to 5 minutes.<br/>
Available Monday to Saturday, from 9:00 AM to 5:00 PM

</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    
    </>
    
  );
};

export default ContactUs;