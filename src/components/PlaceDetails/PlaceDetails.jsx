import React from 'react'
import { Box,Typography,Button,Card,CardMedia,CardContent,CardActions,Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import placeHolderImage from '../image/hotel.png';
// import useStyles from './styles';
// import theme from './styles';
// import { ChipStyles } from './styles';

const Chips = styled(Chip)`
margin: 5px 5px 5px 0
`;
const Subtitle = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  position: relative;
`;

const LocationIcon = styled(LocationOnIcon)`
  position: absolute;
  left: 0;
`;

const AddressText = styled(Typography)`
  position: absolute;
  right: 0;

`;

                
const PlaceDetails = ({place,selected,refProp}) => {
  // const classes = useStyles();
  // console.log(place);
  console.log({refProp});
  console.log({selected});
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // const classes = useStyles();
  return (
   <Card elevation={6}>
    <CardMedia
       style={{height: 350}}
       image={place.photo ? place.photo.images.large.url :placeHolderImage}
       title ={place.name}

    />
    <CardContent>
      <Typography gutterBottom variant='h5' style={{ fontSize: '20px' }}>{place.name}</Typography>
      <Box display="flex" justifyContent="space-between">
      <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
        <Typography gutterBottom variant='subtitle1' style={{ fontSize: '14px' }}>out of {place.num_reviews} reviews</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant='subtitle1' style={{ fontSize: '14px' }}>Price</Typography>
        <Typography gutterBottom variant='subtitle1' style={{ fontSize: '14px' }}>{place.price_level}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" whiteSpace="nowrap">
        <Typography variant='subtitle1' display="flex" style={{ fontSize: '14px' }}>Ranking</Typography>
        <Typography gutterBottom variant='subtitle1' display="flex" textAlign="right" style={{ fontSize: '14px' }}>{place.ranking}</Typography>
      </Box>
      {place?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} alt='nothing' />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
         {place?.cuisine?.map(({ name }) => (
          <Chips key={name} size="small" label={name} />
        ))}
         {place.address && (
          <Subtitle gutterBottom variant="body2" color="textSecondary">
          <LocationIcon style={{ fontSize: '14px' }}/>
          {place.address && <AddressText style={{ fontSize: '10px' }}>{place.address}</AddressText>}
        </Subtitle>
        )}
         {place.phone && (
          <Subtitle gutterBottom variant="body2" color="textSecondary">
          <PhoneIcon style={{ fontSize: '14px' }}/>
          {place.phone && <AddressText style={{ fontSize: '10px' ,fontWeight: 'bold'}}>{place.phone}</AddressText>}
        </Subtitle>
        )}

        <CardActions>
          <Button size='small' color='primary' onClick={()=> window.open(place.web_url,'_blank')}>
            Trip Advisor
          </Button>
          <Button size='small' color='primary' onClick={()=> window.open(place.website,'_blank')}>
            Website
          </Button>
        </CardActions>
    </CardContent>
   </Card>
  )
}

export default PlaceDetails