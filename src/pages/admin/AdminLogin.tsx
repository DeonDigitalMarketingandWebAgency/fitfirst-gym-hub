
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/components/layout/MainLayout';

const AdminLogin = () => {
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
    <MainLayout>
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
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

        <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
            <div className="hidden md:flex flex-col justify-center items-center rounded-l-lg bg-gradient-to-br from-gym-blue/90 to-gym-blue/80 text-white p-12 backdrop-blur-sm shadow-2xl">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Admin Portal</h2>
                <p className="text-white/80">Sign in to access administrative controls and manage gym operations.</p>
                <div className="mt-8 rounded-lg overflow-hidden shadow-xl border-2 border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1623874514711-0f321325f318?auto=format&fit=crop&q=80" 
                    alt="Admin Portal"
                    className="w-full h-auto max-h-72 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            <Card className="w-full border-0 shadow-2xl md:rounded-l-none backdrop-blur-sm bg-white/90">
              <div className="absolute inset-0 bg-gradient-to-br from-gym-blue/5 to-gym-orange/5 rounded-lg -z-10"></div>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/placeholder.svg"
                    alt="Fitness First Admin" 
                    className="h-16 w-auto" 
                  />
                </div>
                <CardTitle className="text-2xl text-gym-blue">Admin Login</CardTitle>
                <CardDescription>
                  Sign in to the Fitness First admin portal
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
                        placeholder="admin@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
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
                    <Button 
                      type="submit" 
                      className="bg-gym-orange hover:bg-gym-orange/90 transition-colors duration-300 transform hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    
                    {/* Demo Account Info */}
                    <div className="text-center text-sm text-gym-gray mt-2 p-2 bg-gray-50/80 rounded-md backdrop-blur-sm">
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
    </MainLayout>
  );
};

export default AdminLogin;
