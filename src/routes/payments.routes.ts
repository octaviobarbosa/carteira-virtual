import { Router } from "express";
import { PayPaymentController } from "../modules/payments/useCases/payPayment/PayPaymentController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePaymentController } from "../modules/payments/useCases/createPayment/CreatePaymentController";
import { ReversePaymentController } from "../modules/payments/useCases/reversePayment/ReversePaymentController";
import { DeletePaymentController } from "../modules/payments/useCases/deletePayment/DeletePaymentController";
import { UpdatePaymentController } from "../modules/payments/useCases/updatePayment/UpdatePaymentController";

const paymentsRoutes = Router();

const createPaymentController = new CreatePaymentController();
const payPaymentController = new PayPaymentController();
const reversePaymentController = new ReversePaymentController();
const deletePaymentController = new DeletePaymentController();
const updatePaymentController = new UpdatePaymentController();

paymentsRoutes.post("/", ensureAuthenticated, createPaymentController.handle);
paymentsRoutes.post("/pay", ensureAuthenticated, payPaymentController.handle);
paymentsRoutes.post(
  "/reverse/:id",
  ensureAuthenticated,
  reversePaymentController.handle,
);
paymentsRoutes.put("/:id", ensureAuthenticated, updatePaymentController.handle);
paymentsRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deletePaymentController.handle,
);

export { paymentsRoutes };
