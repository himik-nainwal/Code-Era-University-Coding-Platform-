import React, { useEffect } from "react";
import axios from "../utils/axios";

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/auth/register`);
      console.log(res.data);
    };
    fetchData();
  }, []);

  return <div>Home</div>;
}

export default Home;
