export function validateForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please enter your full name (minimum 2 characters).";
  }

  if (!data.role) {
    errors.role = "Please select your role or profile.";
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city = "Please enter your city.";
  }

  const cleanPhone = (data.phone || '').replace(/[\s-]/g, '').replace(/^(\+91|91|0)/, '');
  if (!cleanPhone) {
    errors.phone = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";
  }

  if (!data.product) {
    errors.product = "Please select a product of interest.";
  }

  if (!data.consent) {
    errors.consent = "You must acknowledge and consent before submitting.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    cleanPhone
  };
}
