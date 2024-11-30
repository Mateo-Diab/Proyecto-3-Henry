import { AppDataSource, UserModel } from "../config/dataSource";
import { UserLoginDTO, UserLoginSuccessDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { Credential } from "../entities/Credential.entity";
import { users } from "../entities/User.entity";
import { checkCredentialService, createCredentialService } from "./credentialServices";

export const getUsersService: () => Promise<users[]> = async (): Promise<users[]> => {
    const users = await UserModel.find()
    if(users.length <= 0) throw new Error(`Any user has been found`)
    return users;
};

export const getUserByIdService: (id: string) => Promise<users> = async (id: string): Promise<users> => {

    const userFound: users | null = await UserModel.findOne({
        where: { id : parseInt(id,10) },
        relations: ["appointements"]
    })

    if(!userFound) throw new Error(`The user with id ${id} has not been found`);
    else return userFound;
}

export const registerUserService: (user: UserRegisterDTO) => Promise<users> = async (user: UserRegisterDTO): Promise<users> => {

    const result = await AppDataSource.transaction(async (entityManager) => {

        const userCredentials: Credential = await createCredentialService(entityManager, user.username, user.password);
        const newUser: users = entityManager.create(users, {
            name: user.name,
            birthdate: user.birthdate,
            email: user.email,
            nDni: user.nDni,
            credentials: userCredentials
        })
        
        return await entityManager.save(newUser)
    })
    
    return result;
}

export const loginUserService: (user: UserLoginDTO) => Promise<UserLoginSuccessDTO> = async (user: UserLoginDTO): Promise<UserLoginSuccessDTO> => {

    const credentialId: number | undefined = await checkCredentialService(user.username, user.password);
    
    const userFound: users | null = await UserModel.findOne({
        where:{
            credentials: {
                id: credentialId
            }
        }
    })

    return{
        login: true, 
        user: {
            id: userFound?.id ?? 0,
            name: userFound?.name ?? "",
            email: userFound?.email ?? "",
            birthDate: userFound?.birthdate ?? new Date(),
            nDni: userFound?.nDni ?? 0
        }
    }
}