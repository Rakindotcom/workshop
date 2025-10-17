export const validateBangladeshiPhone = (phone) => {
  const cleanPhone = phone.replace(/\s/g, '');
  return /^01[3-9]\d{8}$/.test(cleanPhone);
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const formatPhoneNumber = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length <= 11) {
    return cleanPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phone;
};