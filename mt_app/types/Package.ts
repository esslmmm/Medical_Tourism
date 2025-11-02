import { tags } from "@prisma/client";

export interface Packages {
    package_name: string;
    package_type: string;
    detail: string;
    hospitals: Hospital;
    trips: Trip;
    package_image: PackageImage[];
    description: PackageDescription[];
}
  
  export interface Hospital {
    hospital_id: string;         // UUID
    name: string;
    hospital_code: string;
    location: string;
    city: string;
    description: string;
    contact_info: string;
    rating: number;              // e.g. 4.5
    image: string;               // image path or URL
    logo: string;                // logo path or URL
    Thai: boolean;
    Arabic: boolean;
    Myanmar: boolean;
    English: boolean;
    create_at: string;           // ISO timestamp (e.g. "2025-10-30T18:44:36.475Z")
  }
  
  export interface Trip {
    tour_id: number;
    city: string;
    description: string;
    languages: Language[];
    images: any[];               // empty array in dataset, so unknown type (possibly string[])
    Trip_Routes: TripRouteWrapper[];
  }
  
  export interface Language {
    language_id: number;
    name: string;
    flag: string;                // ISO country code (e.g. "GB", "TH")
    trip_id: number;
  }

  export interface TripRouteWrapper {
    routes: Route;
  }

  export interface Route {
  route_id: number;
  description: string;
  duration: number;
  title: string;
  image: string;
  adult_price: number;
  child_price: number;
  guide_price: number;
  car_service_price: number;
  attractions: Attraction[];
  tags: Tag[];
}

export interface Tag {
  tag_id: number;
  tag: string;
}

export interface Attraction {
  places: Place;
}

export interface Place {
  name: string;
  image: string;
  description: string;
  location: Location | null;  // ❌ Was: string | null
  place_image: PlaceImage[];  // ❌ Was: any[]
  includes: Include[];        // ❌ Was: any[]
  highlights: Highlight[];    // ❌ Was: any[]
  important_info: ImportantInfo | null;
}

// ✅ New interfaces needed:
export interface Location {
  location_id: number;
  text: string;
  url: string;
  place_id: string;
}

export interface PlaceImage {
  image_id: number;
  place_id: string;
  url: string;
}

export interface Include {
  id: number;
  place_id: string;
  text: string;
}

export interface Highlight {
  id: number;
  place_id: string;
  text: string;
}

export interface ImportantInfo {
  info_id: number;
  place_id: string;
  not_allowed: InfoItem[];
  recommend_to_bring: InfoItem[];
  know_before_you_go: InfoItem[];
}

export interface InfoItem {
  id: number;
  info_id: number;
  text: string;
}

  export interface PackageImage {
    image_id: number;
    package_id: string;          // UUID
    url: string;
    alt: string | null;
  }

  export interface PackageDescription {
    description_id: number;
    package_id: string;          // UUID
    text: string;
  }