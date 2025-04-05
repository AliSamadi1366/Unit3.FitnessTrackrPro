import { Link, useParams } from "react-router";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function ActivityDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const {
    data: activityData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(`/activities/${id}`, ["activities", id]);
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", `/activities/${id}`, ["activities"]);

  if (queryLoading) return <p>Loading activity...</p>;
  if (queryError) return <p>Error: {queryError}</p>;
  return (
    <>
      <h1>{activityData?.name || "Unnamed Activity"}</h1>
      <p>Created by: {activityData?.creatorId || "Unknown"}</p>
      <p>{activityData?.description || "No description available."}</p>
      {token && (
        <button onClick={() => deleteActivity()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
      <Link to="/activities">Back to all activities</Link>
    </>
  );
}
