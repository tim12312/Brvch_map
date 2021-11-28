/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();
WA.state.saveVariable("link", "https://opentogethertube.com/room/BrvchFloor"); ///


WA.room.onEnterZone('clock', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","hier kannst du entscheiden ob die musik über youtube laufen soll oder über den stream server, dann kannst du auflegen",[
        {
        label: "Close",
        className: "primary",
        callback: (popup) => {
            // Close the popup when the "Close" button is pressed.
            popup.close();
        }
    },
        {
        label: "stream",
            className: "primary",
            callback: (popup) => {
                WA.room.setProperty('audio', 'openWebsite',undefined);    
                WA.room.setProperty('audio', 'playAudio',"http://localhost:8000/example");    
            }
        
        },
        {
            label: "youtube",
                className: "primary",
                callback: (popup) => {
                    // Close the popup when the "Close" button is pressed.
                    WA.room.setProperty('audio', 'openWebsite', 'https://opentogethertube.com/room/BrvchFloor'); 
                    WA.room.setProperty('audio', 'playAudio',undefined);    
                       
                }
            
            }
]);
})

WA.room.onLeaveZone('clock', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
