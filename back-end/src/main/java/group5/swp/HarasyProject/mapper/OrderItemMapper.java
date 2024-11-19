package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.order.OrderItemRequest;
import group5.swp.HarasyProject.dto.response.order.OrderItemResponse;
import group5.swp.HarasyProject.entity.order.OrderItemEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface OrderItemMapper {
    @Mapping(target = "foodId",source = "food.id")
    @Mapping(target = "name" , source = "food.name")
    OrderItemResponse toResponse(OrderItemEntity entity);

    List<OrderItemResponse> toResponses(List<OrderItemEntity> entities);

    OrderItemEntity update(OrderItemRequest request,@MappingTarget OrderItemEntity entity);
}
