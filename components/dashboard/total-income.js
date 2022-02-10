import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const TotalIncome = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Tổng thu nhập
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₫
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        {/* <LinearProgress value={75.5} variant="determinate" /> */}
      </Box>
    </CardContent>
  </Card>
);
