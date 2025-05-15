
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email({ message: "Please enter a valid email address" });

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    try {
      emailSchema.parse(email);
      setEmailError('');
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple mock authentication
      if (email === 'admin@example.com' && password === 'admin123') {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        });
        
        navigate('/admin');
      } else {
        throw new Error("Invalid admin credentials");
      }
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Full-page background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          filter: 'brightness(0.85)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gym-blue/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 flex justify-center z-10 w-full h-full min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl self-center">
          <div className="flex flex-col justify-center items-center rounded-l-lg bg-gradient-to-br from-gym-blue/50 to-gym-blue/30 text-white p-12 backdrop-blur-sm shadow-2xl h-full">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Admin Portal</h2>
              <p className="text-white/90">Sign in to access administrative controls and manage gym operations.</p>
              <div className="mt-8 rounded-lg overflow-hidden shadow-xl border-2 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1623874514711-0f321325f318?auto=format&fit=crop&q=80" 
                  alt="Admin Portal"
                  className="w-full h-auto max-h-72 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          <Card className="w-full border-0 shadow-2xl md:rounded-l-none backdrop-blur-sm bg-white/30">
            <div className="absolute inset-0 bg-gradient-to-br from-gym-blue/5 to-gym-orange/5 rounded-lg -z-10"></div>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Link to="/admin">
                  <img 
                    src="/placeholder.svg"
                    alt="Fitness First Admin" 
                    className="h-16 w-auto" 
                  />
                </Link>
              </div>
              <CardTitle className="text-2xl text-gym-blue">Admin Login</CardTitle>
              <CardDescription className="text-white font-medium">
                Sign in to the Fitness First admin portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value) validateEmail(e.target.value);
                      }}
                      onBlur={() => validateEmail(email)}
                      placeholder="admin@example.com"
                      required
                      className="bg-white/80"
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <Link 
                        to="/admin/forgot-password" 
                        className="text-sm text-gym-orange hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="bg-white/80"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="bg-white/80"
                    />
                    <Label htmlFor="remember" className="text-sm text-white">Remember me</Label>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-gym-orange hover:bg-gym-orange/90 transition-colors duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  
                  {/* Demo Account Info */}
                  <div className="text-center text-sm text-white mt-2 p-2 bg-gray-50/20 rounded-md backdrop-blur-sm">
                    <p>Demo Admin Account:</p>
                    <p>Email: admin@example.com</p>
                    <p>Password: admin123</p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
