package com.besafx.app.service;

import com.besafx.app.entity.BillBuy;
import com.besafx.app.entity.DrugUnit;
import com.besafx.app.entity.TransactionBuy;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public interface TransactionBuyService extends PagingAndSortingRepository<TransactionBuy, Long>, JpaSpecificationExecutor<TransactionBuy> {
    TransactionBuy findTopByOrderByCodeDesc();

    TransactionBuy findByCodeAndIdIsNot(Integer code, Long id);

    List<TransactionBuy> findByDrugId(Long drugId);

    List<TransactionBuy> findByDrugUnit(DrugUnit drugUnit);

    List<TransactionBuy> findByBillBuy(BillBuy billBuy);
}
