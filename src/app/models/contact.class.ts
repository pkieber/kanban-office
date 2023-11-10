export class Contact {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  division!: string;
  title!: string;
  color: string;


  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.division = obj ? obj.division : '';
    this.title = obj ? obj.title : '';
    this.color = obj ? obj.color : '';
  }


  public toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      division: this.division,
      title: this.title,
      color: this.color,
    }
  }
}
