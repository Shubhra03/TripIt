import axios from "axios";
 
// const URL = '';

// const options = {
//    params: {
//     bl_latitude: '11.847676',
//     tr_latitude: '12.838442',
//     bl_longitude: '109.095887',
//     tr_longitude: '109.149359',
  
//   },
//   headers: {
//     'X-RapidAPI-Key': '33b553ac70msh47bc928f7d17eb2p1b3a7cjsnaf3d0b81b95e',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   }
// };
export const getPlacesData = async (type,sw,ne) => {
    try{
        const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
          params: {
           bl_latitude: sw.lat,
           tr_latitude: ne.lat,
           bl_longitude: sw.lng,
           tr_longitude: ne.lng,
         
         },
         headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
       });
        return data;
    }
    catch(error){
        console.log(error);
    }
}
