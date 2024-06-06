import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const ip = request.nextUrl.searchParams.get("ip");
    const geoRes = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=04b536bfcb22470f84144684e845d1fd&ip=${ip}&fields=zipcode`
    );
    const zipcode = geoRes.data.zipcode;
    return NextResponse.json(
      { zipcode: zipcode },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "error" },
      {
        status: 400,
      }
    );
  }
}
