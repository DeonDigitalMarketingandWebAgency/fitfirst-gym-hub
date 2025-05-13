
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Jennifer Parker',
    role: 'Member since 2021',
    quote: "Joining Fitness First was the best decision I made for my health. The trainers are knowledgeable and the community is so supportive. I've lost 30 pounds and feel amazing!",
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'David Wilson',
    role: 'Member since 2020',
    quote: 'The facilities at Fitness First are top-notch, but what really sets them apart is their staff. Everyone is friendly and genuinely invested in helping you succeed.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Michelle Lee',
    role: 'Member since 2022',
    quote: 'After trying several gyms in the area, I finally found my fitness home at Fitness First. The variety of classes and equipment keeps my workouts interesting and effective.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gym-blue mb-4">What Our Members Say</h2>
          <p className="text-gym-gray max-w-2xl mx-auto">
            Hear from our satisfied members about their fitness journey with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gym-gray italic text-center mb-4">"{testimonial.quote}"</p>
                  <div className="text-center">
                    <h4 className="font-medium text-gym-blue">{testimonial.name}</h4>
                    <p className="text-sm text-gym-gray">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
