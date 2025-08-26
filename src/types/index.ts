export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  preferences?: string[];
  profileComplete: boolean;
}

export interface Maid {
  id: string;
  name: string;
  email: string;
  photo: string;
  experience: number;
  monthlyPrice: number;
  skillset: string[];
  locality: string;
  languages: string[];
  rating: number;
}

export interface Booking {
  id: string;
  maidId: string;
  userId: string;
  duration: number;
  dailyHours: number;
  timeSlot: string;
  startDate: string;
  totalAmount: number;
  status: 'active' | 'cancelled' | 'completed';
  advancePaid: boolean;
}

export interface Notification {
  id: string;
  message: string;
  type: 'arrival' | 'hygiene' | 'review';
  timestamp: string;
  read: boolean;
}