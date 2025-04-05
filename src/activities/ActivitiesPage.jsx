import { useAuth } from "../auth/AuthContext";
import ActivityList from "./ActivityList.jsx";
import ActivityForm from "./ActivityForm.jsx";

/**
 * All users can see a list of activities.
 * If they are logged in, they will also see a form to create an activity.
 */
export default function ActivitiesPage() {
  const { token } = useAuth();

  return (
    <>
      <h1>Activities</h1>
      <ActivityList />
      {token && <ActivityForm />}
    </>
  );
}
