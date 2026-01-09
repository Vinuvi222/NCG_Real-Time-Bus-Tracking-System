import { supabase } from './supabaseClient.js';

const Locations = {
  tableName: 'locations',

  // Insert a new location
  async add({ busNumber, latitude, longitude, speed }) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([
        {
          busNumber,
          latitude,
          longitude,
          speed,
          timestamp: new Date() // records the time of insertion
        }
      ]);

    if (error) throw error;
    return data;
  },

  // Get latest location of a bus
  async getLatest(busNumber) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('busNumber', busNumber)
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  },

  // Get all locations of a bus
  async getAll(busNumber) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('busNumber', busNumber)
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data;
  }
};

export default Locations;
