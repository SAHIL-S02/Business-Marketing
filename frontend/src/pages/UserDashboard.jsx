import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, Plus, Clock, Tag } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await axios.get('/orders/my');
        setOrders(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome, {user?.name}</h1>
            <p className="text-slate-600">Here's an overview of your agency project requests.</p>
          </div>
          <Link to="/order" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors">
            <Plus className="h-5 w-5" /> New Order
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6 font-medium">
            {error}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-500 font-medium">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center justify-center">
              <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Orders Found</h3>
              <p className="text-slate-500 mb-6">Looks like you haven't started any projects with us yet.</p>
              <Link to="/order" className="text-blue-600 font-semibold hover:underline">
                Create your first project request
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider font-semibold">
                    <th className="py-5 px-6">Business</th>
                    <th className="py-5 px-6">Service Type</th>
                    <th className="py-5 px-6">Budget</th>
                    <th className="py-5 px-6">Submitted On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-5 px-6 font-semibold text-slate-900">
                        {order.businessName}
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold tracking-wide">
                          <Tag className="h-3 w-3" /> {order.serviceType}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-slate-600 font-medium">
                        {order.budget ? `$${order.budget}` : 'Not Specified'}
                      </td>
                      <td className="py-5 px-6 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                           <Clock className="h-4 w-4 text-slate-400" />
                           {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
