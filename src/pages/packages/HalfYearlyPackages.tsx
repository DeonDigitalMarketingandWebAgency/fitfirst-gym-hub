
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import GymCalculator from "@/components/calculator/GymCalculator";

const packages = [
  {
    id: 1,
    name: "Basic Half-Yearly",
    price: 189.99,
    description: "Perfect for beginners",
    features: [
      "Access to gym equipment during off-peak hours",
      "Locker room access",
      "10 group classes per 6 months",
      "Fitness assessment",
      "Fitness app access",
      "One free guest pass per month"
    ],
    popular: false,
    color: "border-gray-200",
    savings: "Save $50 compared to monthly"
  },
  {
    id: 2,
    name: "Standard Half-Yearly",
    price: 299.99,
    description: "Our most popular half-yearly plan",
    features: [
      "24/7 access to gym equipment",
      "Locker room access",
      "Unlimited group classes",
      "Fitness assessment every 3 months",
      "Nutrition consultation",
      "Fitness app access with premium features",
      "Free parking",
      "Two free guest passes per month"
    ],
    popular: true,
    color: "border-gym-orange",
    savings: "Save $60 compared to monthly"
  },
  {
    id: 3,
    name: "Premium Half-Yearly",
    price: 479.99,
    description: "For serious fitness enthusiasts",
    features: [
      "24/7 access to gym equipment and facilities",
      "Unlimited group classes",
      "12 personal training sessions",
      "Nutrition consultation and meal planning",
      "Premium locker with towel service",
      "Free parking",
      "Guest passes (unlimited)",
      "Access to premium app features",
      "Monthly body composition analysis"
    ],
    popular: false,
    color: "border-gym-blue",
    savings: "Save $80 compared to monthly"
  }
];

const HalfYearlyPackages = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gym-blue mb-4">
            Half-Yearly Membership Packages
          </h1>
          <p className="text-gym-gray max-w-2xl mx-auto text-lg">
            Get substantial savings with our 6-month membership plans while maintaining your fitness commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative overflow-hidden transition-all hover:shadow-lg ${pkg.popular ? 'border-2 border-gym-orange' : 'border border-gray-200'}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gym-orange text-white px-3 py-1 text-xs font-semibold">
                  POPULAR
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
                  <span className="text-gym-gray ml-1">/6 months</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-sm text-green-600 font-medium">{pkg.savings}</span>
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
                    Choose Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gym-blue mb-8">
            Fitness Calculator
          </h2>
          <div className="max-w-3xl mx-auto">
            <GymCalculator />
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gym-blue mb-4">
            Looking for a different commitment period?
          </h2>
          <p className="text-gym-gray max-w-2xl mx-auto mb-8">
            Check out our other membership options to find what works best for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
              <Link to="/packages/monthly">Monthly Packages</Link>
            </Button>
            <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
              <Link to="/packages/quarterly">Quarterly Packages</Link>
            </Button>
            <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
              <Link to="/packages/annual">Annual Packages</Link>
            </Button>
            <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
              <Link to="/packages/personal-training">Personal Training</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HalfYearlyPackages;
