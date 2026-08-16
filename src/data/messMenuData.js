export const MESS_TIMINGS = {
  breakfast: { label: "Breakfast", time: "07:30 AM - 10:00 AM", startHour: 7.5, endHour: 10 },
  lunch: { label: "Lunch", time: "12:00 PM - 02:30 PM", startHour: 12, endHour: 14.5 },
  tiffin: { label: "Tiffin / High Tea", time: "04:30 PM - 06:00 PM", startHour: 16.5, endHour: 18 },
  dinner: { label: "Dinner", time: "07:30 PM - 10:00 PM", startHour: 19.5, endHour: 22 }
};

export const MESS_MENU_DATA = {
  Monday: {
    breakfast: {
      items: ["Aloo Paratha with Curd & Pickle", "Sprouted Moong Salad", "Boiled Eggs / Omelette", "Bread, Butter & Jam", "Cornflakes & Milk", "Tea / Coffee / Bournvita"],
      special: "Fresh Mint Chutney & Butter Cubes",
      isSpecial: false
    },
    lunch: {
      items: ["Rajma Masala (Punjabi Style)", "Jeera Rice", "Aloo Gobi Matar Dry", "Phulka Roti / Ghee", "Boondi Raita", "Fresh Green Salad & Roasted Papad"],
      special: "Kheer / Payasam",
      isSpecial: true
    },
    tiffin: {
      items: ["Samosa with Tamarind & Green Chutney", "Biscuits", "Hot Masala Chai / Filter Coffee"],
      special: "Crispy Samosa",
      isSpecial: false
    },
    dinner: {
      items: ["Paneer Butter Masala", "Egg Curry / Chicken Kolhapuri (Non-Veg Counter)", "Dal Tadka", "Steamed Basmati Rice", "Tandoori Roti", "Pickle & Salad"],
      special: "Hot Gulab Jamun (2 pcs)",
      isSpecial: true
    }
  },
  Tuesday: {
    breakfast: {
      items: ["South Indian Masala Dosa", "Steamed Idli with Sambar & Coconut Chutney", "Boiled Eggs", "Bread, Butter & Jam", "Muesli & Warm Milk", "Tea / Coffee"],
      special: "Crispy Medu Vada",
      isSpecial: true
    },
    lunch: {
      items: ["Chole Masala (Amritsari)", "Crispy Bhature & Steamed Rice", "Bhindi Do Pyaza", "Kadhi Pakora", "Cucumber Tomato Salad", "Roasted Papad"],
      special: "Bhature Counter",
      isSpecial: true
    },
    tiffin: {
      items: ["Veg Cheese Sandwich / Grilled Sandwich", "Potato Chips", "Tea / Cold Coffee"],
      special: "Cheesy Grilled Toast",
      isSpecial: false
    },
    dinner: {
      items: ["Methi Malai Matar", "Dal Fry", "Jeera Rice", "Fresh Chapati", "Mixed Vegetable Salad"],
      special: "Rasgulla",
      isSpecial: false
    }
  },
  Wednesday: {
    breakfast: {
      items: ["Poha with Sev, Onion & Lemon", "Upma with Coconut Chutney", "Boiled Eggs", "Bread, Butter & Jam", "Fresh Banana / Seasonal Fruit", "Tea / Coffee"],
      special: "Indori Poha with Jalebi",
      isSpecial: true
    },
    lunch: {
      items: ["Kashmiri Dum Aloo", "Yellow Dal Tadka", "Steamed Rice", "Mix Veg Korma", "Phulka Roti", "Beetroot Salad & Curd"],
      special: "Moong Dal Halwa",
      isSpecial: true
    },
    tiffin: {
      items: ["Kachori with Spicy Aloo Gravy", "Biscuits", "Chai / Lemon Tea"],
      special: "Kota Dal Kachori",
      isSpecial: false
    },
    dinner: {
      items: ["Veg Biryani with Mirchi ka Salan", "Chicken Biryani (Special Counter)", "Veg Kofta in Rich Gravy", "Dal Makhani", "Burani Raita", "Rumali Roti"],
      special: "Madhouse Biryani Night & Ice Cream",
      isSpecial: true
    }
  },
  Thursday: {
    breakfast: {
      items: ["Uttapam with Onion & Tomato", "Sambar & Red Chilli Chutney", "Boiled Eggs", "Bread, Butter & Jam", "Cornflakes & Milk", "Tea / Coffee"],
      special: "Onion Uttapam",
      isSpecial: false
    },
    lunch: {
      items: ["Lauki Kofta Curry", "Dal Palak", "Steamed Rice", "Aloo Beans Fry", "Tawa Roti", "Dahi Vada / Chaat counter", "Salad & Papad"],
      special: "Dahi Vada",
      isSpecial: true
    },
    tiffin: {
      items: ["Pav Bhaji (Butter Toasted Pav)", "Chopped Onion & Lemon", "Chai / Coffee"],
      special: "Mumbai Style Pav Bhaji",
      isSpecial: true
    },
    dinner: {
      items: ["Shahi Paneer", "Egg Bhurji / Fish Fry (Non-Veg Counter)", "Dal Panchmel", "Jeera Rice", "Butter Naan / Phulka", "Kachumber Salad"],
      special: "Gajar Ka Halwa",
      isSpecial: true
    }
  },
  Friday: {
    breakfast: {
      items: ["Gobhi Paratha & Methi Paratha", "Fresh Curd & Butter", "Boiled Eggs", "Bread, Butter & Jam", "Oats with Honey & Milk", "Tea / Coffee"],
      special: "Stuffed Paratha Feast",
      isSpecial: false
    },
    lunch: {
      items: ["Sarson ka Saag & Makki di Roti (or Palak Paneer)", "Dal Kolhapuri", "Steamed Rice", "Aloo Baingan Masala", "Phulka Roti", "Onion Salad & Chaas"],
      special: "Masala Chaas (Spiced Buttermilk)",
      isSpecial: false
    },
    tiffin: {
      items: ["Veg Spring Rolls / Veg Cutlet", "Sweet Chilli Sauce & Green Chutney", "Tea / Coffee"],
      special: "Crispy Cutlet",
      isSpecial: false
    },
    dinner: {
      items: ["Chinese Night: Veg Hakka Noodles, Fried Rice, Manchurian Gravy, Chilli Paneer, Egg Fried Rice, Hot & Sour Soup"],
      special: "Madhouse Indo-Chinese Fiesta",
      isSpecial: true
    }
  },
  Saturday: {
    breakfast: {
      items: ["Puri Bhaji (Halwai Style Aloo Curry)", "Suji Halwa", "Boiled Eggs", "Bread, Butter & Jam", "Sprouts & Milk", "Tea / Coffee"],
      special: "Puri Bhaji & Halwa",
      isSpecial: true
    },
    lunch: {
      items: ["Gujarati Dal & Kadi", "Khichdi & Steamed Rice", "Sev Tameta Nu Shaak", "Bhind Sambhariya", "Rotli with Ghee", "Papad & Fried Chillies"],
      special: "Aamras / Shrikhand (Seasonal)",
      isSpecial: true
    },
    tiffin: {
      items: ["Bhel Puri / Sev Puri Counter", "Biscuits", "Chai / Lemon Soda"],
      special: "Live Chaat Counter",
      isSpecial: true
    },
    dinner: {
      items: ["Malai Kofta", "Dal Fry", "Peas Pulao", "Tandoori Roti", "Green Salad & Raita"],
      special: "Vanilla / Chocolate Pastry",
      isSpecial: false
    }
  },
  Sunday: {
    breakfast: {
      items: ["Club Sandwiches (Veg & Egg)", "French Fries", "Baked Beans on Toast", "Fresh Fruit Salad", "Milkshakes / Juice", "Tea / Coffee"],
      special: "Sunday Leisure Brunch",
      isSpecial: true
    },
    lunch: {
      items: ["Hyderabadi Veg Dum Biryani", "Mutton/Chicken Dum Biryani (Special Extra)", "Mirchi Ka Salan", "Dal Tadka", "Raita", "Double Ka Meetha"],
      special: "Sunday Grand Biryani & Dessert",
      isSpecial: true
    },
    tiffin: {
      items: ["Bread Pakora with Mint Chutney", "Tea / Coffee"],
      special: "Stuffed Bread Pakora",
      isSpecial: false
    },
    dinner: {
      items: ["Kadhai Paneer", "Dal Makhani", "Jeera Rice", "Baby Butter Naan & Phulka", "Kashmiri Pulao", "Russian Salad"],
      special: "Matka Kulfi / Ice Cream Scoop",
      isSpecial: true
    }
  }
};

export const MESS_RULES = [
  "Mess Timings are strictly followed. Late entries subject to council review.",
  "Mess Rebate: Apply at least 24 hours in advance via the IITB SSO portal. Minimum 2 consecutive days required.",
  "Clean Plate Initiative: Hostel 4 strictly discourages food wastage. Take only what you consume.",
  "Guest Meals: Purchase guest meal coupons from the Mess Manager desk before the meal begins.",
  "Night Canteen: Open every night from 10:30 PM to 03:00 AM at the Ground Floor Corridor."
];
