export interface Posting {
    /*postID: string;
    userID: string;*/
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
    postOffered: Posting[];
    postAccepteed: Posting[];
}
