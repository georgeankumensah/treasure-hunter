export const cityNameFilter = (name: string) => (city: string) =>
  city.toLocaleLowerCase().includes(name.toLocaleLowerCase());
