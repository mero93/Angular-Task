export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
}

export interface UserFull extends Omit<User, 'companyName' | 'lastName'> {
    company: Company
}

interface Company {
    name: string;
}
