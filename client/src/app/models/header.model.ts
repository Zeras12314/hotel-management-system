export interface Room {
    _id: string;
    capacity: number;
    category: string;
    pricePerNight: number;
    roomNumber: string;
    status: string;
  }

  export interface Guest {
    _id: string;
    firstName: string;
    lastName: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
  }

  export interface TableData {
    headers: string[];
    rows: any[]; // Using `any[]` to allow flexible data structures
  }
  
  