package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface ReservationMapper {

    default ReservationResponse toResponse(ReservationEntity reservation) {
        if (reservation == null) {
            return null;
        }

        // Fetch the customer name from the associated AccountEntity
        String customerName = reservation.getCustomer() != null
                ? reservation.getCustomer().getAccount().getFullName()
                : "Unknown Customer";

        // Fetch the branch name from the associated BranchEntity
        String branchName = reservation.getBranch() != null
                ? reservation.getBranch().getName()
                : "Unknown Branch";

        return ReservationResponse.builder()
                .id(reservation.getId())
                .reservationDate(reservation.getReservationDate())
                .amountGuest(reservation.getAmountGuest())
                .status(reservation.getStatus())
                .customerName(customerName)  // Set customer name in response
                .branchName(branchName)      // Set branch name in response
                .build();
    }
}
