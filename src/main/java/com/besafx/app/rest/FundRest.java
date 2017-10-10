package com.besafx.app.rest;

import com.besafx.app.entity.enums.PaymentMethod;
import com.besafx.app.service.OrderDetectionTypeService;
import com.besafx.app.service.TransactionSellService;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/fund/")
public class FundRest {

    private final static Logger log = LoggerFactory.getLogger(FundRest.class);

    @Autowired
    private OrderDetectionTypeService orderDetectionTypeService;

    @Autowired
    private TransactionSellService transactionSellService;

    @RequestMapping(value = "findDetectionsCostByDate/{date}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Double findDetectionsCostByDate(@PathVariable(value = "date") Long date, Principal principal) {
        return orderDetectionTypeService
                .findByOrderPaymentMethodAndOrderDateBetween(PaymentMethod.Cash ,new DateTime(date).withTimeAtStartOfDay().toDate(),
                        new DateTime(date).plusDays(1).withTimeAtStartOfDay().toDate())
                .stream()
                .mapToDouble(orderDetectionType -> orderDetectionType.getDetectionType().getCost())
                .sum();
    }

    @RequestMapping(value = "findSalesCostByDate/{date}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Double findSalesCostByDate(@PathVariable(value = "date") Long date, Principal principal) {
        return transactionSellService
                .findByBillSellPaymentMethodAndDateBetween(PaymentMethod.Cash, new DateTime(date).withTimeAtStartOfDay().toDate(),
                        new DateTime(date).plusDays(1).withTimeAtStartOfDay().toDate())
                .stream()
                .mapToDouble(transactionSell -> transactionSell.getUnitSellCost() * transactionSell.getQuantity())
                .sum();
    }
}