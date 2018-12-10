export const getIcon = type => {
    switch (type) {
        case "INFO":
            return "info";
        case "WARN":
            return "warning";
        case "ERROR":
            return "error";
        default:
            return "info";
    }
};
