package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;


@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {OrderMapper.class}
)
public interface ReservationMapper {

    @Mapping(target = "type", source = "type.name")
    @Mapping(target="customer.name" , source = "customer.account.fullName")
    ReservationResponse toResponse(ReservationEntity reservation);
}
