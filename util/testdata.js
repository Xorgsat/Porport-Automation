// utils/testData.js
export function generateUniqueMerchantData() {
    const timestamp = Date.now();
    return {
        contactName: `Contact ${timestamp}`,
        email: `contact.${timestamp}@crestinfosystems.com`,
        phone: `9099${timestamp.toString().slice(-6)}`,
        companyName: `Company ${timestamp}`,
    };
}

export function generateUniqueResellerData() {
    const timestamp = Date.now();
    return {
        name: `Reseller ${timestamp}`,
        companyName: `Reseller Company ${timestamp}`,
        domain: `reseller-${timestamp}.test`,
        email: `reseller.${timestamp}@crestinfosystems.com`,
        phone: `87${timestamp.toString().slice(-8)}`,
        address: `Reseller address ${timestamp}`,
        city: 'Sydney',
        postalCode: '2001',
        note: `Reseller note ${timestamp}`,
    };
}