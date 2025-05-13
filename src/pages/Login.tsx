
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/components/layout/MainLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would be an API call to authenticate the user
    setTimeout(() => {
      // Demo login - in a real app, this would be proper authentication
      if (email === 'demo@example.com' && password === 'password') {
        toast({
          title: "Login Successful",
          description: "Welcome back to Fitness First GYM!",
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
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
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Button type="submit" className="bg-gym-orange hover:bg-gym-orange/90" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
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
    </MainLayout>
  );
};

export default Login;
