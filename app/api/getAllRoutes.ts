import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { redirect } from "next/navigation";

// Hook to get all routes
export const getAllRoutes = () => {
  const context = useContext(AuthContext);

  return useQuery({
    queryKey: ["getallroutes"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8001/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log({ response });

      // if (response.status === 403 || response.status === 401) {
      //   // Token expired, try to refresh it
      //   const refreshResponse = await fetch("http://localhost:8001/refreshtoken", {
      //     method: "GET",
      //     credentials: "include", // Ensure cookies are included
      //   });

      //   if (!refreshResponse.ok) {
      //     throw new Error("Unable to refresh token, redirecting to login");
      //   }

      //   const refreshData = await refreshResponse.json();
      //   setAuth(refreshData.accessToken); // Update auth context with new access token

      //   // Retry the original request with the new token
      //   const retryResponse = await fetch("http://localhost:8001/getall", {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${refreshData.accessToken}`,
      //     },
      //   });

      //   if (!retryResponse.ok) {
      //     throw new Error("Failed to fetch data after refreshing token");
      //   }

      //   return retryResponse.json(); // Return data from retried request
      // }

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return response.json(); // Return data if the request was successful
    },
  });
};
