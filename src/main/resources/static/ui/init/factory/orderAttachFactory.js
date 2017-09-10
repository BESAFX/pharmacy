app.factory("OrderAttachService",
    ['$http', '$log', function ($http, $log) {
        return {
            upload: function (order, attachType, fileName, file) {
                var fd = new FormData();
                fd.append('file', file);
                return $http.post("/api/orderAttach/upload/" + order.id + "/" + attachType.id + "?fileName=" + fileName,
                    fd, {transformRequest: angular.identity, headers: {'Content-Type': undefined}}).then(function (response) {
                    return response.data;
                });
            },
            remove: function (orderAttach) {
                return $http.delete("/api/orderAttach/delete/" + orderAttach.id).then(function (response) {
                    return response.data;
                });
            },
            removeWhatever: function (orderAttach) {
                return $http.delete("/api/orderAttach/deleteWhatever/" + orderAttach.id);
            },
            findByOrder: function (order) {
                return $http.get("/api/orderAttach/findByOrder/" + order.id).then(function (response) {
                    return response.data;
                });
            }
        };
    }]);