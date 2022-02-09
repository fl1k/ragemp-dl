let dlEnabled = false;
mp.events.addCommand("dl", function () {
    if(dlEnabled)
        mp.gui.chat.push("!{#0099ff}[dl] !{White}Hiding vehicle info.");
    else
        mp.gui.chat.push("!{#0099ff}[dl] !{White}Showing vehicle info.");
    dlEnabled = !dlEnabled;
});

mp.events.add("render", () => {
    if(dlEnabled)
    {
        mp.vehicles.forEachInStreamRange((vehicle) => { 
            if(mp.players.local.position.subtract(vehicle.position).length() < 10)
            {
                const drawPosition = [vehicle.position.x, vehicle.position.y, vehicle.position.z + 0.3];
                mp.game.graphics.drawText(`~b~Id: ~w~${vehicle.remoteId}\n~b~Model: ~w~${mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model))}\n~b~Position: ~w~${vehicle.position.x.toFixed(2)}, ${vehicle.position.y.toFixed(2)}, ${vehicle.position.z.toFixed(2)}\n`, drawPosition, { 
                    font: 0, 
                    color: [255, 255, 255, 185], 
                    scale: [0.25, 0.25], 
                    outline: true,
                    centre: false
                });
                mp.game.graphics.drawText(`\n\n\n~b~Heading: ~w~${vehicle.getHeading().toFixed(2)}\n~b~Health: ~w~${vehicle.getHealth()}`, drawPosition, { 
                    font: 0, 
                    color: [255, 255, 255, 185], 
                    scale: [0.25, 0.25], 
                    outline: true,
                    centre: false
                });
            }
        }); 
    }
});