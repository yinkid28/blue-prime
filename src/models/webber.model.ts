export type RequestCardProps = {
    title: string;
    children: React.ReactNode;
};

export type tableTypes = {
  date: string;
  appName: string;
  plan: string;
  price: string;
  paymentMethod: string;
  paymentStatus: string;
};

export interface SubscribedApp {
  id: number;
  name: string;
  amount: number;
  req: number;
  date: string;
}





