
// Mock user database
const users = [
  {
    id: 1,
    fullName: "Demo User",
    email: "demo@example.com",
    phone: "555-123-4567",
    password: "password" // In a real app, this would be hashed
  }
];

// Type definitions
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface UserRegistration {
  fullName: string;
  email: string;
  phone: string;
  password: string;
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

      // Create new user
      const newUser: User & { password: string } = {
        id: users.length + 1,
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password // In a real app, this would be hashed
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
