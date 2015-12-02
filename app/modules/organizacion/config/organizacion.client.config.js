'use strict';

// Configuring the Chat module
angular.module('organizacion').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', {
            title: 'Organizacion',
            state: 'organizacion.app'
        });
    }
]);
