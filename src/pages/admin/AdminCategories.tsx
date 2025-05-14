
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Pencil, Trash2, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

// Mock data
const initialCategories = [
  { id: 1, name: 'Weight Training', description: 'Strength and muscle building exercises', itemCount: 12 },
  { id: 2, name: 'Cardio', description: 'Cardiovascular exercises for heart health', itemCount: 8 },
  { id: 3, name: 'Yoga & Flexibility', description: 'Improve flexibility and mindfulness', itemCount: 10 },
  { id: 4, name: 'Classes', description: 'Group fitness classes', itemCount: 15 },
  { id: 5, name: 'Personal Training', description: 'One-on-one training sessions', itemCount: 5 },
];

const AdminCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<typeof initialCategories[0] | null>(null);
  
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }
    
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    const categoryToAdd = {
      id: newId,
      name: newCategory.name,
      description: newCategory.description,
      itemCount: 0
    };
    
    setCategories([...categories, categoryToAdd]);
    setNewCategory({ name: '', description: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };
  
  const handleEditCategory = () => {
    if (!currentCategory || !currentCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }
    
    setCategories(categories.map(category => 
      category.id === currentCategory.id ? currentCategory : category
    ));
    setIsEditDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Category updated successfully",
    });
  };
  
  const handleDeleteCategory = () => {
    if (!currentCategory) return;
    
    setCategories(categories.filter(category => category.id !== currentCategory.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gym-blue">Categories</h1>
          
          <Button 
            className="bg-gym-blue hover:bg-gym-blue/90"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <PlusCircle size={16} className="mr-2" />
            Add New Category
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Categories</CardTitle>
            <CardDescription>Create, edit, and manage categories for gym packages and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative max-w-md w-full">
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Filter size={16} className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-[1fr_1fr_auto] sm:grid-cols-[1fr_2fr_auto_auto] gap-4 p-4 font-medium bg-gray-50 text-gray-500">
                <div>Name</div>
                <div className="hidden sm:block">Description</div>
                <div className="text-right sm:text-left">Items</div>
                <div className="text-right">Actions</div>
              </div>
              
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <div 
                    key={category.id} 
                    className="grid grid-cols-[1fr_1fr_auto] sm:grid-cols-[1fr_2fr_auto_auto] gap-4 p-4 border-t items-center"
                  >
                    <div className="font-medium text-gym-blue">{category.name}</div>
                    <div className="hidden sm:block text-gray-600 truncate">{category.description}</div>
                    <div className="text-right sm:text-left">{category.itemCount}</div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => {
                          setCurrentCategory(category);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil size={16} />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setCurrentCategory(category);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center border-t text-gray-500">
                  No categories found. 
                  {searchTerm && " Try a different search term or "}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    create a new category
                  </Button>.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new category for organizing gym packages and services
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="e.g. Strength Training"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                placeholder="Brief description of the category"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory} className="bg-gym-blue hover:bg-gym-blue/90">
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Category Name</Label>
              <Input
                id="edit-name"
                value={currentCategory?.name || ''}
                onChange={(e) => currentCategory && setCurrentCategory({ ...currentCategory, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={currentCategory?.description || ''}
                onChange={(e) => currentCategory && setCurrentCategory({ ...currentCategory, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory} className="bg-gym-blue hover:bg-gym-blue/90">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Category Confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentCategory && (
            <p className="py-2">
              <strong>Category:</strong> {currentCategory.name}
            </p>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminCategories;
