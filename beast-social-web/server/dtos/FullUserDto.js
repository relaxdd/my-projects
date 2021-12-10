class FullUserDto {
  username;
  email;
  avatar;
  firstName;
  lastName;
  gender;
  phone;
  dateBirth;
  city;

  constructor(modelUser, modelInfo) {
    this.username = modelUser.username;
    this.email = modelUser.email;
    this.avatar = modelInfo.avatar;
    this.firstName = modelInfo.firstName;
    this.lastName = modelInfo.lastName;
    this.gender = modelInfo.gender;
    this.phone = modelInfo.phone;
    this.dateBirth = modelInfo.dateBirth;
    this.city = modelInfo.city;
  }
}

export default FullUserDto;
