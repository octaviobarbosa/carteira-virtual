import { Router } from "express";
import { PayPaymentController } from "../modules/payments/useCases/payPayment/PayPaymentController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePaymentController } from "../modules/payments/useCases/createPayment/CreatePaymentController";
import { ReversePaymentController } from "../modules/payments/useCases/reversePayment/ReversePaymentController";
import { DeletePaymentController } from "../modules/payments/useCases/deletePayment/DeletePaymentController";
import { UpdatePaymentController } from "../modules/payments/useCases/updatePayment/UpdatePaymentController";
import { ListPaymentController } from "../modules/payments/useCases/listPayments/ListPaymentsController";
import { GetPaymentController } from "../modules/payments/useCases/getPayment/GetPaymentController";

const paymentsRoutes = Router();

const createPaymentController = new CreatePaymentController();
const payPaymentController = new PayPaymentController();
const reversePaymentController = new ReversePaymentController();
const deletePaymentController = new DeletePaymentController();
const updatePaymentController = new UpdatePaymentController();
const listPaymentController = new ListPaymentController();
const getPaymentController = new GetPaymentController();

paymentsRoutes.post("/", ensureAuthenticated, createPaymentController.handle);
paymentsRoutes.get("/", ensureAuthenticated, listPaymentController.handle);
paymentsRoutes.get("/:id", ensureAuthenticated, getPaymentController.handle);
paymentsRoutes.put("/:id", ensureAuthenticated, updatePaymentController.handle);
paymentsRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deletePaymentController.handle,
);
paymentsRoutes.post("/pay", ensureAuthenticated, payPaymentController.handle);
paymentsRoutes.post(
  "/reverse/:id",
  ensureAuthenticated,
  reversePaymentController.handle,
);

export { paymentsRoutes };
