package org.example;

import org.junit.Test;

import static org.junit.Assert.*;

public class OrderCalculatorTest {
    // no item in order
    @Test(expected = IllegalArgumentException.class)
    public void test1() {
        OrderCalculator calculator = new OrderCalculator();
        calculator.calculateTotalPrice(new double[]{},"VIP",false,null);
    }
    // price <0
    @Test(expected = IllegalArgumentException.class)
    public void test2() {
        OrderCalculator calculator = new OrderCalculator();
         calculator.calculateTotalPrice(new double[]{-1,200},"VIP",true,null);

    }


    // vip customer null discound
    @Test
    public void test3() {
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{100,200},"VIP",true,null);
        assertEquals(240.0,total,0.01);
    }

    // customertype is Regular null discount
    @Test
    public void test4() {
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{100,200},"Regurlar",false,null);
        assertEquals(300.0,total,0.01);
    }

    // discount sale10 and isVIP
    @Test
    public void test5() {
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{100,200},"VIP",true,"SALE10");
        assertEquals(210.0,total,0.01);
    }


    // discount WELCOME5 and isVIP
        @Test
        public void test6() {
            OrderCalculator calculator = new OrderCalculator();
            double total = calculator.calculateTotalPrice(new double[]{100,200},"VIP",true,"WELCOME5");
            assertEquals(225.0,total,0.01);
        }
    // discount SALE10 va REgular
    @Test
    public void test7() {
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{100,200},"Regular",false,"SALE10");
        assertEquals(255.0,total,0.01);
    }

    // discount WELCOME5 va REgular
    @Test
    public void test8() {
        OrderCalculator calculator = new OrderCalculator();
        double total = calculator.calculateTotalPrice(new double[]{100,200},"Regular",false,"WELCOME5");
        assertEquals(270.0,total,0.01);
    }
}