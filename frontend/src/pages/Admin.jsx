import { useEffect, useState, useContext } from 'react';
import { RefreshCw, Mail, Building, Tag, Search, Users, FileText } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'users'
  const [searchTerm, setSearchTerm] = useState('');

  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Because axios defaults have the Bearer token, we just hit the endpoints
      const [ordersRes, usersRes] = await Promise.all([
        axios.get('/orders'),
        axios.get('/auth/users')
      ]);
      setOrders(ordersRes.data);
      setUsersList(usersRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredOrders = orders.filter(
    order =>
      order.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = usersList.filter(
    u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Command Center</h1>
            <p className="text-slate-600">Logged in as: <span className="font-semibold text-blue-600">{user?.name}</span></p>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm w-fit"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Custom Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-slate-300">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'orders' ? 'bg-white text-blue-600 border-t border-l border-r border-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <FileText className="h-4 w-4" /> All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-semibold text-sm rounded-t-lg transition-colors flex items-center gap-2 ${activeTab === 'users' ? 'bg-white text-blue-600 border-t border-l border-r border-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Users className="h-4 w-4" /> Platform Users ({usersList.length})
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-8">
          <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
            <Search className="text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="bg-transparent border-none outline-none w-full text-slate-700 placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">Loading {activeTab}...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-500 bg-red-50 font-medium">Error: {error}</div>
          ) : activeTab === 'orders' ? (
            <div className="overflow-x-auto">
              {filteredOrders.length === 0 ? (
                <div className="p-10 text-center text-slate-500">No matching orders found.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                      <th className="py-4 px-6 font-semibold">Client Name</th>
                      <th className="py-4 px-6 font-semibold">Business</th>
                      <th className="py-4 px-6 font-semibold">Service</th>
                      <th className="py-4 px-6 font-semibold">Budget</th>
                      <th className="py-4 px-6 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-medium text-slate-900">{order.clientName}</div>
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                            <Mail className="h-3 w-3" /> {order.email}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Building className="h-4 w-4 text-slate-400" /> {order.businessName}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <Tag className="h-3 w-3" /> {order.serviceType}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-600 font-medium">
                          {order.budget ? `₹${order.budget}` : 'None'}
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-500 whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              {filteredUsers.length === 0 ? (
                <div className="p-10 text-center text-slate-500">No matching users found.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                      <th className="py-4 px-6 font-semibold">Name</th>
                      <th className="py-4 px-6 font-semibold">Email</th>
                      <th className="py-4 px-6 font-semibold">Role</th>
                      <th className="py-4 px-6 font-semibold">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-900">{u.name}</td>
                        <td className="py-4 px-6 text-slate-600">{u.email}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${u.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
