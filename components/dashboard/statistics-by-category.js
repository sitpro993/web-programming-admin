import { Doughnut as DoughnutJs } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckroomIcon from "@mui/icons-material/Checkroom";

export const StatisticsByCategory = (props) => {
  const theme = useTheme();
  const totalProductSold = props.statisticalorders.reduce((prev, item) => {
    return prev + item.count;
  }, 0);
  const percent = props.statisticalorders.map((item) => {
    return (item.count / totalProductSold) * 100;
  });

  const data = {
    datasets: [
      {
        data: percent,
        backgroundColor: ["#ff9f43", "#ee5253", "#0abde3", "#10ac84"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["BeeCase", "BeeTee", "BeeBag", "BeeCarry"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = [
    {
      title: "BeeCase",
      value: Math.round(percent[0]),
      icon: AdUnitsIcon,
      color: "#ff9f43",
    },
    {
      title: "BeeTee",
      value: Math.round(percent[1]),
      icon: CheckroomIcon,
      color: "#ee5253",
    },
    {
      title: "BeeBag",
      value: Math.round(percent[2]),
      icon: ShoppingBagIcon,
      color: "#0abde3",
    },
    {
      title: "BeeCarry",
      value: Math.round(percent[3]),
      icon: AccountBalanceWalletIcon,
      color: "#10ac84",
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Thống kê sản phẩm đã bán" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
