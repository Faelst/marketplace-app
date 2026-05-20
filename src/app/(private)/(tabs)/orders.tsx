import { OrderView } from "../../../viewModels/Orders/Oders.view";
import { useOrdersViewModel } from "../../../viewModels/Orders/useOrder.viewModel";

export default function Orders() {
  const props = useOrdersViewModel();
  return <OrderView {...props} />;
}
