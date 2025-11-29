export interface Update {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  university: string;
  isNew?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum University {
  JNTUH = 'JNTUH',
  JNTUK = 'JNTUK',
  OU = 'Osmania University',
  AU = 'Andhra University',
  General = 'General'
}

export enum Category {
  Results = 'Results',
  Notifications = 'Notifications',
  TimeTables = 'Time Tables',
  Syllabus = 'Syllabus'
}