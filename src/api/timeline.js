import fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

export async function alarmSearchForTimeline(startTime, endTime, severity, obj) {
    let urls = await getUrl();
    let severityPredicates;
    severity = severity && Object.keys(severity).length > 0 &&JSON.parse(severity);
    let severityFlag = severity  && severity.map(element => {
        if(!element.defaultSelect){
            return true;
        }
        return false;
    });
    if(severityFlag){
        const severityMapping = {"Critical": "1", "Major": "2", "Minor": "3", "Info": "4", "Unknown": "5"};
        let result = [];
        if(severity.length>1){
            severity && severity.forEach(item =>{
                if(item.defaultSelect){
                    result.push({
                        "field": "capevent.severity",
                        "operator": "EQ",
                        "value": severityMapping[item.columnName]
                    });
                }
            });
            severityPredicates = {"predicates": result, "operator":"OR"}; 
        }else{
            severityPredicates = {
                "field": "capevent.severity",
                "operator": "EQ",
                "value": severityMapping[severity[0].columnName]
            };
        }
    }
    let predicates = {
        "predicates":[
            {
                "field": "capevent.sentdatetime",
                "operator": "GT",
                "value": new Date(startTime).toISOString().replace("Z", "+0000")
            },
            {
                "field": "capevent.sentdatetime",
                "operator": "LT",
                "value": new Date(endTime).toISOString().replace("Z", "+0000")
            }
        ],
        "operator":"AND"
    };
    predicates = severityPredicates ? [severityPredicates, predicates] : [predicates];
    const postbody = {
        "type": "alarms",
        "format": "filter",
        "application": obj.applicationid,
        "predicate": {
            "predicates": predicates,
            "operator": "AND"
        },
        "paginator": {
            "pageno": 1,
            "limit": 50
        }
    };
    return fetch.post(urls.alarmSearch, postbody);
}

//exportAlarmData
export async function callAlarmExportApi(obj) {
    let urls = await getUrl();
    return fetch.post(urls.exportAlarms, obj.filterConfig);
}
//acknowledge alarm
export async function callChangeStateApi(obj) {
    let urls = await getUrl();
    return fetch.post(urls.getAlarms + "/" + obj.id + "?owner=" + obj.owner + "&state=" + obj.state);
}