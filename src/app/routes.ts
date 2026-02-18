import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { Dashboard } from "./pages/Dashboard";
import { Alerts } from "./pages/Alerts";
import { ActionPlans } from "./pages/ActionPlans";
import { Forecast } from "./pages/Forecast";
import { Chat } from "./pages/Chat";
import { HQDashboard } from "./pages/HQDashboard";
import { DataManagement } from "./pages/DataManagement";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "alerts", Component: Alerts },
      { path: "actions", Component: ActionPlans },
      { path: "forecast", Component: Forecast },
      { path: "chat", Component: Chat },
      { path: "hq", Component: HQDashboard },
      { path: "data", Component: DataManagement },
      { path: "settings", Component: Settings },
      { path: "*", Component: Dashboard },
    ],
  },
]);
