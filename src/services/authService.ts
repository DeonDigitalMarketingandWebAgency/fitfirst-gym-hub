
// Mock user database
const users = [
  {
    id: 1,
    fullName: "Demo User",
    email: "demo@example.com",
    phone: "555-123-4567",
    password: "password", // In a real app, this would be hashed
    height: 175,
    weight: 70,
    age: 30,
    gender: "male",
    desiredPackage: "monthly-premium",
    fitnessGoals: "general-fitness",
    registrationDate: "2023-05-10",
    profilePicture: "" // empty string for demo user
  }
];

// Type definitions
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
  desiredPackage?: string;
  fitnessGoals?: string;
  registrationDate: string;
  profilePicture?: string;
}

export interface UserRegistration {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
  desiredPackage?: string;
  fitnessGoals?: string;
  profilePicture?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Store the current user in localStorage
const storeUser = (user: User) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

// Get the current user from localStorage
export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Register a new user
export const register = (userData: UserRegistration): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user already exists
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        reject(new Error("User with this email already exists."));
        return;
      }

      // Format current date as YYYY-MM-DD
      const today = new Date();
      const registrationDate = today.toISOString().split('T')[0];

      // Create new user
      const newUser = {
        id: users.length + 1,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password, // In a real app, this would be hashed
        height: userData.height || 0,
        weight: userData.weight || 0,
        age: userData.age || 0,
        gender: userData.gender || '',
        desiredPackage: userData.desiredPackage || '',
        fitnessGoals: userData.fitnessGoals || '',
        registrationDate,
        profilePicture: userData.profilePicture || ''
      };
      
      // Add to "database"
      users.push(newUser);
      
      // Return user without password
      const { password, ...userWithoutPassword } = newUser;
      storeUser(userWithoutPassword);
      
      resolve(userWithoutPassword);
    }, 1000);
  });
};

// Get all registered users (for admin dashboard)
export const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return users without passwords
      const usersWithoutPasswords = users.map(user => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      resolve(usersWithoutPasswords);
    }, 500);
  });
};

// Login a user
export const login = (credentials: LoginCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        // Return user without password
        const { password, ...userWithoutPassword } = user;
        storeUser(userWithoutPassword);
        resolve(userWithoutPassword);
      } else {
        reject(new Error("Invalid email or password."));
      }
    }, 1000);
  });
};

// Logout the user
export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('currentUser');
      resolve();
    }, 500);
  });
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
