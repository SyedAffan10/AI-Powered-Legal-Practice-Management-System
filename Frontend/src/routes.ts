import Analytics from "./pages/admin/analytics";
import Dashboard from "./pages/admin/dashboard";
import Payments from "./pages/admin/payments";
import Settings from "./pages/admin/settings";
import Agencies from "./pages/admin/agencies";
import Subscription from "./pages/agency/subscription";
import Agents from "./pages/agency/agent";
import Cases from "./pages/agency/cases";
import AgencyDashboard from "./pages/agency/dashboard";
import AgencyTasks from "./pages/agency/tasks";
import ClientDashboard from "./pages/client/dashboard";
import ClientMatter from "./pages/client/matters";
import AgentDashboard from "./pages/agent/dashboard";
import Matter from "./pages/agent/matter";
import ClientDocs from "./pages/client/documents";
import AgentDocs from "./pages/agent/documents";
import ClientLogs from "./pages/client/alllogs";
import Packages from "./pages/admin/packages";

//admin
export const routes = [
  { path: "/super-admin/", component: Dashboard },
  { path: "/super-admin/agencies", component: Agencies },
  { path: "/super-admin/analytics", component: Analytics },
  { path: "/super-admin/settings", component: Settings },
  { path: "/super-admin/packages", component: Packages },
];

//agency
export const agencyRoutes = [
  { path: "/agency/", component: AgencyDashboard },
  { path: "/agency/subscription", component: Subscription },
  { path: "/agency/agents", component: Agents },
  { path: "/agency/matters", component: Cases },
  { path: "/agency/tasks", component: AgencyTasks },
  { path: "/agency/clients", component: Payments },
];

//client
export const clientRoutes = [
  { path: "/client", component: ClientDashboard },
  { path: "/client/matters", component: ClientMatter },
  { path: "/client/logs", component: ClientLogs },
  { path: "/client/documents", component: ClientDocs },
  { path: "/client/tasks", component: AgencyTasks },
  { path: "/client/clients", component: Payments },
];

//agent
export const agentRoutes = [
  { path: "/agent", component: AgentDashboard },
  { path: "/agent/matters", component: Matter },
  { path: "/agent/logs", component: Agents },
  { path: "/agent/documents", component: AgentDocs },
  { path: "/agent/tasks", component: AgencyTasks },
  { path: "/agent/clients", component: Payments },
];
