
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Calendar, Download, FileText, BarChart } from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from 'recharts';

// Mock data for reports
const membershipData = [
  { name: 'Jan', monthly: 24, quarterly: 12, annual: 5, personal: 8 },
  { name: 'Feb', monthly: 28, quarterly: 14, annual: 6, personal: 9 },
  { name: 'Mar', monthly: 32, quarterly: 16, annual: 7, personal: 11 },
  { name: 'Apr', monthly: 40, quarterly: 18, annual: 8, personal: 14 },
  { name: 'May', monthly: 35, quarterly: 15, annual: 7, personal: 12 },
  { name: 'Jun', monthly: 38, quarterly: 17, annual: 9, personal: 15 },
];

const revenueData = [
  { name: 'Jan', value: 12500 },
  { name: 'Feb', value: 14800 },
  { name: 'Mar', value: 16200 },
  { name: 'Apr', value: 19500 },
  { name: 'May', value: 17800 },
  { name: 'Jun', value: 18900 },
];

const memberAttendanceData = [
  { day: 'Mon', count: 145 },
  { day: 'Tue', count: 132 },
  { day: 'Wed', count: 164 },
  { day: 'Thu', count: 123 },
  { day: 'Fri', count: 187 },
  { day: 'Sat', count: 205 },
  { day: 'Sun', count: 126 },
];

const topMembersData = [
  { id: 1, name: 'John Smith', visits: 28, membershipType: 'Annual Premium' },
  { id: 2, name: 'Maria Garcia', visits: 24, membershipType: 'Annual Premium' },
  { id: 3, name: 'David Wilson', visits: 22, membershipType: 'Monthly Premium' },
  { id: 4, name: 'Sarah Johnson', visits: 21, membershipType: 'Personal Training' },
  { id: 5, name: 'Michael Brown', visits: 19, membershipType: 'Quarterly Standard' },
];

const AdminReports = () => {
  const [reportType, setReportType] = useState('memberships');
  const [timeRange, setTimeRange] = useState('6months');

  const renderReportContent = () => {
    switch (reportType) {
      case 'memberships':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Membership Distribution by Type</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={membershipData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="monthly" name="Monthly" fill="#0066cc" />
                    <Bar dataKey="quarterly" name="Quarterly" fill="#ff9933" />
                    <Bar dataKey="annual" name="Annual" fill="#33cc33" />
                    <Bar dataKey="personal" name="Personal Training" fill="#cc3399" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Monthly Memberships</TableHead>
                  <TableHead>Quarterly Memberships</TableHead>
                  <TableHead>Annual Memberships</TableHead>
                  <TableHead>Personal Training</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {membershipData.map((month) => (
                  <TableRow key={month.name}>
                    <TableCell className="font-medium">{month.name}</TableCell>
                    <TableCell>{month.monthly}</TableCell>
                    <TableCell>{month.quarterly}</TableCell>
                    <TableCell>{month.annual}</TableCell>
                    <TableCell>{month.personal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
        
      case 'revenue':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Revenue" stroke="#0066cc" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueData.map((month) => (
                  <TableRow key={month.name}>
                    <TableCell className="font-medium">{month.name}</TableCell>
                    <TableCell>${month.value.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">
                    ${revenueData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );
        
      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Weekly Attendance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={memberAttendanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Visits" fill="#0066cc" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Top 5 Members by Attendance</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member Name</TableHead>
                    <TableHead>Visits This Month</TableHead>
                    <TableHead>Membership Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topMembersData.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.visits}</TableCell>
                      <TableCell>{member.membershipType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );
        
      default:
        return <div>Select a report type</div>;
    }
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gym-blue">Generate Reports</h1>
          
          <Button className="bg-gym-blue hover:bg-gym-blue/90">
            <Download className="mr-2 h-4 w-4" />
            Export as PDF
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Report Generator</CardTitle>
            <CardDescription>
              View and export reports related to memberships, revenue, and attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="memberships">Membership Distribution</SelectItem>
                    <SelectItem value="revenue">Revenue Report</SelectItem>
                    <SelectItem value="attendance">Attendance Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="12months">Last 12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Membership Report
              </Button>
              <Button variant="outline" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Financial Report
              </Button>
              <Button variant="outline" className="flex items-center">
                <BarChart className="mr-2 h-4 w-4" />
                Usage Statistics
              </Button>
            </div>
            
            {renderReportContent()}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
