
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Users, Package, CreditCard, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for stats
  const stats = {
    totalMembers: 245,
    activePackages: 187,
    totalBookings: 438,
    monthlyRevenue: 15680
  };

  // Mock data for recent bookings
  const recentBookings = [
    { id: 1, user: 'Jennifer Parker', package: 'Premium Quarterly', date: 'Oct 12, 2023', amount: 129.00, status: 'Completed' },
    { id: 2, user: 'David Wilson', package: 'Annual Elite', date: 'Oct 10, 2023', amount: 449.00, status: 'Pending' },
    { id: 3, user: 'Michelle Lee', package: 'Monthly Basic', date: 'Oct 9, 2023', amount: 49.00, status: 'Completed' },
    { id: 4, user: 'Robert Brown', package: 'Personal Training', date: 'Oct 8, 2023', amount: 75.00, status: 'Completed' }
  ];

  // Mock data for recent users
  const recentUsers = [
    { id: 1, name: 'Thomas Martinez', email: 'thomas.m@example.com', joinDate: 'Oct 12, 2023' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', joinDate: 'Oct 11, 2023' },
    { id: 3, name: 'James Wilson', email: 'james.w@example.com', joinDate: 'Oct 10, 2023' }
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
              <p className="text-xs text-gray-500 mt-1">+12 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Packages</CardTitle>
              <Package className="h-4 w-4 text-gym-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gym-blue">{stats.activePackages}</div>
              <p className="text-xs text-gray-500 mt-1">+5 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-gym-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gym-blue">{stats.totalBookings}</div>
              <p className="text-xs text-gray-500 mt-1">+28 this month</p>
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
        
        {/* Recent Users and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>New Members</CardTitle>
                <CardDescription>Recently registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                        <span className="font-medium text-gym-blue">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gym-blue">{user.name}</h3>
                        <div className="flex text-sm text-gray-500 space-x-4">
                          <span>{user.email}</span>
                          <span>Joined: {user.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  <button className="w-full bg-gym-blue text-white py-2 px-4 rounded-md hover:bg-gym-blue/90 transition-colors flex items-center justify-center">
                    <Package className="h-4 w-4 mr-2" />
                    Add New Package
                  </button>
                  <button className="w-full bg-gym-orange text-white py-2 px-4 rounded-md hover:bg-gym-orange/90 transition-colors flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    Register New Member
                  </button>
                  <button className="w-full border border-gym-blue text-gym-blue py-2 px-4 rounded-md hover:bg-gym-blue/10 transition-colors flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Generate Reports
                  </button>
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
