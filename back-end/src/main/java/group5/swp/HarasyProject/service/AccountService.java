package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.account.CusUpdateProfileRequest;
import group5.swp.HarasyProject.dto.request.account.QuickRegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.account.RegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.account.RegistStaffRequest;
import group5.swp.HarasyProject.dto.request.auth.OtpRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.account.CustomerProfileResponse;
import group5.swp.HarasyProject.dto.response.account.ProfileResponse;
import group5.swp.HarasyProject.dto.response.account.RegisResponse;
import group5.swp.HarasyProject.dto.response.auth.OtpResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface AccountService {

    ApiResponse<RegisResponse> customerRegis(RegisCustomerRequest request) throws IOException, MessagingException;

    ApiResponse<StaffResponse> staffRegis(RegistStaffRequest request) throws IOException, MessagingException;

    ApiResponse<OtpResponse> validateOtp(OtpRequest otpRequest);

    ApiResponse<ProfileResponse> viewProfile(Integer id) throws IOException, MessagingException;

    ApiResponse<CustomerProfileResponse> quickCustomerRegis(QuickRegisCustomerRequest request);
    StaffAccountEntity getStaffAccount(Integer staffId) ;
    CustomerAccountEntity getCustomerAccount(Integer customerId) ;

    ApiResponse<CustomerProfileResponse> cusUpdateProfile(int id,CusUpdateProfileRequest request);

}
