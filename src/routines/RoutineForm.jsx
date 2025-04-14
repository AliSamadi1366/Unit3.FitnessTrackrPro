import useMutation from "../api/useMutation";

export default function RoutineForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/routines", ["routines"]);
  const addroutine = (formData) => {
    const name = formData.get("name");
    const goal = formData.get("goal");
    add({ name, goal });
  };
  return (
    <>
      <h2>Add a new Routine</h2>
      <form action={addroutine}>
        <label>
          Name
          <input type="text" name="name" required />
        </label>
        <label>
          Goal
          <input type="text" name="goal" required />
        </label>
        <button>{loading ? "Adding..." : "Add routine"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
