import { ErrorLogo, SuccessLogo } from "./Logos";
const status = new Map([
  // Login, Register Errors
  [201, ["error", "Passwords Not Matched", <ErrorLogo />]],
  [202, ["error", "Please accept the Terms and Privacy Policy", <ErrorLogo />]],
  [203, ["error", "The E-mail not correct!", <ErrorLogo />]],
  [204, ["error", "The password not correct!", <ErrorLogo />]],
  [205, ["error", "The E-mail or Password not correct!", <ErrorLogo />]],
  // Login, Register Success
  [298, ["success", "Good to see you again!", <SuccessLogo />]],
  [299, ["success", "Welcome! Registration complete", <SuccessLogo />]],

  // Add Room Errors
  [301, ["error", "Room name too short : 3+ characters required", <ErrorLogo />]],
  [302, ["error", "Create Room First!", <ErrorLogo />],],


  // Remove Device Successfully
  [396, ["success", "Remove Device Successfully!", <SuccessLogo />],],

    // Edit Room Successfully
  [350, ["success", "Updated Room Successfully!", <SuccessLogo />],],

  // Edit Room Successfully
  [351, ["success", "Updated Device Successfully!", <SuccessLogo />],],

  // Remove Room Successfully
  [397, ["success", "Remove Room Successfully!", <SuccessLogo />],],

  // Add Room Success
  [398, ["success", "New Device Added!", <SuccessLogo />],],

  // Add Room Success
  [399, ["success", "New room created!", <SuccessLogo />],],


   // Remove Device Danger Message
  [498, ["danger", "Delete Device?;This device will be permanently removed. You will lose all control over it.", <SuccessLogo />],],
  
   // Remove Room Danger Message
  [499, ["danger", "Delete Room Permanently!;Deleting this room will also remove all linked devices, This is a permanent action.", <SuccessLogo />],],
  
]);

export default status;
