
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Users, Package, CreditCard, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllUsers, User } from '@/services/authService';

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Get latest registered users
  const latestUsers = [...users]
    .sort((a, b) => {
      return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
    })
    .slice(0, 5);

  // Package name mapping
  const packageNames: Record<string, string> = {
    "monthly-basic": "Monthly Basic",
    "monthly-standard": "Monthly Standard",
    "monthly-premium": "Premium Monthly",
    "quarterly-basic": "Quarterly Basic",
    "quarterly-premium": "Premium Quarterly",
    "half-yearly": "Half Yearly",
    "annual": "Annual",
    "personal-training": "Personal Training"
  };

  // Mock data for stats
  const stats = {
    totalMembers: users.length,
    activePackages: Math.round(users.length * 0.8),
    totalBookings: users.length * 2,
    monthlyRevenue: users.length * 80
  };

  // Mock data for recent bookings
  const recentBookings = [
    { id: 1, user: 'Jennifer Parker', package: 'Premium Quarterly', date: 'Oct 12, 2023', amount: 129.00, status: 'Completed' },
    { id: 2, user: 'David Wilson', package: 'Annual Elite', date: 'Oct 10, 2023', amount: 449.00, status: 'Pending' },
    { id: 3, user: 'Michelle Lee', package: 'Monthly Basic', date: 'Oct 9, 2023', amount: 49.00, status: 'Completed' },
    { id: 4, user: 'Robert Brown', package: 'Personal Training', date: 'Oct 8, 2023', amount: 75.00, status: 'Completed' }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gym-blue">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Members</CardTitle>
              <Users className="h-4 w-4 text-gym-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gym-blue">{stats.totalMembers}</div>
              <p className="text-xs text-gray-500 mt-1">+{latestUsers.length} this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Packages</CardTitle>
              <Package className="h-4 w-4 text-gym-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gym-blue">{stats.activePackages}</div>
              <p className="text-xs text-gray-500 mt-1">+{Math.round(latestUsers.length * 0.8)} this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-gym-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gym-blue">{stats.totalBookings}</div>
              <p className="text-xs text-gray-500 mt-1">+{latestUsers.length * 2} this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Monthly Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-gym-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gym-blue">${stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">+8% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest package bookings and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">User</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Package</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-2">{booking.user}</td>
                      <td className="py-3 px-2">{booking.package}</td>
                      <td className="py-3 px-2">{booking.date}</td>
                      <td className="py-3 px-2">${booking.amount.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* New Members and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Members */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>New Members</CardTitle>
                <CardDescription>Recently registered users</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading users...</p>
                ) : (
                  <div className="space-y-4">
                    {latestUsers.length === 0 ? (
                      <p>No registered users found.</p>
                    ) : (
                      latestUsers.map((user) => (
                        <div key={user.id} className="flex items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                            <span className="font-medium text-gym-blue">{user.fullName.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gym-blue">{user.fullName}</h3>
                            <div className="flex flex-col md:flex-row md:space-x-4 text-sm text-gray-500">
                              <span>{user.email}</span>
                              <span>Joined: {user.registrationDate}</span>
                            </div>
                          </div>
                          <div className="hidden md:block">
                            {user.desiredPackage && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {packageNames[user.desiredPackage]}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common admin tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link to="/admin/add-package" className="w-full bg-gym-blue text-white py-2 px-4 rounded-md hover:bg-gym-blue/90 transition-colors flex items-center justify-center">
                    <Package className="h-4 w-4 mr-2" />
                    Add New Package
                  </Link>
                  <Link to="/admin/register-member" className="w-full bg-gym-orange text-white py-2 px-4 rounded-md hover:bg-gym-orange/90 transition-colors flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    Register New Member
                  </Link>
                  <Link to="/admin/users" className="w-full border border-gym-blue text-gym-blue py-2 px-4 rounded-md hover:bg-gym-blue/10 transition-colors flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    View All Members
                  </Link>
                  <Link to="/admin/reports" className="w-full border border-gym-blue text-gym-blue py-2 px-4 rounded-md hover:bg-gym-blue/10 transition-colors flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
