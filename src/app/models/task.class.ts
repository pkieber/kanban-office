export interface TaskClass {
  id?: string;
  title: string;
  description: string;
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
