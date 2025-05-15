
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { LockKeyhole, Mail, User } from "lucide-react";

const AdminRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulating registration
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Your admin account has been created. Please contact system administrator for approval.",
      });
      navigate("/admin/login");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center">
        {/* Full-page background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1579126038374-6064e9370f0f?auto=format&fit=crop&q=80")',
            backgroundSize: 'cover',
            filter: 'brightness(0.85)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gym-blue/70 to-black/50" />
        </div>
        
        <div className="container mx-auto px-4 py-16 flex items-center justify-center z-10">
          <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 shadow-2xl">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gym-orange/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gym-blue/10 rounded-full blur-3xl -z-10"></div>
            
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-gym-blue">Admin Registration</CardTitle>
              <CardDescription>
                Create a new admin account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <User size={18} />
                    </span>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <Mail size={18} />
                    </span>
                    <Input
                      id="email"
                      placeholder="admin@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <LockKeyhole size={18} />
                    </span>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">
                      <LockKeyhole size={18} />
                    </span>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gym-blue hover:bg-gym-blue/90 transition-transform hover:scale-105 duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 border-t pt-4">
              <div className="text-center text-sm">
                <span>Already have an admin account? </span>
                <Button variant="link" asChild className="p-0">
                  <Link to="/admin/login">Sign in</Link>
                </Button>
              </div>
              <Button variant="link" asChild className="p-0">
                <Link to="/login">User login</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminRegister;
