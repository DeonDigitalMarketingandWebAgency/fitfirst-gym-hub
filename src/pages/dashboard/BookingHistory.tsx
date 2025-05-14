
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User as UserIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Mock data for bookings
  const upcomingBookings = [
    {
      id: 1,
      type: "Personal Training",
      trainer: "Mike Rodriguez",
      date: "Oct 20, 2023",
      time: "18:00 - 19:00",
      location: "Main Gym - Training Room 2",
      status: "confirmed"
    },
    {
      id: 2,
      type: "Yoga Class",
      trainer: "Elena Chen",
      date: "Oct 24, 2023",
      time: "10:00 - 11:00",
      location: "Yoga Studio",
      status: "confirmed"
    }
  ];
  
  const pastBookings = [
    {
      id: 3,
      type: "HIIT Training",
      trainer: "John Smith",
      date: "Oct 10, 2023",
      time: "17:00 - 18:00",
      location: "Cardio Zone",
      status: "completed"
    },
    {
      id: 4,
      type: "Personal Training",
      trainer: "Mike Rodriguez",
      date: "Oct 5, 2023",
      time: "18:00 - 19:00",
      location: "Main Gym - Training Room 1",
      status: "completed"
    },
    {
      id: 5,
      type: "Swimming Session",
      trainer: "Sarah Johnson",
      date: "Sep 28, 2023",
      time: "14:00 - 15:00",
      location: "Swimming Pool",
      status: "completed"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gym-blue">Booking History</h1>
        
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingBookings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {upcomingBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} type="upcoming" />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
                  <p className="text-gray-500 mb-2">You don't have any upcoming bookings</p>
                  <Button className="bg-gym-blue hover:bg-gym-blue/90 mt-2">Book a Class</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastBookings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {pastBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} type="past" />
                ))}
              </div>
            ) : (
              <Card className="bg-gray-50">
                <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
                  <p className="text-gray-500">You don't have any past bookings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface BookingProps {
  booking: {
    id: number;
    type: string;
    trainer: string;
    date: string;
    time: string;
    location: string;
    status: string;
  };
  type: 'upcoming' | 'past';
}

const BookingCard = ({ booking, type }: BookingProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold text-gym-blue">{booking.type}</CardTitle>
          <StatusBadge status={booking.status} />
        </div>
      </CardHeader>
      <CardContent className="pt-5 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center text-gray-600 min-w-[180px]">
            <Calendar size={18} className="mr-2 text-gym-orange" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2 text-gym-orange" />
            <span>{booking.time}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center text-gray-600 min-w-[180px]">
            <UserIcon size={18} className="mr-2 text-gym-orange" />
            <span>{booking.trainer}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2 text-gym-orange" />
            <span>{booking.location}</span>
          </div>
        </div>
        
        {type === 'upcoming' && (
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline">Reschedule</Button>
            <Button variant="destructive">Cancel</Button>
          </div>
        )}
        
        {type === 'past' && (
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline">Book Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  let badgeStyle = "";
  
  switch (status.toLowerCase()) {
    case 'confirmed':
      badgeStyle = "bg-green-100 text-green-800";
      break;
    case 'pending':
      badgeStyle = "bg-yellow-100 text-yellow-800";
      break;
    case 'cancelled':
      badgeStyle = "bg-red-100 text-red-800";
      break;
    case 'completed':
      badgeStyle = "bg-blue-100 text-blue-800";
      break;
    default:
      badgeStyle = "bg-gray-100 text-gray-800";
  }
  
  return (
    <Badge className={`font-medium ${badgeStyle}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default BookingHistory;
