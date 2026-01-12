import { supabase } from '../supabaseClient.js';

const Locations = {
  tableName: 'locations',

  async add({ busNumber, latitude, longitude, speed }) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([{ busnumber: busNumber, latitude, longitude, speed }])
      .select(); // returns inserted row

    if (error) throw error;

    console.log('Inserted row:', data);

    return data; // always returns the inserted row
  },

  async getLatest(busNumber) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('busnumber', busNumber)
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  }
};

export default Locations;





