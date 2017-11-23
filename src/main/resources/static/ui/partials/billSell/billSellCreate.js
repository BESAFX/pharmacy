app.controller('billSellCreateCtrl', ['TransactionBuyService', 'DrugService', 'DrugUnitService', 'CustomerService', 'ModalProvider', 'BillSellService', '$scope', '$rootScope', '$timeout', '$log', '$uibModalInstance', 'title', 'billSell',
    function (TransactionBuyService, DrugService, DrugUnitService, CustomerService, ModalProvider, BillSellService, $scope, $rootScope, $timeout, $log, $uibModalInstance, title, billSell) {

        $timeout(function () {
            $scope.refreshDrugs();
        }, 2000);

        $scope.billSell = billSell;

        $scope.buffer = {};

        $scope.buffer.drug = {};

        $scope.transactionSellList = [];

        $scope.title = title;

        $scope.buffer.drug.transactionBuys = [];

        $scope.selectedTransactionBuy = {};

        $scope.receipt = {};

        $scope.setSelectedTransactionBuy = function (object) {
            if (object) {
                angular.forEach($scope.buffer.drug.transactionBuys, function (transactionBuy) {
                    if (object.id == transactionBuy.id) {
                        $scope.selectedTransactionBuy = transactionBuy;
                        $scope.transactionBuyCalculation();
                        return transactionBuy.isSelected = true;
                    } else {
                        return transactionBuy.isSelected = false;
                    }
                });
            }
        };

        $scope.transactionBuyCalculation = function () {
            DrugUnitService.getRelatedPrices($scope.selectedTransactionBuy.id).then(function (data) {
                $scope.relatedPrices = data;
            });
        };

        $scope.refreshDrugs = function () {
            DrugService.findAllCombo().then(function (data) {
                $scope.drugs = data;
            });
        };

        $scope.refreshTransactionBuyByDrug = function () {
            TransactionBuyService.findByDrug($scope.buffer.drug.id).then(function (data) {
                $scope.buffer.drug.transactionBuys = data
            });
        };

        $scope.calculateCostSum = function () {
            $scope.totalCost = 0;
            $scope.totalCostAfterDiscount = 0;
            if ($scope.transactionSellList) {
                for (var i = 0; i < $scope.transactionSellList.length; i++) {
                    var transactionSell = $scope.transactionSellList[i];
                    $scope.totalCost = $scope.totalCost + (transactionSell.unitSellCost * transactionSell.quantity);
                }
                $scope.totalCostAfterDiscount = $scope.totalCost - (($scope.totalCost * $scope.billSell.discount) / 100);
            }
        };

        $scope.addTransactionSellToList = function () {
            //Add To Table
            var transactionSell = {};
            transactionSell.transactionBuy = $scope.selectedTransactionBuy;
            transactionSell.drug = $scope.buffer.drug;
            transactionSell.drugUnit = $scope.buffer.related.obj1;
            transactionSell.unitSellCost = $scope.buffer.related.obj3;
            transactionSell.quantity = $scope.buffer.quantity;
            transactionSell.note = $scope.buffer.note;
            $scope.transactionSellList.push(transactionSell);
            $scope.buffer = {};
            $scope.relatedPrices = {};
            $scope.calculateCostSum();
        };

        $scope.removeTransactionSellFromList = function (index) {
            $scope.transactionSellList.splice(index, 1);
            $scope.calculateCostSum();
        };

        $scope.submit = function () {
            $scope.billSell.transactionSells = $scope.transactionSellList;
            //
            if($scope.receipt.paymentMethod!=='Later'){
                var billSellReceipts = [];
                var billSellReceipt = {};
                billSellReceipt.receipt = $scope.receipt;
                billSellReceipts.push(billSellReceipt);
                $scope.billSell.billSellReceipts = billSellReceipts;
            }
            //
            BillSellService.create($scope.billSell).then(function (data) {
                $uibModalInstance.close(data);
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);