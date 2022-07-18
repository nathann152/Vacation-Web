import Joi from "joi"
import Role from "./role-model";

class UserModel{
    
    public userId: number;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public role: Role
    

  public constructor(user: UserModel){
      this.userId = user.userId
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.userName = user.userName
      this.password = user.password
      this.role = user.role
      

  }

  private static postValidationSchema = Joi.object({
    userId: Joi.forbidden(),
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    userName: Joi.string().required().min(3).max(30),
    password: Joi.string().required().min(4).max(50),
    role: Joi.optional()

})

public validatePost(): string {
    const result = UserModel.postValidationSchema.validate(this);
    return result.error?.message
}



}




export default UserModel