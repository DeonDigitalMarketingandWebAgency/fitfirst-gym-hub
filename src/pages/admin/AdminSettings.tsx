
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const [generalSettings, setGeneralSettings] = useState({
    gymName: 'FitnessFirst',
    tagline: 'Your Path to Fitness Excellence',
    description: 'FitnessFirst is a premium gym offering state-of-the-art equipment, expert trainers, and a variety of fitness programs for all levels.',
    email: 'info@fitnessfirst.com',
    phone: '(555) 123-4567',
    address: '123 Fitness Avenue, Gymville, GA 30000'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    newMemberAlert: true,
    bookingConfirmations: true
  });
  
  const [socialMediaSettings, setSocialMediaSettings] = useState({
    facebook: 'https://facebook.com/fitnessfirst',
    instagram: 'https://instagram.com/fitnessfirst',
    twitter: 'https://twitter.com/fitnessfirst',
    youtube: 'https://youtube.com/fitnessfirst'
  });

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "General settings have been updated successfully."
      });
      setSaving(false);
    }, 1000);
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Notification settings have been updated successfully."
      });
      setSaving(false);
    }, 1000);
  };
  
  const handleSaveSocialMedia = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Social media settings have been updated successfully."
      });
      setSaving(false);
    }, 1000);
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gym-blue">System Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <form onSubmit={handleSaveGeneral}>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Update your gym's basic information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gymName">Gym Name</Label>
                      <Input
                        id="gymName"
                        value={generalSettings.gymName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, gymName: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        value={generalSettings.tagline}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, tagline: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        rows={4}
                        value={generalSettings.description}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, description: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            className="pl-10"
                            value={generalSettings.email}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            id="phone"
                            className="pl-10"
                            value={generalSettings.phone}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
                        <Input
                          id="address"
                          className="pl-10"
                          value={generalSettings.address}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="bg-gym-blue hover:bg-gym-blue/90"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <form onSubmit={handleSaveNotifications}>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when notifications are sent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({ 
                          ...notificationSettings, 
                          emailNotifications: checked 
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="smsNotifications">SMS Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via text message</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({ 
                          ...notificationSettings, 
                          smsNotifications: checked 
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-gray-500">Receive promotional materials and offers</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) => setNotificationSettings({ 
                          ...notificationSettings, 
                          marketingEmails: checked 
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newMemberAlert">New Member Alerts</Label>
                        <p className="text-sm text-gray-500">Get notified when new members register</p>
                      </div>
                      <Switch
                        id="newMemberAlert"
                        checked={notificationSettings.newMemberAlert}
                        onCheckedChange={(checked) => setNotificationSettings({ 
                          ...notificationSettings, 
                          newMemberAlert: checked 
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="bookingConfirmations">Booking Confirmations</Label>
                        <p className="text-sm text-gray-500">Get notified about new bookings</p>
                      </div>
                      <Switch
                        id="bookingConfirmations"
                        checked={notificationSettings.bookingConfirmations}
                        onCheckedChange={(checked) => setNotificationSettings({ 
                          ...notificationSettings, 
                          bookingConfirmations: checked 
                        })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="bg-gym-blue hover:bg-gym-blue/90"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="social">
            <Card>
              <form onSubmit={handleSaveSocialMedia}>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>
                    Manage your gym's social media presence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe size={16} className="absolute left-3 top-3 text-gray-400" />
                        <Input
                          id="website"
                          placeholder="https://www.yourwebsite.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <div className="relative">
                        <Facebook size={16} className="absolute left-3 top-3 text-gray-400" />
                        <Input
                          id="facebook"
                          className="pl-10"
                          value={socialMediaSettings.facebook}
                          onChange={(e) => setSocialMediaSettings({ ...socialMediaSettings, facebook: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <div className="relative">
                        <Instagram size={16} className="absolute left-3 top-3 text-gray-400" />
                        <Input
                          id="instagram"
                          className="pl-10"
                          value={socialMediaSettings.instagram}
                          onChange={(e) => setSocialMediaSettings({ ...socialMediaSettings, instagram: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <div className="relative">
                        <Twitter size={16} className="absolute left-3 top-3 text-gray-400" />
                        <Input
                          id="twitter"
                          className="pl-10"
                          value={socialMediaSettings.twitter}
                          onChange={(e) => setSocialMediaSettings({ ...socialMediaSettings, twitter: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="bg-gym-blue hover:bg-gym-blue/90"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
