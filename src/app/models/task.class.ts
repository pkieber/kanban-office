import { Timestamp } from 'firebase/firestore';

export interface TaskClass {
  id?: string;
  title: string;
  description: string;
  category?: string;
  assignments?: string;
  dueDate?: Timestamp; // Use Timestamp type for dueDate
  priority?: string;
  subtasks?: string;
  status?: string;
}
