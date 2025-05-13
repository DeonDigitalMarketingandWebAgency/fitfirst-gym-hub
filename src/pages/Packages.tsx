
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const packages = [
  {
    id: 1,
    name: "Basic",
    price: 29.99,
    duration: "monthly",
    description: "Perfect for beginners",
    features: [
      "Access to gym equipment",
      "Locker room access",
      "2 group classes per month",
      "Fitness assessment",
    ],
    popular: false,
    color: "border-gray-200",
  },
  {
    id: 2,
    name: "Premium",
    price: 49.99,
    duration: "monthly",
    description: "Our most popular package",
    features: [
      "Full access to gym equipment",
      "Unlimited group classes",
      "1 personal training session per month",
      "Nutrition consultation",
      "Access to swimming pool",
      "Free parking",
    ],
    popular: true,
    color: "border-gym-orange",
  },
  {
    id: 3,
    name: "Ultimate",
    price: 89.99,
    duration: "monthly",
    description: "For serious fitness enthusiasts",
    features: [
      "24/7 gym access",
      "Unlimited group classes",
      "4 personal training sessions per month",
      "Nutrition and meal planning",
      "Access to all facilities",
      "Free parking",
      "Guest passes (2 per month)",
      "Access to premium app features",
    ],
    popular: false,
    color: "border-gym-blue",
  },
];

const PackagesPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gym-blue mb-4">
            Membership Packages
          </h1>
          <p className="text-gym-gray max-w-2xl mx-auto text-lg">
            Choose the perfect membership package that fits your fitness goals and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all hover:shadow-lg ${pkg.popular ? 'border-2 border-gym-orange' : 'border border-gray-200'}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-gym-orange text-white m-2">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className={`bg-gray-50 border-b ${pkg.color}`}>
                <CardTitle className="text-2xl font-bold text-center text-gym-blue">
                  {pkg.name}
                </CardTitle>
                <CardDescription className="text-center">
                  {pkg.description}
                </CardDescription>
                <div className="text-center mt-4">
                  <span className="text-4xl font-bold text-gym-blue">${pkg.price}</span>
                  <span className="text-gym-gray ml-1">/{pkg.duration}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gym-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-gym-orange hover:bg-gym-orange/90' : 'bg-gym-blue hover:bg-gym-blue/90'}`}
                  >
                    Choose {pkg.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gym-blue mb-4">
            Corporate Memberships
          </h2>
          <p className="text-gym-gray max-w-2xl mx-auto mb-8">
            We offer special rates for corporate groups. Contact us to learn more about our corporate packages.
          </p>
          <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
            <a href="/contact">Contact for Corporate Rates</a>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default PackagesPage;
