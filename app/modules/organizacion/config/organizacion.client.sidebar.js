'use strict';

// Setting up sidebar
angular.module('organizacion').controller('OrganizacionSidebarController',
    function ($scope, Auth, $menuItemsOrganizacion) {
        $scope.menuItems = $menuItemsOrganizacion.prepareSidebarMenu().getAll();
    }
);
