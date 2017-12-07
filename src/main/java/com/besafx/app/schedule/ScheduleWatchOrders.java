package com.besafx.app.schedule;

import com.besafx.app.Async.AsyncScheduleDailyOrders;
import com.besafx.app.component.QuickEmail;
import com.besafx.app.config.DropboxManager;
import com.besafx.app.service.CompanyService;
import com.besafx.app.util.DateConverter;
import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.util.concurrent.Future;

@Component
public class ScheduleWatchOrders {

    private final Logger log = LoggerFactory.getLogger(ScheduleWatchOrders.class);

    @Autowired
    private CompanyService companyService;

    @Autowired
    private AsyncScheduleDailyOrders asyncScheduleDailyOrders;

    @Autowired
    private QuickEmail quickEmail;

    @Autowired
    private DropboxManager dropboxManager;

    private void run(String timeType) throws Exception {
        log.info("بداية عملية إرسال تقرير طلبات الفحص اليوم");
        Future<byte[]> work = asyncScheduleDailyOrders.getFile(timeType);
        byte[] fileBytes = work.get();
        if (work.isDone()) {
            log.info("STARTING UPLOADING FILE");
            StringBuffer fileName = new StringBuffer();
            fileName.append(DateConverter.getNowFileName());
            fileName.append(".pdf");

            Future<Boolean> uploadTask = dropboxManager.uploadFile(new ByteArrayInputStream(fileBytes), fileName.toString(), "/Pharmacy4Falcon/WatchOrders/" + fileName.toString());

            if (uploadTask.get()) {
                log.info("ENDING UPLOADING FILE");
                log.info("STARTING SENDING MESSAGE");
                Future<String> uploadFileLinkTask = dropboxManager.shareFile("/Pharmacy4Falcon/WatchOrders/" + fileName.toString());
                uploadFileLinkTask.get();

                quickEmail.send(
                        "طلبات فحص يوم ".concat(DateConverter.getHijriTodayDateString()),
                        Lists.newArrayList(companyService.findFirstBy().getEmail(), "islamhaker@gmail.com"),
                        "طلبات فحص يوم ".concat(DateConverter.getHijriTodayString()),
                        "الموافق ".concat(DateConverter.getHijriTodayDateString()) ,
                        "اضغط على الزر اداناه لعرض التقرير",
                        uploadFileLinkTask.get(),
                        "تحميل التقرير");

                log.info("ENDING SENDING MESSAGE");
            }
        }
    }

    @Scheduled(cron = "0 0 23 * * *")
    public void runDaily() throws Exception {
        run("Day");
    }

    @Scheduled(cron = "0 0/30 23 * * FRI")
    public void runWeekly() throws Exception {
        run("Week");
    }

    @Scheduled(cron = "0 0/45 23 25 * *")
    public void runMonthly() throws Exception {
        run("Month");
    }


}