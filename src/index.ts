/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));


let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();
WA.state.saveVariable("link", "https://opentogethertube.com/room/BrvchFloor"); ///

var licht =false;
WA.room.hideLayer("light");


var bier = 0;
var pfeffi = 0;
var mate = 0;
var trinkgehalt="data:text/html;charset=utf-8,<h1>Was du schon getrunken hast </h1><br> <h3> Bier: "+bier+"</h3><h3> Pfeffi: "+pfeffi+"</h3><h3> Mate: "+mate+"<h3>"

var menu = WA.ui.registerMenuCommand('Drinks',{iframe:trinkgehalt});
//WA.room.setProperty("light","visible",0);

WA.chat.onChatMessage((message => {
    if(message==="drinks"){
        WA.chat.sendChatMessage(" Bier: "+bier+"\n Pfeffi: "+pfeffi+"\n Mate: "+mate+"\n", 'Mr Robot');
    }
}));


WA.room.onEnterZone('clock', () => {
    currentPopup = WA.ui.openPopup("clockPopup", "hier kannst du entscheiden ob die musik über youtube laufen soll oder über den stream server, dann kannst du auflegen", [
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
                WA.room.setProperty('audio', 'openWebsite', undefined);
                WA.room.setProperty('audio', 'playAudio', "http://c103-201.cloud.gwdg.de:8000/dancefloorStream");
            }

        },
        {
            label: "youtube",
            className: "primary",
            callback: (popup) => {
                // Close the popup when the "Close" button is pressed.
                WA.room.setProperty('audio', 'openWebsite', 'https://opentogethertube.com/room/BrvchFloor');
                WA.room.setProperty('audio', 'playAudio', undefined);

            }
        },
            {
                label: "light",
                className: "primary",
                callback: (popup) => {
                    if(licht){
                        WA.room.hideLayer("light");
                    }else{
                        WA.room.showLayer("light");
                    }
                    licht =!licht;
                }    
        }
    ]);
})

WA.room.onLeaveZone('clock', closePopUp)



WA.room.onEnterZone('drink', () => {
    currentPopup = WA.ui.openPopup("BarMenu", "Willst du was Trinken", [
        {
            label: "Bier",
            className: "primary",
            callback: (popup) => {
                bier++;
                trinkgehalt="data:text/html;charset=utf-8,<h1>  Was du schon getrunken hast </h1><br> <h3> Bier: "+bier+"</h3><h3> Pfeffi: "+pfeffi+"</h3><h3> Mate: "+mate+"<h3>"
                menu.remove()
                menu = WA.ui.registerMenuCommand('Drinks',{iframe:trinkgehalt});
                closePopUp()
            }
        },
        {
            label: "Pfeffi",
            className: "primary",
            callback: (popup) => {
                pfeffi++;
                trinkgehalt="data:text/html;charset=utf-8,<h1>  Was du schon getrunken hast </h1><br> <h3> Bier: "+bier+"</h3><h3> Pfeffi: "+pfeffi+"</h3><h3> Mate: "+mate+"<h3>"
                menu.remove()
                menu = WA.ui.registerMenuCommand('Drinks',{iframe:trinkgehalt});
                closePopUp()

            }

        },
        {
            label: "Mate",
            className: "primary",
            callback: (popup) => {
                mate++;
                trinkgehalt="data:text/html;charset=utf-8,<h1> Was du schon getrunken hast </h1><br> <h3> Bier: "+bier+"</h3><h3> Pfeffi: "+pfeffi+"</h3><h3> Mate: "+mate+"<h3>"
                menu.remove()
                menu = WA.ui.registerMenuCommand('Drinks',{iframe:trinkgehalt});
                closePopUp()

            }
        },
        {
            label: "nein",
            className: "primary",
            callback: (popup) => {
                closePopUp()
            }
        }
    ]);
})

WA.room.onLeaveZone('drink', closePopUp)




function closePopUp() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
