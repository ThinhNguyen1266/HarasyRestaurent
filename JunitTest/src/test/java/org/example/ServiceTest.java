package org.example;

import org.junit.Test;
import org.junit.Assert;

public class ServiceTest {

    @Test
    public void getNameNegativeNumberTest(){
        Service service = new Service();
        String result = service.getName( -1);

        Assert.assertEquals("A", result);
    }

    @Test
    public void getNamePositiveNumberTest(){
        Service service = new Service();
        String result = service.getName( 1);

        Assert.assertEquals("B", result);
    }

    @Test
    public void getNameZeroNumberTest(){
        Service service = new Service();
        String result = service.getName( 0);

        Assert.assertEquals("B", result);
    }


}