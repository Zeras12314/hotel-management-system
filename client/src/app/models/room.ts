export interface Room {
    id: number,
    capacity: number;
    category: string;
    pricePerNight: number;
    roomNumber: string;
    status: string;
    _id: string;
  }

  export interface TableData {
    headers: string[];
    rows: any[]; // Using `any[]` to allow flexible data structures
  }
  
  