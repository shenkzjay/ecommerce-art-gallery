export default function CreateCategory() {
  return (
    <div>
      CreateProduct
      <form className="flex flex-col w-1/3 gap-4">
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          id="category"
          name="category"
          title="category"
          placeholder="category"
        />

        <button className="bg-orange-400 px-4 py-2">Create category</button>
      </form>
    </div>
  );
}
