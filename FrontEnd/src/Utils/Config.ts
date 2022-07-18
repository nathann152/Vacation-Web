class Config{
    public vacationUrl =""
    public registerUrl =""
    public loginUrl = ""
    public addVacationUrl =""
    public updateVacationUrl =""
    public updatePartialVacationUrl =""
    public deleteVacationUrl =""
    public vacationImageUrl = ""
    public followVacationUrl = ""
    public unFollowVacationUrl = ""
    public followedVacationByUserUrl=""
    public getAllFollowVacationUral=""

}


class DevelopmentConfig extends Config{
  public vacationUrl= "http://localhost:3030/api/vacations/";
  public vacationAdminUrl= "http://localhost:3030/api/vacations";
  public registerUrl ="http://localhost:3030/api/auth/register/";
  public loginUrl = "http://localhost:3030/api/auth/login/";
  public addVacationUrl ="http://localhost:3030/api/vacations-new/";
  public updateVacationUrl ="http://localhost:3030/api/vacations/vacations/:id([0-9]+)/";
  public updatePartialVacationUrl ="http://localhost:3030/api/vacations/vacations/:id([0-9]+)/";
  public vacationImageUrl = "http://localhost:3030/api/vacations/image/";
  public followVacationUrl = "http://localhost:3030/api/followVacation/";
  public getAllFollowVacationUral="http://localhost:3030/api/vacation-followers-count/";
}

class ProductionConfig extends Config{
    public vacationUrl= "http://localhost:3030/api/vacations/:userId";
    public registerUrl ="http://localhost:3030/api/auth/register";
    public loginUrl = "http://localhost:3030/api/auth/login/";
    public addVacationUrl ="http://localhost:3030/api/vacations/"
    public updateVacationUrl ="http://localhost:3030/api/vacations/vacations/:id([0-9]+)/"
    public updatePartialVacationUrl ="http://localhost:3030/api/vacations/vacations/:id([0-9]+)/"
    public vacationImageUrl = "http://localhost:3030/api/vacations/image/";
    public followVacationUrl = "http://localhost:3030/api/followVacation/:vacationId/:userId";
    public unFollowVacationUrl = "http://localhost:3030/api/followVacation/:vacationId/:userId";
    public followedVacationByUserUrl="http://localhost:3030/api/followVacation/:vacationId/:userId";
    public getAllFollowVacationUral="http://localhost:3030/api/vacation-followers-count/";
}


let config: Config

if(process.env.NODE_ENV ==="development"){
    config= new DevelopmentConfig()
}

if(process.env.NODE_ENV ==="production"){
    config= new ProductionConfig()
}

export default config;