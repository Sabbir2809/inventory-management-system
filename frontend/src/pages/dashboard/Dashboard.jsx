import { Col, Row } from "antd";
import {
  useExpenseSummaryQuery,
  usePurchaseSummaryQuery,
  useReturnSummaryQuery,
  useSellSummaryQuery,
} from "../../redux/features/dashboard/dashboardApi";
import SummaryCard from "./SummaryCard";
import SummaryChart from "./SummaryChart";

const Dashboard = () => {
  const { data: expenses } = useExpenseSummaryQuery(undefined);
  const { data: sells } = useSellSummaryQuery(undefined);
  const { data: purchases } = usePurchaseSummaryQuery(undefined);
  const { data: returns } = useReturnSummaryQuery(undefined);

  const totalExpense = expenses?.data?.total;
  const expenseChart = expenses?.data?.last30Days;

  const totalSell = sells?.data?.total;
  const sellChart = sells?.data?.last30Days;

  const totalPurchase = purchases?.data?.total;
  const purchaseChart = purchases?.data?.last30Days;

  const totalReturn = returns?.data?.total;
  const returnChart = returns?.data?.last30Days;

  return (
    <Col>
      {/* stats */}
      <Row gutter={8}>
        <SummaryCard total={totalExpense} title="Total Expense" />
        <SummaryCard total={totalSell} title="Total Sell" />
        <SummaryCard total={totalPurchase} title="Total Purchase" />
        <SummaryCard total={totalReturn} title="Total Return" />
      </Row>
      {/* chart */}
      <Row gutter={8}>
        <SummaryChart data={expenseChart} title="Expense Last 30 Days" />
        <SummaryChart data={sellChart} title="Sell Last 30 Days" />
        <SummaryChart data={purchaseChart} title="Purchase Last 30 Days" />
        <SummaryChart data={returnChart} title="Return Last 30 Days" />
      </Row>
    </Col>
  );
};
export default Dashboard;
