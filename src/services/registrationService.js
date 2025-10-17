import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "workshop_registrations";

export const submitRegistration = async (registrationData) => {
  try {
    // Check if user already registered with same WhatsApp number
    const existingRegistration = await checkExistingRegistration(registrationData.whatsapp);
    
    if (existingRegistration) {
      throw new Error('এই WhatsApp নম্বর দিয়ে ইতিমধ্যে রেজিস্ট্রেশন করা হয়েছে।');
    }

    // Add registration data to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...registrationData,
      registrationDate: serverTimestamp(),
      status: 'pending', // pending, confirmed, cancelled
      workshopDate: '2025-10-22',
      workshopTitle: 'Prophetic Productivity Workshop'
    });

    console.log("Registration submitted with ID: ", docRef.id);
    return {
      success: true,
      id: docRef.id,
      message: 'রেজিস্ট্রেশন সফল হয়েছে!'
    };

  } catch (error) {
    console.error("Error adding registration: ", error);
    
    // Handle specific error messages
    if (error.message.includes('WhatsApp নম্বর')) {
      throw error;
    }
    
    throw new Error('রেজিস্ট্রেশনে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
  }
};

export const checkExistingRegistration = async (whatsappNumber) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("whatsapp", "==", whatsappNumber.trim())
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
    
  } catch (error) {
    console.error("Error checking existing registration: ", error);
    return false;
  }
};

export const getAllRegistrations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const registrations = [];
    
    querySnapshot.forEach((doc) => {
      registrations.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return registrations;
  } catch (error) {
    console.error("Error getting registrations: ", error);
    throw error;
  }
};