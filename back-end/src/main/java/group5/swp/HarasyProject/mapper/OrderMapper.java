package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {OrderItemMapper.class}
)
public interface OrderMapper {
    @Mapping(target = "staff.name" , source="staff.account.fullName")
    @Mapping(target = "customer.name" , source="customer.account.fullName")
    OrderResponse toResponse(OrderEntity order);
}
