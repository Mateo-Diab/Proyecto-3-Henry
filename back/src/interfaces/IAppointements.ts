export interface IAppointement{
    id: number,
    date: Date,
    time: string,
    description: string,
    userId: number,
    status: EStatus
}

export enum EStatus {
    Active = "active",
    Cancelled = "cancelled"
}