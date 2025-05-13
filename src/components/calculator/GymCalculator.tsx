
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GymCalculator = () => {
  // BMI Calculator
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  
  // Body Fat Calculator
  const [gender, setGender] = useState<string>('male');
  const [waist, setWaist] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [bodyFatResult, setBodyFatResult] = useState<number | null>(null);
  
  // Calorie Calculator
  const [age, setAge] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [calorieResult, setCalorieResult] = useState<{
    maintain: number;
    mildLoss: number;
    weightLoss: number;
    extremeLoss: number;
    mildGain: number;
    weightGain: number;
  } | null>(null);
  
  const calculateBMI = () => {
    if (!weight || !height) return;
    
    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100; // Convert cm to m
    
    if (weightKg > 0 && heightM > 0) {
      const bmi = weightKg / (heightM * heightM);
      setBmiResult(parseFloat(bmi.toFixed(2)));
      
      // Determine BMI category
      if (bmi < 18.5) setBmiCategory('Underweight');
      else if (bmi >= 18.5 && bmi < 25) setBmiCategory('Normal weight');
      else if (bmi >= 25 && bmi < 30) setBmiCategory('Overweight');
      else setBmiCategory('Obesity');
    }
  };
  
  const calculateBodyFat = () => {
    if (!weight || !height || !waist || !neck) return;
    
    const heightCm = parseFloat(height);
    const waistCm = parseFloat(waist);
    const neckCm = parseFloat(neck);
    
    let bodyFat: number;
    
    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      if (!hip) return;
      const hipCm = parseFloat(hip);
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }
    
    setBodyFatResult(parseFloat(bodyFat.toFixed(2)));
  };
  
  const calculateCalories = () => {
    if (!weight || !height || !age) return;
    
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseFloat(age);
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }
    
    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    
    // @ts-ignore - We know these keys exist
    const tdee = bmr * activityMultipliers[activityLevel];
    
    setCalorieResult({
      maintain: Math.round(tdee),
      mildLoss: Math.round(tdee - 250),
      weightLoss: Math.round(tdee - 500),
      extremeLoss: Math.round(tdee - 1000),
      mildGain: Math.round(tdee + 250),
      weightGain: Math.round(tdee + 500)
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-gym-blue">Fitness Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bmi" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="bmi">BMI</TabsTrigger>
            <TabsTrigger value="bodyfat">Body Fat</TabsTrigger>
            <TabsTrigger value="calories">Calories</TabsTrigger>
          </TabsList>
          
          {/* Common inputs for all calculators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g. 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g. 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="bmi" className="space-y-4">
            <Button 
              onClick={calculateBMI} 
              className="w-full bg-gym-orange hover:bg-gym-orange/90"
              disabled={!weight || !height}
            >
              Calculate BMI
            </Button>
            
            {bmiResult !== null && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold text-center mb-2">Your BMI Result</h3>
                <div className="text-center text-2xl font-bold text-gym-blue">{bmiResult}</div>
                <div className="text-center text-gym-gray">{bmiCategory}</div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bodyfat" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="neck">Neck (cm)</Label>
                <Input
                  id="neck"
                  type="number"
                  placeholder="e.g. 35"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="waist">Waist (cm)</Label>
                <Input
                  id="waist"
                  type="number"
                  placeholder="e.g. 80"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                />
              </div>
              {gender === 'female' && (
                <div className="space-y-2">
                  <Label htmlFor="hip">Hip (cm)</Label>
                  <Input
                    id="hip"
                    type="number"
                    placeholder="e.g. 90"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                  />
                </div>
              )}
            </div>
            
            <Button 
              onClick={calculateBodyFat} 
              className="w-full bg-gym-orange hover:bg-gym-orange/90"
              disabled={!weight || !height || !waist || !neck || (gender === 'female' && !hip)}
            >
              Calculate Body Fat
            </Button>
            
            {bodyFatResult !== null && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold text-center mb-2">Your Body Fat Percentage</h3>
                <div className="text-center text-2xl font-bold text-gym-blue">{bodyFatResult}%</div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calories" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g. 30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender-cal">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender-cal">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="veryActive">Very Active (hard exercise daily)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={calculateCalories} 
              className="w-full bg-gym-orange hover:bg-gym-orange/90"
              disabled={!weight || !height || !age}
            >
              Calculate Calories
            </Button>
            
            {calorieResult && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold text-center mb-2">Your Daily Calories</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border-r border-gray-200 pr-2">
                    <div className="text-sm text-gray-500">Maintain weight:</div>
                    <div className="font-bold">{calorieResult.maintain} cal</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Mild weight loss:</div>
                    <div className="font-bold">{calorieResult.mildLoss} cal</div>
                  </div>
                  <div className="border-r border-gray-200 pr-2">
                    <div className="text-sm text-gray-500">Weight loss:</div>
                    <div className="font-bold">{calorieResult.weightLoss} cal</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Extreme weight loss:</div>
                    <div className="font-bold">{calorieResult.extremeLoss} cal</div>
                  </div>
                  <div className="border-r border-gray-200 pr-2">
                    <div className="text-sm text-gray-500">Mild weight gain:</div>
                    <div className="font-bold">{calorieResult.mildGain} cal</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Weight gain:</div>
                    <div className="font-bold">{calorieResult.weightGain} cal</div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GymCalculator;
