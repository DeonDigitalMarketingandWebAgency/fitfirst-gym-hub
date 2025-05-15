
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GymCalculator from "@/components/calculator/GymCalculator";
import { motion } from "framer-motion";

// Add framer-motion animations for components
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Define package types and their routes
const packageTypes = [
  { id: "monthly", label: "Monthly", path: "/packages/monthly" },
  { id: "quarterly", label: "Quarterly", path: "/packages/quarterly" },
  { id: "half-yearly", label: "Half-Yearly", path: "/packages/half-yearly" },
  { id: "annual", label: "Annual", path: "/packages/annual" },
  { id: "personal-training", label: "Personal Training", path: "/packages/personal-training" }
];

// Extended package data with more options
const packages = [
  // Monthly packages
  {
    id: 1,
    name: "Basic Monthly",
    price: 29.99,
    duration: "monthly",
    description: "Perfect for beginners",
    features: [
      "Access to gym equipment during off-peak hours",
      "Locker room access",
      "2 group classes per month",
      "Fitness assessment",
    ],
    popular: false,
    color: "border-gray-200",
    type: "monthly"
  },
  {
    id: 2,
    name: "Standard Monthly",
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
    type: "monthly"
  },
  {
    id: 3,
    name: "Premium Monthly",
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
    type: "monthly"
  },
  {
    id: 10,
    name: "Family Monthly",
    price: 119.99,
    duration: "monthly",
    description: "Great for families",
    features: [
      "Access for 2 adults and 2 children",
      "Full gym access",
      "Access to family classes",
      "Childcare services during workouts",
      "Family locker rooms",
      "Family workout planning",
    ],
    popular: false,
    color: "border-gray-200",
    type: "monthly"
  },
  // Quarterly packages
  {
    id: 4,
    name: "Basic Quarterly",
    price: 79.99,
    duration: "quarterly",
    description: "Save with a 3-month commitment",
    features: [
      "Access to gym equipment",
      "Locker room access",
      "6 group classes per quarter",
      "Fitness assessment",
    ],
    popular: false,
    color: "border-gray-200",
    type: "quarterly"
  },
  {
    id: 5,
    name: "Standard Quarterly",
    price: 129.99,
    duration: "quarterly",
    description: "Our most popular quarterly plan",
    features: [
      "Full access to gym equipment",
      "Unlimited group classes",
      "3 personal training sessions per quarter",
      "Nutrition consultation",
      "Access to swimming pool",
      "Free parking",
    ],
    popular: true,
    color: "border-gym-orange",
    type: "quarterly"
  },
  {
    id: 11,
    name: "Premium Quarterly",
    price: 199.99,
    duration: "quarterly",
    description: "Premium quarterly experience",
    features: [
      "24/7 gym access",
      "Unlimited group classes",
      "6 personal training sessions per quarter",
      "Nutrition and meal planning",
      "Access to all facilities",
      "Free parking",
      "Guest passes (4 per quarter)",
      "Access to premium app features",
    ],
    popular: false,
    color: "border-gym-blue",
    type: "quarterly"
  },
  {
    id: 12,
    name: "Family Quarterly",
    price: 299.99,
    duration: "quarterly",
    description: "Family quarterly savings",
    features: [
      "Access for 2 adults and 2 children",
      "Full gym access",
      "Access to family classes",
      "Childcare services during workouts",
      "Family locker rooms",
      "Family workout planning",
      "4 family group sessions per quarter",
    ],
    popular: false,
    color: "border-gray-200",
    type: "quarterly"
  },
  // Half-yearly packages
  {
    id: 6,
    name: "Basic Half-Yearly",
    price: 149.99,
    duration: "half-yearly",
    description: "Great value for 6 months",
    features: [
      "Access to gym equipment",
      "Locker room access",
      "12 group classes per half-year",
      "Fitness assessment",
    ],
    popular: false,
    color: "border-gray-200",
    type: "half-yearly"
  },
  {
    id: 7,
    name: "Standard Half-Yearly",
    price: 249.99,
    duration: "half-yearly",
    description: "Best seller for 6 months",
    features: [
      "Full access to gym equipment",
      "Unlimited group classes",
      "6 personal training sessions per half-year",
      "Nutrition consultation",
      "Access to swimming pool",
      "Free parking",
    ],
    popular: true,
    color: "border-gym-orange",
    type: "half-yearly"
  },
  {
    id: 13,
    name: "Premium Half-Yearly",
    price: 389.99,
    duration: "half-yearly",
    description: "Premium 6-month experience",
    features: [
      "24/7 gym access",
      "Unlimited group classes",
      "12 personal training sessions per half-year",
      "Nutrition and meal planning",
      "Access to all facilities",
      "Free parking",
      "Guest passes (8 per half-year)",
      "Access to premium app features",
      "2 massage therapy sessions",
    ],
    popular: false,
    color: "border-gym-blue",
    type: "half-yearly"
  },
  {
    id: 14,
    name: "Family Half-Yearly",
    price: 549.99,
    duration: "half-yearly",
    description: "Family half-year package",
    features: [
      "Access for 2 adults and 2 children",
      "Full gym access",
      "Access to family classes",
      "Childcare services during workouts",
      "Family locker rooms",
      "Family workout planning",
      "8 family group sessions per half-year",
      "Family fitness assessment",
    ],
    popular: false,
    color: "border-gray-200",
    type: "half-yearly"
  },
  // Annual packages
  {
    id: 8,
    name: "Basic Annual",
    price: 279.99,
    duration: "annual",
    description: "Best value for a full year",
    features: [
      "Access to gym equipment",
      "Locker room access",
      "24 group classes per year",
      "Fitness assessment",
    ],
    popular: false,
    color: "border-gray-200",
    type: "annual"
  },
  {
    id: 9,
    name: "Standard Annual",
    price: 479.99,
    duration: "annual",
    description: "Ultimate yearly package",
    features: [
      "Full access to gym equipment",
      "Unlimited group classes",
      "12 personal training sessions per year",
      "Nutrition consultation",
      "Access to swimming pool",
      "Free parking",
    ],
    popular: true,
    color: "border-gym-orange",
    type: "annual"
  },
  {
    id: 15,
    name: "Premium Annual",
    price: 749.99,
    duration: "annual",
    description: "Premium yearly experience",
    features: [
      "24/7 gym access",
      "Unlimited group classes",
      "24 personal training sessions per year",
      "Nutrition and meal planning",
      "Access to all facilities",
      "Free parking",
      "Guest passes (unlimited)",
      "Access to premium app features",
      "4 massage therapy sessions",
      "Annual fitness retreat",
    ],
    popular: false,
    color: "border-gym-blue",
    type: "annual"
  },
  {
    id: 16,
    name: "Family Annual",
    price: 999.99,
    duration: "annual",
    description: "Ultimate family package",
    features: [
      "Access for 2 adults and 2 children",
      "Full gym access",
      "Access to family classes",
      "Childcare services during workouts",
      "Family locker rooms",
      "Family workout planning",
      "16 family group sessions per year",
      "Family fitness assessment",
      "Family nutrition planning",
      "2 family fitness retreats",
    ],
    popular: false,
    color: "border-gray-200",
    type: "annual"
  },
  // Personal Training packages
  {
    id: 17,
    name: "Starter PT",
    price: 199.99,
    duration: "monthly",
    description: "Begin your fitness journey",
    features: [
      "4 personal training sessions per month",
      "Individual fitness assessment",
      "Basic workout planning",
      "Form correction and guidance",
      "Access to gym equipment during sessions",
    ],
    popular: false,
    color: "border-gray-200",
    type: "personal-training"
  },
  {
    id: 18,
    name: "Intermediate PT",
    price: 349.99,
    duration: "monthly",
    description: "Take your fitness to the next level",
    features: [
      "8 personal training sessions per month",
      "Comprehensive fitness assessment",
      "Customized workout planning",
      "Form correction and guidance",
      "Nutrition guidance",
      "Access to gym equipment during sessions",
      "Monthly progress tracking",
    ],
    popular: true,
    color: "border-gym-orange",
    type: "personal-training"
  },
  {
    id: 19,
    name: "Elite PT",
    price: 599.99,
    duration: "monthly",
    description: "For serious fitness enthusiasts",
    features: [
      "12 personal training sessions per month",
      "Advanced fitness assessment",
      "Fully customized workout planning",
      "Expert form correction and guidance",
      "Detailed nutrition planning",
      "Access to gym equipment during sessions",
      "Weekly progress tracking",
      "WhatsApp support between sessions",
      "Recovery guidance",
    ],
    popular: false,
    color: "border-gym-blue",
    type: "personal-training"
  },
  {
    id: 20,
    name: "Couples PT",
    price: 499.99,
    duration: "monthly",
    description: "Train together, achieve together",
    features: [
      "8 couples training sessions per month",
      "Partner fitness assessment",
      "Customized partner workouts",
      "Form correction and guidance",
      "Nutrition guidance for both partners",
      "Access to gym equipment during sessions",
      "Monthly progress tracking for both",
    ],
    popular: false,
    color: "border-gray-200",
    type: "personal-training"
  }
];

const PackagesPage = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a tab parameter in the URL
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && packageTypes.some(type => type.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  const handleChoosePlan = (packageId: number) => {
    // Redirect to register page with package ID
    navigate(`/register?package=${packageId}`);
  };

  const handleContactCorporate = () => {
    navigate('/contact?type=corporate');
  };

  // Filter packages by active tab
  const filteredPackages = packages.filter(pkg => pkg.type === activeTab);

  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto px-4 py-16 md:py-24"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gym-blue mb-4">
            Membership Packages
          </h1>
          <p className="text-gym-gray max-w-2xl mx-auto text-lg">
            Choose the perfect membership package that fits your fitness goals and budget.
          </p>
        </div>

        <div className="mb-10">
          <Tabs 
            defaultValue="monthly" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
              {packageTypes.map(type => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="data-[state=active]:bg-gym-orange data-[state=active]:text-white"
                >
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {packageTypes.map(type => (
              <TabsContent key={type.id} value={type.id} className="mt-4 animate-fade-in">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredPackages.map((pkg) => (
                    <motion.div key={pkg.id} variants={fadeIn}>
                      <Card 
                        className={`relative overflow-hidden transition-all hover:shadow-lg transform hover:-translate-y-1 duration-300 h-full flex flex-col ${pkg.popular ? 'border-2 border-gym-orange' : 'border border-gray-200'}`}
                      >
                        {pkg.popular && (
                          <div className="absolute top-0 right-0">
                            <Badge className="bg-gym-orange text-white m-2 animate-pulse">
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        <CardHeader className={`bg-gray-50 border-b ${pkg.color}`}>
                          <CardTitle className="text-xl font-bold text-center text-gym-blue">
                            {pkg.name}
                          </CardTitle>
                          <CardDescription className="text-center">
                            {pkg.description}
                          </CardDescription>
                          <div className="text-center mt-4">
                            <span className="text-3xl font-bold text-gym-blue">${pkg.price}</span>
                            <span className="text-gym-gray ml-1">/{pkg.duration}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-6 flex-grow">
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
                              onClick={() => handleChoosePlan(pkg.id)}
                              className={`w-full ${pkg.popular ? 'bg-gym-orange hover:bg-gym-orange/90' : 'bg-gym-blue hover:bg-gym-blue/90'} transform transition-transform duration-300 hover:scale-105`}
                            >
                              Choose Plan
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gym-blue mb-6">
            Fitness Calculator
          </h2>
          <GymCalculator />
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gym-blue mb-4">
            Corporate Memberships
          </h2>
          <p className="text-gym-gray max-w-2xl mx-auto mb-8">
            We offer special rates for corporate groups. Contact us to learn more about our corporate packages.
          </p>
          <Button 
            onClick={handleContactCorporate}
            variant="outline" 
            className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white transform transition-transform duration-300 hover:scale-105"
          >
            Contact for Corporate Rates
          </Button>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default PackagesPage;
