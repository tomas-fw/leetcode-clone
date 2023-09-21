export const allFieldsFilled = (fields: Record<string, string>): boolean => {
    return !Object.values(fields).some((field) => !field);
};
