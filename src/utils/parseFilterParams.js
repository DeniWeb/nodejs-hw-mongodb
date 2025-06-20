export const parseFilterParams = (query) => {
  const { name, phoneNumber, email, isFavourite, contactType } = query;

  return {
    name: typeof name === 'string' ? name : undefined,
    phoneNumber: typeof phoneNumber === 'string' ? phoneNumber : undefined,
    email: typeof email === 'string' ? email : undefined,
    contactType: typeof contactType === 'string' ? contactType : undefined,
    isFavourite:
      typeof isFavourite === 'string'
        ? isFavourite === 'true'
        : typeof isFavourite === 'boolean'
        ? isFavourite
        : undefined,
  };
};
