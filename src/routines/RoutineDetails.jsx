import { useNavigate, useParams } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function RoutineDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const {
    data: routine,
    error,
    loading,
  } = useQuery("/routines/" + id, "routine");
  if (loading) return <p>Loading...</p>;
  if (error || !routine) return <p>Sorry! {error}</p>;
  return (
    <>
      <h1>{routine.name}</h1>
      <p>by {routine.creatorName}</p>
      <p>{routine.goal}</p>
      {token && <DeleteButton id={routine.id} />}
    </>
  );
}
function DeleteButton({ id }) {
  const navigate = useNavigate();
  const {
    mutate: deleteRoutine,
    loading,
    error,
  } = useMutation("DELETE", "/routines/" + id, ["routines", "routine"]);
  const onDelete = async () => {
    const success = await deleteRoutine();
    if (success) navigate("/routines");
  };
  return (
    <button onClick={onDelete}>
      {loading ? "Deleting" : error ?? "Delete routine"}
    </button>
  );
}
