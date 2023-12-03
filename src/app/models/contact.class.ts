export class ContactClass {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  team!: string;
  color!: string;


  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.phone = obj ? obj.phone : '';
    this.team = obj ? obj.team : '';
    this.color = obj ? obj.color : '';
  }


  public toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      team: this.team,
      color: this.color,
    }
  }
}
