import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    icon: BanknotesIcon,
    title: "Total branches",
    value: "2",
    footer: {
      color: "text-green-500",
      value: "2",
      label:" branches in your company"
    },
  },
  {
    icon: UsersIcon,
    title: "Total department's",
    value: "0",
    footer: {
      color: "text-green-500",
      value: "0",
      label: "Total department's in your company",
    },
  },
  {
    icon: UserPlusIcon,
    title: "Total Teams",
    value: "0",
    footer: {
      color: "text-primary",
      value: "0",
      label: "Total teams in company",
    },
  },
  {
    icon: UsersIcon,
    title: "Employees",
    value: "1",
    footer: {
      color: "text-green-500",
      value: "1",
      label: "Total employees in company",
    },
  },
];

export default statisticsCardsData;
