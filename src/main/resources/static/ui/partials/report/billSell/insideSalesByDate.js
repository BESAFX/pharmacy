app.controller('insideSalesByDateCtrl', ['$scope', '$rootScope', '$timeout', '$uibModalInstance',
    function ($scope, $rootScope, $timeout, $uibModalInstance) {

        $scope.buffer = {};

        $scope.submit = function () {
            window.open('/report/insideSales/date?'
                + 'exportType=' + 'PDF'
                + '&dateFrom=' + $scope.buffer.dateFrom.getTime()
                + '&dateTo=' + $scope.buffer.dateTo.getTime()
            );
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);