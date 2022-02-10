import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export const TotalOrder = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Tổng số đơn hàng
          </Typography>
          <Typography color="textPrimary" variant="h5">
            {props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <ShoppingCartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        {/* <LinearProgress value={75.5} variant="determinate" /> */}
      </Box>
    </CardContent>
  </Card>
);
