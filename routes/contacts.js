import express from 'express';
import {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} from '../controllers/contactsControllers.js';
import { validateToken } from '../middleware/validateTokenHandler.js';

const router = express.Router();

// 🔒 Lock down ALL contact routes – no randoms allowed!
router.use(validateToken);

// 📇 GET all contacts - /api/contacts
router.get('/', getContacts); // "Show me the squad 👯"

// 👤 GET single contact - /api/contacts/:id
router.get('/:id', getContact); // "Who's this? 🕵️‍♂️"

// ➕ POST create new contact - /api/contacts
router.post('/', createContact); // "New friend alert! 🎉"

// ✏️ PUT update contact - /api/contacts/:id
router.put('/:id', updateContact); // "Glow-up time 💅"

// 🗑️ DELETE contact - /api/contacts/:id
router.delete('/:id', deleteContact); // "Yeet this contact 🚮"

export default router;