package com.besafx.app.config;

import com.besafx.app.entity.Person;
import com.besafx.app.service.DoctorService;
import com.besafx.app.service.EmployeeService;
import com.besafx.app.service.PersonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSessionEvent;
import java.util.*;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class
WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final static Logger log = LoggerFactory.getLogger(WebSecurityConfig.class);

    @Autowired
    private PersonService personService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/ui/**").permitAll()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/company").access("hasRole('ROLE_COMPANY_UPDATE')")
                .antMatchers("/customer").access("hasRole('ROLE_CUSTOMER_READ') or hasRole('ROLE_CUSTOMER_CREATE') or hasRole('ROLE_CUSTOMER_UPDATE') or hasRole('ROLE_CUSTOMER_DELETE')")
                .antMatchers("/supplier").access("hasRole('ROLE_SUPPLIER_READ') or hasRole('ROLE_SUPPLIER_CREATE') or hasRole('ROLE_SUPPLIER_UPDATE') or hasRole('ROLE_SUPPLIER_DELETE')")
                .antMatchers("/bank").access("hasRole('ROLE_BANK_READ') or hasRole('ROLE_BANK_CREATE') or hasRole('ROLE_BANK_UPDATE') or hasRole('ROLE_BANK_DELETE')")
                .antMatchers("/deposit").access("hasRole('ROLE_DEPOSIT_READ') or hasRole('ROLE_DEPOSIT_CREATE') or hasRole('ROLE_DEPOSIT_UPDATE') or hasRole('ROLE_DEPOSIT_DELETE')")
                .antMatchers("/withdraw").access("hasRole('ROLE_WITHDRAW_READ') or hasRole('ROLE_WITHDRAW_CREATE') or hasRole('ROLE_WITHDRAW_UPDATE') or hasRole('ROLE_WITHDRAW_DELETE')")
                .antMatchers("/doctor").access("hasRole('ROLE_DOCTOR_READ') or hasRole('ROLE_DOCTOR_CREATE') or hasRole('ROLE_DOCTOR_UPDATE') or hasRole('ROLE_DOCTOR_DELETE')")
                .antMatchers("/employee").access("hasRole('ROLE_EMPLOYEE_READ') or hasRole('ROLE_EMPLOYEE_CREATE') or hasRole('ROLE_EMPLOYEE_UPDATE') or hasRole('ROLE_EMPLOYEE_DELETE')")
                .antMatchers("/detectionType").access("hasRole('ROLE_DETECTION_TYPE_READ') or hasRole('ROLE_DETECTION_TYPE_CREATE') or hasRole('ROLE_DETECTION_TYPE_UPDATE') or hasRole('ROLE_DETECTION_TYPE_DELETE')")
                .antMatchers("/order").access("hasRole('ROLE_ORDER_READ') or hasRole('ROLE_ORDER_CREATE') or hasRole('ROLE_ORDER_UPDATE') or hasRole('ROLE_ORDER_DELETE')")
                .antMatchers("/diagnosis").access("hasRole('ROLE_DIAGNOSIS_READ') or hasRole('ROLE_DIAGNOSIS_CREATE') or hasRole('ROLE_DIAGNOSIS_UPDATE') or hasRole('ROLE_DIAGNOSIS_DELETE')")
                .antMatchers("/drug").access("hasRole('ROLE_DRUG_READ') or hasRole('ROLE_DRUG_CREATE') or hasRole('ROLE_DRUG_UPDATE') or hasRole('ROLE_DRUG_DELETE')")
                .antMatchers("/billBuy").access("hasRole('ROLE_BILL_BUY_READ') or hasRole('ROLE_BILL_BUY_CREATE') or hasRole('ROLE_BILL_BUY_UPDATE') or hasRole('ROLE_BILL_BUY_DELETE')")
                .antMatchers("/billSell").access("hasRole('ROLE_BILL_SELL_READ') or hasRole('ROLE_BILL_SELL_CREATE') or hasRole('ROLE_BILL_SELL_UPDATE') or hasRole('ROLE_BILL_SELL_DELETE')")
                .antMatchers("/drugCategory").access("hasRole('ROLE_DRUG_CATEGORY_READ') or hasRole('ROLE_DRUG_CATEGORY_CREATE') or hasRole('ROLE_DRUG_CATEGORY_UPDATE') or hasRole('ROLE_DRUG_CATEGORY_DELETE')")
                .antMatchers("/falcon").access("hasRole('ROLE_FALCON_READ') or hasRole('ROLE_FALCON_CREATE') or hasRole('ROLE_FALCON_UPDATE') or hasRole('ROLE_FALCON_DELETE')")
                .antMatchers("/team").access("hasRole('ROLE_TEAM_READ') or hasRole('ROLE_TEAM_CREATE') or hasRole('ROLE_TEAM_UPDATE') or hasRole('ROLE_TEAM_DELETE')")
                .anyRequest().authenticated();
        http.formLogin()
                .loginPage("/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .defaultSuccessUrl("/menu")
                .permitAll();
        http.logout()
                .logoutUrl("/logout")
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/")
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
        http.rememberMe();
        http.csrf().disable();
        http.sessionManagement()
                .maximumSessions(2)
                .sessionRegistry(sessionRegistry());
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
        return new ServletListenerRegistrationBean<>(new HttpSessionEventPublisher() {
            @Override
            public void sessionDestroyed(HttpSessionEvent event) {
                log.info("SESSION DESTROYED");
                SecurityContextImpl securityContext = (SecurityContextImpl) event.getSession().getAttribute("SPRING_SECURITY_CONTEXT");
                if (securityContext != null) {
                    UserDetails userDetails = (UserDetails) securityContext.getAuthentication().getPrincipal();
                    Person person = personService.findByEmail(userDetails.getUsername());
                    person.setActive(false);
                    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
                    person.setIpAddress(request.getRemoteAddr());
                    personService.save(person);
                }
                super.sessionDestroyed(event);
            }
        });
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        try {
            auth.userDetailsService((String email) -> {
                        Person person = personService.findByEmail(email);
                        List<GrantedAuthority> authorities = new ArrayList<>();
                        authorities.add(new SimpleGrantedAuthority("ROLE_PROFILE_UPDATE"));
                        if (SecurityContextHolder.getContext().getAuthentication() == null) {
                            log.info("فحص وجود المستخدم");
                            if (person == null) {
                                log.info("هذا المستخدم غير موجود");
                                throw new UsernameNotFoundException("هذا المستخدم غير موجود");
                            }
                            log.info("فحص إذا كان المستخدم ليس دعماً فنياً");
                            if (person.getTechnicalSupport()) {
                                log.info("السماح بمرور الدعم الفني");
                            } else {
                                log.info("فحص هل هذا المستخدم دكتور أو موظف");
                                if (employeeService.findByPerson(person) == null && doctorService.findByPerson(person) == null) {
                                    log.info("هذا المستخدم لا يشغل مناصب وظيفية داخل النظام");
                                    throw new UsernameNotFoundException("هذا المستخدم لا يشغل مناصب وظيفية داخل النظام");
                                }
                            }
                            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
                            person.setLastLoginDate(new Date());
                            person.setActive(true);
                            person.setIpAddress(request.getRemoteAddr());
                            personService.save(person);
                            log.info(person.getTeam().getAuthorities());
                            Optional.ofNullable(person.getTeam().getAuthorities()).ifPresent(value -> Arrays.asList(value.split(",")).stream().forEach(s -> authorities.add(new SimpleGrantedAuthority(s))));
                        }
                        return new User(person.getEmail(), person.getPassword(), person.getEnabled(), true, true, true, authorities);
                    }
            ).passwordEncoder(passwordEncoder);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
