package com.besafx.app.rest;

import com.besafx.app.auditing.Action;
import com.besafx.app.entity.OrderDetectionType;
import com.besafx.app.entity.Person;
import com.besafx.app.entity.listener.OrderDetectionTypeListener;
import com.besafx.app.search.OrderDetectionTypeSearch;
import com.besafx.app.service.OrderDetectionTypeService;
import com.besafx.app.service.PersonService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/orderDetectionType/")
public class OrderDetectionTypeRest {

    private final Logger log = LoggerFactory.getLogger(OrderDetectionTypeRest.class);

    public static final String FILTER_TABLE = "" +
            "**," +
            "-order," +
            "detectionType[id,code,nameArabic,nameEnglish,cost]," +
            "orderDetectionTypeAttaches[id],diagnoses[id],order[id,code,orderCondition]";

    @Autowired
    private OrderDetectionTypeService orderDetectionTypeService;

    @Autowired
    private OrderDetectionTypeSearch orderDetectionTypeSearch;

    @Autowired
    private PersonService personService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private OrderDetectionTypeListener orderDetectionTypeListener;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ORDER_CREATE')")
    @Transactional
    public String create(@RequestBody OrderDetectionType orderDetectionType, Principal principal) {
        if (orderDetectionType.getDone() == null) {
            orderDetectionType.setDone(false);
        }
        orderDetectionType.setCount(Optional.ofNullable(orderDetectionType.getCount()).isPresent() ? orderDetectionType.getCount() : 1);
        orderDetectionType = orderDetectionTypeService.save(orderDetectionType);
        Person caller = personService.findByEmail(principal.getName());
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .message(lang.equals("AR") ? "تم اضافة الفحص الجديد الي الطلب بنجاح" : "Adding Detection To Order Successfully")
                .type("success")
                .build(), principal.getName());

        log.info("START CREATE HISTORY LINE");
        StringBuilder builder = new StringBuilder();
        builder.append("اضافة خدمة الفحص / ");
        builder.append(orderDetectionType.getDetectionType().getNameArabic());
        builder.append(" إلى الطلب رقم / ");
        builder.append(orderDetectionType.getOrder().getCode());
        orderDetectionTypeListener.perform(orderDetectionType, Action.INSERTED, builder.toString());
        log.info("END CREATE HISTORY LINE");

        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), orderDetectionType);
    }

    @RequestMapping(value = "saveOrderDetectionTypeCase/{id}/{done}", method = RequestMethod.GET)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ORDER_DETECTION_TYPE_SAVE_CASE')")
    @Transactional
    public void saveOrderDetectionTypeCase(@PathVariable(value = "id") Long id, @PathVariable(value = "done") Boolean done, Principal principal) {
        OrderDetectionType orderDetectionType = orderDetectionTypeService.findOne(id);
        if (orderDetectionType != null) {
            orderDetectionType.setDone(done);
            orderDetectionTypeService.save(orderDetectionType);

            log.info("START CREATE HISTORY LINE");
            StringBuilder builder = new StringBuilder();
            builder.append("تشخيص خدمة الفحص / ");
            builder.append(orderDetectionType.getDetectionType().getNameArabic());
            builder.append(" من الطلب رقم / ");
            builder.append(orderDetectionType.getOrder().getCode());
            orderDetectionTypeListener.perform(orderDetectionType, Action.UPDATED, builder.toString());
            log.info("END CREATE HISTORY LINE");
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ORDER_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id, Principal principal) {
        OrderDetectionType orderDetectionType = orderDetectionTypeService.findOne(id);
        if (orderDetectionType != null) {
            orderDetectionTypeService.delete(orderDetectionType);
            Person caller = personService.findByEmail(principal.getName());
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .message(lang.equals("AR") ? "تم حذف الفحص وكل ما يتعلق به من وصفات طبية بنجاح" : "Delete Detection With All Related Successfully")
                    .type("error")
                    .build(), principal.getName());

            log.info("START CREATE HISTORY LINE");
            StringBuilder builder = new StringBuilder();
            builder.append("حذف خدمة الفحص / ");
            builder.append(orderDetectionType.getDetectionType().getNameArabic());
            builder.append(" من الطلب رقم / ");
            builder.append(orderDetectionType.getOrder().getCode());
            orderDetectionTypeListener.perform(orderDetectionType, Action.DELETED, builder.toString());
            log.info("END CREATE HISTORY LINE");

        }
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), orderDetectionTypeService.findOne(id));
    }

    @RequestMapping(value = "findByOrder/{orderId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findByOrder(@PathVariable(value = "orderId") Long orderId) {
        List<OrderDetectionType> list = orderDetectionTypeService.findByOrderId(orderId);
        list.sort(Comparator.comparing(orderDetectionType -> orderDetectionType.getDetectionType().getCode()));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "filter", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String filter(
            @RequestParam(value = "codeFrom", required = false) final Long codeFrom,
            @RequestParam(value = "codeTo", required = false) final Long codeTo,
            @RequestParam(value = "dateFrom", required = false) final Long dateFrom,
            @RequestParam(value = "dateTo", required = false) final Long dateTo,
            @RequestParam(value = "customerName", required = false) final String customerName,
            @RequestParam(value = "customerMobile", required = false) final String customerMobile,
            @RequestParam(value = "customerIdentityNumber", required = false) final String customerIdentityNumber,
            @RequestParam(value = "falconCode", required = false) final Long falconCode,
            @RequestParam(value = "falconType", required = false) final String falconType,
            @RequestParam(value = "weightFrom", required = false) final Double weightFrom,
            @RequestParam(value = "weightTo", required = false) final Double weightTo,
            @RequestParam(value = "doctorName", required = false) final String doctorName) {
        List<OrderDetectionType> list = orderDetectionTypeSearch.filter(codeFrom, codeTo, dateFrom, dateTo, customerName, customerMobile, customerIdentityNumber, falconCode, falconType, weightFrom, weightTo, doctorName);
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }
}
