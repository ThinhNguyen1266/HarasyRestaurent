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
    @Mapping(target = "staff.phone" , source="staff.account.phone")
    @Mapping(target = "staff.email" , source="staff.account.email")
    @Mapping(target = "customer.name" , source="customer.account.fullName")
    @Mapping(target = "customer.phone" , source="customer.account.phone")
    @Mapping(target = "customer.email" , source="customer.account.email")
    OrderResponse toResponse(OrderEntity order);
}
