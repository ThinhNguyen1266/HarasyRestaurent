package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.order.OrderItemRequest;
import group5.swp.HarasyProject.dto.response.order.OrderItemResponse;
import group5.swp.HarasyProject.entity.order.OrderItemEntity;

import java.util.List;

public interface OrderItemService {
    void saveAll(List<OrderItemEntity> orderItemEntity);

    void save(OrderItemEntity orderItemEntity);

    List<OrderItemEntity> findAll(int orderId);

    List<OrderItemResponse> toResponses(List<OrderItemEntity> orderItemEntityList);

    OrderItemEntity findByOrderIdAndFoodId(int orderId, int foodId);

    OrderItemEntity mapUpdateOrderItem(OrderItemRequest request, OrderItemEntity orderItemEntity);

    void deleteItem(int orderId, int foodId);
}
