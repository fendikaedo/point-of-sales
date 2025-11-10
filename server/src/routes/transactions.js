import { createTransaction,getTransactions } from "../controllers/transactionsController.js";
const transactionsRoutes = [
  {
    method: "GET",
    path: "/transactions",
    handler: getTransactions,
  },
  {
    method: "POST",
    path: "/transactions",
    handler: createTransaction,
  },
];

export default transactionsRoutes;
