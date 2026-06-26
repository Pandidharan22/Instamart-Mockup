export const mockUser = {
  name: "Pandidharan",
  phone: "+91 98765 43210",
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      line1: "12, 2nd Cross Street, Kasturba Nagar",
      line2: "Adyar",
      city: "Chennai",
      pincode: "600020",
      isDefault: true,
    },
    {
      id: "addr-2",
      label: "Work",
      line1: "45, Tidel Park, 4th Floor, CSIR Road",
      line2: "Taramani",
      city: "Chennai",
      pincode: "600113",
      isDefault: false,
    },
  ],
  deliverySlots: [
    {
      id: "slot-1",
      label: "Within 10 mins",
      available: true,
    },
    {
      id: "slot-2",
      label: "Within 30 mins",
      available: true,
    },
    {
      id: "slot-3",
      label: "Schedule for later",
      available: true,
    },
  ],
};
