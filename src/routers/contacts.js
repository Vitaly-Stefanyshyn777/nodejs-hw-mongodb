// import {
//   createContactController,
//   deleteContactController,
//   getAllContactsController,
//   getContactByIdController,
//   patchContactController,
// } from '../controllers/contacts.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { Router } from 'express';

// const router = Router();

// router.get('/contacts', ctrlWrapper(getAllContactsController));
// router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
// router.post('/contacts', ctrlWrapper(createContactController));
// router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
// router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

// export default router;

// import {
//   createContactController,
//   deleteContactController,
//   getAllContactsController,
//   getContactByIdController,
//   patchContactController,
// } from "../controllers/contacts.js";
// import { ctrlWrapper } from "../utils/ctrlWrapper.js";
// import { Router } from "express";
// import { validateBody } from "../middlewares/validateBody.js";
// import {
//   createContactsSchema,
//   updateContactsSchema,
// } from "../validation/contacts.js";

// const router = Router();

// router.get("/contacts", ctrlWrapper(getAllContactsController));
// router.get("/contacts/:contactId", ctrlWrapper(getContactByIdController));
// router.post(
//   "/contacts",
//   validateBody(createContactsSchema),
//   ctrlWrapper(createContactController)
// );
// router.patch(
//   "/contacts/:contactId",
//   validateBody(updateContactsSchema),
//   ctrlWrapper(patchContactController)
// );
// router.delete("/contacts/:contactId", ctrlWrapper(deleteContactController));

// export default router;

import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js"; // Додано імпорт
import {
  createContactsSchema,
  updateContactsSchema,
} from "../validation/contacts.js";

const router = Router();

router.get("/contacts", ctrlWrapper(getAllContactsController));

router.get(
  "/contacts/:contactId",
  isValidId,
  ctrlWrapper(getContactByIdController)
);

router.post(
  "/contacts",
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController)
);

router.patch(
  "/contacts/:contactId",
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController)
);

router.delete(
  "/contacts/:contactId",
  isValidId,
  ctrlWrapper(deleteContactController)
);

export default router;
