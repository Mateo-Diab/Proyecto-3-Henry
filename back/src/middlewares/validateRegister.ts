import { NextFunction, Response, Request } from "express";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {

    const properties: string[] = ["name", "email", "birthdate", "nDni", "username", "password"]

    const propertiesFilter = properties.filter(prop => !req.body[prop])

    if(propertiesFilter.length>0){
        res
        .status(400)
        .json({
            message: `Missing information to register: ${propertiesFilter.join(", ")}`
        })
    } else next()
}