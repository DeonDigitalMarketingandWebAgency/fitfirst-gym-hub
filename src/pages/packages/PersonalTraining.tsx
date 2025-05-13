
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GymCalculator from "@/components/calculator/GymCalculator";

const singleSessions = [
  {
    id: 1,
    name: "Trial Session",
    price: 49.99,
    description: "Try before you commit",
    features: [
      "60-minute session with certified trainer",
      "Fitness assessment",
      "Personalized workout plan",
      "Nutritional guidance"
    ],
    popular: false,
    color: "border-gray-200"
  },
  {
    id: 2,
    name: "Standard Session",
    price: 79.99,
    description: "Full personal training experience",
    features: [
      "90-minute session with certified trainer",
      "Customized workout routine",
      "Form correction and technique improvement",
      "Progress tracking",
      "Nutritional advice"
    ],
    popular: true,
    color: "border-gym-orange"
  },
  {
    id: 3,
    name: "Premium Session",
    price: 129.99,
    description: "Elite training experience",
    features: [
      "2-hour session with elite trainer",
      "Advanced workout programming",
      "Video analysis of form and technique",
      "Comprehensive fitness assessment",
      "Customized nutrition plan",
      "Recovery protocols"
    ],
    popular: false,
    color: "border-gym-blue"
  }
];

const packages = [
  {
    id: 1,
    name: "Starter Pack",
    sessions: 5,
    price: 349.99,
    description: "Perfect for beginners",
    features: [
      "5 sessions with certified trainer",
      "Initial fitness assessment",
      "Personalized workout plan",
      "Progress tracking",
      "Basic nutritional guidance"
    ],
    popular: false,
    color: "border-gray-200",
    savings: "Save $50 compared to individual sessions"
  },
  {
    id: 2,
    name: "Transformation Pack",
    sessions: 10,
    price: 649.99,
    description: "Our most popular package",
    features: [
      "10 sessions with certified trainer",
      "Comprehensive fitness assessment",
      "Customized workout program",
      "Bi-weekly progress tracking",
      "Nutritional planning",
      "Access to exclusive workout app",
      "One free massage session"
    ],
    popular: true,
    color: "border-gym-orange",
    savings: "Save $150 compared to individual sessions"
  },
  {
    id: 3,
    name: "Elite Pack",
    sessions: 20,
    price: 1199.99,
    description: "For serious fitness enthusiasts",
    features: [
      "20 sessions with elite trainer",
      "Advanced fitness assessment",
      "Periodized training program",
      "Weekly progress tracking",
      "Detailed nutrition and meal planning",
      "Recovery protocols",
      "Two free massage sessions",
      "Free gym bag and merchandise"
    ],
    popular: false,
    color: "border-gym-blue",
    savings: "Save $400 compared to individual sessions"
  }
];

const PersonalTraining = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gym-blue mb-4">
            Personal Training
          </h1>
          <p className="text-gym-gray max-w-2xl mx-auto text-lg">
            Take your fitness journey to the next level with our experienced personal trainers.
          </p>
        </div>

        <Tabs defaultValue="packages" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="packages">Training Packages</TabsTrigger>
            <TabsTrigger value="sessions">Single Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="packages">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                      <span className="text-gym-gray ml-1">/{pkg.sessions} sessions</span>
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
                        Choose Package
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sessions">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {singleSessions.map((session) => (
                <Card 
                  key={session.id} 
                  className={`relative overflow-hidden transition-all hover:shadow-lg ${session.popular ? 'border-2 border-gym-orange' : 'border border-gray-200'}`}
                >
                  {session.popular && (
                    <div className="absolute top-0 right-0 bg-gym-orange text-white px-3 py-1 text-xs font-semibold">
                      POPULAR
                    </div>
                  )}
                  <CardHeader className={`bg-gray-50 border-b ${session.color}`}>
                    <CardTitle className="text-2xl font-bold text-center text-gym-blue">
                      {session.name}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {session.description}
                    </CardDescription>
                    <div className="text-center mt-4">
                      <span className="text-4xl font-bold text-gym-blue">${session.price}</span>
                      <span className="text-gym-gray ml-1">/session</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {session.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gym-dark">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button 
                        className={`w-full ${session.popular ? 'bg-gym-orange hover:bg-gym-orange/90' : 'bg-gym-blue hover:bg-gym-blue/90'}`}
                      >
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

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
            Looking for membership packages?
          </h2>
          <p className="text-gym-gray max-w-2xl mx-auto mb-8">
            Check out our other membership options that might include personal training sessions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
              <Link to="/packages/monthly">Monthly Packages</Link>
            </Button>
            <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
              <Link to="/packages/quarterly">Quarterly Packages</Link>
            </Button>
            <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
              <Link to="/packages/half-yearly">Half-Yearly Packages</Link>
            </Button>
            <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
              <Link to="/packages/annual">Annual Packages</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalTraining;
