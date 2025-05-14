
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Package, Check, Clock, ArrowRight } from 'lucide-react';

const UserPackages = () => {
  // Mock data for current package
  const currentPackage = {
    name: "Premium Quarterly",
    startDate: "2023-09-15",
    endDate: "2023-12-15",
    daysLeft: 45,
    percentComplete: 50,
    features: [
      "Full gym access", 
      "Locker room access", 
      "All equipment usage", 
      "2 free personal training sessions"
    ]
  };

  // Mock data for available upgrades
  const availableUpgrades = [
    {
      id: 1,
      name: "Premium Annual",
      description: "Get our best value package with annual commitment",
      price: 899.99,
      savings: "Save 20% compared to quarterly payments",
      features: [
        "All Premium Quarterly features",
        "4 additional personal training sessions",
        "Nutrition consultation",
        "Access to premium app features"
      ]
    },
    {
      id: 2,
      name: "Elite Quarterly",
      description: "Upgrade your current package to our elite tier",
      price: 349.99,
      additionalCost: "+$220 from your current package",
      features: [
        "All Premium Quarterly features",
        "Unlimited personal training",
        "Nutrition and meal planning",
        "Recovery protocols",
        "Monthly body composition analysis"
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gym-blue">My Packages</h1>
        
        {/* Current Package */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-bold text-gym-blue">Current Package</CardTitle>
                <CardDescription>Your active membership details</CardDescription>
              </div>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gym-blue">{currentPackage.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar size={16} className="mr-1" />
                  <span>{currentPackage.startDate} to {currentPackage.endDate}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Membership Progress</span>
                  <span className="text-sm font-medium">{currentPackage.daysLeft} days left</span>
                </div>
                <Progress value={currentPackage.percentComplete} className="h-2" />
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Package Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-4">
            <div className="text-sm text-gray-500 flex items-center">
              <Clock size={16} className="mr-1" />
              <span>Renews on {currentPackage.endDate}</span>
            </div>
            <Button className="bg-gym-orange hover:bg-gym-orange/90">
              Renew Package
            </Button>
          </CardFooter>
        </Card>
        
        {/* Available Upgrades */}
        <h2 className="text-xl font-bold text-gym-blue mt-8">Available Upgrades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableUpgrades.map(upgrade => (
            <Card key={upgrade.id} className="border border-gray-200 hover:border-gym-blue/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gym-blue">{upgrade.name}</CardTitle>
                <CardDescription>{upgrade.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-gym-blue">${upgrade.price}</span>
                    {upgrade.savings ? (
                      <p className="text-sm text-green-600 mt-1">{upgrade.savings}</p>
                    ) : (
                      <p className="text-sm text-orange-600 mt-1">{upgrade.additionalCost}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Features</h4>
                  <ul className="space-y-1">
                    {upgrade.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <Check size={14} className="text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gym-blue hover:bg-gym-blue/90">
                  Upgrade <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Package History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Package History</CardTitle>
            <CardDescription>Your previous memberships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start border-b border-gray-100 pb-4">
                <div className="bg-gray-100 p-3 rounded-md mr-4">
                  <Package size={20} className="text-gym-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gym-blue">Basic Monthly</h3>
                  <p className="text-sm text-gray-500">May 15, 2023 - Aug 15, 2023</p>
                </div>
                <Badge variant="outline">Expired</Badge>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-100 p-3 rounded-md mr-4">
                  <Package size={20} className="text-gym-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gym-blue">Trial Package</h3>
                  <p className="text-sm text-gray-500">Apr 15, 2023 - May 15, 2023</p>
                </div>
                <Badge variant="outline">Expired</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserPackages;
