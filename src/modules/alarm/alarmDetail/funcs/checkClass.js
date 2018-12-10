//check association class
export const checkAssociationClass = data => {
    let parametersAssId = data.infos[0].parameters.associatedid;
    if ((!data.associations || data.associations.length === 0) && parametersAssId) {
        //itself is children
        return 1;
    } else if (!parametersAssId && data.associations && data.associations.length > 0) {
        //itself is parent
        return 2;
    } else {
        //no association or itself is closed
        return 0;
    }
};

//display data according to association class
export const checkAssClass = type => {
    switch (type) {
        case 1:
            return "C";
        case 2:
            return "P";
        default:
            break;
    }
};
