import { CreateGoalDialog } from "./components/CreateGoalDialog";
import { EmptyGoals } from "./components/emptyGoals";
import { Dialog } from "./components/ui/dialog";

export function App() {
  return (
    <Dialog>
      <EmptyGoals />
      <CreateGoalDialog />
    </Dialog>
  );
}
