import axios from "axios";

const request = axios.create({
  baseURL: process.env.API_URL,
  headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
});

export async function getNames(): Promise<string[]> {
  try {
    const { data } = await request.get("/admin/supporters");
    return data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
}
