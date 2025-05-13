
import { 
  Clock, 
  Users, 
  Dumbbell, 
  Heart
} from 'lucide-react';

const features = [
  {
    icon: <Clock className="h-10 w-10 text-gym-orange" />,
    title: 'Open 7 Days a Week',
    description: 'Access our facilities any day of the week, with extended hours to accommodate your busy schedule.'
  },
  {
    icon: <Users className="h-10 w-10 text-gym-orange" />,
    title: 'Expert Trainers',
    description: 'Our certified trainers create personalized fitness plans to help you achieve your goals faster.'
  },
  {
    icon: <Dumbbell className="h-10 w-10 text-gym-orange" />,
    title: 'Modern Equipment',
    description: 'Train with state-of-the-art fitness equipment designed for all fitness levels and goals.'
  },
  {
    icon: <Heart className="h-10 w-10 text-gym-orange" />,
    title: 'Supportive Community',
    description: 'Join a community that keeps you motivated and supported throughout your fitness journey.'
  }
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gym-blue mb-4">Why Choose Fitness First?</h2>
          <p className="text-gym-gray max-w-2xl mx-auto">
            We provide everything you need to achieve your fitness goals, from top-quality equipment to expert guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gym-blue mb-3">{feature.title}</h3>
              <p className="text-gym-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
