
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/components/layout/MainLayout';
import { Check, CreditCard, Calendar } from 'lucide-react';
import { getCurrentUser } from '@/services/authService';

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const Payment = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Package data (in a real app, you would fetch this from an API)
  const packagesData = [
    { id: "1", name: "Basic Monthly", price: 29.99, duration: "monthly" },
    { id: "2", name: "Premium Monthly", price: 49.99, duration: "monthly" },
    { id: "3", name: "Ultimate Monthly", price: 89.99, duration: "monthly" },
    { id: "4", name: "Basic Quarterly", price: 79.99, duration: "quarterly" },
    { id: "5", name: "Premium Quarterly", price: 129.99, duration: "quarterly" },
    { id: "6", name: "Basic Half-Yearly", price: 149.99, duration: "half-yearly" },
    { id: "7", name: "Premium Half-Yearly", price: 249.99, duration: "half-yearly" },
    { id: "8", name: "Basic Annual", price: 279.99, duration: "annual" },
    { id: "9", name: "Premium Annual", price: 479.99, duration: "annual" },
  ];

  useEffect(() => {
    // Find the selected package based on the URL parameter
    if (packageId) {
      const pkg = packagesData.find(p => p.id === packageId);
      if (pkg) {
        setSelectedPackage(pkg);
      }
    }

    // Redirect if not logged in
    const user = getCurrentUser();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to complete your payment.",
      });
      navigate('/login');
    }
  }, [packageId, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
    }

    // Format expiry date as MM/YY
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: `You have successfully subscribed to the ${selectedPackage?.name} package!`,
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "There was an error processing your payment.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedPackage) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gym-blue">Package Not Found</h1>
          <p className="mt-4">The package you selected could not be found.</p>
          <Button asChild className="mt-6 bg-gym-orange">
            <a href="/packages">View Available Packages</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gym-blue mb-4">
            Complete Your Subscription
          </h1>
          <p className="text-gym-gray max-w-2xl mx-auto">
            You're just one step away from starting your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <Card className="border-gym-blue/20 h-full">
              <CardHeader>
                <CardTitle className="text-xl text-gym-blue">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gym-blue mb-2">{selectedPackage.name} Package</h3>
                  <p className="text-gym-gray mb-4">Subscription for {selectedPackage.duration} access</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Package price:</span>
                      <span className="font-medium">${selectedPackage.price}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-gym-blue">${selectedPackage.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4">
                  <h3 className="font-medium">Your subscription includes:</h3>
                  <div className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Full access to all gym facilities during your subscription period</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Access to fitness classes (limits may apply based on package)</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Personalized fitness guidance from our experienced trainers</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Access to our mobile app for workout tracking</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border-gym-orange/20">
              <CardHeader>
                <CardTitle className="text-xl text-gym-blue">Payment Details</CardTitle>
                <CardDescription>
                  Please enter your payment information securely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <div className="relative">
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-gym-orange hover:bg-gym-orange/90 transition-all duration-300 hover:shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : `Pay $${selectedPackage.price}`}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    By completing this purchase, you agree to our{" "}
                    <a href="/terms" className="text-gym-orange hover:underline">Terms of Service</a>
                    {" "}and{" "}
                    <a href="/privacy" className="text-gym-orange hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center justify-center w-full text-sm text-gray-500">
                  <span className="mr-2">Secured by</span>
                  <span className="font-semibold">Fitness</span>
                  <span className="font-semibold text-gym-orange">First</span>
                  <span className="ml-2">SSL Encryption</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;
