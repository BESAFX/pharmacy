package com.besafx.app.Async;

import com.besafx.app.util.DateConverter;
import net.sf.jasperreports.engine.*;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Future;

@Service
public class AsyncScheduleDailyInsideSalesDebt {

    private final Logger log = LoggerFactory.getLogger(AsyncScheduleDailyInsideSalesDebt.class);

    @Autowired
    private TransactionalService transactionalService;

    private DateTime startDate, endDate;

    @Async("threadMultiplePool")
    public Future<byte[]> getFile(String timeType) throws Exception {
        Map<String, Object> map = new HashMap<>();
        switch (timeType) {
            case "Day":
                startDate = new DateTime().withTimeAtStartOfDay();
                endDate = new DateTime().plusDays(1).withTimeAtStartOfDay();
                map.put("title", "المطالبات المالية اليومية للمبيعات الداخلية");
                break;
            case "Week":
                startDate = new DateTime(DateConverter.getCurrentWeekStart()).withTimeAtStartOfDay();
                endDate = new DateTime(DateConverter.getCurrentWeekEnd()).plusDays(1).withTimeAtStartOfDay();
                map.put("title", "المطالبات المالية الاسبوعية للمبيعات الداخلية");
                break;
            case "Month":
                startDate = new DateTime().withDayOfMonth(1).withTimeAtStartOfDay();
                endDate = startDate.plusMonths(1).minusDays(1);
                map.put("title", "المطالبات المالية الشهرية للمبيعات الداخلية");
                break;
            case "Year":
                startDate = new DateTime().withDayOfYear(1).withTimeAtStartOfDay();
                endDate = startDate.plusYears(1).minusDays(1);
                map.put("title", "المطالبات المالية السنوية للمبيعات الداخلية");
                break;
        }
        map.put("bills", transactionalService.getInsideSalesDebt(startDate.toDate(), endDate.toDate()));
        map.put("logo", new ClassPathResource("/report/img/logo.png").getInputStream());
        ClassPathResource jrxmlFile = new ClassPathResource("/report/billSell/InsideSalesDebt.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(jrxmlFile.getInputStream());
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, map);
        return new AsyncResult<>(JasperExportManager.exportReportToPdf(jasperPrint));
    }
}
