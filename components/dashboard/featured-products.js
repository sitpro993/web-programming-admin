import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import NextLink from "next/link";
import Image from "next/image";

export const FeaturedProducts = (props) => {
  return (
    <Card {...props}>
      <CardHeader title="Sản phẩm bán chạy" />
      <Divider />
      <List>
        {props.product.map((product, i) => (
          <ListItem divider={i < props.product.length - 1} key={i}>
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
