import type { FC } from "react";

import { Box } from "@mui/material";
import { useTrendingDestinations } from "../../hooks/useTrendingDestinations";
import CityCard from "../cards/CityCard";

const HorizontalCityList: FC = () => {
    const { data: cities = [], isLoading } = useTrendingDestinations();

    return (
        <Box
            sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                px: 2,
                pb: 1,
                scrollSnapType: "x mandatory",
                "& > *": {
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                },
                "&::-webkit-scrollbar": {
                    height: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: 3,
                },
            }}
        >
            {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Box key={index} width={280} height={260}>
                        <CityCard loading />
                    </Box>
                ))
                : cities.map((city) => (
                    <Box key={city.cityId} >
                        <CityCard city={city} />
                    </Box>
                ))}
        </Box>
    );
};

export default HorizontalCityList;
