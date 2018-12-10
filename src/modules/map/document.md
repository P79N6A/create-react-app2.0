 # the document of map
```javascript
import { MapApplication } from "modules/map";
<MapApplication
        identify="a1231231"
        dataSource={[{
            center: [103.74943256378174, 1.3225763556778443],
            id: "103.74943256378174,1.3225763556778443",
            lable: "Detection/Fire",
            icon: "place",
            iconImg: "icon" || "saticImg",
            imgPath: "your static folder image path or base64 image data"
        }]}
        zoom={12}
        icon="place"
        iconColor="red"
        center={center}
        getData={(e) => {console.log(e);}}
        needToolBar={true}
        loading
        fullscreen
    />
/**
*
*
* @param {string} identify
* @param {array} dataSource
* @param {number} zoom
* @param {func} getData
* @param {bool} needToolBar
* @param {bool} disableSave
*
```

- there are two functions for the device to use for showing location and add location;
- when we use this component to show the location, the data updated and the map will reset the center;
- when we using the add function after we click the "Save" button the marker in the map will disappear

1,needToolBar: if you need to add location in the map the needToolBar parameter show be true; if you just want to show the location in the map the needToolBar parameter should be false;

2, dataSource: this parameter should be an array and is built up with object and the each object shoud hava at least two parameters center and id the label parameter is optional if you need to show the location information this is useful; when this data exists which means that we use this component to show location rather than add new location
3, icon and iconColor: set the icon and icon color you like; the default icon is place and the color is red


 ## dataSource
    I need your support for this;
    the url from public folder just like this ./static/media/device_reading_line_chart.PNG (Please be precise to the file extension) or base64
    I need you to provide data in this format
    I will use iconImg to judge what marker type you need; please strict please strictly follow the parameter I gave;
    Icon: material-ui icon
    saticImg: for img icon

```javascript
    dataSource={[{
        center: [103.74943256378174, 1.3225763556778443],
        id: "103.74943256378174,1.3225763556778443",
        lable: "Detection/Fire",
        icon: "place",
        iconColor: "red",
        iconImg: "icon" || "saticImg",
        imgPath: "your static folder image path or base64 image data"
    }]}
```

4, getData: this is a function that is provided to get the created location information in the map if the in the edit model this parameter is useful;

5, disableSave: this parameter is for save button uses to make the button disable if it is false the button disabled and the disable status will follow this rather than following the component inner
6, loading: show the loading circle when the loading is true
7, fullscreen: show the full screen button basie on the browser