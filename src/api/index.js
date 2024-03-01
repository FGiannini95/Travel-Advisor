import axios from "axios";

export const getPlacesData = async(type, sw, ne) =>{
  try{
    //request
    const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
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