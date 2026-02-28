import CompanyApplicationsView from "./company/CompanyApplicationView";
import AgentApplicationsTable from "./agent/AgentApplicationsTable";
import ListingApplicationsTable from "../listing/ListingApplicationsTable";
import CompanyAgentsView from "./agent/CompanyAgentsView";
export function CompanyTabRenderer({ tab, applications }) {
  switch (tab) {
    case "applications":
      // return <div>Applications View</div>
      return <CompanyApplicationsView />;

    case "agents":
      // return <div>Company Agents View</div>
      return <CompanyAgentsView />;

    case "transactions":
      return <div>Company Transactions View</div>
      // return <CompanyTransactionsView />;

    case "documents":
      return <div>Company Documents View</div>
      // return <CompanyDocumentsView />;

    case "performance":
      return <div>Company Performance View</div>
      // return <CompanyPerformanceView />;

    default:
      return <div>Select a tab</div>;
  }
}


export function AgentTabRenderer({
  tab,
  applications,
}: {
  tab: string;
  applications: any[];
}) {
  switch (tab) {
    case "applications":
      return <AgentApplicationsTable />

    case "transactions":
      return <div>Transactions View</div>

    case "documents":
      return <div>Documents View</div>

    case "performance":
      return <div>Performance View</div>
      // return <PerformanceView />;

    default:
      return <div>Select a tab</div>;
  }
}

export function ListingTabRenderer({
  tab,
  applications,
}: {
  tab: string;
  applications: any[];
}) {
  switch (tab) {
    case "applications":
      return <ListingApplicationsTable />

    default:
      return <div>Select a tab</div>;
  }
}


