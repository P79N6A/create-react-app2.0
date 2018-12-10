import Fetch from "commons/utils/fetch";
import getUrl from "commons/utils/urlHelper";

export async function getMeterData(accountid,fromdate,todate) {
    let urls = await getUrl();
    // return Fetch.get(urls.devices + "?accountid="+obj.accountId+"&fromdate="+obj.fromDate+"&todate="+obj.toDate);
    return Fetch.get(urls.events + "?accountid=cc7b3dca2ad0f5c7&fromdate=2018-10-07&todate=2018-10-24");
}
//get meter device details
export async function getDevicesData(userId, startTime, endTime, pageno, limit) {
    let urls = await getUrl();
    console.log("accountid", userId);
    console.log("fromdate", startTime);
    console.log("todate", endTime);
    return Fetch.get(urls.devices + "?accountid="+userId+"&fromdate="+endTime+"&todate="+startTime+"&pageno="+pageno+"&limit="+limit);
    // +"&pageno=1&limit=100"
    // return Fetch.get(urls.devices + "?accountid=cc7b3dca2ad0f5c7&fromdate=2018-10-07&todate=2018-10-24");
}

export async function getEventsData(userId, startTime, endTime, pageno, limit) {
    let urls = await getUrl();
    // return Fetch.get(urls.devices + "?accountid="+obj.accountId+"&fromdate="+obj.fromDate+"&todate="+obj.toDate);
    return Fetch.get(urls.events + "?accountid="+userId+"&fromdate="+endTime+"&todate="+startTime+"&pageno="+pageno+"&limit="+limit);
    // +"&pageno=1&limit=100"
}

export async function getSmsNotificatonsData(userId, startTime, endTime, pageno, limit) {
    let urls = await getUrl();
    // return Fetch.get(urls.devices + "?accountid="+obj.accountId+"&fromdate="+obj.fromDate+"&todate="+obj.toDate);
    return Fetch.get(urls.smsNotifications + "?accountid="+userId+"&fromdate="+endTime+"&todate="+startTime+"&pageno="+pageno+"&limit="+limit);
    // +"&pageno=1&limit=100"
}

export async function getEmailNotificatonsData(userId, startTime, endTime, pageno, limit) {
    let urls = await getUrl();
    // return Fetch.get(urls.devices + "?accountid="+obj.accountId+"&fromdate="+obj.fromDate+"&todate="+obj.toDate);
    return Fetch.get(urls.emailNotifications + "?accountid="+userId+"&fromdate="+endTime+"&todate="+startTime+"&pageno="+pageno+"&limit="+limit);
    // +"&pageno=1&limit=100"
}

export async function getUsersNotificatonsData(userId, startTime, endTime, pageno, limit) {
    let urls = await getUrl();
    // return Fetch.get(urls.devices + "?accountid="+obj.accountId+"&fromdate="+obj.fromDate+"&todate="+obj.toDate);
    return Fetch.get(urls.users + "?accountid="+userId+"&fromdate="+endTime+"&todate="+startTime+"&pageno="+pageno+"&limit="+limit);
    // +"&pageno=1&limit=100"
}

export async function getAccountData() {
    let urls = await getUrl();
    let url = urls.sysconfigAccount;
    return fetch.get(url);
}

export async function getStreamDataApi() {
    let urls = await getUrl();
    let postData = {
        type: "events",
        format: "filter",
        paginator: { pageno: "1", limit: "200"}
    };
    return Fetch.post(urls.eventSearch, postData);
}
