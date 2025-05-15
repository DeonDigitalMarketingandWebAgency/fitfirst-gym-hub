
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Edit, Save } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { getCurrentUser, User as UserType } from '@/services/authService';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    height: '',
    weight: '',
    age: '',
    gender: '',
    desiredPackage: '',
    fitnessGoals: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        height: currentUser.height ? String(currentUser.height) : '',
        weight: currentUser.weight ? String(currentUser.weight) : '',
        age: currentUser.age ? String(currentUser.age) : '',
        gender: currentUser.gender || '',
        desiredPackage: currentUser.desiredPackage || '',
        fitnessGoals: currentUser.fitnessGoals || ''
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would send data to an API
    // For now, we'll just update the state and show a toast
    setIsEditing(false);
    
    const updatedUser = {
      ...user!,
      fullName: formData.fullName,
      phone: formData.phone,
      height: parseFloat(formData.height) || user?.height,
      weight: parseFloat(formData.weight) || user?.weight,
      age: parseInt(formData.age) || user?.age,
      gender: formData.gender || user?.gender,
      desiredPackage: formData.desiredPackage || user?.desiredPackage,
      fitnessGoals: formData.fitnessGoals || user?.fitnessGoals
    };
    
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <p>Loading profile information...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gym-blue">My Profile</h1>
          <Button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-gym-blue hover:bg-gym-blue/90"}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-36 w-36 mb-4">
                <AvatarImage 
                  src={user.profilePicture || ''} 
                  alt={user.fullName}
                  className="object-cover" 
                />
                <AvatarFallback className="bg-gym-blue text-white text-3xl">
                  <User size={48} />
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gym-blue">{user.fullName}</h2>
                <p className="text-gym-gray">{user.email}</p>
                <p className="text-gym-gray mt-1">Member since {user.registrationDate}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details below</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    name="fullName" 
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email" 
                    value={formData.email}
                    disabled={true} // Email should not be editable
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input 
                    id="gender"
                    name="gender" 
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age"
                    name="age" 
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height"
                    name="height" 
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight"
                    name="weight" 
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fitnessGoals">Fitness Goals</Label>
                  <Input 
                    id="fitnessGoals"
                    name="fitnessGoals" 
                    value={formData.fitnessGoals}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="desiredPackage">Current Package</Label>
                  <Input 
                    id="desiredPackage"
                    name="desiredPackage" 
                    value={formData.desiredPackage}
                    disabled={true} // Package should not be directly editable
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Membership Information</CardTitle>
              <CardDescription>
                Details about your current membership package
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gym-orange/10 rounded-lg border border-gym-orange/20">
                <h3 className="text-lg font-semibold text-gym-orange mb-2">
                  Active Membership: {formData.desiredPackage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                <p className="text-gym-gray">
                  To upgrade or change your membership package, please visit the Packages page or contact our customer support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
