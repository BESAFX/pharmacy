app.service('ModalProvider', ['$uibModal', '$log', '$rootScope', function ($uibModal, $log, $rootScope) {

    /**************************************************************
     *                                                            *
     * Customer Model                                             *
     *                                                            *
     *************************************************************/
    this.openCustomerCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/customer/customerCreateUpdate.html',
            controller: 'customerCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء حساب عميل جديد' : 'New Customer';
                },
                action: function () {
                    return 'create';
                },
                customer: function () {
                    return {};
                }
            }
        });
    };

    this.openCustomerUpdateModel = function (customer) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/customer/customerCreateUpdate.html',
            controller: 'customerCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل حساب عميل' : 'Update Customer Information';
                },
                action: function () {
                    return 'update';
                },
                customer: function () {
                    return customer;
                }
            }
        });
    };

    this.openCustomerDetailsModel = function (customer) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/customer/customerDetails.html',
            controller: 'customerDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                customer: function () {
                    return customer;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * VacationType Model                                         *
     *                                                            *
     *************************************************************/
    this.openVacationTypeCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/vacationType/vacationTypeCreateUpdate.html',
            controller: 'vacationTypeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء بند اجازة جديد' : 'New Vacation Type';
                },
                action: function () {
                    return 'create';
                },
                vacationType: function () {
                    return {};
                }
            }
        });
    };

    this.openVacationTypeUpdateModel = function (vacationType) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/vacationType/vacationTypeCreateUpdate.html',
            controller: 'vacationTypeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بند اجازة' : 'Update Vacation Type Information';
                },
                action: function () {
                    return 'update';
                },
                vacationType: function () {
                    return vacationType;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Vacation Model                                             *
     *                                                            *
     *************************************************************/
    this.openVacationCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/vacation/vacationCreateUpdate.html',
            controller: 'vacationCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء اجازة جديد' : 'New Vacation';
                },
                action: function () {
                    return 'create';
                },
                vacation: function () {
                    return {};
                }
            }
        });
    };

    this.openVacationUpdateModel = function (vacation) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/vacation/vacationCreateUpdate.html',
            controller: 'vacationCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات الاجازة' : 'Update Vacation Information';
                },
                action: function () {
                    return 'update';
                },
                vacation: function () {
                    return vacation;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * DeductionType Model                                        *
     *                                                            *
     *************************************************************/
    this.openDeductionTypeCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/deductionType/deductionTypeCreateUpdate.html',
            controller: 'deductionTypeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء بند استقطاع جديد' : 'New Deduction Type';
                },
                action: function () {
                    return 'create';
                },
                deductionType: function () {
                    return {};
                }
            }
        });
    };

    this.openDeductionTypeUpdateModel = function (deductionType) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/deductionType/deductionTypeCreateUpdate.html',
            controller: 'deductionTypeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بند استقطاع' : 'Update Deduction Type Information';
                },
                action: function () {
                    return 'update';
                },
                deductionType: function () {
                    return deductionType;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Deduction Model                                            *
     *                                                            *
     *************************************************************/
    this.openDeductionCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/deduction/deductionCreateUpdate.html',
            controller: 'deductionCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء استقطاع جديد' : 'New Deduction';
                },
                action: function () {
                    return 'create';
                },
                deduction: function () {
                    return {};
                }
            }
        });
    };

    this.openDeductionUpdateModel = function (deduction) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/deduction/deductionCreateUpdate.html',
            controller: 'deductionCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات الاستقطاع' : 'Update Deduction Information';
                },
                action: function () {
                    return 'update';
                },
                deduction: function () {
                    return deduction;
                }
            }
        });
    };
    /**************************************************************
     *                                                            *
     * Salary Model                                               *
     *                                                            *
     *************************************************************/
    this.openSalaryCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/salary/salaryCreateUpdate.html',
            controller: 'salaryCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء سند راتب جديد' : 'New Salary';
                },
                action: function () {
                    return 'create';
                },
                salary: function () {
                    return {};
                }
            }
        });
    };

    this.openSalaryUpdateModel = function (salary) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/salary/salaryCreateUpdate.html',
            controller: 'salaryCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات سند الراتب' : 'Update Salary Information';
                },
                action: function () {
                    return 'update';
                },
                salary: function () {
                    return salary;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Supplier Model                                             *
     *                                                            *
     *************************************************************/
    this.openSupplierCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/supplier/supplierCreateUpdate.html',
            controller: 'supplierCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء حساب مورد جديد' : 'New Supplier';
                },
                action: function () {
                    return 'create';
                },
                supplier: function () {
                    return {};
                }
            }
        });
    };

    this.openSupplierUpdateModel = function (supplier) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/supplier/supplierCreateUpdate.html',
            controller: 'supplierCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل حساب مورد' : 'Update Supplier Information';
                },
                action: function () {
                    return 'update';
                },
                supplier: function () {
                    return supplier;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Bank Model                                                 *
     *                                                            *
     *************************************************************/
    this.openBankReceiptInCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/bank/bankReceiptCreate.html',
            controller: 'bankReceiptCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                receiptType: function () {
                    return 'In';
                }
            }
        });
    };

    this.openBankReceiptOutCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/bank/bankReceiptCreate.html',
            controller: 'bankReceiptCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                receiptType: function () {
                    return 'Out';
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Doctor Model                                               *
     *                                                            *
     *************************************************************/
    this.openDoctorCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/doctor/doctorCreateUpdate.html',
            controller: 'doctorCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء حساب طبيب جديد' : 'New Doctor';
                },
                action: function () {
                    return 'create';
                },
                doctor: function () {
                    return {};
                }
            }
        });
    };

    this.openDoctorUpdateModel = function (doctor) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/doctor/doctorCreateUpdate.html',
            controller: 'doctorCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل حساب طبيب' : 'Update Doctor Information';
                },
                action: function () {
                    return 'update';
                },
                doctor: function () {
                    return doctor;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Employee Model                                             *
     *                                                            *
     *************************************************************/
    this.openEmployeeCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/employeeCreateUpdate.html',
            controller: 'employeeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء حساب موظف جديد' : 'New Employee';
                },
                action: function () {
                    return 'create';
                },
                employee: function () {
                    return {};
                }
            }
        });
    };

    this.openEmployeeUpdateModel = function (employee) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/employee/employeeCreateUpdate.html',
            controller: 'employeeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل حساب موظف' : 'Update Employee Information';
                },
                action: function () {
                    return 'update';
                },
                employee: function () {
                    return employee;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * DetectionType Model                                        *
     *                                                            *
     *************************************************************/
    this.openDetectionTypeCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/detectionType/detectionTypeCreateUpdate.html',
            controller: 'detectionTypeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء نوع فحص جديد' : 'New Detection Type';
                },
                action: function () {
                    return 'create';
                },
                detectionType: function () {
                    return {};
                }
            }
        });
    };

    this.openDetectionTypeUpdateModel = function (detectionType) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/detectionType/detectionTypeCreateUpdate.html',
            controller: 'detectionTypeCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل نوع فحص' : 'Update Detection Type Information';
                },
                action: function () {
                    return 'update';
                },
                detectionType: function () {
                    return detectionType;
                }
            }
        });
    };

    this.openDetectionTypeHeavyWorkModel = function () {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/detectionType/detectionTypeHeavyWork.html',
            controller: 'detectionTypeHeavyWorkCtrl',
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Order Model                                                *
     *                                                            *
     *************************************************************/
    this.openOrderCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/order/orderCreate.html',
            controller: 'orderCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء طلب جديد' : 'New Order';
                },
                order: function () {
                    return {};
                }
            }
        });
    };

    this.openOrderDetectionTypeCreateModel = function (order) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/order/orderDetectionTypeCreate.html',
            controller: 'orderDetectionTypeCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                order: function () {
                    return order;
                }
            }
        });
    };

    this.openOrderDetailsModel = function (order) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/order/orderDetails.html',
            controller: 'orderDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                order: function () {
                    return order;
                }
            }
        });
    };

    this.openOrderReceiptCreateModel = function (order) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/order/orderReceiptCreate.html',
            controller: 'orderReceiptCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                order: function () {
                    return order;
                }
            }
        });
    };

    this.openReportOrderByListModel = function (orders) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/order/orderByList.html",
            controller: "orderByListCtrl",
            backdrop: 'static',
            keyboard: false,
            resolve: {
                orders: function () {
                    return orders;
                }
            }
        });
    };

    this.openReportOrderDetailsByListModel = function (orders) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/order/orderDetailsByList.html",
            controller: "orderDetailsByListCtrl",
            backdrop: 'static',
            keyboard: false,
            resolve: {
                orders: function () {
                    return orders;
                }
            }
        });
    };

    this.openReportOrderByDateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/order/orderByDate.html",
            controller: "orderByDateCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openReportOrderDetailsByDateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/order/orderDetailsByDate.html",
            controller: "orderDetailsByDateCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openReportOrderDetectionModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/order/orderDetection.html",
            controller: "orderDetectionCtrl",
            backdrop: 'static',
            keyboard: false,
            size:'lg'
        });
    };

    this.openReportOrderResultModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/order/orderResult.html",
            controller: "orderResultCtrl",
            backdrop: 'static',
            keyboard: false,
            size:'lg'
        });
    };

    /**************************************************************
     *                                                            *
     * Diagnosis Model                                            *
     *                                                            *
     *************************************************************/
    this.openDiagnosisCreateModel = function (order) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/diagnosis/diagnosisCreate.html',
            controller: 'diagnosisCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                order: function () {
                    return order;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Drug Model                                                 *
     *                                                            *
     *************************************************************/
    this.openDrugCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/drug/drugCreateUpdate.html',
            controller: 'drugCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء دواء جديد' : 'New Drug';
                },
                action: function () {
                    return 'create';
                },
                drug: function () {
                    return {};
                }
            }
        });
    };

    this.openDrugUpdateModel = function (drug) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/drug/drugCreateUpdate.html',
            controller: 'drugCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات دواء' : 'Update Drug Information';
                },
                action: function () {
                    return 'update';
                },
                drug: function () {
                    return drug;
                }
            }
        });
    };

    this.openDrugDetailsModel = function (drug) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/drug/drugDetails.html',
            controller: 'drugDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                drug: function () {
                    return drug;
                }
            }
        });
    };

    this.openDrugHeavyWorkModel = function () {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/drug/drugHeavyWork.html',
            controller: 'drugHeavyWorkCtrl',
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openDrugCategoryCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/drug/drugCategoryCreateUpdate.html',
            controller: 'drugCategoryCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء تصنيف دواء جديد' : 'New Drug Category';
                },
                action: function () {
                    return 'create';
                },
                drugCategory: function () {
                    return {};
                }
            }
        });
    };

    this.openDrugCategoryHeavyWorkModel = function () {
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/drug/drugCategoryHeavyWork.html',
            controller: 'drugCategoryHeavyWorkCtrl',
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openDrugTransactionBuyCreateModel = function (drug) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/drug/drugTransactionBuyCreate.html',
            controller: 'drugTransactionBuyCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                drug: function () {
                    return drug;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * BillBuy Model                                              *
     *                                                            *
     *************************************************************/
    this.openBillBuyCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billBuy/billBuyCreate.html',
            controller: 'billBuyCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء فاتورة شراء جديدة' : 'New Bill Buy';
                },
                billBuy: function () {
                    return {};
                }
            }
        });
    };

    this.openBillBuyHeadCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billBuy/billBuyHeadCreate.html',
            controller: 'billBuyHeadCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        });
    };

    this.openTransactionBuyCreateModel = function (billBuy) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billBuy/transactionBuyCreate.html',
            controller: 'transactionBuyCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'حركة شراء جديدة' : 'New Transaction Buy';
                },
                billBuy: function () {
                    return billBuy;
                }
            }
        });
    };

    this.openUpdatePricesModel = function (transactionBuy) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billBuy/updatePrices.html',
            controller: 'updatePricesCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                transactionBuy: function () {
                    return transactionBuy;
                }
            }
        });
    };

    this.openUpdateQuantityModel = function (transactionBuy) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billBuy/updateQuantity.html',
            controller: 'updateQuantityCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                transactionBuy: function () {
                    return transactionBuy;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * BillSell Model                                             *
     *                                                            *
     *************************************************************/
    this.openBillSellCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billSell/billSellCreate.html',
            controller: 'billSellCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء فاتورة بيع جديدة' : 'New Bill Sell';
                },
                billSell: function () {
                    return {};
                }
            }
        });
    };

    this.openBillSellForOrderCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billSell/billSellForOrderCreate.html',
            controller: 'billSellForOrderCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'صرف علاج طلب فحص' : 'New Bill Sell For Order';
                }
            }
        });
    };

    this.openBillSellHeadCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billSell/billSellHeadCreate.html',
            controller: 'billSellHeadCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg'
        });
    };

    this.openBillSellReceiptCreateModel = function (billSell) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billSell/billSellReceiptCreate.html',
            controller: 'billSellReceiptCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                billSell: function () {
                    return billSell;
                }
            }
        });
    };

    this.openTransactionSellCreateModel = function (billSell) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/billSell/transactionSellCreate.html',
            controller: 'transactionSellCreateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'حركة بيع جديدة' : 'New Transaction Sell';
                },
                billSell: function () {
                    return billSell;
                }
            }
        });
    };

    this.openReportBillSellByListModel = function (billSells) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/billSell/billSellByList.html",
            controller: "billSellByListCtrl",
            backdrop: 'static',
            keyboard: false,
            resolve: {
                billSells: function () {
                    return billSells;
                }
            }
        });
    };

    this.openReportBillSellDetailsByListModel = function (billSells) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/billSell/billSellDetailsByList.html",
            controller: "billSellDetailsByListCtrl",
            backdrop: 'static',
            keyboard: false,
            resolve: {
                billSells: function () {
                    return billSells;
                }
            }
        });
    };

    this.openReportBillSellByDateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/billSell/billSellByDate.html",
            controller: "billSellByDateCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    this.openReportBillSellDetailsByDateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "/ui/partials/report/billSell/billSellDetailsByDate.html",
            controller: "billSellDetailsByDateCtrl",
            backdrop: 'static',
            keyboard: false
        });
    };

    /**************************************************************
     *                                                            *
     * Falcon Model                                               *
     *                                                            *
     *************************************************************/
    this.openFalconCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/falcon/falconCreateUpdate.html',
            controller: 'falconCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء حساب صقر جديد' : 'New Falcon Account';
                },
                action: function () {
                    return 'create';
                },
                falcon: function () {
                    return {};
                }
            }
        });
    };

    this.openFalconUpdateModel = function (falcon) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/falcon/falconCreateUpdate.html',
            controller: 'falconCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل حساب الصقر' : 'Update Falcon Account Information';
                },
                action: function () {
                    return 'update';
                },
                falcon: function () {
                    return falcon;
                }
            }
        });
    };

    this.openFalconDetailsModel = function (falcon) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/falcon/falconDetails.html',
            controller: 'falconDetailsCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                falcon: function () {
                    return falcon;
                }
            }
        });
    };

    /**************************************************************
     *                                                            *
     * Team Model                                                 *
     *                                                            *
     *************************************************************/
    this.openTeamCreateModel = function () {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/team/teamCreateUpdate.html',
            controller: 'teamCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'انشاء مجموعة جديدة' : 'New Team';
                },
                action: function () {
                    return 'create';
                },
                team: function () {
                    return undefined;
                }
            }
        });
    };

    this.openTeamUpdateModel = function (team) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/team/teamCreateUpdate.html',
            controller: 'teamCreateUpdateCtrl',
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                title: function () {
                    return $rootScope.lang === 'AR' ? 'تعديل بيانات مجموعة' : 'Update Team';
                },
                action: function () {
                    return 'update';
                },
                team: function () {
                    return team;
                }
            }
        });
    };

    this.openPersonsReportModel = function (persons) {
        return $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/ui/partials/report/person/personsIn.html',
            controller: 'personsInCtrl',
            backdrop: 'static',
            keyboard: false,
            resolve: {
                persons: function () {
                    return persons;
                }
            }
        });
    };

}]);

app.service('NotificationProvider', ['$http', function ($http) {

    this.notifyOne = function (code, title, message, type, receiver) {
        $http.post("/notifyOne?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
            + '&'
            + 'receiver=' + receiver);
    };
    this.notifyAll = function (code, title, message, type) {
        $http.post("/notifyAll?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
        );
    };
    this.notifyAllExceptMe = function (code, title, message, type) {
        $http.post("/notifyAllExceptMe?"
            + 'code=' + code
            + '&'
            + 'title=' + title
            + '&'
            + 'message=' + message
            + '&'
            + 'type=' + type
        );
    };

}]);

