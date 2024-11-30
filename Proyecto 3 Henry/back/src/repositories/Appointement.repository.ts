import { AppDataSource } from "../config/dataSource";
import { Appointement } from "../entities/Appointement.entity";

export const AppointementRepository = AppDataSource.getRepository(Appointement).extend({
    
    validateAllowAppointement: function (date: Date, time: string) {
        // Crear el objeto Date para el turno
        const appointementDate = new Date(date);
        const [hours, minutes] = time.split(":").map(Number);
        appointementDate.setHours(hours, minutes, 0); // Establecer la hora y minutos del turno
    
        // Obtener la fecha y hora actual
        const now = new Date();
        const nowInArg = new Date(now.getTime() - 3 * 60 * 60 * 1000); // Ajustar al huso horario de Argentina (-3)
    
        // Validar si la fecha del turno es anterior a la fecha actual en Argentina
        if (appointementDate < nowInArg) {
            throw new Error(`Cannot add appointments for days before today`);
        }
    
        // Validar que el día no sea fin de semana (sábado o domingo)
        const dayOfWeek = appointementDate.getUTCDay(); // 0 = Domingo, 6 = Sábado
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error("It is not possible to add appointments on weekends");
        }
    
        // Validar que el turno se agende con al menos 24 horas de anticipación
        const msDiff = appointementDate.getTime() - nowInArg.getTime(); // Diferencia en milisegundos
        const hsDiff = msDiff / (1000 * 60 * 60); // Convertir a horas
        if (hsDiff < 24) {
            throw new Error(`Appointments must be scheduled at least 24 hours in advance`);
        }
    
        // Validar que la hora esté dentro del rango permitido (8 AM - 6 PM)
        if (hours < 8 || hours >= 18) {
            throw new Error("No appointments can be made outside of the permitted hours (8 AM - 6 PM)");
        }
    },

    validateExistingAppointement: async function (userId: number, date: Date, time: string): Promise<void> {
        const appointementFound = await this.findOne({
            where: {
                user: {
                    id: userId
                },
                date: date,
                time: time
            }
        })

        if(appointementFound)
            throw new Error(`Appointement with Date: ${date} and Time: ${time} for the user with Id: ${userId} already exists`)
    }
});
