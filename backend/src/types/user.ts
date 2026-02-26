export interface Address {
  addr1: string;
  addr2: string;
  city: string;
  country: string;
  zip: number;
}

export interface User {
  id?: string;
  username: string;
  password?: string;
  seller: boolean;
  address: Address;
  created: Date;
}