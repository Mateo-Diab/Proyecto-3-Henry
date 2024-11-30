export const validateLoginRegister = (input) => {
    const errors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
        errors.email = "Invalid email, format: example@mail.com";
    }

    // Validate age (must be at least 18)
    const birthdate = new Date(input.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    if (isNaN(age) || age < 18) {
        errors.birthdate = "Must be at least 18 years old";
    }

    // Validate DNI
    const dniRegex = /^\d{7,8}$/;
    if (!dniRegex.test(input.nDni)) {
        errors.nDni = "DNI must be 7 or 8 digits";
    }

    // Validate name
    const nameRegex = /^[A-Z][a-zA-Z]{2,50}$/;
    if (!nameRegex.test(input.name)) {
        errors.name = "Capital first letter, only letters, 3-50 chars";
    }

    //Validate pass
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(input.password)) {
        errors.password = "Min 8 chars, 1 uppercase, 1 number, 1 special char";
    }

    // Validate username
    const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9_-]{1,18}[a-zA-Z0-9]$/;
    if (!usernameRegex.test(input.username)) {
        errors.username = "3-20 chars, letters, numbers, hyphens, underscores";
    }

    return errors;
};

export const isValidTime = (time) => {
    //Validate time Format "hh:mm"
    if (typeof time !== "string" || !time.includes(":")) {
        return false;
    }

    const [hour, minutes] = time.split(":").map(Number);
    
    // Validate hour minutes
    if (isNaN(hour) || isNaN(minutes)) {
        return false;
    }

    const totalMinutes = hour * 60 + minutes;
    const startTime = 8 * 60; 
    const endTime = 18 * 60;  

    return totalMinutes >= startTime && totalMinutes < endTime;
}

export const validateAppointement = (input) => {
    const errors = {}
    const {date, time, description} = input;

    const timeDate = new Date(`${date}T${time}`)
    const now = new Date()
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    //Validate Days
    if(timeDate < now){
        errors.date = "Cannot add appointments for days before today"
    } else if( timeDate < twentyFourHoursLater ){
        errors.date = "Appointments must be scheduled at least 24 hours in advance"
    } else if(timeDate.getDay() === 0 || timeDate.getDay() === 6) {
        errors.date = "It is not possible to add appointments on weekends"
    }

    //Validate hours
    if(!isValidTime(time)){
        errors.time = "No appointments can be made outside of the permitted hours (8 AM - 6 PM)"
    }

    //Validate Description
    const descriptionRegex = /^[A-Z][a-z ]{3,14}$/;

    if(!descriptionRegex.test(description)){
        errors.description = "Must start with a capital letter, be 4-15 characters, only lowercase letters or spaces";
    }

    return errors;
}