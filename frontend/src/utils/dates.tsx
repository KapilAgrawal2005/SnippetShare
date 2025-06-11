import moment from "moment";

export const formatDate = (date: string) => {
  return `created on ${moment(date).format("DD MMMM YYYY, HH:mm")}`;
};

export const joinedOn = (date: string) => {
  return moment(date).fromNow();
};
