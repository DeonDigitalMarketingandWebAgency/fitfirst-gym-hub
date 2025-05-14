
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const AdminPackageTypes = () => {
  const [packageTypes, setPackageTypes] = useState([
    { id: 1, name: 'Monthly', description: 'Pay month-to-month' },
    { id: 2, name: 'Quarterly', description: 'Pay for 3 months in advance' },
    { id: 3, name: 'Half Yearly', description: 'Pay for 6 months in advance' },
    { id: 4, name: 'Annual', description: 'Pay for 12 months in advance' },
    { id: 5, name: 'Personal Training', description: 'One-on-one sessions with a trainer' }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentType, setCurrentType] = useState<{ id?: number, name: string, description: string }>({ 
    name: '', 
    description: '' 
  });
  
  const { toast } = useToast();

  const handleOpenDialog = (isEdit = false, packageType = { id: 0, name: '', description: '' }) => {
    setIsEditMode(isEdit);
    setCurrentType(isEdit ? packageType : { name: '', description: '' });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!currentType.name || !currentType.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (isEditMode) {
      setPackageTypes(packageTypes.map(type => 
        type.id === currentType.id ? { ...currentType } : type
      ));
      toast({
        title: "Success",
        description: "Package type updated successfully",
      });
    } else {
      setPackageTypes([
        ...packageTypes, 
        { 
          id: Math.max(0, ...packageTypes.map(t => t.id)) + 1,
          ...currentType 
        }
      ]);
      toast({
        title: "Success",
        description: "Package type added successfully",
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setPackageTypes(packageTypes.filter(type => type.id !== id));
    toast({
      title: "Success",
      description: "Package type deleted successfully",
    });
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gym-blue">Package Types</h1>
          <Button 
            onClick={() => handleOpenDialog(false)} 
            className="bg-gym-blue hover:bg-gym-blue/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Package Type
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Package Types</CardTitle>
            <CardDescription>
              Create and manage the different types of packages offered in the gym
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Name</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500">Description</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packageTypes.map((type) => (
                    <tr key={type.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{type.name}</td>
                      <td className="py-3 px-4">{type.description}</td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="mr-2" 
                          onClick={() => handleOpenDialog(true, type)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="text-red-500" 
                          onClick={() => handleDelete(type.id)}
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
      </div>

      {/* Add/Edit Package Type Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit' : 'Add'} Package Type</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Update the' : 'Create a new'} package type for the gym
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={currentType.name} 
                onChange={(e) => setCurrentType({...currentType, name: e.target.value})}
                placeholder="e.g. Monthly, Quarterly, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                value={currentType.description} 
                onChange={(e) => setCurrentType({...currentType, description: e.target.value})}
                placeholder="Brief description of the package type"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminPackageTypes;
