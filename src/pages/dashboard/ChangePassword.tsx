
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ChangePassword = () => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", met: newPassword.length >= 8 },
    { id: 2, text: "At least one uppercase letter", met: /[A-Z]/.test(newPassword) },
    { id: 3, text: "At least one lowercase letter", met: /[a-z]/.test(newPassword) },
    { id: 4, text: "At least one number", met: /\d/.test(newPassword) },
    { id: 5, text: "At least one special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) }
  ];
  
  const allRequirementsMet = passwordRequirements.every(req => req.met);
  const passwordsMatch = newPassword === confirmPassword && newPassword !== "";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allRequirementsMet) {
      toast({
        title: "Password requirements not met",
        description: "Please ensure your password meets all requirements.",
        variant: "destructive"
      });
      return;
    }
    
    if (!passwordsMatch) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate password change
    setTimeout(() => {
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully."
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gym-blue">Change Password</h1>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Update Your Password</CardTitle>
              <CardDescription>Ensure your account remains secure by updating your password regularly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <AlertCircle size={14} className="mr-1" />
                      Passwords don't match
                    </p>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Password Requirements</h3>
                <ul className="space-y-1">
                  {passwordRequirements.map(req => (
                    <li key={req.id} className="flex items-center text-sm">
                      {req.met ? (
                        <Check size={14} className="text-green-500 mr-2" />
                      ) : (
                        <div className="w-[14px] h-[14px] rounded-full border border-gray-300 mr-2" />
                      )}
                      <span className={req.met ? "text-gray-700" : "text-gray-500"}>
                        {req.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="bg-gym-blue hover:bg-gym-blue/90"
                disabled={isLoading || !allRequirementsMet || !passwordsMatch || !currentPassword}
              >
                {isLoading ? "Changing Password..." : "Change Password"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ChangePassword;
