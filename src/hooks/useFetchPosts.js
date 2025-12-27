import httpRequest from "@/utils/httpRequest";
import { useEffect, useState } from "react";

export const useFetchPosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await httpRequest()
            console.log(object);
        } catch (error) {
            console.log(error);
        }
    }
  }, []);
};
