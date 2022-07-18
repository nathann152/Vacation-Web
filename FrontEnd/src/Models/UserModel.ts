import RoleModel from "./RoleModel";

export class UserModel{
    public userId: number;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public role: RoleModel;

}
export default UserModel