
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

const AdminBookings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [date, setDate] = useState<Date>();
  
  const { toast } = useToast();

  // Mock booking data
  const allBookings = [
    {
      id: 1,
      member: "John Doe",
      email: "john.doe@example.com",
      type: "Personal Training",
      trainer: "Mike Rodriguez",
      date: "2023-10-25",
      time: "10:00 - 11:00",
      status: "completed"
    },
    {
      id: 2,
      member: "Sarah Smith",
      email: "sarah.smith@example.com",
      type: "Yoga Class",
      trainer: "Elena Chen",
      date: "2023-10-26",
      time: "15:00 - 16:00",
      status: "confirmed"
    },
    {
      id: 3,
      member: "Michael Brown",
      email: "michael.b@example.com",
      type: "HIIT Training",
      trainer: "James Wilson",
      date: "2023-10-27",
      time: "18:00 - 19:00",
      status: "confirmed"
    },
    {
      id: 4,
      member: "Emma Johnson",
      email: "emma.j@example.com",
      type: "Swimming Session",
      trainer: "Lisa Park",
      date: "2023-10-28",
      time: "08:00 - 09:00",
      status: "cancelled"
    },
    {
      id: 5,
      member: "Andrew Davis",
      email: "andrew.d@example.com",
      type: "Personal Training",
      trainer: "Mike Rodriguez",
      date: "2023-10-29",
      time: "14:00 - 15:00",
      status: "pending"
    }
  ];

  // Filter bookings based on tab, search, and status filter
  const filteredBookings = allBookings
    .filter(booking => {
      // Filter by tab
      if (activeTab !== "all" && booking.status !== activeTab) return false;
      
      // Filter by search query
      if (searchQuery && 
          !booking.member.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !booking.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !booking.type.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by status
      if (filterStatus && booking.status !== filterStatus) return false;
      
      return true;
    });

  const handleStatusChange = (id: number, newStatus: string) => {
    // In a real app, this would update the booking status in the database
    toast({
      title: "Booking Updated",
      description: `Booking #${id} status changed to ${newStatus}`,
    });
  };

  const handleAddBooking = () => {
    // This would open a modal or navigate to a form to add a new booking
    toast({
      title: "Add Booking",
      description: "This would open a form to create a new booking",
    });
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gym-blue">Bookings</h1>
          <Button
            onClick={handleAddBooking}
            className="bg-gym-blue hover:bg-gym-blue/90"
          >
            Add New Booking
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Booking Calendar</CardTitle>
            <CardDescription>View bookings by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="border rounded-lg p-4 md:w-1/3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={"w-full justify-start text-left font-normal"}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Bookings for {date ? format(date, "MMMM d, yyyy") : "selected date"}</h4>
                  {date ? (
                    <div className="space-y-2">
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="font-medium">10:00 AM - Yoga Class</p>
                        <p className="text-sm text-gray-500">5 attendees</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-md">
                        <p className="font-medium">2:00 PM - HIIT Training</p>
                        <p className="text-sm text-gray-500">8 attendees</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Select a date to view bookings</p>
                  )}
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-blue-700">Today's Bookings</h3>
                      <p className="text-3xl font-bold text-blue-700 mt-2">8</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-green-700">This Week</h3>
                      <p className="text-3xl font-bold text-green-700 mt-2">24</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-purple-700">This Month</h3>
                      <p className="text-3xl font-bold text-purple-700 mt-2">98</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Upcoming Sessions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-medium">Personal Training - James Wilson</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="h-3 w-3 mr-1" /> Michael Brown
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Today</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" /> 18:00 - 19:00
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-medium">Swimming Session - Lisa Park</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="h-3 w-3 mr-1" /> Emma Johnson
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Tomorrow</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" /> 08:00 - 09:00
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>
              Manage and track all bookings
            </CardDescription>

            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full mt-4">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="md:w-2/3">
                  <Input 
                    placeholder="Search by member, email, or class type..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="md:w-1/3">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value={activeTab} className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Member</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Type</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Date</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Time</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500">Status</th>
                        <th className="py-3 px-4 text-right font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <div className="font-medium">{booking.member}</div>
                                <div className="text-sm text-gray-500">{booking.email}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <div>{booking.type}</div>
                                <div className="text-sm text-gray-500">with {booking.trainer}</div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gym-orange" />
                                {booking.date}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gym-orange" />
                                {booking.time}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <StatusBadge status={booking.status} />
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Select 
                                defaultValue={booking.status} 
                                onValueChange={(value) => handleStatusChange(booking.id, value)}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue placeholder="Change status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirm</SelectItem>
                                  <SelectItem value="completed">Complete</SelectItem>
                                  <SelectItem value="cancelled">Cancel</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-gray-500">
                            No bookings found matching your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
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

export default AdminBookings;
