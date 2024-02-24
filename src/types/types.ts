export type IRegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface IVerifyOTP {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
}

export type ILoginBodyType = {
  email: string;
  password: string;
};

export type IUserType = {
  success: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export type IProduct = {
  success: boolean;
  products: Array<{
    averageRating: number;
    _id: string;
    name: string;
    description: string;
    brand: string;
    price: number;
    quantity: number;
    stock: number;
    sizes: string;
    offerPrice?: number;
    images: Array<{
      url: string;
      public_id: string;
      _id: string;
    }>;
    reviews: Array<{
      user: string;
      rating: number;
      content: string;
      createdAt: Date;
      _id: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }>;
};

export type ProductsResponse = {
  success: boolean;
  products: IProduct[];
};

export type ISingleProduct = {
  success: boolean;
  product: {
    _id: string;
    name: string;
    description: string;
    brand: string;
    price: number;
    category: string;
    quantity: number;
    stock: number;
    sizes: string;
    averageRating: number;
    images: Array<{
      url: string;
      public_id: string;
      _id: string;
    }>;
    reviews: Array<{
      user: string;
      rating: number;
      content: string;
      createdAt: string;
      _id: string;
    }>;
    offerPrice?: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

export type ProductResponse = {
  success: boolean;
  product: ISingleProduct;
};

export type ICart = {
  success: boolean;
  items: Array<{
    _id: string;
    products: Array<{
      name: string;
      price: number;
      offerPrice?: number;
      images: Array<{
        url: string;
        public_id: string;
        _id: string;
      }>;
      quantity: number;
    }>;
    user: string;
    quantity: number;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
};
