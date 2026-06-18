// Currency utility for Egyptian Pounds
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0,
    }).format(amount);
};
export const formatPrice = (amount) => {
    // Convert to EGP (assuming input is in EGP, if in USD multiply by ~50)
    const egpAmount = amount; // Already in EGP
    return formatCurrency(egpAmount);
};
export const formatPriceShort = (amount) => {
    if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)} مليون`;
    }
    else if (amount >= 1000) {
        return `${(amount / 1000).toFixed(0)} ألف`;
    }
    return formatCurrency(amount);
};
