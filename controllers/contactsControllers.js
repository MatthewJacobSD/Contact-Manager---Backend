import asyncHandler from 'express-async-handler';
import Contact from '../models/contactsModels.js';
import { STATUS } from '../constants.js';

// 📇 Get All Contacts - the reunion tour
export const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });

    // 🕳️ No contacts? Sad.
    if (!contacts.length) {
        return res.status(STATUS.NOT_FOUND).json({
            status: 'fail',
            emoji: "📭",
            message: "No contacts found!",
            suggestion: "Try adding someone before they forget you"
        });
    }

    res.status(STATUS.OK).json({
        status: 'success',
        emoji: "👯",
        message: `Found ${contacts.length} contacts!`,
        data: contacts
    });
});

// ➕ Create Contact - new friendship unlocked
export const createContact = asyncHandler(async (req, res) => {
    const { name, lastname, email, phoneNo } = req.body;

    // 🛑 Missing fields? Not today.
    if (!name || !lastname || !email || !phoneNo) {
        return res.status(STATUS.BAD_REQUEST).json({
            status: 'fail',
            emoji: "🤷‍♂️",
            message: "All fields required!",
            missingFields: {
                name: !name ? "🤔" : "✅",
                lastname: !lastname ? "🤔" : "✅",
                email: !email ? "🤔" : "✅",
                phoneNo: !phoneNo ? "🤔" : "✅"
            }
        });
    }

    // ✨ The creation station
    const contact = await Contact.create({
        ...req.body,
        user_id: req.user.id
    });

    res.status(STATUS.CREATED).json({
        status: 'success',
        emoji: "✨",
        message: "New contact created!",
        data: contact
    });
});

// 🔍 Get Single Contact - FBI mode activated
export const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    // 👻 Ghosted?
    if (!contact) {
        return res.status(STATUS.NOT_FOUND).json({
            status: 'fail',
            emoji: "👻",
            message: "Contact vanished!",
            possibleReasons: [
                "Never existed",
                "Deleted by someone",
                "In witness protection"
            ]
        });
    }

    // 🚷 Not yours? Hands off!
    if (contact.user_id.toString() !== req.user.id) {
        return res.status(STATUS.FORBIDDEN).json({
            status: 'fail',
            emoji: "🙅‍♂️",
            message: "Not your contact!",
            legalDisclaimer: "Unauthorized access is a no-no"
        });
    }

    res.status(STATUS.OK).json({
        status: 'success',
        emoji: "🔎",
        message: "Contact found!",
        data: contact
    });
});

// ✏️ Update Contact - the glow-up
export const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    // 🕵️‍♀️ Existence check
    if (!contact) {
        return res.status(STATUS.NOT_FOUND).json({
            status: 'fail',
            emoji: "😶",
            message: "Contact MIA!",
            suggestion: "Check ID or create new contact"
        });
    }

    // 🚨 Ownership verification
    if (contact.user_id.toString() !== req.user.id) {
        return res.status(STATUS.FORBIDDEN).json({
            status: 'fail',
            emoji: "✋",
            message: "Not yours to edit!",
            note: "We're watching you 👀"
        });
    }

    // 💅 The makeover
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(STATUS.OK).json({
        status: 'success',
        emoji: "🔄",
        message: "Contact glow-up complete!",
        data: updatedContact
    });
});

// 🗑️ Delete Contact - the breakup
export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    // 👀 Existence check
    if (!contact) {
        return res.status(STATUS.NOT_FOUND).json({
            status: 'fail',
            emoji: "🤷‍♀️",
            message: "Already deleted or never existed!",
            philosophicalQuestion: "If a contact is deleted and no one is around, does it make a sound?"
        });
    }

    // 🚫 Ownership check
    if (contact.user_id.toString() !== req.user.id) {
        return res.status(STATUS.FORBIDDEN).json({
            status: 'fail',
            emoji: "👮‍♀️",
            message: "Not yours to delete!",
            warning: "Attempts logged for security purposes"
        });
    }

    // 💀 The final act
    await contact.deleteOne();

    res.status(STATUS.OK).json({
        status: 'success',
        emoji: "💔",
        message: "Contact deleted!",
        epitaph: `RIP ${contact.name} ${contact.lastname || ''} (${contact.email})`,
        data: null
    });
});