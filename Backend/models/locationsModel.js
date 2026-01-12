import { supabase } from '../supabaseClient.js';

const Locations = {
  tableName: 'locations',

  async add({ busNumber, latitude, longitude, speed }) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([
        {
          busnumber: busNumber,
          latitude,
          longitude,
          speed
        }
      ])
      .select(); // returns inserted row

        console.log('Inserted row:', data); 

    if (error) throw error;
    return data;
  },

  // Get latest location of a bus
  async getLatest(busNumber) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('busnumber', busNumber)
      .order('timestamp', { ascending: false }) // latest first
      .limit(1);

    if (error) throw error;
    return data[0];
  }
};

export default Locations;




