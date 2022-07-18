import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    public id: number;
    public destination: string;
    public description: string;
    public fromDate: Date;
    public untilDate: Date;
    public price: number;
    public imageName : string;
    public image: UploadedFile

    public constructor(vacation: VacationModel) {
        this.id = vacation.id
        this.destination = vacation.destination
        this.description = vacation.description
        this.fromDate = vacation.fromDate
        this.untilDate = vacation.untilDate
        this.price = vacation.price
        this.imageName = vacation.imageName
        this.image = vacation.image
    }

    private static postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        destination: Joi.string().required().min(3).max(50),
        description: Joi.string().required().min(10).max(1000),
        fromDate: Joi.date().required(),
        untilDate: Joi.date().required(),
        price: Joi.number().required().min(0).max(1000000),
        imageName: Joi.string().optional().min(10).max(40),
        image: Joi.object().optional()

    })

    private static putValidationSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        destination: Joi.string().required().min(3).max(50),
        description: Joi.string().required().min(10).max(1000),
        fromDate: Joi.date().required(),
        untilDate: Joi.date().required(),
        price: Joi.number().required().min(0).max(1000000),
        imageName: Joi.string().optional().min(10).max(40),
        image: Joi.object().optional()

    })

    private static patchValidationSchema = Joi.object({
        id: Joi.number().required().integer().min(1),
        destination: Joi.string().optional().min(3).max(50),
        description: Joi.string().optional().min(10).max(1000),
        fromDate: Joi.date().optional(),
        untilDate: Joi.date().optional(),
        price: Joi.number().optional().min(0).max(1000000),
        imageName: Joi.string().optional().min(10).max(40),
        image: Joi.object().optional()

    })
    public validatePost(): string {
        const result = VacationModel.postValidationSchema.validate(this);
        return result.error?.message
    }
    public validatePut(): string {
        const result = VacationModel.putValidationSchema.validate(this);
        return result.error?.message
    }

    public validatePatch(): string {
        const result = VacationModel.patchValidationSchema.validate(this);
        return result.error?.message
    }

}

export default VacationModel;