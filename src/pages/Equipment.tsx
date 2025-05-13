
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const equipmentCategories = {
  cardio: [
    {
      id: 1,
      name: "Treadmills",
      brand: "Life Fitness",
      quantity: 12,
      description: "Commercial-grade treadmills with incline capabilities up to 15% and speeds up to 12 mph. Features include heart rate monitoring and preset workout programs.",
      features: ["15% Incline", "12 mph Max Speed", "Heart Rate Monitor", "20+ Programs"],
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
    {
      id: 2,
      name: "Elliptical Trainers",
      brand: "Precor",
      quantity: 8,
      description: "Low-impact elliptical machines with adjustable resistance levels and incline settings. Perfect for a total body workout without stressing joints.",
      features: ["20 Resistance Levels", "Adjustable Stride Length", "Moving Handles", "Quiet Operation"],
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
    {
      id: 3,
      name: "Stationary Bikes",
      brand: "Keiser",
      quantity: 15,
      description: "Indoor cycling bikes with magnetic resistance for smooth, quiet operation. Adjustable seats and handlebars accommodate users of all sizes.",
      features: ["Magnetic Resistance", "Performance Monitor", "Adjustable Seat & Handlebars", "Bottle Holder"],
      image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: true,
    },
    {
      id: 4,
      name: "Rowing Machines",
      brand: "Concept2",
      quantity: 6,
      description: "Air-resistance rowing machines that provide a full-body workout. Performance monitors track distance, pace, calories, and more.",
      features: ["Air Resistance", "PM5 Performance Monitor", "Ergonomic Handle", "Adjustable Footrests"],
      image: "https://images.unsplash.com/photo-1520531158340-44015069e78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
  ],
  strength: [
    {
      id: 5,
      name: "Free Weights",
      brand: "Rogue Fitness",
      quantity: "Wide Range",
      description: "Comprehensive collection of dumbbells (5-100 lbs), kettlebells, and barbells with Olympic weight plates for versatile strength training.",
      features: ["Rubber-Coated Dumbbells", "Competition Kettlebells", "Olympic Barbells", "Bumper Plates"],
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
    {
      id: 6,
      name: "Power Racks",
      brand: "Hammer Strength",
      quantity: 4,
      description: "Heavy-duty power racks for squats, bench press, and other barbell exercises. Features include adjustable safety bars and pull-up bars.",
      features: ["1000lb Weight Capacity", "Multiple J-Hook Positions", "Safety Bars", "Pull-up Bar"],
      image: "https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
    {
      id: 7,
      name: "Smith Machines",
      brand: "Matrix",
      quantity: 2,
      description: "Guided barbell machines that allow for safe, controlled lifts. Ideal for beginners and those training without a spotter.",
      features: ["Counter-Balanced System", "Linear Bearings", "Safety Stops", "Multiple Rack Positions"],
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: true,
    },
  ],
  machines: [
    {
      id: 8,
      name: "Leg Press",
      brand: "Cybex",
      quantity: 3,
      description: "45-degree leg press machines for targeting the quadriceps, hamstrings, and glutes. Weight stack allows for easy resistance adjustment.",
      features: ["1000lb Weight Capacity", "Adjustable Seat Back", "Large Foot Platform", "Safety Stops"],
      image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
    {
      id: 9,
      name: "Cable Machines",
      brand: "Life Fitness",
      quantity: 4,
      description: "Dual adjustable pulley systems that allow for a virtually unlimited range of exercises. Perfect for functional training and isolation movements.",
      features: ["Dual Weight Stacks", "Adjustable Pulleys", "Multiple Handle Attachments", "200lb per Stack"],
      image: "https://images.unsplash.com/photo-1597076545399-6d7239d17438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
    {
      id: 10,
      name: "Chest Press Machine",
      brand: "Nautilus",
      quantity: 2,
      description: "Machine-based alternative to bench press that targets the chest, shoulders, and triceps with guided motion for safety and proper form.",
      features: ["Converging Path of Motion", "Multiple Grip Positions", "Adjustable Seat", "Independent Arms"],
      image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
  ],
  functional: [
    {
      id: 11,
      name: "TRX Suspension Trainers",
      brand: "TRX",
      quantity: 10,
      description: "Body-weight resistance training system that develops strength, balance, flexibility, and core stability simultaneously.",
      features: ["Adjustable Straps", "Multiple Anchor Points", "Lightweight & Portable", "Supports 350lbs"],
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
    {
      id: 12,
      name: "Medicine Balls",
      brand: "Dynamax",
      quantity: "Full Set",
      description: "Weighted balls ranging from 4 to 30 pounds for dynamic, functional exercises that improve power, coordination, and core strength.",
      features: ["Non-Bounce Design", "Durable Covering", "Various Weights", "Easy-Grip Texture"],
      image: "https://images.unsplash.com/photo-1591940742878-13aba4b7a585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: false,
    },
    {
      id: 13,
      name: "Battle Ropes",
      brand: "Onnit",
      quantity: 3,
      description: "Heavy-duty ropes for high-intensity interval training that builds power, endurance, and cardiovascular fitness.",
      features: ["50ft Length", "1.5\" & 2\" Diameters", "Poly Dacron Material", "Anchor Included"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      new: true,
    },
  ]
};

const EquipmentPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gym-blue mb-4">
            State-of-the-Art Equipment
          </h1>
          <p className="text-gym-gray max-w-2xl mx-auto text-lg">
            Explore our wide range of premium fitness equipment designed to help you achieve your fitness goals.
          </p>
        </div>

        <Tabs defaultValue="cardio" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            <TabsTrigger value="cardio" className="text-center">Cardio Equipment</TabsTrigger>
            <TabsTrigger value="strength" className="text-center">Strength Equipment</TabsTrigger>
            <TabsTrigger value="machines" className="text-center">Weight Machines</TabsTrigger>
            <TabsTrigger value="functional" className="text-center">Functional Training</TabsTrigger>
          </TabsList>
          
          {Object.keys(equipmentCategories).map((category) => (
            <TabsContent key={category} value={category} className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {equipmentCategories[category as keyof typeof equipmentCategories].map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.new && (
                        <Badge className="absolute top-2 right-2 bg-gym-orange text-white">
                          New Addition
                        </Badge>
                      )}
                    </div>
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gym-blue">{item.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-gym-gray">Brand: <span className="font-medium">{item.brand}</span></p>
                          <p className="text-gym-gray">Quantity: <span className="font-medium">{item.quantity}</span></p>
                        </div>
                      </div>
                      
                      <p className="text-gym-dark mb-4">{item.description}</p>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-gym-gray mb-2">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {item.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gym-dark flex items-center">
                              <span className="w-2 h-2 bg-gym-orange rounded-full mr-2 flex-shrink-0"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gym-blue mb-2">
              Equipment Maintenance
            </h2>
            <p className="text-gym-gray">
              All our equipment is regularly serviced and maintained to ensure optimal performance and safety.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gym-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gym-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gym-blue mb-2">Daily Inspection</h3>
              <p className="text-gym-gray text-sm">Each piece of equipment is inspected daily by our staff to ensure proper functioning.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gym-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gym-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gym-blue mb-2">Weekly Maintenance</h3>
              <p className="text-gym-gray text-sm">Our team performs detailed maintenance checks every week to prevent issues.</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gym-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gym-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gym-blue mb-2">Professional Service</h3>
              <p className="text-gym-gray text-sm">Manufacturer-certified technicians perform quarterly servicing on all equipment.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EquipmentPage;
