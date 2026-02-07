export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  last_active: Date;
  is_active?: boolean;
}
