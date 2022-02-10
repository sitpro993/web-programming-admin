import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import NextLink from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getData } from "../../utils/fecthData";

export const FeaturedProducts = (props) => {
  const [hotProducts, setHotProducts] = useState([]);
  useEffect(() => {
    const getHotList = async () => {
      const res = await getData(`products/hot?limit=5`);
      setHotProducts(res);
    };
    getHotList();
  }, []);

  return (
    <Card {...props}>
      <CardHeader title="Sản phẩm bán chạy" />
      <Divider />
      <List>
        {hotProducts.map((product, i) => (
          <ListItem divider={i < hotProducts.length - 1} key={i}>
            <ListItemAvatar>
              <Image
                alt={product.title}
                src={product.variant[0].img}
                height={48}
                width={48}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.title}
              secondary={`Đã bán ${product.sold}`}
            />
            {/* <IconButton edge="end" size="small">
            <MoreVertIcon />
          </IconButton> */}
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <NextLink href="/admin/products">
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            Xem chi tiết
          </Button>
        </NextLink>
      </Box>
    </Card>
  );
};
