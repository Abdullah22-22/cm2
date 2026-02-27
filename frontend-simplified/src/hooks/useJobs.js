import { useEffect, useState } from "react";
import { getJobs } from "../api";

export default function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getJobs();


        setJobs(data.jobs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { jobs, loading };
}