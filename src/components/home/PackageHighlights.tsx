
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
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
    popular: false,
    category: 'monthly'
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
    popular: true,
    category: 'quarterly'
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
    popular: false,
    category: 'annual'
  }
];

const PackageHighlights = () => {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gym-blue mb-4"
            variants={fadeInUp}
          >
            Membership Packages
          </motion.h2>
          <motion.p 
            className="text-gym-gray max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Choose the membership plan that fits your fitness goals and budget.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {packages.map((pkg) => (
            <motion.div key={pkg.id} variants={fadeInUp}>
              <Card className={`relative overflow-hidden ${pkg.popular ? 'border-gym-orange shadow-lg' : 'shadow-sm'} hover:shadow-xl transition-shadow duration-300`}>
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
                    <Link to={`/packages?tab=${pkg.category}`}>Select Plan</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          variants={fadeInUp}
        >
          <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
            <Link to="/packages">View All Packages</Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PackageHighlights;
