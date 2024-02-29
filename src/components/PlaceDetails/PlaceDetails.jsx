import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";

export const PlaceDetails = ({ place }) => {
  const classes = useStyles();

  return (
    //shadow effect
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {/* Map for all the awards of each restaurant */}
        {place?.awards?.map((award) => (
          <Box
            display="flex"
            justifyContent="space-between"
            my={1}
            alignItems="center"
          >
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {/* Map for the type of cuisine of each restaurant */}
        {place?.cuisine?.map(({ name }) => {
          <Chip
            key={name}
            size="small"
            label={name}
            className={classes.chip}
          />;
        })}
        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        <CardActions>
          {/* Open a new window */}
          <Button size="small" color="primary" onClick={()=> window.open(place.web_url, '_blank')}>
              Trip Advisor
          </Button>
          <Button size="small" color="primary" onClick={()=> window.open(place.website, '_blank')}>
              Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
