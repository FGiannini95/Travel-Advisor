import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async(sw, ne) =>{
  try{
    //request
    const {data: {data}} = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng
      },
      headers: {
        'X-RapidAPI-Key': '7fad42a114msh395748fde0c1cb0p15c2b4jsnaba77bf4bcc8',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return data;
    
  }catch(error){
    console.log(error);
  }
}