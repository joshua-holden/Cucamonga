export interface Posting {
    title: string;
    address: string;
    size: string;
    price: number;
    amenities: string[];
    description: string;
}

export interface Account {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    googleData?: any;
}
