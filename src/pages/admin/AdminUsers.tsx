
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Filter, 
  MoreHorizontal, 
  UserPlus, 
  XCircle,
  Search,
  Mail,
  Phone
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

// Mock users data
const mockUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    phone: '(555) 123-4567',
    joinDate: '2023-09-15',
    status: 'active',
    package: 'Premium Annual'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    phone: '(555) 987-6543',
    joinDate: '2023-10-01',
    status: 'active',
    package: 'Basic Monthly'
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    email: 'robert.j@example.com', 
    phone: '(555) 456-7890',
    joinDate: '2023-08-22',
    status: 'inactive',
    package: 'None'
  },
  { 
    id: 4, 
    name: 'Lisa Anderson', 
    email: 'lisa.a@example.com', 
    phone: '(555) 789-0123',
    joinDate: '2023-09-30',
    status: 'active',
    package: 'Premium Quarterly'
  },
  { 
    id: 5, 
    name: 'Michael Wilson', 
    email: 'michael.w@example.com', 
    phone: '(555) 234-5678',
    joinDate: '2023-07-15',
    status: 'inactive',
    package: 'None'
  },
  { 
    id: 6, 
    name: 'Sarah Lee', 
    email: 'sarah.lee@example.com', 
    phone: '(555) 345-6789',
    joinDate: '2023-10-05',
    status: 'active',
    package: 'Personal Training Pack'
  }
];

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Apply filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
      
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        
        toast({
          title: `User ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
          description: `${user.name}'s account has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`
        });
        
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gym-blue">Manage Users</h1>
          
          <Button 
            className="bg-gym-blue hover:bg-gym-blue/90"
          >
            <UserPlus size={16} className="mr-2" />
            Add New User
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View, edit and manage all gym members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 items-center">
                <Filter size={16} className="text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-[1fr_1fr_auto] sm:grid-cols-[1fr_2fr_1fr_auto_auto] gap-4 p-4 font-medium bg-gray-50 text-gray-500">
                <div>Name</div>
                <div className="hidden sm:block">Contact Info</div>
                <div className="hidden sm:block">Package</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>
              
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div 
                    key={user.id} 
                    className="grid grid-cols-[1fr_1fr_auto] sm:grid-cols-[1fr_2fr_1fr_auto_auto] gap-4 p-4 border-t items-center"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gray-200 text-gym-blue">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gym-blue">{user.name}</p>
                        <p className="text-xs text-gray-500 sm:hidden">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="hidden sm:block space-y-1">
                      <div className="flex items-center text-xs text-gray-600">
                        <Mail size={12} className="mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Phone size={12} className="mr-1" />
                        {user.phone}
                      </div>
                    </div>
                    
                    <div className="hidden sm:block text-sm">
                      {user.package}
                    </div>
                    
                    <div>
                      <Badge className={user.status === 'active' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : 'bg-red-100 text-red-800 hover:bg-red-100'}>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal size={16} />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Add Package</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                            {user.status === 'active' ? (
                              <>
                                <XCircle size={14} className="mr-2 text-red-500" />
                                <span>Deactivate User</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle size={14} className="mr-2 text-green-500" />
                                <span>Activate User</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No users found matching your search criteria.
                </div>
              )}
            </div>
            
            {/* Pagination or Load More could be added here */}
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="text-xs">
                Load More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
