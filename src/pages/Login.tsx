
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/components/layout/MainLayout';
import { login, LoginCredentials } from '@/services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="hidden md:flex flex-col justify-center items-center rounded-l-lg bg-gradient-to-br from-gym-blue to-gym-blue/80 text-white p-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Welcome Back!</h2>
              <p className="text-white/80">Sign in to access your fitness journey dashboard and track your progress.</p>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                alt="Fitness" 
                className="mt-6 rounded-lg shadow-lg w-full h-auto max-h-72 object-cover"
              />
            </div>
          </div>

          <Card className="w-full border-0 shadow-lg md:rounded-l-none">
            <div className="absolute inset-0 bg-gradient-to-br from-gym-blue/5 to-gym-orange/5 rounded-lg -z-10"></div>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Fitness First" 
                  className="h-16 w-auto" 
                />
              </div>
              <CardTitle className="text-2xl text-gym-blue">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your Fitness First account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-5">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="border-gym-blue/20 focus:border-gym-orange"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
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
                      className="border-gym-blue/20 focus:border-gym-orange"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="text-gym-orange focus:ring-gym-orange"
                    />
                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-gym-orange hover:bg-gym-orange/90 transition-colors duration-300 transform hover:scale-105" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  
                  {/* Demo Account Info */}
                  <div className="text-center text-sm text-gym-gray mt-2 p-2 bg-gray-50 rounded-md">
                    <p>Demo Account:</p>
                    <p>Email: demo@example.com</p>
                    <p>Password: password</p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gym-gray">
                Don't have an account?{" "}
                <Link to="/register" className="text-gym-orange hover:underline">
                  Register now
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
