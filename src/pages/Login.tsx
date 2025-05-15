
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { login, LoginCredentials } from '@/services/authService';
import { z } from 'zod';

const emailSchema = z.string().email({ message: "Please enter a valid email address" });

const Login = () => {
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
      const credentials: LoginCredentials = { email, password };
      const user = await login(credentials);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.fullName}!`,
      });
      
      navigate('/dashboard');
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
          backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          filter: 'brightness(0.9)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gym-blue/70 to-transparent mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center z-10 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="flex flex-col justify-center items-center rounded-l-lg bg-gradient-to-br from-gym-blue/50 to-gym-blue/30 text-white p-12 shadow-2xl backdrop-blur-sm h-full">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Welcome Back!</h2>
              <p className="text-white/90">Sign in to access your fitness journey dashboard and track your progress.</p>
              <div className="mt-8 rounded-lg overflow-hidden shadow-xl border-2 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&q=80" 
                  alt="Fitness Journey" 
                  className="w-full h-auto max-h-72 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          <Card className="w-full border-0 shadow-2xl md:rounded-l-none backdrop-blur-sm bg-white/30">
            <div className="absolute inset-0 bg-gradient-to-br from-gym-blue/5 to-gym-orange/5 rounded-lg -z-10"></div>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Link to="/">
                  <img 
                    src="/placeholder.svg" 
                    alt="Fitness First" 
                    className="h-16 w-auto" 
                  />
                </Link>
              </div>
              <CardTitle className="text-2xl text-gym-blue">Welcome Back</CardTitle>
              <CardDescription className="text-white font-medium">
                Sign in to your Fitness First account
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
                      placeholder="your.email@example.com"
                      required
                      className="border-gym-blue/20 focus:border-gym-orange bg-white/80"
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <Link 
                        to="/forgot-password" 
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
                      className="border-gym-blue/20 focus:border-gym-orange bg-white/80"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="text-gym-orange focus:ring-gym-orange bg-white/80"
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
                    <p>Demo Account:</p>
                    <p>Email: demo@example.com</p>
                    <p>Password: password</p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-white">
                Don't have an account?{" "}
                <Link to="/register" className="text-gym-orange hover:underline">
                  Register now
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
