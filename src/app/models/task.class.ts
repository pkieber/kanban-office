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


/*
export class TaskClass {
  id!: string;
  title!: string;
  description!: string;


  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.title = obj ? obj.title : '';
    this.description = obj ? obj.description : '';
  }


  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
    }
  }
}
*/
