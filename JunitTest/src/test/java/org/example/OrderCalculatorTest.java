package org.example;

import org.junit.Test;


import static org.junit.Assert.assertEquals;

public class OrderCalculatorTest {

    @Test(expected = IllegalArgumentException.class)
    public  void testNoItemsInOrder(){
        OrderCalculator calculator = new OrderCalculator();
        calculator.calculateTotalPrice(new double[]{}, "VIP", false, null);
    }

    @Test
    public  void testVIPCustomerWithNoDiscountCode(){
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{100,200}, "VIP", true, null);
        assertEquals(240.0, total, 0.01);
    }

    @Test(expected = IllegalArgumentException.class)
    public  void test1(){
        OrderCalculator calculator = new OrderCalculator();
        calculator.calculateTotalPrice(new double[]{-100}, "VIP", false, null);
    }

    @Test
    public  void test2(){
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{200,200}, "Regular", false, null);
        assertEquals(380.0, total, 0.01);
    }

    @Test
    public  void test3(){
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{200,200}, "Regular", false, "SALE10");
        assertEquals(340.0, total, 0.01);
    }

    @Test
    public  void test4(){
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{200,200}, "VIP", true, "SALE10");
        assertEquals(280.0, total, 0.01);
    }

    @Test
    public  void test5(){
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{200,200}, "Regular", false, "WELCOME5");
        assertEquals(360.0, total, 0.01);
    }

    @Test
    public  void test6(){
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{200,200}, "VIP", true, "WELCOME5");
        assertEquals(300.0, total, 0.01);
    }














}