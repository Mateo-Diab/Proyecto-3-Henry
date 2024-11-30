import {Request, Response, NextFunction} from "express";

export const validateRegisterAppointement = (req: Request, res: Response, next: NextFunction) => {
    const properties: string[] = ["date", "time", "description", "userId"]

    const propertiesFilter = properties.filter(prop => !req.body[prop])

    if(propertiesFilter.length>0){
        res
        .status(400)
        .json({
            message: `Missing information to create a new appointement: ${propertiesFilter.join(", ")}`
        })
    } else next()
}   