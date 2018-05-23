package com.ec.opensesame.cucumber.stepdefs;

import com.ec.opensesame.OpenSesameApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = OpenSesameApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
