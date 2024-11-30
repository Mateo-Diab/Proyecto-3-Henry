import { AppointementRegisterDTO } from "../dtos/AppointementDTO";
import { Appointement } from "../entities/Appointement.entity";
import { EStatus } from "../interfaces/IAppointements";
import { AppointementRepository } from "../repositories/Appointement.repository";
import { getUserByIdService } from "./usersServices";

export const registerAppointmentService: ( appointment: AppointementRegisterDTO) => Promise<Appointement> = async ( appointment: AppointementRegisterDTO): Promise<Appointement> => {

    await getUserByIdService(appointment.userId.toString());

    AppointementRepository.validateAllowAppointement(appointment.date, appointment.time)    
    
    await AppointementRepository.validateExistingAppointement(appointment.userId, appointment.date, appointment.time)

    const newAppointement: Appointement = await AppointementRepository.create({
        date: appointment.date,
        time: appointment.time,
        description: appointment.description,
        user: {id : appointment.userId}
    })

    return await AppointementRepository.save(newAppointement);
}

export const getAppointementService = async () => {

    const appointements: Appointement[] =  await AppointementRepository.find();

    if(appointements.length > 0) return appointements;
    else throw new Error(`Any appointement has been found`);
}

export const getAppointementByIdService: ( id: string ) => Promise<Appointement> = async ( id: string ): Promise<Appointement> => {

    const appointementFound: Appointement | null = await AppointementRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    })

    if(!appointementFound) throw new Error(`The appointement with id: ${id}, has not been found`)
    else return appointementFound;
}

export const cancelStatusAppointementService: (id: string) => Promise<Appointement> = async (id: string): Promise<Appointement> => {
    
    const appointementFound: Appointement | null = await AppointementRepository.findOne({
        where: {
            id: parseInt(id, 10)
        }
    })

    if(!appointementFound) throw new Error(`The appointement with id: ${id}, has not been found`)
    
    appointementFound.status = EStatus.Cancelled;
    return await AppointementRepository.save(appointementFound);
}