package com.besafx.app.rest;

import com.besafx.app.config.CustomException;
import com.besafx.app.entity.Drug;
import com.besafx.app.entity.Person;
import com.besafx.app.service.DrugService;
import com.besafx.app.service.PersonService;
import com.besafx.app.util.JSONConverter;
import com.besafx.app.util.Options;
import com.besafx.app.ws.Notification;
import com.besafx.app.ws.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.bohnman.squiggly.Squiggly;
import com.github.bohnman.squiggly.util.SquigglyUtils;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(value = "/api/drug/")
public class DrugRest {
    
    public static final String FILTER_TABLE = "**";
    public static final String FILTER_DRUG_COMBO = "id,code,nameArabic,nameEnglish";

    @Autowired
    private DrugService drugService;

    @Autowired
    private PersonService personService;

    @Autowired
    private NotificationService notificationService;

    @RequestMapping(value = "create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_DRUG_CREATE')")
    @Transactional
    public String create(@RequestBody Drug drug, Principal principal) {
        Drug topDrug = drugService.findTopByOrderByCodeDesc();
        if (topDrug == null) {
            drug.setCode(1);
        } else {
            drug.setCode(topDrug.getCode() + 1);
        }
        drug = drugService.save(drug);
        Person caller = personService.findByEmail(principal.getName());
        String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
        notificationService.notifyOne(Notification
                .builder()
                .title(lang.equals("AR") ? "العمليات على الصيدلية" : "Data Processing")
                .message(lang.equals("AR") ? "تم انشاء دواء جديد بنجاح" : "Create Drug Successfully")
                .type("success")
                .icon("fa-plus-square")
                .layout(lang.equals("AR") ? "topLeft" : "topRight")
                .build(), principal.getName());
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), drug);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_DRUG_UPDATE')")
    @Transactional
    public String update(@RequestBody Drug drug, Principal principal) {
        if (drugService.findByCodeAndIdIsNot(drug.getCode(), drug.getId()) != null) {
            throw new CustomException("هذا الكود مستخدم سابقاً، فضلاً قم بتغير الكود.");
        }
        Drug object = drugService.findOne(drug.getId());
        if (object != null) {
            drug = drugService.save(drug);
            Person caller = personService.findByEmail(principal.getName());
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .title(lang.equals("AR") ? "العمليات على الصيدلية" : "Data Processing")
                    .message(lang.equals("AR") ? "تم تعديل بيانات الدواء بنجاح" : "Update Drug Successfully")
                    .type("warning")
                    .icon("fa-edit")
                    .layout(lang.equals("AR") ? "topLeft" : "topRight")
                    .build(), principal.getName());
            return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), drug);
        } else {
            return null;
        }
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_DRUG_DELETE')")
    @Transactional
    public void delete(@PathVariable Long id, Principal principal) {
        Drug drug = drugService.findOne(id);
        if (drug != null) {
            drugService.delete(id);
            Person caller = personService.findByEmail(principal.getName());
            String lang = JSONConverter.toObject(caller.getOptions(), Options.class).getLang();
            notificationService.notifyOne(Notification
                    .builder()
                    .title(lang.equals("AR") ? "العمليات على الصيدلية" : "Data Processing")
                    .message(lang.equals("AR") ? "تم حذف الدواء بنجاح" : "Delete Drug Successfully")
                    .type("error")
                    .icon("fa-trash")
                    .layout(lang.equals("AR") ? "topLeft" : "topRight")
                    .build(), principal.getName());
        }
    }

    @RequestMapping(value = "findAll", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAll() {
        List<Drug> list = Lists.newArrayList(drugService.findAll());
        list.sort(Comparator.comparing(Drug::getCode));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), list);
    }

    @RequestMapping(value = "findAllCombo", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findAllCombo() {
        List<Drug> list = Lists.newArrayList(drugService.findAll());
        list.sort(Comparator.comparing(Drug::getCode));
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_DRUG_COMBO), list);
    }

    @RequestMapping(value = "findOne/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String findOne(@PathVariable Long id) {
        return SquigglyUtils.stringify(Squiggly.init(new ObjectMapper(), FILTER_TABLE), drugService.findOne(id));
    }
}