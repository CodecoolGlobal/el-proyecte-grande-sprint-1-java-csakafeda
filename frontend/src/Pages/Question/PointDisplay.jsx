import {Box, Typography} from "@mui/material";

export default function PointDisplay({points}) {

    return <Box sx={{userSelect: "none"}} display={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Typography component="span" variant="h1" align="center">
            {Math.floor(points)}
        </Typography>
        <Typography component="span" align="center">
            POINTS
        </Typography>
    </Box>
}