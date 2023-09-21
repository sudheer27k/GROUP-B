// Validate email domain
export const validateEmailDomain = (email) => {
    const domain = email.split('@')[1];
    return domain === 'jmangroup.com';
};

// Validate phone number format (10 digits)
export const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
};

// Validate age (greater than or equal to 20 years)
export const validateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 20;
};

// Validate emergency contact (10 digits)
export const validateEmergencyContact = (emergencyContact) => {
    return /^\d{10}$/.test(emergencyContact);
};

// Validate date of joining (less than or equal to 7 years from now)
export const validateDateOfJoining = (doj) => {
    const today = new Date();
    const dojDate = new Date(doj);
    const differenceInYears = today.getFullYear() - dojDate.getFullYear();
    return differenceInYears <= 7;
};