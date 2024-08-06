export const getAllRoutes = async () => {
  try {
    const allroutes = await fetch("http://localhost:8001/getall", {
      method: "GET",
    });

    const response = await allroutes.json();

    return response;

    console.log(response, "all routes");
  } catch (error) {
    console.error(error);
  }
};
