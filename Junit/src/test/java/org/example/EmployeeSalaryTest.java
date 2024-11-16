package org.example;

import org.junit.Test;


import static org.junit.Assert.*;
public class EmployeeSalaryTest {

    @Test(expected = IllegalArgumentException.class)
    public void TestInvalid(){
        EmployeeSalary employeeSalary = new EmployeeSalary();
        employeeSalary.calculateSalary(-1,20000,6);
    }

    @Test
    public void Test1(){
        EmployeeSalary employeeSalary = new EmployeeSalary();
        employeeSalary.calculateSalary(-1,20000,6);
    }
  
}