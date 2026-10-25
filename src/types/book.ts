export interface BookCoverArt {
  bgGradient: string;
  accentColor: string;
  textColor: string;
  spineColor: string;
  motif: 'ornate' | 'minimalist' | 'classic' | 'botanical' | 'vintage' | 'poetic';
  subtitle?: string;
  borderStyle?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  longDescription: string;
  priceCentavos: number; // Stored in Philippine centavos (e.g., 49500 = ₱495.00)
  publicationYear: number;
  pages: number;
  publisher: string;
  isbn: string;
  stock: number; // modeled inventory
  rating: number; // demo rating
  reviewCount: number; // demo review count
  coverArt: BookCoverArt;
  coverImage?: string; // High-resolution photo if available
  featured?: boolean;
  isNewArrival?: boolean;
  isRecommended?: boolean;
  sampleExcerpt: string;
  tags: string[];
}

export interface CartItem {
  book: Book;
  quantity: number;
  addedAt: number;
}

export interface WishlistItem {
  bookId: string;
  addedAt: number;
}

export interface ShippingDetails {
  recipientName: string;
  email: string;
  phone: string;
  region: string;
  city: string;
  address: string;
  deliveryNotes?: string;
  method: 'standard' | 'express';
}

export interface OrderConfirmation {
  orderId: string;
  referenceCode: string;
  items: CartItem[];
  subtotalCentavos: number;
  shippingCentavos: number;
  discountCentavos: number;
  totalCentavos: number;
  promoCodeApplied?: string;
  shippingDetails: ShippingDetails;
  placedAt: string;
}

export type SortOption = 
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'title-asc'
  | 'title-desc'
  | 'year-desc';
