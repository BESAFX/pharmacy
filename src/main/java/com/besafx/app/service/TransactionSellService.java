package com.besafx.app.service;

import com.besafx.app.entity.Drug;
import com.besafx.app.entity.DrugUnit;
import com.besafx.app.entity.Order;
import com.besafx.app.entity.TransactionSell;
import com.besafx.app.entity.enums.PaymentMethod;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public interface TransactionSellService extends PagingAndSortingRepository<TransactionSell, Long>, JpaSpecificationExecutor<TransactionSell> {
    TransactionSell findTopByOrderByCodeDesc();

    TransactionSell findByCodeAndIdIsNot(Integer code, Long id);

    Long countByBillSellOrderAndTransactionBuyDrug(Order order, Drug drug);

    List<TransactionSell> findByTransactionBuyDrug(Drug drug);

    List<TransactionSell> findByDrugUnit(DrugUnit drugUnit);
}
