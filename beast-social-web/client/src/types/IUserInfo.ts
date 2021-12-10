export default interface IUserInfo {
  _id: string;
  userId: string;
  avatar: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  phone: string | null;
  dateBirth: string | null;
  city: string | null;
  __v: number;
}
