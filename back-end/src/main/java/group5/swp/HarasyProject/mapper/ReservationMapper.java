package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.dto.response.reservation.ReservationTypeResonse;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.entity.reservation.ReservationTypeEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;


@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = {OrderMapper.class}
)
public interface ReservationMapper {

    @Mapping(target = "type", source = "type.name")
    @Mapping(target="customer.name" , source = "customer.account.fullName")
    @Mapping(target="customer.phone" , source = "customer.account.phone")
    @Mapping(target="customer.email" , source = "customer.account.email")
    ReservationResponse toResponse(ReservationEntity reservation);

    List<ReservationTypeResonse> toReservationTypeResponseList(List<ReservationTypeEntity> list);

}
