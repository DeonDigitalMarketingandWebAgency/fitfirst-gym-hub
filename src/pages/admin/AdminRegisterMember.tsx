
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { register, UserRegistration } from '@/services/authService';

const AdminRegisterMember = () => {
  // Basic information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // Auto-generated or default
  
  // Physical information
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  // Package information
  const [membershipType, setMembershipType] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you might want to generate a random password
      // or use a default one that the member can change later
      const defaultPassword = 'Fitness@123';
      
      const userData: UserRegistration = {
        fullName: `${firstName} ${lastName}`,
        email,
        phone,
        password: defaultPassword,
        height: parseFloat(height) || undefined,
        weight: parseFloat(weight) || undefined,
        age: parseInt(age) || undefined,
        gender,
        desiredPackage: membershipType,
        fitnessGoals
      };
      
      await register(userData);
      
      toast({
        title: "Member Registered",
        description: `${firstName} ${lastName} has been successfully registered.`,
      });
      
      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setHeight('');
      setWeight('');
      setAge('');
      setGender('');
      setMembershipType('');
      setFitnessGoals('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "There was an error registering the member.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gym-blue">Register New Member</h1>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
              <CardDescription>Register a new member to the gym</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input 
                    id="first-name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input 
                    id="last-name" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-of-birth">Age</Label>
                  <Input 
                    id="age" 
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="membership-type">Membership Type</Label>
                  <Select value={membershipType} onValueChange={setMembershipType} required>
                    <SelectTrigger id="membership-type">
                      <SelectValue placeholder="Select Membership Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly-basic">Monthly Basic</SelectItem>
                      <SelectItem value="monthly-standard">Monthly Standard</SelectItem>
                      <SelectItem value="monthly-premium">Monthly Premium</SelectItem>
                      <SelectItem value="quarterly-basic">Quarterly Basic</SelectItem>
                      <SelectItem value="quarterly-premium">Quarterly Premium</SelectItem>
                      <SelectItem value="half-yearly">Half Yearly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="personal-training">Personal Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="fitness-goals">Fitness Goals</Label>
                  <Select value={fitnessGoals} onValueChange={setFitnessGoals}>
                    <SelectTrigger id="fitness-goals">
                      <SelectValue placeholder="Select Main Fitness Goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                      <SelectItem value="endurance">Improve Endurance</SelectItem>
                      <SelectItem value="flexibility">Increase Flexibility</SelectItem>
                      <SelectItem value="general-fitness">General Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" type="button">Cancel</Button>
              <Button type="submit" className="bg-gym-orange hover:bg-gym-orange/90" disabled={isSubmitting}>
                <Users className="mr-2 h-4 w-4" />
                {isSubmitting ? "Registering..." : "Register Member"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminRegisterMember;
