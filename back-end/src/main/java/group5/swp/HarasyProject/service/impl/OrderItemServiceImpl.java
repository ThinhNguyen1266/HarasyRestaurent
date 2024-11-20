package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.order.OrderItemRequest;
import group5.swp.HarasyProject.dto.response.order.OrderItemResponse;
import group5.swp.HarasyProject.entity.order.OrderItemEntity;
import group5.swp.HarasyProject.entity.order.OrderItemId;
import group5.swp.HarasyProject.enums.OrderItemStatus;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.exception.ErrorCode;
import group5.swp.HarasyProject.mapper.OrderItemMapper;
import group5.swp.HarasyProject.repository.OrderItemRepository;
import group5.swp.HarasyProject.service.OrderItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    OrderItemRepository orderItemRepository;
    OrderItemMapper orderItemMapper;

    @Override
    public void saveAll(List<OrderItemEntity> orderItemEntity) {
        orderItemRepository.saveAll(orderItemEntity);
    }

    @Override
    public void save(OrderItemEntity orderItemEntity) {
        orderItemRepository.save(orderItemEntity);
    }

    @Override
    public List<OrderItemEntity> findAll(int orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    @Override
    public List<OrderItemResponse> toResponses(List<OrderItemEntity> orderItemEntityList) {
        return orderItemMapper.toResponses(orderItemEntityList);
    }

    @Override
    public OrderItemEntity findByOrderIdAndFoodId(int orderId, int foodId) {
        return orderItemRepository.findByOrderIdAndFoodId(orderId, foodId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_ITEM_NOT_FOUND));
    }

    @Override
    public OrderItemEntity mapUpdateOrderItem(OrderItemRequest request, OrderItemEntity orderItemEntity) {
        return orderItemMapper.update(request,orderItemEntity);
    }

    @Override
    public void deleteItem(int orderId, int foodId) {
        OrderItemId id = OrderItemId.builder()
                .foodId(foodId)
                .orderId(orderId)
                .build();
        OrderItemEntity orderItemEntity = orderItemRepository.findById(id)
                .orElseThrow(()->new AppException(ErrorCode.ORDER_ITEM_NOT_FOUND));
        if(!orderItemEntity.getStatus().equals(OrderItemStatus.PENDING))
            throw new AppException(ErrorCode.CANNOT_DELETE_ORDER_ITEM);
        orderItemRepository.deleteById(id);
    }
}
