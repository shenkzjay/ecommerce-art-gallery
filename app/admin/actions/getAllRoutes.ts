export const getAllRoutes = async () => {
  try {
    const allroutes = await fetch("http://localhost:8001/getall", {
      method: "GET",
    });

    const response = await allroutes.json();

    console.log(response, "all routes");

    return response;
  } catch (error) {
    console.error(error);
  }
};
