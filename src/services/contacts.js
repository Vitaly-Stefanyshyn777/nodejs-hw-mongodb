import { ContactsCollection } from "../models/contacts.js";
import { SORT_ORDER } from "../constants/index.js";
import { calculatePaginationData } from "../utils/ calculatePaginationData.js";

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  if (filter.type) {
    contactsQuery.where("contactType").equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }
  if (filter.gender) {
    contactsQuery.where("type").equals(filter.isFavourite);
  }
  if (filter.gender) {
    contactsQuery.where("gender").equals(filter.gender);
  }
  if (filter.maxAge) {
    contactsQuery.where("age").lte(filter.maxAge);
  }
  if (filter.minAge) {
    contactsQuery.where("age").gte(filter.minAge);
  }
  if (filter.maxAvgMark) {
    contactsQuery.where("avgMark").lte(filter.maxAvgMark);
  }
  if (filter.minAvgMark) {
    contactsQuery.where("avgMark").gte(filter.minAvgMark);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const data = await contactsQuery
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: data,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload = {}) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
    }
  );

  if (!updatedContact) return null;

  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
