
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Calendar, CreditCard, Package, Clock, User } from 'lucide-react';
import { getCurrentUser } from '@/services/authService';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(getCurrentUser());
  
  useEffect(() => {
    // Refresh user data when component mounts
    setUser(getCurrentUser());
  }, []);

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

  // Goals mapping
  const goalsNames: Record<string, string> = {
    "weight-loss": "Weight Loss",
    "muscle-gain": "Muscle Gain",
    "endurance": "Improve Endurance",
    "flexibility": "Increase Flexibility",
    "general-fitness": "General Fitness"
  };

  // Mock data for active package
  const activePackage = {
    name: user?.desiredPackage ? packageNames[user.desiredPackage] : 'Premium Quarterly',
    startDate: '2023-09-15',
    endDate: '2023-12-15',
    daysLeft: 45,
    features: ['Full gym access', 'Locker room access', 'All equipment usage', '2 free personal training sessions']
  };

  // Mock data for upcoming classes
  const upcomingClasses = [
    { id: 1, name: 'HIIT Training', date: 'Oct 15, 2023', time: '18:00 - 19:00', trainer: 'Mike Rodriguez' },
    { id: 2, name: 'Yoga Class', date: 'Oct 18, 2023', time: '10:00 - 11:00', trainer: 'Elena Chen' }
  ];

  // Mock data for recent payments
  const recentPayments = [
    { id: 1, description: 'Premium Quarterly Package', date: 'Sep 15, 2023', amount: 129.00 },
    { id: 2, description: 'Personal Training Session', date: 'Sep 20, 2023', amount: 45.00 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gym-blue">Member Dashboard</h1>
        
        {/* User Profile Card */}
        {user && (
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-gym-blue flex items-center justify-center text-white">
                    <User size={40} />
                  </div>
                </div>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="text-lg font-semibold text-gym-blue">{user.fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-lg font-semibold text-gym-blue">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-lg font-semibold text-gym-blue">{user.phone || 'Not provided'}</p>
                  </div>
                  
                  {user.age && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Age</h3>
                      <p className="text-lg font-semibold text-gym-blue">{user.age} years</p>
                    </div>
                  )}
                  
                  {user.gender && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                      <p className="text-lg font-semibold text-gym-blue">{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</p>
                    </div>
                  )}
                  
                  {user.height && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Height</h3>
                      <p className="text-lg font-semibold text-gym-blue">{user.height} cm</p>
                    </div>
                  )}
                  
                  {user.weight && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                      <p className="text-lg font-semibold text-gym-blue">{user.weight} kg</p>
                    </div>
                  )}
                  
                  {user.fitnessGoals && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Fitness Goal</h3>
                      <p className="text-lg font-semibold text-gym-blue">{goalsNames[user.fitnessGoals]}</p>
                    </div>
                  )}
                  
                  {user.registrationDate && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                      <p className="text-lg font-semibold text-gym-blue">{user.registrationDate}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Package</CardTitle>
              <Package className="h-4 w-4 text-gym-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gym-blue">{activePackage.name}</div>
              <p className="text-xs text-gray-500 mt-1">Valid until {activePackage.endDate}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Days Remaining</CardTitle>
              <Calendar className="h-4 w-4 text-gym-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gym-blue">{activePackage.daysLeft} days</div>
              <p className="text-xs text-gray-500 mt-1">In your current package</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Next Class</CardTitle>
              <Clock className="h-4 w-4 text-gym-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gym-blue">{upcomingClasses[0].name}</div>
              <p className="text-xs text-gray-500 mt-1">{upcomingClasses[0].date}, {upcomingClasses[0].time}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Current Package */}
        <Card>
          <CardHeader>
            <CardTitle>Current Membership</CardTitle>
            <CardDescription>Details of your active membership package</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Package</h3>
                  <p className="text-lg font-semibold text-gym-blue mt-1">{activePackage.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Validity</h3>
                  <p className="text-lg font-semibold text-gym-blue mt-1">
                    {activePackage.startDate} to {activePackage.endDate}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Features</h3>
                <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activePackage.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gym-blue">
                      <div className="h-2 w-2 rounded-full bg-gym-orange mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Your scheduled training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((cls) => (
                  <div key={cls.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="bg-gray-100 p-3 rounded-md mr-4">
                      <Clock className="h-5 w-5 text-gym-orange" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gym-blue">{cls.name}</h3>
                      <p className="text-sm text-gray-500">{cls.date}, {cls.time}</p>
                      <p className="text-sm text-gray-500">Trainer: {cls.trainer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="bg-gray-100 p-3 rounded-md mr-4">
                      <CreditCard className="h-5 w-5 text-gym-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gym-blue">{payment.description}</h3>
                      <p className="text-sm text-gray-500">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gym-blue">${payment.amount.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
