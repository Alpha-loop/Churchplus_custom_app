export interface EventSummary {
  id: string;

  title: string;

  mediaUrl?: string;

  date: string;
}

// modules/events/types/event.types.ts

export interface Event {
  id: string;

  name: string;

  summary: string | null;

  startDate: string | null;

  endDate: string | null;

  primaryImageUrl: string | null;

  venueDisplayName: string | null;

  createdAt: string;

  registrationCount: number;

  isRegistrationEnabled: boolean;

  registrationAmount: number | null;

  availableSpots: number | null;
}

// modules/events/types/event.types.ts

export interface EventItem {
  id: string;

  name: string;

  summary: string | null;

  startDate: string | null;

  endDate: string | null;

  primaryImageUrl: string | null;

  venueDisplayName: string | null;

  registrationCount: number;

  isRegistrationEnabled: boolean;

  registrationAmount: number | null;

  availableSpots: number | null;

  createdAt: string;

  eventTypeName: string | null;
}