document.addEventListener("DOMContentLoaded", () => {
    const generateOTPCode = document.querySelector(".generate-otp");
    const displayOTPCode = document.querySelector("#display-otp-code");

    const generateOTP = () => {
        let otp = "";
        const length = 6;

        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10);        
        }
        return otp;
    }

    generateOTPCode.addEventListener("click", () => {
        displayOTPCode.value = generateOTP();
    });
});
