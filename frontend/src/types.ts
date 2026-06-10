export type UrgencyLevel = 'emergency' | 'same-day' | 'standard';

export type PropertyType =
  | 'house'
  | 'flat'
  | 'rented_property'
  | 'landlord_property'
  | 'shop'
  | 'office'
  | 'restaurant'
  | 'other';

export type PaymentMethod = 'cash_after_repair' | 'online_card';

export interface Service {
  id: string;
  name: string;
  description: string;
  urgency: UrgencyLevel;
  estimatedPrice: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  shortDescription: string;
  isEmergency: boolean;
  services: Service[];
}

export interface BookingFormData {
  categoryId: string;
  serviceId: string;
  propertyType: PropertyType | '';
  isEmergency: boolean | null;
  preferredDate: string;
  preferredTime: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  postcode: string;
  notes: string;
  paymentMethod: PaymentMethod | '';
  cardholderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export type ViewState = 'home' | 'services' | 'booking' | 'about' | 'areas' | 'contact';
