import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 400 }} style={{ margin: 20 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://blog.hubspot.com/hs-fs/hubfs/00-Blog-Related_Images/marketing-sales-alignment.png?width=1096&height=830&name=marketing-sales-alignment.png"
          //"https://logo.com/image-cdn/images/kts928pd/production/b64ecf3895c91d29b9a5239e7c24388330e88299-731x731.png?w=1080&q=72"

          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
