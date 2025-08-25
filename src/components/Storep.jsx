import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Storep = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
      {/* Background  */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 -z-10" />

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-900">
          Visit Our Physical Store
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Drop by our showroom or reach out to us for any queries.  
          We’d love to help you find the perfect weighing solution!
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-indigo-800 mb-6">Contact Us</h3>
          <div className="space-y-4">
            <p className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 text-indigo-600 mr-3" />
              Shop No. 6, Near Railway Station, Garhi Harsaru, Gurugram, India
            </p>
            <p className="flex items-center text-gray-700">
              <Phone className="w-5 h-5 text-indigo-600 mr-3" />
              +91 97170 99170
            </p>
            <p className="flex items-center text-gray-700">
              <Mail className="w-5 h-5 text-indigo-600 mr-3" />
             deepakelectronics320@gmail.com
            </p>
          </div>
        </div>

        {/* embedd Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg h-80">
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d3531.1611901035403!2d76.9298637!3d28.4397516!3m2!1i1024!2i768!4f13.1!2m1!1sdeepak%20electronics%20garhi%20harsaru!5e1!3m2!1sen!2sin!4v1756101295487!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Storep;
