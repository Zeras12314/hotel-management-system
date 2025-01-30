export interface FieldConfig {
    label: string;
    name: string;
    type: string;
    options?: string[];
  }

  export const roomFormConfig: FieldConfig[] = [
    { label: 'Room Number', name: 'roomNumber', type: 'text' },
    { label: 'Category', name: 'category', type: 'text' },
    { label: 'Capacity', name: 'capacity', type: 'number' },
    { label: 'Price', name: 'pricePerNight', type: 'number' },
    { label: 'Room Status', name: 'status', type: 'select', options: ['Available', 'Occupied'] }
  ];