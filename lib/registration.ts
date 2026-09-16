export const CLASS_LEVELS = ["10th", "11th", "12th", "UG", "PG"] as const;

export const REGISTRATION_PLANS = [
  { id: "premium", name: "Premium", price: 499, description: "Registration + Mock Practice + Reward Perks" },
  { id: "standard", name: "Standard", price: 299, description: "Registration" },
] as const;

// This interface is a local preview. Connect a server-side registration service
// before collecting entries or payments; no participant data is persisted here.
export const REGISTRATION_PREVIEW_NOTICE = "Preview form — details are not saved and no payment is collected.";
