
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const packages = [
  {
    id: 1,
    name: 'Basic',
    duration: 'Monthly',
    price: 49,
    features: [
      'Full gym access',
      'Locker room access',
      'Standard equipment usage',
      'Online workout tracking'
    ],
    popular: false
  },
  {
    id: 2,
    name: 'Premium',
    duration: 'Quarterly',
    price: 129,
    features: [
      'Full gym access',
      'Locker room access',
      'All equipment usage',
      '2 free personal training sessions',
      'Online workout tracking',
      'Nutrition consultation'
    ],
    popular: true
  },
  {
    id: 3,
    name: 'Elite',
    duration: 'Annual',
    price: 449,
    features: [
      'Full gym access',
      'Locker room access with towel service',
      'All equipment usage',
      '12 personal training sessions',
      'Advanced fitness assessment',
      'Priority class booking',
      'Nutrition planning'
    ],
    popular: false
  }
];

const PackageHighlights = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gym-blue mb-4">Membership Packages</h2>
          <p className="text-gym-gray max-w-2xl mx-auto">
            Choose the membership plan that fits your fitness goals and budget.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`relative overflow-hidden ${pkg.popular ? 'border-gym-orange shadow-lg' : 'shadow-sm'}`}>
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-gym-orange text-white text-xs font-bold uppercase py-1 px-3 rotate-45 translate-x-7 translate-y-3">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-gym-blue">{pkg.name}</CardTitle>
                <CardDescription>{pkg.duration} Package</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gym-blue">${pkg.price}</span>
                  <span className="text-gym-gray text-sm">/{pkg.duration.toLowerCase()}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-gym-orange shrink-0 mr-2" />
                      <span className="text-gym-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className={pkg.popular ? 'bg-gym-orange hover:bg-gym-orange/90 w-full' : 'w-full'}>
                  <Link to={`/packages/${pkg.id}`}>Select Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
            <Link to="/packages">View All Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackageHighlights;
