export type UserInititals = {
  userType: "weaver" | "webber";
};

export type IMockUser = {
  fullname: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
};

export type IMockRole = {
  title: string;
  noU: number;
  noP: number;
};
