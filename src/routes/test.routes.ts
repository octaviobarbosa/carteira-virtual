import { Router } from "express";

const testRoutes = Router();

testRoutes.get("/", (request, response) => {
  return response.json({ message: "test ok" });
});

export { testRoutes };
