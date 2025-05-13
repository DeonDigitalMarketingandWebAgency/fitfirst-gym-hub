
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const trainers = [
  {
    id: 1,
    name: "Michael Johnson",
    specialty: "Strength & Conditioning",
    experience: "8+ years",
    bio: "Michael specializes in strength training and helping clients build lean muscle. He has worked with athletes from various sports and knows how to push you to your limits safely.",
    certifications: ["NASM Certified Personal Trainer", "Strength & Conditioning Specialist", "TRX Certified"],
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Sarah Rodriguez",
    specialty: "Yoga & Flexibility",
    experience: "6+ years",
    bio: "Sarah is passionate about helping members improve their flexibility and mindfulness through yoga. Her classes focus on proper alignment and breathing techniques.",
    certifications: ["200-hour Yoga Alliance Certification", "Meditation Instructor", "Pilates Level 1"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "James Williams",
    specialty: "Weight Loss & Nutrition",
    experience: "10+ years",
    bio: "James combines effective workout routines with nutrition guidance to help clients achieve their weight loss goals. His holistic approach ensures sustainable results.",
    certifications: ["ACE Certified Personal Trainer", "Nutrition Coach", "Weight Management Specialist"],
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Emma Chen",
    specialty: "HIIT & Functional Training",
    experience: "7+ years",
    bio: "Emma's high-intensity interval training classes are designed to maximize calorie burn and improve cardiovascular health. Her energetic approach keeps members motivated.",
    certifications: ["HIIT Specialist", "Functional Training Expert", "CrossFit Level 2"],
    image: "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Daniel Patel",
    specialty: "Rehabilitation & Recovery",
    experience: "12+ years",
    bio: "With a background in physical therapy, Daniel specializes in helping clients recover from injuries and develop routines that prevent future ones.",
    certifications: ["Physical Therapy Assistant", "Corrective Exercise Specialist", "Pain-Free Performance Specialist"],
    image: "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Olivia Thomas",
    specialty: "Group Fitness & Dance",
    experience: "5+ years",
    bio: "Olivia brings fun to fitness with her energetic dance and group fitness classes. Her routines are designed to be accessible to all fitness levels while providing an effective workout.",
    certifications: ["Group Fitness Instructor", "Zumba Certified", "Dance Fitness Specialist"],
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
];

const TrainersPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gym-blue mb-4">
            Our Expert Trainers
          </h1>
          <p className="text-gym-gray max-w-2xl mx-auto text-lg">
            Meet our team of certified fitness professionals dedicated to helping you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gym-blue">{trainer.name}</h3>
                    <p className="text-gym-orange font-medium">{trainer.specialty}</p>
                    <p className="text-sm text-gym-gray mt-1">{trainer.experience} experience</p>
                  </div>
                  <Badge className="bg-gym-blue text-white">Available</Badge>
                </div>
                
                <p className="text-gym-dark my-4">{trainer.bio}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gym-gray mb-2">Certifications:</h4>
                  <ul className="space-y-1">
                    {trainer.certifications.map((cert, index) => (
                      <li key={index} className="text-sm text-gym-dark flex items-center">
                        <span className="w-2 h-2 bg-gym-orange rounded-full mr-2"></span>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button className="w-full bg-gym-blue hover:bg-gym-blue/90">
                  Book a Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gym-blue mb-4">
            Become a Fitness First Trainer
          </h2>
          <p className="text-gym-gray max-w-2xl mx-auto mb-8">
            Are you a certified fitness professional looking for new opportunities? Join our team of experts!
          </p>
          <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
            <a href="/contact">Apply Now</a>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainersPage;
