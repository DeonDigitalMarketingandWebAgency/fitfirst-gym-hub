
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const trainers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialization: 'Strength & Conditioning',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    bio: '10+ years of experience in strength training and athletic conditioning.'
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    specialization: 'Cardio & HIIT',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    bio: 'Specialized in high-intensity interval training and cardiovascular fitness.'
  },
  {
    id: 3,
    name: 'Elena Chen',
    specialization: 'Yoga & Flexibility',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    bio: 'Certified yoga instructor with focus on flexibility and mindfulness training.'
  }
];

const Trainers = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gym-blue mb-4">Meet Our Trainers</h2>
          <p className="text-gym-gray max-w-2xl mx-auto">
            Our certified and experienced trainers are here to help you achieve your fitness goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gym-blue">{trainer.name}</CardTitle>
                <CardDescription className="text-gym-orange font-medium">
                  {trainer.specialization}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gym-gray">{trainer.bio}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
                  <Link to={`/trainers/${trainer.id}`}>View Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-gym-orange hover:bg-gym-orange/90">
            <Link to="/trainers">All Trainers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
