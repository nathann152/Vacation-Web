class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public fromDate: string;
    public untilDate: string;
    public price: number;
    public imageName : string;
    public image: FileList;
    public followersCount: number;
    public isFollowing: number
}
export default VacationModel