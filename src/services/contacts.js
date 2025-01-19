// import { ContactsCollection } from '../db/models/contact.js';

// export const getAllContacts = async () => {
//   return await ContactsCollection.find();
// };
// export const getContactById = async (contactId) => {
//   return await ContactsCollection.findById(contactId);
// };

// src/services/contacts.js
import { Contact } from "../models/Contact.js";

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find(); // Отримуємо всі контакти з бази даних
    return contacts;
  } catch (error) {
    throw new Error("Failed to fetch contacts: " + error.message);
  }
};
