export type Status = "Active" | "At Risk" | "Churning";
export type ActivityStatus = "Planned" | "Completed" | "Missed";
export type Disposition = "Interested" | "Callback Requested" | "Not Reachable" | "Meeting Scheduled";

export const RMS = [
  { id: "rm1", name: "Arjun Mehta", role: "Regional RM", city: "Mumbai", count: 18 },
  { id: "rm2", name: "Priya Nair", role: "Regional RM", city: "Pune", count: 14 },
  { id: "rm3", name: "Rohan Das", role: "VRM", city: "Remote", count: 22 },
];

export const PRODUCTS = [
  "HDFC Flexi Cap Fund",
  "SBI Bluechip Fund",
  "Axis Midcap Fund",
  "ICICI Pru Liquid Fund",
  "Mirae Asset ELSS",
  "DSP Nifty 50 Index Fund",
  "Nippon India SIP Booster",
];

export const ACTIVITY_TYPES = [
  "Distributor Visit",
  "Product Presentation",
  "Business Review Meeting",
  "SIP Drive Campaign Briefing",
  "Complaint Resolution",
];

export type Distributor = {
  id: string;
  arn: string;
  name: string;
  city: string;
  aum: number;
  netSales: number;
  sips: number;
  status: Status;
  rmId: string;
  assignmentType: "Primary" | "Secondary";
  effectiveDate: string;
  lastContactDays: number;
};

export const DISTRIBUTORS: Distributor[] = [
  { id: "d1", arn: "ARN-00423", name: "Rajesh Financial Services", city: "Mumbai", aum: 48.2, netSales: 6.4, sips: 312, status: "Active", rmId: "rm1", assignmentType: "Primary", effectiveDate: "2023-04-01", lastContactDays: 6 },
  { id: "d2", arn: "ARN-01187", name: "Wealth Tree Advisors", city: "Pune", aum: 31.7, netSales: 4.1, sips: 198, status: "Active", rmId: "rm2", assignmentType: "Primary", effectiveDate: "2023-06-15", lastContactDays: 11 },
  { id: "d3", arn: "ARN-00891", name: "Kapoor Investments", city: "Mumbai", aum: 22.5, netSales: 1.8, sips: 143, status: "At Risk", rmId: "rm1", assignmentType: "Primary", effectiveDate: "2022-11-20", lastContactDays: 28 },
  { id: "d4", arn: "ARN-02341", name: "NSE Star Distributors", city: "Nashik", aum: 18.9, netSales: 3.2, sips: 211, status: "Active", rmId: "rm2", assignmentType: "Secondary", effectiveDate: "2024-01-10", lastContactDays: 4 },
  { id: "d5", arn: "ARN-03102", name: "Finwise Advisory", city: "Pune", aum: 9.4, netSales: -0.6, sips: 87, status: "Churning", rmId: "rm2", assignmentType: "Primary", effectiveDate: "2023-02-12", lastContactDays: 19 },
  { id: "d6", arn: "ARN-01456", name: "Horizon Wealth", city: "Mumbai", aum: 55.1, netSales: 7.9, sips: 401, status: "Active", rmId: "rm1", assignmentType: "Primary", effectiveDate: "2021-08-05", lastContactDays: 2 },
  { id: "d7", arn: "ARN-00772", name: "Dhan Vardhan & Co", city: "Nagpur", aum: 14.3, netSales: 2.1, sips: 156, status: "Active", rmId: "rm3", assignmentType: "Primary", effectiveDate: "2023-09-22", lastContactDays: 8 },
  { id: "d8", arn: "ARN-04210", name: "Prudent Wealth Mgmt", city: "Mumbai", aum: 8.7, netSales: -1.2, sips: 62, status: "Churning", rmId: "rm1", assignmentType: "Secondary", effectiveDate: "2024-03-18", lastContactDays: 15 },
];

export const fmtCr = (n: number) =>
  `${n < 0 ? "-" : ""}₹${Math.abs(n).toFixed(n % 1 === 0 ? 0 : 1)} Cr`;

const today = new Date();
const yyyymm = (d: Date) => d.toISOString().slice(0, 10);

function dayThisMonth(day: number) {
  const d = new Date(today.getFullYear(), today.getMonth(), day, 10, 0);
  return d;
}

export type Activity = {
  id: string;
  distributorId: string;
  type: string;
  date: string; // ISO
  location: string;
  products: string[];
  notes: string;
  status: ActivityStatus;
  outcome?: "Positive" | "Neutral" | "Negative";
};

export const ACTIVITIES: Activity[] = [
  { id: "a1", distributorId: "d1", type: "Business Review Meeting", date: dayThisMonth(2).toISOString(), location: "Distributor Office, BKC", products: ["HDFC Flexi Cap Fund"], notes: "Quarterly review", status: "Completed", outcome: "Positive" },
  { id: "a2", distributorId: "d3", type: "Distributor Visit", date: dayThisMonth(4).toISOString(), location: "Andheri East", products: ["SBI Bluechip Fund"], notes: "Address AUM dip concerns", status: "Completed", outcome: "Neutral" },
  { id: "a3", distributorId: "d6", type: "Product Presentation", date: dayThisMonth(6).toISOString(), location: "Lower Parel", products: ["Axis Midcap Fund", "Mirae Asset ELSS"], notes: "New product pitch", status: "Completed", outcome: "Positive" },
  { id: "a4", distributorId: "d5", type: "Complaint Resolution", date: dayThisMonth(8).toISOString(), location: "Pune HQ", products: [], notes: "Redemption delay grievance", status: "Missed" },
  { id: "a5", distributorId: "d2", type: "SIP Drive Campaign Briefing", date: dayThisMonth(10).toISOString(), location: "Wealth Tree Office", products: ["Nippon India SIP Booster"], notes: "Drive briefing", status: "Completed", outcome: "Positive" },
  { id: "a6", distributorId: "d1", type: "Distributor Visit", date: dayThisMonth(today.getDate()).toISOString(), location: "BKC", products: ["DSP Nifty 50 Index Fund"], notes: "Index fund pitch", status: "Planned" },
  { id: "a7", distributorId: "d6", type: "Business Review Meeting", date: dayThisMonth(today.getDate()).toISOString(), location: "Lower Parel", products: [], notes: "Monthly review", status: "Planned" },
  { id: "a8", distributorId: "d8", type: "Distributor Visit", date: dayThisMonth(today.getDate() + 1).toISOString(), location: "Borivali", products: ["ICICI Pru Liquid Fund"], notes: "Retention call", status: "Planned" },
  { id: "a9", distributorId: "d3", type: "Product Presentation", date: dayThisMonth(Math.min(today.getDate() + 3, 27)).toISOString(), location: "Andheri", products: ["Mirae Asset ELSS"], notes: "ELSS pitch", status: "Planned" },
  { id: "a10", distributorId: "d4", type: "Business Review Meeting", date: dayThisMonth(Math.min(today.getDate() + 5, 27)).toISOString(), location: "Nashik", products: [], notes: "BRM", status: "Planned" },
];

export const AUM_TREND = [
  { month: "Dec", aum: 39.8 },
  { month: "Jan", aum: 41.2 },
  { month: "Feb", aum: 43.1 },
  { month: "Mar", aum: 44.6 },
  { month: "Apr", aum: 46.5 },
  { month: "May", aum: 48.2 },
];

export const SIP_TREND = [
  { month: "Dec", sips: 18 },
  { month: "Jan", sips: 24 },
  { month: "Feb", sips: 31 },
  { month: "Mar", sips: 27 },
  { month: "Apr", sips: 35 },
  { month: "May", sips: 42 },
];

export const PRODUCT_MIX = [
  { name: "Equity", value: 58 },
  { name: "Debt", value: 27 },
  { name: "Liquid", value: 15 },
];

export type CallLog = {
  id: string;
  distributorId: string;
  dateTime: string;
  duration: string;
  disposition: Disposition;
  notes: string;
};

export const CALL_LOGS: CallLog[] = [
  { id: "c1", distributorId: "d7", dateTime: "2026-05-06 10:14", duration: "8m 22s", disposition: "Interested", notes: "Wants more on Axis Midcap" },
  { id: "c2", distributorId: "d2", dateTime: "2026-05-06 11:02", duration: "3m 41s", disposition: "Callback Requested", notes: "Call after 4pm" },
  { id: "c3", distributorId: "d4", dateTime: "2026-05-06 12:30", duration: "0m 22s", disposition: "Not Reachable", notes: "Voicemail left" },
  { id: "c4", distributorId: "d5", dateTime: "2026-05-05 15:45", duration: "12m 09s", disposition: "Meeting Scheduled", notes: "BRM next Tuesday" },
  { id: "c5", distributorId: "d1", dateTime: "2026-05-05 16:20", duration: "6m 02s", disposition: "Interested", notes: "DSP Nifty 50 follow-up" },
  { id: "c6", distributorId: "d3", dateTime: "2026-05-05 17:11", duration: "4m 18s", disposition: "Callback Requested", notes: "Discuss AUM dip" },
  { id: "c7", distributorId: "d8", dateTime: "2026-05-04 11:50", duration: "2m 04s", disposition: "Not Reachable", notes: "" },
  { id: "c8", distributorId: "d6", dateTime: "2026-05-04 14:25", duration: "9m 47s", disposition: "Meeting Scheduled", notes: "Product presentation booked" },
];

export const TODAYS_QUEUE = ["d3", "d5", "d8", "d2", "d4"];

export type Notification = {
  id: string;
  level: "alert" | "warning" | "success" | "info";
  category: "Alerts" | "System";
  title: string;
  timestamp: string;
  distributorId?: string;
  read: boolean;
};

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", level: "alert", category: "Alerts", title: "Finwise Advisory AUM has declined for 3 consecutive months", timestamp: "2h ago", distributorId: "d5", read: false },
  { id: "n2", level: "warning", category: "Alerts", title: "Kapoor Investments — no activity logged in 28 days", timestamp: "5h ago", distributorId: "d3", read: false },
  { id: "n3", level: "success", category: "Alerts", title: "Horizon Wealth crossed ₹55 Cr AUM milestone", timestamp: "1d ago", distributorId: "d6", read: true },
  { id: "n4", level: "info", category: "System", title: "New SIP drive campaign briefing material available — DSP Nifty 50", timestamp: "1d ago", read: false },
  { id: "n5", level: "alert", category: "Alerts", title: "Prudent Wealth Mgmt redemption alert — ₹1.2 Cr redeemed this week", timestamp: "2d ago", distributorId: "d8", read: false },
];
