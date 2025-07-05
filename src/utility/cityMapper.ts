import type { CityOption } from "../types/cityOption";

export const convertCityOptions = (options: CityOption[]) => {
    return options.map((option) => option.name);
}