export const DeleteProduct = async (id: number) => {
  try {
    const deletedProduct = await fetch(`http://localhost:8001/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await deletedProduct.json();

    console.log(response, "deleteitemm");

    if (!response) {
      throw new Error("Error trying to delete product from endpoint");
    }

    return response;
  } catch (error) {
    return console.error(`Error deleting author ${error}`);
  }
};
