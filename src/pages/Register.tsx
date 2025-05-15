
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/components/layout/MainLayout';
import { register, UserRegistration } from '@/services/authService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User } from 'lucide-react';

const Register = () => {
  // Basic information
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureURL, setProfilePictureURL] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Physical information
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // Package preference
  const [desiredPackage, setDesiredPackage] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState('');
  
  const [currentTab, setCurrentTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setProfilePictureURL(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match."
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        variant: "destructive",
        title: "Terms not accepted",
        description: "Please agree to our terms and conditions to continue."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Convert profile picture to base64 if it exists
      let profilePictureBase64 = '';
      if (profilePicture) {
        profilePictureBase64 = await convertFileToBase64(profilePicture);
      }
      
      const userData: UserRegistration = {
        fullName,
        email,
        phone,
        password,
        // Additional information
        height: parseFloat(height) || 0,
        weight: parseFloat(weight) || 0,
        age: parseInt(age) || 0,
        gender,
        desiredPackage,
        fitnessGoals,
        profilePicture: profilePictureBase64
      };
      
      const user = await register(userData);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      
      // If the user came from selecting a package, redirect to payment page
      const urlParams = new URLSearchParams(window.location.search);
      const selectedPackage = urlParams.get('package');
      
      if (selectedPackage) {
        navigate(`/payment?package=${selectedPackage}`);
      } else {
        navigate('/login');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "There was an error creating your account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const validateBasicInfo = () => {
    if (!fullName || !email || !password || !confirmPassword || password !== confirmPassword) {
      return false;
    }
    return true;
  };

  const goToNext = () => {
    if (currentTab === 'basic' && validateBasicInfo()) {
      setCurrentTab('physical');
    } else if (currentTab === 'physical') {
      setCurrentTab('package');
    }
  };

  const goToPrevious = () => {
    if (currentTab === 'physical') {
      setCurrentTab('basic');
    } else if (currentTab === 'package') {
      setCurrentTab('physical');
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center">
        <Card className="w-full max-w-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gym-blue/10 to-gym-orange/5 rounded-lg -z-10"></div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gym-orange/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gym-blue/10 rounded-full blur-3xl -z-10"></div>
          
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Fitness First" 
                className="h-16 w-auto" 
              />
            </div>
            <CardTitle className="text-2xl text-gym-blue">Create an Account</CardTitle>
            <CardDescription>
              Join Fitness First and start your fitness journey
            </CardDescription>
          </CardHeader>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <div className="px-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="basic" className="data-[state=active]:bg-gym-orange data-[state=active]:text-white">Basic Info</TabsTrigger>
                <TabsTrigger value="physical" className="data-[state=active]:bg-gym-orange data-[state=active]:text-white">Physical Info</TabsTrigger>
                <TabsTrigger value="package" className="data-[state=active]:bg-gym-orange data-[state=active]:text-white">Package Selection</TabsTrigger>
              </TabsList>
            </div>

            <form onSubmit={handleSubmit}>
              <TabsContent value="basic" className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="grid gap-5">
                    <div className="flex justify-center mb-4">
                      <div className="relative group cursor-pointer" onClick={triggerFileInput}>
                        <Avatar className="h-24 w-24 border-2 border-gym-orange">
                          <AvatarImage src={profilePictureURL} alt={fullName} />
                          <AvatarFallback className="bg-gym-blue text-white text-xl">
                            {profilePictureURL ? '' : <User size={32} />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="text-white" />
                        </div>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleProfilePictureChange} 
                        />
                      </div>
                    </div>
                    <p className="text-center text-sm text-gym-gray -mt-2 mb-2">
                      Click to add profile picture
                    </p>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <Button 
                      type="button" 
                      className="bg-gym-orange hover:bg-gym-orange/90 mt-2"
                      onClick={goToNext}
                      disabled={!validateBasicInfo()}
                    >
                      Next
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="physical" className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="grid gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="175"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="70"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="25"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={goToPrevious}
                      >
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        className="bg-gym-orange hover:bg-gym-orange/90" 
                        onClick={goToNext}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="package" className="animate-fade-in">
                <CardContent className="pt-6">
                  <div className="grid gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="desiredPackage">Desired Package</Label>
                      <Select value={desiredPackage} onValueChange={setDesiredPackage}>
                        <SelectTrigger id="desiredPackage">
                          <SelectValue placeholder="Select package" />
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
                    <div className="grid gap-2">
                      <Label htmlFor="fitnessGoals">Fitness Goals</Label>
                      <Select value={fitnessGoals} onValueChange={setFitnessGoals}>
                        <SelectTrigger id="fitnessGoals">
                          <SelectValue placeholder="Select your main goal" />
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
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link to="/terms" className="text-gym-orange hover:underline">
                          Terms of Service
                        </Link>
                        {" "}and{" "}
                        <Link to="/privacy" className="text-gym-orange hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <div className="flex justify-between mt-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={goToPrevious}
                      >
                        Back
                      </Button>
                      <Button type="submit" className="bg-gym-orange hover:bg-gym-orange/90" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </form>
          </Tabs>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gym-gray">
              Already have an account?{" "}
              <Link to="/login" className="text-gym-orange hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Register;
