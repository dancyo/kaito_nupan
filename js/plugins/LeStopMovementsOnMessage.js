/*
#=============================================================================
# Stop Movements On Message
# LeStopMovementsOnMessage.js
# By Lecode
# Version 1.00
#-----------------------------------------------------------------------------
# TERMS OF USE
#-----------------------------------------------------------------------------
# - Credit required
# - Keep this header
# - Free for commercial use
#=============================================================================
*/
var Imported = Imported || {};
Imported.Lecode_LeStopMovementsOnMessage = true;
/*:
 * @plugindesc Automatically stops all events' movement when
 * the message window is active
 * @author Lecode
 * @version 1.0
 *
 * @param Stop when event runing ?
 * @desc Also stop when an event is runing ?
 * Default: false
 * @default false
 *
 * @help
 * Plugin Commands:
 *   -> StopMovementsOnMessage ON    ( Enable the script)
 *   -> StopMovementsOnMessage OFF   ( Disable the script)
*/
//#=============================================================================

(function() {

/*-------------------------------------------------------------------------
* Parameters
-------------------------------------------------------------------------*/
var parameters = PluginManager.parameters('LeStopMovementsOnMessage');
var pStopWhenEventRuning = (parameters['Stop when event runing ?'] || 'true') === 'true';
var pEnabled = true;


/*-------------------------------------------------------------------------
* Game_Interpreter
-------------------------------------------------------------------------*/
var oldPluginCommand_method = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    oldPluginCommand_method.call(this, command, args);
    if (command === 'StopMovementsOnMessage') {
        switch (args[0]) {
        case 'ON':
            pEnabled = true;
            break;
        case 'OFF':
        	pEnabled = false;
            break;
        }
    }
};


/*-------------------------------------------------------------------------
* Game_Event
-------------------------------------------------------------------------*/
var oldUpdateMove_method = Game_Event.prototype.updateMove;
Game_Event.prototype.updateMove = function() {
	if( pEnabled ) {
		if( ( pStopWhenEventRuning && $gameMap.isEventRunning() ) || $gameMessage.isBusy() ) {
			return;
		}
	}
	oldUpdateMove_method.call(this);
};

var oldUpdateAnim_method = Game_Event.prototype.updateAnimation;
Game_Event.prototype.updateAnimation = function() {
	if( pEnabled ) {
		if( ( pStopWhenEventRuning && $gameMap.isEventRunning() ) || $gameMessage.isBusy() ) {
			return;
		}
	}
	oldUpdateAnim_method.call(this);
};


})();