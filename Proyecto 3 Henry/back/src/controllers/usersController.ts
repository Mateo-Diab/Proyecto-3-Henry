import { Request, Response } from "express"
import { UserLoginDTO, UserLoginSuccessDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { getUserByIdService, getUsersService, loginUserService, registerUserService } from "../services/usersServices";
import { PostgresError } from "../interfaces/ErrorInterface";
import { users } from "../entities/User.entity";

export const getUsersController: (req: Request, res: Response) => Promise<void> = async (req: Request, res: Response): Promise<void> => {
    try {
        const response: users[] = await getUsersService(); 
        res
        .status(200)
        .json(response);
    
    } catch (error) {
        res
        .status(404)
        .json(error instanceof Error ? error.message : "Unknown error");
    }
}

export const getUserByIdController:(req: Request<{id: string}>, res: Response) => Promise<void> = async (req: Request<{id: string}>, res: Response): Promise<void> => {
    const id: string = req.params.id;
    try {
        const response: users = await getUserByIdService(id);
        res
        .status(200)
        .json(response);
    
    } catch (error) {
        res
        .status(404)
        .json(error instanceof Error ? error.message : "Error unknown");
    }
};

export const registerUserController: (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) => Promise<void> = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
    try {
        const response: users = await registerUserService(req.body)
        res
        .status(201)
        .json(response)
    
    } catch (error) {

        const PostgresError = error as PostgresError;

        res
        .status(400)
        .json(PostgresError instanceof Error ? PostgresError.detail ? PostgresError.detail : PostgresError.message : "Unknown Error");
    }
}

export const loginUserController: (req: Request<unknown, unknown, UserLoginDTO>, res: Response) => Promise<void> = async (req: Request<unknown, unknown, UserLoginDTO>, res: Response): Promise<void> => {
    
    try {
        const response: UserLoginSuccessDTO = await loginUserService(req.body);
        res
        .status(200)
        .json(response)
    } catch (error) {
        res
        .status(400)
        .json(error instanceof Error ? error.message : "Error unknown");
    }
}