import Joi from "joi"

class CredentialsModel{
    public userName: string;
    public password: string;
 

  public constructor(credentials: CredentialsModel){
      this.userName = credentials.userName
      this.password = credentials.password
     
  }


  private static postValidationSchema = Joi.object({
    userName: Joi.string().required().min(3).max(30),
    password: Joi.string().required().min(4).max(50),
})

public validatePost(): string {
    const result = CredentialsModel.postValidationSchema.validate(this);
    return result.error?.message
}


}




export default CredentialsModel