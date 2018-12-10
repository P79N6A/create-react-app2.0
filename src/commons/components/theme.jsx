import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
    palette: {
        action: {
            active: "#dcdcdc",
            hover: "#3e3e3e"
            // selected: "red"
        },
        background: {
            paper: "#4e4e4e",
            default: "#363636"
        },
        dialogColor: "#03acb4",
        //OPTUS
        // primary: {
        // light: "#464646",
        // main: "#1f1f1f",
        // dark: "#171717",
        // contrastText: "#dcdcdc"
        // },
        // secondary: {
        //   light: "#a9baf6",
        //   main: "#788ac3",
        //   dark: "#495d92",
        //   contrastText: "#dcdcdc"
        // },

        //SINGTEL
        // primary: {
        // light: "#464646",
        // main: "#1f1f1f",
        // dark: "#171717",
        // contrastText: "#dcdcdc"
        // },
        // secondary: {
        //   light: "#ff5e68",
        //   main: "#ed1a3d",
        //   dark: "#b20017",
        //   contrastText: "#dcdcdc"
        // },
        // expandIcon:{
        //   hover:"#757475",
        //   normal:"#4e4e4e"
        // },

        //NCS
        primary: {
            light: "#464646",
            main: "#1f1f1f",
            dark: "#171717",
            contrastText: "#dcdcdc"
        },
        secondary: {
            light: "#5cdee6",
            main: "#03acb4",
            dark: "#007c84",
            contrastText: "#dcdcdc"
        },

        //dark theme text
        text: {
            disabled: "#2f2f2f",
            hint: "#b3b3b3",
            primary: "#dcdcdc",
            secondary: "#959595"
        }

        //Light theme text
        // text:{
        //   disabled:"rgba(0, 0, 0, 0.38)",
        //   hint:"rgba(0, 0, 0, 0.38)",
        //   primary:"rgba(0, 0, 0, 0.8)",
        //   secondary:"rgba(0, 0, 0, 0.54)"
        // }
    }
});

// console.log(theme);
export default theme;
// {
//     palette: {
//         action: {
//             active: "rgba(255, 255, 255, 0.8)",
//             hover: "rgba(255, 255, 255, 0.5)"
//         },
//         // ISC Blue background
//         background: {
//             paper: "#121e36",
//             default: "#3b4560"
//         },
//         primary: {
//             light: "#67708d",
//             main: "#3b4560",
//             dark: "#121e36",
//             contrastText: "#fff"
//         },
//         white: {
//             light: "#67708d",
//             main: "rgba(255,255,255,0.5)",
//             dark: "#121e36",
//             contrastText: "#fff"
//         },
//         secondary: {
//             light: "#878cb7",
//             main: "#595f87",
//             dark: "#2d355a",
//             contrastText: "#fff"
//         },

//         //Black background
//         // background:{
//         // paper:'#0c0c0c',
//         // default:'#333333'
//         // },
//         // primary: {
//         // light: "#5c5c5c",
//         // main: "#333333",
//         // dark: "#0c0c0c",
//         // contrastText: "#fff"
//         // },
//         // secondary: {
//         // light: "#454545",
//         // main: "#1e1e1e",
//         // dark: "#000000",
//         // contrastText: "#fff"
//         // },

//         //White background
//         // background:{
//         //   paper:'#c2c2c2',
//         //   default:'#f5f5f5'
//         //   },
//         //   primary: {
//         //   light: "#ffffff",
//         //   main: "#f5f5f5",
//         //   dark: "#c2c2c2",
//         //   contrastText: "#000"
//         //   },
//         //   secondary: {
//         //   light: "#52bcc6",
//         //   main: "#008c95",
//         //   dark: "#005e67",
//         //   contrastText: "#000"
//         //   },

//         //dark theme text
//         text: {
//             disabled: "rgba(0, 0, 0, 0.38)",
//             hint: "rgba(0, 0, 0, 0.38)",
//             primary: "rgba(255, 255, 255, 0.8)",
//             secondary: "rgba(255, 255, 255, 0.54)"
//         }

//         //Light theme text
//         // text:{
//         //   disabled:"rgba(0, 0, 0, 0.38)",
//         //   hint:"rgba(0, 0, 0, 0.38)",
//         //   primary:"rgba(0, 0, 0, 0.8)",
//         //   secondary:"rgba(0, 0, 0, 0.54)"
//         // }

//         //   // error: will us the default color
//     },
//     typography: {
//         body2: {
//             lineHeight: "normal"
//         },
//         headline: {
//             color: "#FFF"
//             // fontSize: '1.25rem',
//             // lineHeight:"1.5rem"
//         }
//     },

//     // public style
//     publicStyle: {
//         width100: "100%",
//         height100: "100%",
//         white: "#FFF",
//         fixed: "fixed",
//         zero: 0
//     },
//     // custom style
//     cardHeader: {
//         paddingTB: "16px",
//         paddingLR: "16px",
//         btnWidth: "32px",
//         btnHeight: "32px"
//     },
//     Header: {
//         paddingTB: "6px",
//         paddingLR: "16px",
//         btnWidth: "30px",
//         btnHeight: "30px",
//         paddingTop: "22px"
//     }
// }
