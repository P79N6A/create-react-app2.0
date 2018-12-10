import Moment from "moment";

export default (dateString, formatString) => {
    if (formatString) {
        return Moment(dateString)
            .utcOffset(8)
            .format(formatString);
    } else {
        return Moment(dateString)
            .utcOffset(8)
            .format("HH:mm:ss DD-MMM-YYYY");
    }
};
