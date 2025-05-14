
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Package, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminAddPackage = () => {
  const [packageName, setPackageName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [features, setFeatures] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      toast({
        title: "Package Created",
        description: `"${packageName}" package has been successfully created.`,
      });
      
      // Reset form
      setPackageName('');
      setDescription('');
      setPrice('');
      setDuration('');
      setFeatures('');
      setCategory('');
      setImageUrl('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gym-blue">Add New Package</h1>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Package Information</CardTitle>
              <CardDescription>Create a new membership package for your gym</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="package-name">Package Name</Label>
                  <Input 
                    id="package-name" 
                    placeholder="e.g. Premium Monthly" 
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="package-price">Price</Label>
                  <Input 
                    id="package-price" 
                    placeholder="e.g. 49.99" 
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="package-duration">Duration</Label>
                  <Select value={duration} onValueChange={setDuration} required>
                    <SelectTrigger id="package-duration">
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="half-yearly">Half Yearly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="personal-training">Personal Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="package-category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="package-category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="elite">Elite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="package-image">Image URL</Label>
                  <Input 
                    id="package-image" 
                    placeholder="Image URL" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="package-description">Description</Label>
                  <Textarea 
                    id="package-description" 
                    placeholder="Enter package description" 
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="package-features">Features (one per line)</Label>
                  <Textarea 
                    id="package-features" 
                    placeholder="Enter features (one per line)" 
                    rows={5}
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Each line will be displayed as a separate feature with a check mark.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" type="button">Cancel</Button>
              <Button type="submit" className="bg-gym-blue hover:bg-gym-blue/90" disabled={isSubmitting}>
                <Package className="mr-2 h-4 w-4" />
                {isSubmitting ? "Creating..." : "Create Package"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        {imageUrl && (
          <Card>
            <CardHeader>
              <CardTitle>Package Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3">
                  <div className="aspect-video rounded-md bg-gray-100 overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt="Package Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found')}
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">{packageName || "Package Name"}</h3>
                  <p className="text-2xl font-bold text-gym-orange mb-2">
                    ${price || "XX.XX"} <span className="text-sm text-gray-500">/ {duration || "period"}</span>
                  </p>
                  <p className="text-gray-600 mb-4">{description || "Package description will appear here."}</p>
                  <div className="space-y-2">
                    {features.split('\n').filter(Boolean).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-gym-orange" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {!features && (
                      <div className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-gym-orange" />
                        <span>Features will appear here.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminAddPackage;
