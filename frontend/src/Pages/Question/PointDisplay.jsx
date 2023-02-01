import { Box, Typography } from "@mui/material";

export default function PointDisplay({points}) {

    return <Box sx={{userSelect: "none"}}>
    <Typography variant="h1" align="center">
        {points}
    </Typography>
    <Typography align="center">
        POINTS
    </Typography>
</Box>
}