import Inquiry from '../models/Inquiry.js';
import PolicyQuote from '../models/PolicyQuote.js';
import { syncDataToExcel } from '../utils/excelSync.js';

// @desc    Submit contact inquiry
// @route   POST /api/inquiries/contact
// @access  Public
export const submitInquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const inquiry = await Inquiry.create({ name, email, subject, message });

    if (inquiry) {
      await syncDataToExcel('Inquiry', {
        id: inquiry._id.toString(),
        name: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject,
        date: inquiry.createdAt.toISOString()
      });
      res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
    } else {
      res.status(400).json({ message: 'Invalid inquiry data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Request a policy quote
// @route   POST /api/inquiries/quote
// @access  Public
export const requestQuote = async (req, res) => {
  try {
    const { userId, name, email, phone, policyType, details } = req.body;
    const quote = await PolicyQuote.create({ userId, name, email, phone, policyType, details });

    if (quote) {
      await syncDataToExcel('Quote', {
        id: quote._id.toString(),
        userId: quote.userId ? quote.userId.toString() : 'guest',
        name: quote.name,
        email: quote.email,
        phone: quote.phone,
        policyType: quote.policyType,
        date: quote.createdAt.toISOString()
      });
      res.status(201).json({ message: 'Quote requested successfully', quote });
    } else {
      res.status(400).json({ message: 'Invalid quote data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
