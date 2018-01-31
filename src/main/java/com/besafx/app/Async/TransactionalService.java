package com.besafx.app.Async;

import com.besafx.app.entity.BillSell;
import com.besafx.app.entity.Drug;
import com.besafx.app.entity.Order;
import com.besafx.app.service.BillSellService;
import com.besafx.app.service.DrugService;
import com.besafx.app.service.OrderService;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class TransactionalService {

    @Autowired
    private OrderService orderService;

    @Autowired
    private DrugService drugService;

    @Autowired
    private BillSellService billSellService;

    @Transactional
    public List<Order> getOrders(Date dateFrom, Date dateTo) {
        List<Order> list = new ArrayList<>();
        orderService.findByDateBetween(dateFrom, dateTo).forEach(order -> {
            order.getNetCost();
            order.getPaid();
            order.getRemain();
            list.add(order);
        });
        return list;
    }

    @Transactional
    public List<Order> getOrdersDebt(Date dateFrom, Date dateTo) {
        List<Order> list = new ArrayList<>();
        orderService.findByDateBetween(
                new DateTime(dateFrom).withTimeAtStartOfDay().toDate(),
                new DateTime(dateTo).plusDays(1).withTimeAtStartOfDay().toDate())
                .stream()
                .filter(order -> order.getRemain() > 0).forEach(order -> {
            order.getNetCost();
            order.getPaid();
            order.getRemain();
            list.add(order);
        });
        return list;
    }

    @Transactional
    public List<Drug> getAllDrugs() {
        List<Drug> list = new ArrayList<>();
        Lists.newArrayList(drugService.findAll()).
                stream()
                .filter(drug -> drug.getRealQuantitySum() < 50)
                .sorted(Comparator.comparing(Drug::getRealQuantitySum))
                .forEach(drug -> {
            drug.getTransactionBuysSum();
            drug.getTransactionSellsSum();
            drug.getRealQuantitySum();
            list.add(drug);
        });
        return list;
    }

    @Transactional
    public List<BillSell> getInsideSalesDebt(Long dateFrom, Long dateTo) {
        List<BillSell> list = new ArrayList<>();
        billSellService.findByDateBetweenAndOrderIsNotNull(
                new DateTime(dateFrom).withTimeAtStartOfDay().toDate(),
                new DateTime(dateTo).plusDays(1).withTimeAtStartOfDay().toDate())
                .stream()
                .filter(billSell -> billSell.getRemain() > 0)
                .forEach(billSell -> {
                    billSell.getNet();
                    billSell.getPaid();
                    billSell.getRemain();
                    list.add(billSell);
                });
        return list;
    }

    @Transactional
    public List<BillSell> getOutsideSalesDebt(Long dateFrom, Long dateTo) {
        List<BillSell> list = new ArrayList<>();
        billSellService.findByDateBetweenAndOrderIsNull(
                new DateTime(dateFrom).withTimeAtStartOfDay().toDate(),
                new DateTime(dateTo).plusDays(1).withTimeAtStartOfDay().toDate())
                .stream()
                .filter(billSell -> billSell.getRemain() > 0)
                .forEach(billSell -> {
                    billSell.getNet();
                    billSell.getPaid();
                    billSell.getRemain();
                    list.add(billSell);
                });
        return list;
    }
}