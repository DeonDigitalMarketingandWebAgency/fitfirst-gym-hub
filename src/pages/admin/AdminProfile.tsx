
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { User, Mail, Phone } from 'lucide-react';

const AdminProfile = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock admin data
  const [adminData, setAdminData] = useState({
    fullName: 'Admin User',
    email: 'admin@example.com',
    phone: '555-123-0000',
    role: 'Administrator'
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your admin profile has been updated successfully."
      });
      setIsLoading(false);
    }, 1000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully."
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gym-blue">Admin Profile</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your administrator account details</CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                          <User size={16} />
                        </span>
                        <Input 
                          id="fullName" 
                          value={adminData.fullName}
                          onChange={(e) => setAdminData({...adminData, fullName: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                          <Mail size={16} />
                        </span>
                        <Input 
                          id="email" 
                          type="email" 
                          value={adminData.email}
                          onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                          <Phone size={16} />
                        </span>
                        <Input 
                          id="phone" 
                          value={adminData.phone}
                          onChange={(e) => setAdminData({...adminData, phone: e.target.value})}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        value={adminData.role}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="bg-gym-blue hover:bg-gym-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your admin account password</CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordChange}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="bg-gym-blue hover:bg-gym-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Changing Password..." : "Change Password"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfile;
