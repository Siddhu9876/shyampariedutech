// src/pages/OrganizationPage.tsx
import React from 'react';
import { Building, MapPin, Phone, Mail } from 'lucide-react';

const OrganizationPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center">
        <Building className="w-8 h-8 mr-3 text-teal-600" />
        Organization Details
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">EduConnect Academy</h2>
        <p className="text-lg text-gray-700 mb-6">
          Dedicated to fostering a vibrant learning environment and empowering educators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-teal-500" />
              Address
            </h3>
            <p className="text-gray-600">123 Learning Lane</p>
            <p className="text-gray-600">Knowledge City, KC 12345</p>
            <p className="text-gray-600">India</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <Phone className="w-6 h-6 mr-2 text-teal-500" />
              Contact
            </h3>
            <p className="text-gray-600">Phone: +91 123 456 7890</p>
            <p className="text-gray-600">Email: info@educonnect.com</p>
            <p className="text-gray-600">Support: support@educonnect.com</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            EduConnect Academy is committed to delivering high-quality education through innovative teaching methods and a supportive community. We believe in nurturing critical thinking, creativity, and a lifelong love for learning in all our students. Our goal is to bridge the gap between traditional learning and modern digital tools, making education accessible and engaging for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;