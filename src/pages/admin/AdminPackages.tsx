
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPackages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Basic Monthly",
      price: 39.99,
      type: "Monthly",
      description: "Perfect for beginners",
      features: [
        "Access to gym equipment during off-peak hours",
        "Locker room access",
        "1 group class per month",
        "Fitness app access"
      ],
      isPopular: false,
      isActive: true
    },
    {
      id: 2,
      name: "Standard Quarterly",
      price: 159.99,
      type: "Quarterly",
      description: "Our most popular quarterly plan",
      features: [
        "24/7 access to gym equipment",
        "Locker room access",
        "15 group classes per quarter",
        "Fitness assessment",
        "Nutrition consultation"
      ],
      isPopular: true,
      isActive: true
    },
    {
      id: 3,
      name: "Premium Annual",
      price: 899.99,
      type: "Annual",
      description: "For serious fitness enthusiasts",
      features: [
        "24/7 access to gym equipment and facilities",
        "Unlimited group classes",
        "24 personal training sessions",
        "Nutrition consultation and meal planning"
      ],
      isPopular: false,
      isActive: true
    }
  ]);
  
  const { toast } = useToast();

  const handleToggleStatus = (id: number) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, isActive: !pkg.isActive } : pkg
    ));
    
    toast({
      title: "Status updated",
      description: "Package status has been updated successfully",
    });
  };

  const handleDelete = (id: number) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
    toast({
      title: "Package deleted",
      description: "Package has been deleted successfully",
    });
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gym-blue">Packages</h1>
          <Button 
            asChild
            className="bg-gym-blue hover:bg-gym-blue/90"
          >
            <Link to="/admin/add-package">
              <Plus className="mr-2 h-4 w-4" /> Add New Package
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Packages</CardTitle>
            <CardDescription>
              View and manage all membership packages offered by the gym
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Name</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Type</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Price</th>
                    <th className="py-3 px-4 text-center font-medium text-gray-500">Popular</th>
                    <th className="py-3 px-4 text-center font-medium text-gray-500">Status</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => (
                    <tr key={pkg.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{pkg.name}</td>
                      <td className="py-3 px-4">{pkg.type}</td>
                      <td className="py-3 px-4">${pkg.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">
                        {pkg.isPopular ? (
                          <Badge className="bg-gym-orange">Popular</Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge 
                          className={pkg.isActive ? "bg-green-500" : "bg-gray-400"}
                        >
                          {pkg.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleToggleStatus(pkg.id)}
                        >
                          {pkg.isActive ? "Deactivate" : "Activate"}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="mr-2" 
                          asChild
                        >
                          <Link to={`/admin/edit-package/${pkg.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="text-red-500" 
                          onClick={() => handleDelete(pkg.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Package Summary</CardTitle>
            <CardDescription>
              Overview of available packages by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "Monthly", count: packages.filter(p => p.type === "Monthly").length },
                { name: "Quarterly", count: packages.filter(p => p.type === "Quarterly").length },
                { name: "Half-Yearly", count: packages.filter(p => p.type === "Half Yearly").length },
                { name: "Annual", count: packages.filter(p => p.type === "Annual").length },
                { name: "Personal", count: packages.filter(p => p.type === "Personal Training").length },
              ].map((type) => (
                <Card key={type.name} className="bg-gray-50">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium text-gym-blue">{type.name}</h3>
                    <p className="text-3xl font-bold text-gym-orange mt-2">{type.count}</p>
                    <p className="text-sm text-gray-500 mt-1">packages</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminPackages;
