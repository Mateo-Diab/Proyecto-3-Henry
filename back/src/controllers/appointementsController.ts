import { Request, Response } from "express";
import { AppointementRegisterDTO } from "../dtos/AppointementDTO";
import { cancelStatusAppointementService, getAppointementByIdService, getAppointementService, registerAppointmentService } from "../services/appointementServices";
import { PostgresError } from "../interfaces/ErrorInterface";
import { Appointement } from "../entities/Appointement.entity";

export const getAllAppointementsController: (req: Request, res:Response) => Promise<void> = async (req: Request, res: Response): Promise<void> => {
    try {
        const Response: Appointement[] = await getAppointementService();
        res
        .status(200)
        .json(Response)
    } catch (error) {
        res
        .status(404)
        .json(error instanceof Error ? error.message : "Error unknown")
    }
}

export const getAppointementByIdController: (req: Request<{ id: string }>, res: Response) => Promise<void> = async (req: Request<{ id: string }>, res: Response): Promise<void> => {

    const id: string  = req.params.id;
    
    try {
        const Response: Appointement = await getAppointementByIdService(id);
        res
        .status(200)
        .json(Response)
    } catch (error) {
        res
        .status(404)
        .json(error instanceof Error ? error.message : "Error unknown")
    }
}

export const RegisterNewAppointementsController: (req: Request< unknown, unknown, AppointementRegisterDTO >, res: Response) => Promise<void> = async (req: Request< unknown, unknown, AppointementRegisterDTO >, res: Response): Promise<void> => {
    try {
        const Response: Appointement = await registerAppointmentService(req.body);
        res
        .status(201)
        .json(Response)
    } catch (error) {
        const PostgresError = error as PostgresError;
        res
        .status(400)
        .json(PostgresError instanceof Error ? PostgresError.detail ? PostgresError.detail : PostgresError.message : "Unknown Error");
    }
}

export const cancelAppointementController: (req: Request<{ id: string }>, res: Response) => Promise<void> = async (req: Request<{ id: string }>, res: Response):Promise<void> => {
    const id: string = req.params.id;
    try {
        const Response: Appointement = await cancelStatusAppointementService(id);
        res
        .status(200)
        .json(Response)
    } catch (error) {
        res
        .status(404)
        .json(error instanceof Error ? error.message : "Error unknown")
    }
}