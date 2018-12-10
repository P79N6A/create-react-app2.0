/*
 * @Author: LWP 
 * @Date: 2018-11-07 16:25:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-07 18:04:14
 */
class EventBus {
    constructor() {
        this._eventListener = {};
    }
    on = (topic, callback) => {
        if (topic in this._eventListener) return this._eventListener[topic].push(callback);
        this._eventListener[topic] = [callback];
    };
    off = topic => {
        if (topic in this._eventListener) return delete this._eventListener[topic];
    };
    emit = (topic, args) => {
        if (topic in this._eventListener) {
            this._eventListener[topic].forEach(callback => {
                callback.call(null, args);
            });
        }
    };
}

export default new EventBus();
