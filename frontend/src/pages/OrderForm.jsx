import { useState, useContext } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const OrderForm = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    clientName: user?.name || '',
    email: user?.email || '',
    businessName: '',
    serviceType: '',
    budget: '',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await axios.post('/orders', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ clientName: user?.name || '', email: user?.email || '', businessName: '', serviceType: '', budget: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.response?.data?.message || 'Failed to submit form' });
    }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Let's Build Something Great Together.</h1>
          <p className="text-lg text-slate-600 mb-8">
            Tell us about your business and goals. Our team will review your requirements and reach out to schedule a strategy call.
          </p>
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-blue-800 text-sm space-y-2 list-disc pl-4">
              <li>We analyze your current digital footprint.</li>
              <li>We connect with you for a 30-min discovery call.</li>
              <li>We present a custom, data-backed roadmap.</li>
            </ul>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
            {status.success ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animation-fade-in">
                <CheckCircle className="h-20 w-20 text-green-500 mb-6 drop-shadow-sm" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-600">
                  Thank you for reaching out. A member of our team will contact you shortly to get started.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Business Name</label>
                  <input
                    required
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Service Type</label>
                    <select
                      required
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="" disabled>Select service...</option>
                      <option value="Social Media">Social Media</option>
                      <option value="SEO">SEO</option>
                      <option value="Website">Website package</option>
                      <option value="Full Package">Full Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Budget</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="₹ INR"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="What are your main goals?"
                  ></textarea>
                </div>

                {status.error && (
                  <div className="p-3 rounded bg-red-50 text-red-600 text-sm border border-red-200">
                    {status.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-4 px-6 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 mt-2"
                >
                  {status.loading ? 'Submitting...' : (
                    <>Submit Request <Send className="h-5 w-5" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
