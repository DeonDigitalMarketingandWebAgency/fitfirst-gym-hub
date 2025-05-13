
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gym-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Join Fitness First today and take the first step towards a healthier, stronger you. 
          Our team is ready to support you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg" className="bg-gym-orange hover:bg-gym-orange/90 text-white">
            <Link to="/register">Join Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white bg-white/10 text-white hover:bg-white/20">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
