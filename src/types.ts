export interface ServiceItem {
  id: string;
  title: string;
  category: 'design' | 'development' | 'marketing';
  description: string;
  startingPrice: number;
  currency: string;
  iconName: string;
  highlights: string[];
  deliverables: string[];
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  serviceCategory: 'design' | 'development' | 'marketing';
  image: string;
  resultMetric: string;
  tags: string[];
  client: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
  projectType: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  budget?: string;
  packageTier: string;
  message: string;
}

export interface SupabaseBookingRecord {
  id?: string;
  created_at?: string;
  full_name: string;
  phone: string;
  email: string;
  service: string;
  budget?: string;
  package_tier: string;
  message: string;
  status?: string;
  source?: 'supabase' | 'local_backup';
}
